"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Blocks, Bot, CheckCircle2, CircuitBoard,
  Code2, Compass, GraduationCap, Lightbulb, MessageCircle, MessageSquareText,
  Rocket, School, Sparkles, Trophy, Users, Wrench,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PublicHome() {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const floatingMediaRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const orbitTwoRef = useRef<HTMLDivElement>(null);
  const impactGlowOrbitRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("solucoes");
  const [activeProcess, setActiveProcess] = useState(0);
  const processSteps = [
    { label: "ESCUTA E CONTEXTO", title: "Entendemos", accent: "a escola.", description: "Antes de propor qualquer tecnologia, conhecemos os objetivos da instituição, seus estudantes, equipe e rotina.", note: "Começamos pelo que a escola precisa construir." },
    { label: "JORNADA COM DIREÇÃO", title: "Estruturamos", accent: "o caminho.", description: "Transformamos esse contexto em uma proposta clara, com currículo, módulos, recursos e uma progressão que faz sentido.", note: "Da proposta à sala de aula, sem improviso." },
    { label: "APRENDER FAZENDO", title: "Colocamos", accent: "em prática.", description: "Os estudantes constroem, programam, testam, erram, ajustam e criam projetos reais com intenção pedagógica.", note: "Conhecimento ganha forma, movimento e autoria." },
    { label: "PARCERIA CONTÍNUA", title: "Acompanhamos", accent: "a jornada.", description: "Professores recebem suporte e a experiência evolui junto com os estudantes, a escola e seus próximos desafios.", note: "Uma parceria que continua depois da primeira aula." },
  ];

  useGSAP((_, contextSafe) => {
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      const mediaNode = mediaRef.current;
      const floatingMediaNode = floatingMediaRef.current;
      if (!mediaNode || !floatingMediaNode) return;

      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(orbitTwoRef.current, {
        rotation: -360,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(impactGlowOrbitRef.current, {
        rotation: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.fromTo(floatingMediaNode, { y: -16 }, {
        y: 16,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const moveX = gsap.quickTo(mediaNode, "x", { duration: 0.65, ease: "power3.out" });
      const moveY = gsap.quickTo(mediaNode, "y", { duration: 0.65, ease: "power3.out" });
      const handlePointerMove = contextSafe((event: PointerEvent) => {
        const bounds = mediaNode.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        moveX(gsap.utils.clamp(-18, 18, -x * 36));
        moveY(gsap.utils.clamp(-14, 14, -y * 28));
      });
      const resetPosition = contextSafe(() => {
        moveX(0);
        moveY(0);
      });

      mediaNode.addEventListener("pointermove", handlePointerMove);
      mediaNode.addEventListener("pointerleave", resetPosition);

      const impactSection = heroRef.current?.querySelector<HTMLElement>(".impact-section");
      if (impactSection) {
        const impactAtmosphere = impactSection.querySelector<HTMLElement>(".impact-atmosphere");
        const impactIntro = Array.from(impactSection.querySelector(".impact-intro")?.children ?? []);
        const impactCards = gsap.utils.toArray<HTMLElement>(".impact-card", impactSection);
        const impactNumbers = gsap.utils.toArray<HTMLElement>(".impact-number", impactSection);

        if (impactAtmosphere) {
          gsap.to(impactAtmosphere, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: impactSection,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: impactSection, start: "top 72%", once: true },
        })
          .from(impactIntro, { autoAlpha: 0, y: 30, duration: 0.75, stagger: 0.12 })
          .from(impactCards, { autoAlpha: 0, y: 46, scale: 0.96, duration: 0.8, stagger: 0.13 }, "-=0.25")
          .from(impactNumbers, { scale: 0.78, duration: 0.6, ease: "back.out(1.4)", stagger: 0.13 }, "-=0.45");
      }

      const revealSelectors = [
        ".section-heading, .competition-heading",
        ".solutions-grid > article, .method-grid > article, .journey-track > article",
        ".implementation-row, .method-story > *, .competition-proof",
        ".photo-grid figure, .competition-grid > article",
        ".teacher-section > *, .history-section > *, .school-cta-copy",
      ];

      revealSelectors.forEach((selector) => {
        const targets = gsap.utils.toArray<HTMLElement>(selector, heroRef.current);
        if (!targets.length) return;

        gsap.set(targets, { autoAlpha: 0, y: 34 });
        ScrollTrigger.batch(targets, {
          start: "top 86%",
          once: true,
          batchMax: 4,
          onEnter: (batch) => gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: "auto",
          }),
        });
      });

      return () => {
        mediaNode.removeEventListener("pointermove", handlePointerMove);
        mediaNode.removeEventListener("pointerleave", resetPosition);
      };
    });

    ["solucoes", "metodologia", "jornada", "resultados"].forEach((id) => {
      const section = heroRef.current?.querySelector<HTMLElement>(`#${id}`);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => matchMedia.revert();
  }, { scope: heroRef });

  return (
    <main className="public-home" ref={heroRef}>
      <header className="public-nav">
        <Link className="public-brand" href="/" aria-label="TIER Education — início">
          <img src="/tier-logo-white.png" alt="TIER Education" />
        </Link>
        <nav aria-label="Navegação do site">
          <a className={activeSection === "solucoes" ? "active" : undefined} aria-current={activeSection === "solucoes" ? "location" : undefined} href="#solucoes">Soluções</a>
          <a className={activeSection === "metodologia" ? "active" : undefined} aria-current={activeSection === "metodologia" ? "location" : undefined} href="#metodologia">Metodologia</a>
          <a className={activeSection === "jornada" ? "active" : undefined} aria-current={activeSection === "jornada" ? "location" : undefined} href="#jornada">Jornada</a>
          <a className={activeSection === "resultados" ? "active" : undefined} aria-current={activeSection === "resultados" ? "location" : undefined} href="#resultados">Resultados</a>
        </nav>
        <a className="teacher-access" href="#contato">Fale com a TIER <ArrowRight size={17} /></a>
      </header>

      <section className="public-hero">
        <div className="hero-copy">
          <span className="public-eyebrow"><i /> EDUCAÇÃO TECNOLÓGICA ESTRUTURADA</span>
          <h1>Tecnologia que vira <em>experiência.</em> Aprendizagem que fica.</h1>
          <p>Mais do que aulas de robótica: a TIER integra currículo, criatividade e tecnologia em uma jornada contínua para estudantes construírem, programarem, testarem e criarem soluções.</p>
          <div className="hero-actions">
            <a className="public-cta" href="#solucoes">Conheça as soluções <ArrowRight size={18} /></a>
            <a className="public-link" href="#contato">Fale com a TIER</a>
          </div>
          <div className="hero-proof" aria-label="Destaques do programa">
            <span><Blocks /><strong>Aprender fazendo</strong><small>Projetos mão na massa</small></span>
            <span><Code2 /><strong>Do 3º ao 9º ano</strong><small>Progressão curricular</small></span>
            <span><GraduationCap /><strong>Professor apoiado</strong><small>Planos claros e aplicáveis</small></span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-media" ref={mediaRef}>
            <div className="hero-media-float" ref={floatingMediaRef}>
          <div className="hero-photo"><img src="/tier-home/hero-student.jpg" alt="Estudante programando um robô em uma atividade TIER" /></div>
          <div className="hero-note"><span>252</span><p><strong>aulas estruturadas</strong><small>em uma jornada evolutiva</small></p></div>
            </div>
          </div>
          <div className="hero-orbit orbit-one" ref={orbitRef} aria-hidden="true">
            <span className="hero-orbit-dot" />
            <span className="hero-orbit-dot hero-orbit-dot-mirrored" />
          </div>
          <div className="hero-orbit orbit-two" ref={orbitTwoRef} aria-hidden="true">
            <span className="hero-orbit-dot hero-orbit-dot-small" />
            <span className="hero-orbit-dot hero-orbit-dot-small hero-orbit-dot-mirrored" />
          </div>
        </div>
      </section>

      <section className="impact-section" aria-labelledby="impact-title">
        <div className="impact-atmosphere" aria-hidden="true">
          <div className="impact-ring impact-ring-left" />
          <div className="impact-ring impact-ring-right">
            <div className="impact-glow-orbit" ref={impactGlowOrbitRef}><span className="impact-glow" /></div>
          </div>
        </div>
        <div className="impact-intro">
          <span>•&nbsp; NOSSO IMPACTO &nbsp;•</span>
          <h2 id="impact-title">Números que refletem<br />transformação <em>real.</em></h2>
          <p>Cada dado representa o impacto da nossa metodologia e da tecnologia<br />na vida de estudantes, educadores e escolas em todo o Brasil.</p>
        </div>
        <div className="impact-grid">
          <article className="impact-card">
            <strong className="impact-number">7</strong><i />
            <h3>Currículos<br />progressivos</h3>
            <p>Percursos completos e alinhados à BNCC, com progressão de habilidades para cada etapa escolar, do 3º ao 9º ano.</p>
          </article>
          <article className="impact-card">
            <strong className="impact-number">28</strong><i />
            <h3>Módulos<br />evolutivos</h3>
            <p>Conteúdos práticos e interdisciplinares que conectam teoria e aplicação para desenvolver competências do futuro.</p>
          </article>
          <article className="impact-card">
            <strong className="impact-number">252</strong><i />
            <h3>Aulas claras<br />e aplicáveis</h3>
            <p>Aulas estruturadas, testadas em sala de aula e prontas para ensinar, criar e focar em aprendizagem ativa e significativa.</p>
          </article>
          <article className="impact-card">
            <strong className="impact-number">3º–9º</strong><i />
            <h3>Uma jornada<br />sem recomeços</h3>
            <p>Uma sequência lógica e contínua que acompanha o estudante em toda a sua jornada no Ensino Fundamental.</p>
          </article>
        </div>
      </section>

      <section className="solutions-section public-section" id="solucoes">
        <div className="section-heading heading-row solutions-heading">
          <div><span className="section-kicker">SOLUÇÕES PARA ESCOLAS</span><h2>Dois caminhos. A mesma <em>qualidade pedagógica.</em></h2></div>
          <div className="solutions-heading-actions"><p>A proposta é desenhada para a realidade de cada instituição, com estrutura curricular, recursos, formação e acompanhamento da equipe.</p><a className="solutions-contact-button" href="https://wa.me/5521999073193?text=Olá!%20Quero%20conversar%20sobre%20uma%20solução%20da%20TIER%20para%20a%20minha%20escola." target="_blank" rel="noreferrer"><MessageCircle /> Falar com a TIER no WhatsApp <ArrowRight /></a></div>
        </div>
        <div className="solutions-grid">
          <article className="solution-card curricular-card">
            <span><School /></span><small>TIER NA GRADE</small><h3>Curricular</h3>
            <p>Educação tecnológica integrada à rotina escolar, com progressão por série, planos de aula, recursos definidos e acompanhamento da aplicação.</p>
            <ul><li><CheckCircle2 /> Sequência anual evolutiva</li><li><CheckCircle2 /> Professores treinados e apoiados</li><li><CheckCircle2 /> Hub pedagógico e evidências</li></ul>
            <a className="solution-card-cta" href="https://wa.me/5521999073193?text=Olá!%20Quero%20conversar%20sobre%20a%20solução%20curricular%20da%20TIER%20para%20a%20minha%20escola." target="_blank" rel="noreferrer">Conhecer a solução <ArrowRight /></a>
          </article>
          <article className="solution-card extra-card">
            <span><Sparkles /></span><small>TIER ALÉM DA GRADE</small><h3>Extracurricular</h3>
            <p>Cursos, oficinas, cultura maker e experiências de competição no contraturno, adaptados ao espaço, ao público e aos objetivos da escola.</p>
            <ul><li><CheckCircle2 /> Trilhas e oficinas temáticas</li><li><CheckCircle2 /> Projetos autorais e mostras</li><li><CheckCircle2 /> Mentoria para equipes</li></ul>
            <a className="solution-card-cta" href="https://wa.me/5521999073193?text=Olá!%20Quero%20conversar%20sobre%20a%20solução%20extracurricular%20da%20TIER%20para%20a%20minha%20escola." target="_blank" rel="noreferrer">Conhecer a solução <ArrowRight /></a>
          </article>
        </div>
        <div className="process-showcase" aria-label="Da conversa à sala de aula">
          <div className="process-card-stage">
            <div className="process-card-stack">
              {processSteps.map((step, index) => <article className={`process-composition-card ${activeProcess === index ? "active" : ""}`} key={step.label} aria-hidden={activeProcess !== index}>
                <span>{String(index + 1).padStart(2, "0")} / 04</span><strong>{String(index + 1).padStart(2, "0")}</strong>
                <div><small>{step.label}</small><h3>{step.title}<em> {step.accent}</em></h3><p>{step.description}</p><a href="https://wa.me/5521999073193?text=Olá!%20Quero%20conversar%20sobre%20uma%20solução%20da%20TIER%20para%20a%20minha%20escola." target="_blank" rel="noreferrer"><MessageCircle /> Falar sobre esta etapa <ArrowRight /></a></div>
              </article>)}
            </div>
          </div>
          <div className="process-explainer"><span className="section-kicker">DA CONVERSA À SALA DE AULA</span><h3>Uma parceria que acompanha <em>cada passo.</em></h3><p>Escolha uma etapa para ver como a TIER transforma intenção pedagógica em uma experiência concreta na escola.</p><div className="process-step-list">{processSteps.map((step, index) => <button className={activeProcess === index ? "active" : undefined} type="button" key={step.label} onClick={() => setActiveProcess(index)} aria-pressed={activeProcess === index}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step.title} {step.accent}</strong><small>{step.note}</small></div><ArrowRight /></button>)}</div></div>
        </div>
      </section>

      <section className="method-section public-section" id="metodologia">
        <div className="section-heading">
          <span className="section-kicker">NOSSO JEITO DE ENSINAR</span>
          <h2>A escola não precisa escolher entre tecnologia e <em>currículo.</em></h2>
          <p>A TIER transforma tecnologia em experiência pedagógica: cada encontro começa com um objetivo claro, passa pela criação prática e termina com evidências para o professor.</p>
        </div>
        <div className="method-grid">
          <article><span><Compass /></span><small>01</small><h3>Currículo com direção</h3><p>Sequências organizadas por série, com progressão real de habilidades e conexão com o cotidiano escolar.</p></article>
          <article><span><Wrench /></span><small>02</small><h3>Mão na massa de verdade</h3><p>Estudantes constroem, programam, testam, explicam escolhas e melhoram suas próprias soluções.</p></article>
          <article><span><MessageSquareText /></span><small>03</small><h3>Professor acompanhado</h3><p>Planos claros, materiais indicados, desafios e feedbacks tornam a aplicação mais segura e consistente.</p></article>
        </div>
        <div className="method-story">
          <figure className="story-photo story-main"><img src="/tier-home/mentor-robot.jpg" alt="Educador TIER orientando uma atividade prática de robótica" /></figure>
          <figure className="story-photo story-small"><img src="/tier-home/tablet-coding.jpg" alt="Estudante programando em um tablet durante uma aula" /></figure>
          <div className="story-card"><Lightbulb /><strong>Experimentar também é aprender.</strong><p>O erro vira teste. O teste vira melhoria. A melhoria vira autoria.</p></div>
        </div>
      </section>

      <section className="journey-section" id="jornada">
        <div className="public-section">
          <div className="section-heading section-heading-light">
            <span className="section-kicker">UMA JORNADA QUE EVOLUI</span>
            <h2>Do primeiro comando ao <em>projeto autoral.</em></h2>
            <p>O estudante não começa do zero a cada ano. A complexidade cresce junto com sua autonomia, repertório e capacidade de trabalhar em equipe.</p>
          </div>
          <div className="journey-track tier-track">
            <article><div className="journey-number">START</div><span><Blocks /></span><small>FUNDAMENTAL I</small><h3>Construir para compreender</h3><p>Do 3º ao 5º ano: programação visual, mecanismos, sensores, criatividade e colaboração em experiências concretas.</p><b>Descobrir · construir · explicar</b></article>
            <article><div className="journey-number">NEXT</div><span><CircuitBoard /></span><small>FUNDAMENTAL II</small><h3>Projetar, programar e criar</h3><p>Do 6º ao 9º ano: robótica avançada, computação física, mundos digitais e projetos orientados por evidências.</p><b>Investigar · integrar · validar</b></article>
            <article><div className="journey-number">HIGH</div><span><Rocket /></span><small>ENSINO MÉDIO</small><h3>Tecnologia aplicada a desafios reais</h3><p>Programação textual, prototipagem, engenharia e projetos avançados conectados à formação acadêmica e profissional.</p><b>Aplicar · desenvolver · impactar</b></article>
          </div>
          <div className="tools-row" aria-label="Tecnologias utilizadas">
            <span>LEGO Education</span><span>Scratch + ScratchJr</span><span>Minecraft Education</span><span>micro:bit</span><span>VEXcode VR</span><span>Python</span><span>Tinkercad</span><span>Makey Makey</span><span>Botley 2.0</span><span>Tablets</span>
          </div>
          <p className="brands-note">Tecnologias selecionadas conforme a etapa da jornada. Marcas citadas como recursos utilizados, sem indicação de parceria comercial.</p>
        </div>
      </section>

      <section className="experience-section public-section" id="experiencias">
        <div className="section-heading heading-row">
          <div><span className="section-kicker">TIER EM MOVIMENTO</span><h2>Aprendizagem que dá para <em>ver.</em></h2></div>
          <p>Concentração, colaboração, tentativa, descoberta e orgulho pelo que foi construído. É assim que a tecnologia ganha sentido na escola.</p>
        </div>
        <div className="photo-grid">
          <figure className="photo-tall"><img src="/tier-home/robot-arena.jpg" alt="Estudante testando um robô em uma arena" /><figcaption><span>Testar</span><strong>Ideias ganham movimento</strong></figcaption></figure>
          <figure><img src="/tier-home/maker-lab.jpg" alt="Educador apresentando impressão 3D a estudantes" /><figcaption><span>Explorar</span><strong>Tecnologia de perto</strong></figcaption></figure>
          <figure><img src="/tier-home/coding-class.jpg" alt="Estudantes programando em uma aula TIER" /><figcaption><span>Programar</span><strong>Raciocínio em ação</strong></figcaption></figure>
          <figure className="photo-wide"><img src="/tier-home/class-team.jpg" alt="Turma e educadores TIER reunidos após uma experiência de robótica" /><figcaption><span>Compartilhar</span><strong>Conquistas que são de todos</strong></figcaption></figure>
          <figure><img src="/tier-home/community-maker.jpg" alt="Educador TIER conduzindo uma experiência maker com a comunidade escolar" /><figcaption><span>Conectar</span><strong>Escola e comunidade</strong></figcaption></figure>
        </div>
      </section>

      <section className="competition-section" id="resultados">
        <div className="public-section">
          <div className="competition-heading">
            <div><span className="section-kicker">TIER COMPETITION</span><h2>Da sala de aula <em>para o mundo.</em></h2></div>
            <p>Mentoria, engenharia, estratégia e trabalho em equipe transformam conhecimento em experiências competitivas que ampliam horizontes.</p>
          </div>
          <div className="competition-grid">
            <article>
              <img src="/tier-home/tech-fenix-team.jpg" alt="Equipe Tech Fênix representando São Gonçalo em uma competição internacional de robótica" />
              <div><small>FIRST TECH CHALLENGE · CHICAGO</small><h3>Tech Fênix #23055</h3><p>Uma equipe de São Gonçalo levando projeto, estratégia e colaboração a uma experiência internacional nos Estados Unidos.</p><span><Users /> Engenharia feita em equipe</span></div>
            </article>
            <article>
              <img src="/tier-home/webot-award.jpg" alt="Equipe WeBOT recebendo o International Team Robot Design Award no Reino Unido" />
              <div><small>FIRST LEGO LEAGUE · REINO UNIDO · 2026</small><h3>WeBOT — Robot Design</h3><p>A equipe do Colégio Odete São Paio conquistou o 1º lugar internacional em Robot Design, com apoio e mentoria da TIER Education.</p><a href="https://www.crea-rj.org.br/alunos-de-sao-goncalo-conquistam-1o-lugar-na-first-lego-league-2026-competicao-internacional-de-robotica-realizada-em-londres/" target="_blank" rel="noreferrer">Ver conquista na imprensa <ArrowRight /></a></div>
            </article>
          </div>
          <div className="competition-proof"><Trophy /><p><strong>Competição também é aprendizagem.</strong><span>Planejar, testar, documentar, apresentar e aprender com outros times faz parte da formação.</span></p></div>
        </div>
      </section>

      <section className="teacher-section public-section">
        <div className="teacher-photo"><img src="/tier-home/student-builder.jpg" alt="Estudante montando um projeto de robótica" /><span><Bot /><strong>Criar é uma forma de compreender.</strong></span></div>
        <div className="teacher-copy">
          <span className="section-kicker">POR TRÁS DE CADA BOA AULA</span>
          <h2>Um professor que sabe o que fazer — e por quê.</h2>
          <p>O Hub Pedagógico TIER organiza tudo o que o profissional precisa para conduzir a experiência com clareza.</p>
          <ul>
            <li><CheckCircle2 /> Plano de aula explicado passo a passo</li>
            <li><CheckCircle2 /> Materiais e montagens específicas</li>
            <li><CheckCircle2 /> Desafios, evidências e critérios de avaliação</li>
            <li><CheckCircle2 /> Feedback da aplicação para melhorar o currículo</li>
          </ul>
          <a className="dark-cta" href="#contato">Levar a TIER para a sua escola <ArrowRight /></a>
        </div>
      </section>

      <section className="history-section public-section" id="historia">
        <div className="history-copy"><span className="section-kicker">NOSSA HISTÓRIA</span><h2>Tudo começou com <em>três estudantes.</em></h2><p>Em 2018, três jovens apaixonados por robótica perceberam que tecnologia poderia ser ensinada de forma mais estruturada, conectada e transformadora. A experiência virou propósito — e o propósito, uma jornada educacional para escolas.</p></div>
        <div className="history-timeline">
          <article><strong>2018</strong><span>O começo</span><p>Robótica, curiosidade e vontade de compartilhar conhecimento.</p></article>
          <article><strong>COMPETIÇÕES</strong><span>Aprendizado na prática</span><p>Engenharia, estratégia e colaboração em desafios reais.</p></article>
          <article><strong>EDUCAÇÃO</strong><span>Chegada às escolas</span><p>Currículo, formação e experiências conectadas à rotina escolar.</p></article>
          <article><strong>HOJE</strong><span>Uma jornada completa</span><p>Do Fundamental I ao Ensino Médio, dentro e além da grade.</p></article>
        </div>
      </section>

      <section className="school-cta" id="contato">
        <img src="/tier-home/class-team.jpg" alt="Turma e equipe TIER em uma experiência de robótica" />
        <div className="school-cta-overlay" />
        <div className="school-cta-copy"><span><School /> VAMOS CONVERSAR SOBRE A SUA ESCOLA</span><h2>O futuro não é uma disciplina. É uma forma de aprender.</h2><p>Conheça as soluções da TIER e vamos desenhar um caminho que faça sentido para a realidade da sua escola.</p><div><a href="#solucoes">Conhecer as soluções <ArrowRight /></a></div></div>
      </section>

      <footer className="public-footer">
        <div><img src="/tier-logo-white.png" alt="TIER Education" /><p>Robótica, programação e cultura maker conectadas à aprendizagem.</p></div>
        <nav aria-label="Links do rodapé"><a href="#solucoes">Soluções</a><a href="#metodologia">Metodologia</a><a href="#jornada">Jornada</a><a href="#resultados">Resultados</a><a href="#contato">Contato</a></nav>
        <small>© 2026 TIER Education. Educação que constrói futuros.</small>
      </footer>
    </main>
  );
}
