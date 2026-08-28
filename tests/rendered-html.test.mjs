import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("oferece uma home pública e mantém o Hub como área exclusiva", async () => {
  const [page, layout, home, hubPage, loginPage, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PublicHome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/hub/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/entrar/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<PublicHome/);
  assert.match(home, /Tecnologia que vira/);
  assert.match(home, /Conheça as soluções/);
  assert.match(home, /Fale com a TIER/);
  assert.doesNotMatch(home, /Acessar o Hub/);
  assert.match(home, /process-showcase/);
  assert.match(home, /Falar sobre esta etapa/);
  assert.match(home, /wa\.me\/5521999073193/);
  assert.match(home, /252/);
  assert.match(home, /Curricular/);
  assert.match(home, /Extracurricular/);
  assert.match(home, /START/);
  assert.match(home, /NEXT/);
  assert.match(home, /HIGH/);
  assert.match(home, /Tech Fênix/);
  assert.match(home, /WeBOT/);
  assert.match(home, /2018/);
  assert.match(hubPage, /requireTierSession/);
  assert.match(hubPage, /<CurriculumHub/);
  assert.match(loginPage, /<LoginForm/);
  assert.match(layout, /og\.png/);
  assert.match(packageJson, /"name": "tier-nexo-ia"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("prepara autenticação segura para o futuro banco de profissionais", async () => {
  const [auth, loginRoute, feedbackRoute, migration] = await Promise.all([
    readFile(new URL("../app/lib/tier-auth.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/auth/login/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/feedback/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0001_tier_auth.sql", import.meta.url), "utf8"),
  ]);

  assert.match(auth, /pbkdf2_sha256/);
  assert.match(auth, /tokenHash/);
  assert.match(loginRoute, /httpOnly: true/);
  assert.match(loginRoute, /sameSite: "lax"/);
  assert.match(feedbackRoute, /Acesso não autorizado/);
  assert.match(migration, /CREATE TABLE `tier_users`/);
  assert.match(migration, /CREATE TABLE `tier_sessions`/);
});

test("expõe a progressão curricular aprovada para o Fundamental II", async () => {
  const curriculum = await readFile(new URL("../app/data/curriculum.ts", import.meta.url), "utf8");

  for (const grade of ["year6", "year7", "year8", "year9"]) {
    assert.match(curriculum, new RegExp(`const ${grade}: RawLesson\\[\\]`));
  }
  assert.match(curriculum, /SPIKE Prime/);
  assert.match(curriculum, /VEXcode VR \(digital\)/);
  assert.match(curriculum, /nenhum kit VEX físico/);
  assert.match(curriculum, /micro:bit CreateAI/);
  assert.match(curriculum, /grupos de 3–4 estudantes/);
  assert.match(curriculum, /assets\.education\.lego\.com/);
  assert.match(curriculum, /education\.vex\.com\/stemlabs/);
  assert.match(curriculum, /microbit\.org\/teach\/lessons/);
});

test("abre todas as atividades e montagens LEGO na versão brasileira", async () => {
  const curriculum = await readFile(new URL("../app/data/curriculum.ts", import.meta.url), "utf8");

  assert.match(curriculum, /education\.lego\.com\/pt-br\/lessons/);
  assert.match(curriculum, /replace\("education\.lego\.com\/en-us\/lessons\/", "education\.lego\.com\/pt-br\/lessons\/"\)/);
  assert.match(curriculum, /replace\("locale=en-us", "locale=pt-br"\)/);
  assert.match(curriculum, /url:legoPtBrUrl\(url\)/);
});

test("provisiona a conta inicial de professor sem gravar a senha em texto aberto", async () => {
  const [migration, compatibilityFix] = await Promise.all([
    readFile(new URL("../drizzle/0002_seed_professor_tier.sql", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0003_fix_professor_password.sql", import.meta.url), "utf8"),
  ]);

  assert.match(migration, /professor@tiereducation\.com\.br/);
  assert.match(migration, /pbkdf2_sha256\$100000\$/);
  assert.match(migration, /ON CONFLICT\(`email`\) DO UPDATE/);
  assert.match(compatibilityFix, /pbkdf2_sha256\$100000\$/);
  assert.doesNotMatch(migration, /Tier!xDTQHCXyH9BWFV/);
  assert.doesNotMatch(compatibilityFix, /Tier!xDTQHCXyH9BWFV/);
});

test("conclui o login com formulário nativo e redirecionamento do servidor", async () => {
  const [loginForm, loginRoute] = await Promise.all([
    readFile(new URL("../app/entrar/LoginForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/auth/login/route.ts", import.meta.url), "utf8"),
  ]);

  assert.match(loginForm, /action="\/api\/auth\/login" method="post"/);
  assert.match(loginForm, /name="email"/);
  assert.match(loginForm, /name="password"/);
  assert.match(loginRoute, /NextResponse\.redirect\(new URL\(returnTo, request\.url\), 303\)/);
});
