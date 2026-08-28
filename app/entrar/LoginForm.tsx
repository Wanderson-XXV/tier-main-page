"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function LoginForm({ returnTo, initialError = "" }: { returnTo: string; initialError?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error] = useState(initialError);

  useEffect(() => {
    const remembered = window.localStorage.getItem("tier-login-email");
    if (remembered) { setEmail(remembered); setRememberEmail(true); }
  }, []);

  function submit() {
    setLoading(true);
    if (rememberEmail) window.localStorage.setItem("tier-login-email", email);
    else window.localStorage.removeItem("tier-login-email");
  }

  return (
    <div className="tier-login-card">
      <Link className="login-back" href="/"><ArrowLeft /> Voltar para o site</Link>
      <span className="login-lock"><LockKeyhole /></span>
      <small>ÁREA EXCLUSIVA</small>
      <h1>Bem-vindo ao Hub TIER.</h1>
      <p>Entre com seu cadastro profissional para acessar currículos, planos de aula, montagens e feedbacks.</p>

      <form action="/api/auth/login" method="post" onSubmit={submit}>
        <input type="hidden" name="returnTo" value={returnTo} />
        <label><span>E-mail profissional</span><div><Mail /><input name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" placeholder="nome@escola.com.br" required /></div></label>
        <label><span>Senha</span><div><LockKeyhole /><input name="password" type={showPassword ? "text" : "password"} value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" placeholder="Digite sua senha" required /><button type="button" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff /> : <Eye />}</button></div></label>
        <div className="login-options"><label><input type="checkbox" checked={rememberEmail} onChange={event => setRememberEmail(event.target.checked)} /> <span>Lembrar meu e-mail</span></label><button type="button" disabled>Esqueci minha senha</button></div>
        {error && <p className="login-error" role="alert">{error}</p>}
        <button className="login-submit" type="submit" disabled={loading}>{loading ? "Verificando acesso..." : <>Entrar no Hub <ArrowRight /></>}</button>
      </form>

      <div className="login-security"><ShieldCheck /><p><strong>Acesso protegido</strong><span>As contas serão liberadas pela coordenação TIER. Senhas nunca são armazenadas em texto aberto.</span></p></div>
    </div>
  );
}
