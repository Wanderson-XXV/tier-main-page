import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { safeReturnTo } from "../lib/tier-auth";

export const metadata: Metadata = {
  title: "Área do Professor | TIER Education",
  description: "Acesso exclusivo ao Hub Pedagógico TIER.",
  robots: { index: false, follow: false },
};

const loginErrors: Record<string, string> = {
  dados: "Dados de acesso inválidos.",
  campos: "Informe e-mail e senha.",
  credenciais: "E-mail ou senha não reconhecidos.",
  indisponivel: "O cadastro de profissionais ainda está sendo ativado pela TIER.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ retorno?: string; erro?: string }> }) {
  const params = await searchParams;
  return (
    <main className="tier-login-page">
      <section className="login-showcase">
        <img src="/tier-home/class-team.jpg" alt="Turma e educadores TIER reunidos em uma experiência de robótica" />
        <div className="login-showcase-overlay" />
        <div className="login-showcase-copy"><img src="/tier-logo-white.png" alt="TIER Education" /><span>HUB PEDAGÓGICO</span><h2>Planejar com clareza. Ensinar com confiança. Melhorar a cada aula.</h2><p>Todo o currículo TIER em um ambiente criado para quem faz a aprendizagem acontecer.</p></div>
      </section>
      <section className="login-form-panel"><LoginForm returnTo={safeReturnTo(params.retorno)} initialError={loginErrors[params.erro ?? ""] ?? ""} /></section>
    </main>
  );
}
