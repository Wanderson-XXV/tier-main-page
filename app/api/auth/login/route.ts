import { NextRequest, NextResponse } from "next/server";
import { authenticateTierUser, safeReturnTo, TIER_SESSION_COOKIE } from "../../../lib/tier-auth";

export async function POST(request: NextRequest) {
  const isForm = request.headers.get("content-type")?.includes("application/x-www-form-urlencoded") ?? false;
  let body: { email?: string; password?: string; returnTo?: string };
  try {
    if (isForm) {
      const form = await request.formData();
      body = {
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
        returnTo: String(form.get("returnTo") ?? ""),
      };
    } else {
      body = await request.json();
    }
  } catch {
    return isForm ? formErrorRedirect(request, "dados", "/hub") : NextResponse.json({ error: "Dados de acesso inválidos." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().slice(0, 180);
  const password = String(body.password ?? "").slice(0, 256);
  if (!email || !password) {
    return isForm ? formErrorRedirect(request, "campos", body.returnTo) : NextResponse.json({ error: "Informe e-mail e senha." }, { status: 400 });
  }

  const result = await authenticateTierUser(email, password);
  if (!result.ok) {
    const unavailable = result.reason === "unavailable";
    if (isForm) return formErrorRedirect(request, unavailable ? "indisponivel" : "credenciais", body.returnTo);
    return NextResponse.json(
      { error: unavailable ? "O cadastro de profissionais ainda está sendo ativado pela TIER." : "E-mail ou senha não reconhecidos." },
      { status: unavailable ? 503 : 401 },
    );
  }

  const returnTo = safeReturnTo(body.returnTo);
  const response = isForm
    ? NextResponse.redirect(new URL(returnTo, request.url), 303)
    : NextResponse.json({ ok: true, returnTo });
  response.cookies.set({
    name: TIER_SESSION_COOKIE,
    value: result.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: result.expiresAt,
  });
  return response;
}

function formErrorRedirect(request: NextRequest, error: string, returnTo: string | null | undefined) {
  const target = new URL("/entrar", request.url);
  target.searchParams.set("erro", error);
  target.searchParams.set("retorno", safeReturnTo(returnTo));
  return NextResponse.redirect(target, 303);
}
