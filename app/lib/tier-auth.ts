import { env } from "cloudflare:workers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Bindings = { DB?: D1Database };

export type TierUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type TierLoginResult =
  | { ok: true; token: string; expiresAt: Date; user: TierUser }
  | { ok: false; reason: "invalid" | "unavailable" };

export const TIER_SESSION_COOKIE = "tier_session";
const SESSION_HOURS = 12;

function database(): D1Database | null {
  return (env as unknown as Bindings).DB ?? null;
}

export async function authenticateTierUser(email: string, password: string): Promise<TierLoginResult> {
  const db = database();
  if (!db) {
    console.error("[TIER auth] Binding D1 DB indisponível.");
    return { ok: false, reason: "unavailable" };
  }

  try {
    const record = await db.prepare(`SELECT id, name, email, role, password_hash AS passwordHash
      FROM tier_users WHERE lower(email) = lower(?) AND active = 1 LIMIT 1`)
      .bind(email.trim()).first<TierUser & { passwordHash: string }>();

    if (!record || !(await verifyPassword(password, record.passwordHash))) {
      return { ok: false, reason: "invalid" };
    }

    const token = randomToken();
    const tokenHash = await sha256(token);
    const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60 * 1000);
    const sessionId = crypto.randomUUID();

    await db.batch([
      db.prepare("DELETE FROM tier_sessions WHERE expires_at <= ?").bind(new Date().toISOString()),
      db.prepare(`INSERT INTO tier_sessions (id, user_id, token_hash, expires_at, created_at)
        VALUES (?, ?, ?, ?, ?)`)
        .bind(sessionId, record.id, tokenHash, expiresAt.toISOString(), new Date().toISOString()),
    ]);

    return {
      ok: true,
      token,
      expiresAt,
      user: { id: record.id, name: record.name, email: record.email, role: record.role },
    };
  } catch (error) {
    console.error("[TIER auth] Falha interna:", error instanceof Error ? error.message : "erro desconhecido");
    return { ok: false, reason: "unavailable" };
  }
}

export async function getTierSession(): Promise<TierUser | null> {
  const token = (await cookies()).get(TIER_SESSION_COOKIE)?.value;
  return token ? getTierSessionFromToken(token) : null;
}

export async function getTierSessionFromToken(token: string | undefined): Promise<TierUser | null> {
  if (!token) return null;
  const db = database();
  if (!db) return null;

  try {
    const tokenHash = await sha256(token);
    const record = await db.prepare(`SELECT u.id, u.name, u.email, u.role, s.expires_at AS expiresAt
      FROM tier_sessions s
      INNER JOIN tier_users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND u.active = 1 LIMIT 1`)
      .bind(tokenHash).first<TierUser & { expiresAt: string }>();

    if (!record || Date.parse(record.expiresAt) <= Date.now()) {
      if (record) await db.prepare("DELETE FROM tier_sessions WHERE token_hash = ?").bind(tokenHash).run();
      return null;
    }

    return { id: record.id, name: record.name, email: record.email, role: record.role };
  } catch {
    return null;
  }
}

export async function invalidateTierSession(token: string | undefined) {
  const db = database();
  if (!db || !token) return;
  try {
    await db.prepare("DELETE FROM tier_sessions WHERE token_hash = ?").bind(await sha256(token)).run();
  } catch {
    // A limpeza do cookie continua válida mesmo se o banco ainda não estiver configurado.
  }
}

export async function requireTierSession(returnTo = "/hub"): Promise<TierUser> {
  const user = await getTierSession();
  if (user) return user;
  redirect(`/entrar?retorno=${encodeURIComponent(safeReturnTo(returnTo))}`);
}

export function safeReturnTo(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/hub";
  return value.startsWith("/entrar") || value.startsWith("/api/") ? "/hub" : value;
}

async function verifyPassword(password: string, storedHash: string) {
  const [scheme, rounds, saltBase64, expectedBase64] = storedHash.split("$");
  const iterations = Number(rounds);
  if (scheme !== "pbkdf2_sha256" || !Number.isInteger(iterations) || iterations < 100_000 || !saltBase64 || !expectedBase64) return false;

  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: base64ToBytes(saltBase64), iterations }, key, 256);
  return constantTimeEqual(new Uint8Array(bits), base64ToBytes(expectedBase64));
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return bytesToBase64(bytes).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  return difference === 0;
}
