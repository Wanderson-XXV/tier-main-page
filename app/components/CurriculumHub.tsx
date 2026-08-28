"use client";

import { createContext, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, ChevronRight, ClipboardCheck,
  Clock3, Download, ExternalLink, FileText, FolderOpen, GraduationCap, Home,
  LogOut, Menu, MessageSquareText, PackageCheck, Search, Send, Sparkles, Star, Tablet, Wrench, X,
} from "lucide-react";
import type { CurriculumModule, GradeCurriculum, Lesson } from "../data/curriculum";

type View = "home" | "grade" | "module" | "lesson" | "feedbacks";
type Tab = "plan" | "resources" | "feedback";
type FeedbackRow = Record<string,string|number>;
const toneClass=(color:string)=>`tone-${color}`;
type GradeSummary=Pick<GradeCurriculum,"id"|"label"|"level"|"levelLabel"|"status"|"description"|"lessons"|"progression">&{modules:number};
type CurriculumData={curricula:GradeCurriculum[];grades:GradeSummary[];allLessons:Lesson[];getCurriculum:(id:string)=>GradeCurriculum};
const CurriculumDataContext=createContext<CurriculumData|null>(null);

function useCurriculumData(){
  const value=useContext(CurriculumDataContext);
  if(!value)throw new Error("Currículo protegido indisponível.");
  return value;
}

export default function CurriculumHub({curricula,userName="Profissional TIER",userEmail=""}:{curricula:GradeCurriculum[];userName?:string;userEmail?:string}) {
  const value=useMemo<CurriculumData>(()=>{
    const grades=curricula.map(({id,label,level,levelLabel,status,description,modules,lessons,progression})=>({id,label,level,levelLabel,status,description,modules:modules.length,lessons,progression}));
    const allLessons=curricula.flatMap(grade=>grade.modules.flatMap(module=>module.lessons));
    const getCurriculum=(id:string)=>curricula.find(grade=>grade.id===id)||curricula[0];
    return {curricula,grades,allLessons,getCurriculum};
  },[curricula]);
  return <CurriculumDataContext.Provider value={value}><CurriculumHubShell userName={userName} userEmail={userEmail}/></CurriculumDataContext.Provider>;
}

function CurriculumHubShell({userName,userEmail}:{userName:string;userEmail:string}) {
  const {allLessons,getCurriculum}=useCurriculumData();
  const initialCurriculum=getCurriculum("3");
  const [view,setView]=useState<View>("home");
  const [selectedGrade,setSelectedGrade]=useState("3");
  const [selectedModule,setSelectedModule]=useState<CurriculumModule>(initialCurriculum.modules[0]);
  const [selectedLesson,setSelectedLesson]=useState<Lesson>(initialCurriculum.modules[0].lessons[0]);
  const [tab,setTab]=useState<Tab>("plan");
  const [query,setQuery]=useState("");
  const [menuOpen,setMenuOpen]=useState(false);
  const initials=userName.split(" ").filter(Boolean).slice(0,2).map(v=>v[0]).join("").toUpperCase()||"TP";
  const selectedCurriculum=getCurriculum(selectedGrade);
  const navigate=(next:View)=>{setView(next);setMenuOpen(false);window.scrollTo({top:0,behavior:"smooth"});};
  const openGrade=(id:string)=>{const curriculum=getCurriculum(id);setSelectedGrade(curriculum.id);setSelectedModule(curriculum.modules[0]);navigate("grade");};
  const openModule=(module:CurriculumModule)=>{setSelectedGrade(module.gradeId);setSelectedModule(module);navigate("module");};
  const openLesson=(lesson:Lesson,nextTab:Tab="plan")=>{const curriculum=getCurriculum(lesson.gradeId);setSelectedGrade(lesson.gradeId);setSelectedModule(curriculum.modules[lesson.moduleId-1]);setSelectedLesson(lesson);setTab(nextTab);navigate("lesson");};
  const results=useMemo(()=>query.trim().length>1?allLessons.filter(l=>`${l.gradeLabel} ${l.title} ${l.focus} ${l.tool}`.toLowerCase().includes(query.toLowerCase())).slice(0,8):[],[query]);

  return <main className="hub-shell">
    <aside className={`hub-sidebar ${menuOpen?"open":""}`}>
      <button className="mobile-close" aria-label="Fechar menu" onClick={()=>setMenuOpen(false)}><X/></button>
      <a className="hub-logo-link" href="/" aria-label="Voltar ao site TIER"><img className="hub-logo" src="/tier-logo-white.png" alt="TIER Education" /></a>
      <nav aria-label="Navegação principal">
        <NavButton active={view==="home"} icon={<Home/>} label="Visão geral" onClick={()=>navigate("home")}/>
        <NavButton active={["grade","module","lesson"].includes(view)&&selectedCurriculum.level==="fund1"} icon={<BookOpen/>} label="Fundamental I" onClick={()=>openGrade("3")}/>
        <NavButton active={["grade","module","lesson"].includes(view)&&selectedCurriculum.level==="fund2"} icon={<GraduationCap/>} label="Fundamental II" onClick={()=>openGrade("6")}/>
        <NavButton active={view==="feedbacks"} icon={<MessageSquareText/>} label="Feedbacks das aulas" onClick={()=>navigate("feedbacks")}/>
      </nav>
      <div className="sidebar-note"><Sparkles/><div><strong>Currículo vivo</strong><span>Os registros docentes orientam as próximas versões.</span></div></div>
      <form className="hub-profile" action="/api/auth/logout" method="post"><span>{initials}</span><div><strong>{userName}</strong><small>{userEmail||"Profissional TIER"}</small></div><button type="submit" aria-label="Sair do Hub" title="Sair do Hub"><LogOut /></button></form>
    </aside>
    {menuOpen&&<button className="hub-overlay" aria-label="Fechar menu" onClick={()=>setMenuOpen(false)}/>}
    <section className="hub-main">
      <header className="hub-topbar">
        <button className="menu-trigger" aria-label="Abrir menu" onClick={()=>setMenuOpen(true)}><Menu/></button>
        <div><span className="hub-kicker">TIER HUB PEDAGÓGICO</span><strong>{view==="feedbacks"?"Acompanhamento das aulas":view==="home"?"Currículos Fundamental I e II":`Currículo ${selectedCurriculum.levelLabel}`}</strong></div>
        <div className="search-wrap">
          <label className="hub-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} aria-label="Buscar aula" placeholder="Buscar aula, conceito ou ferramenta" /></label>
          {results.length>0&&<div className="search-results">{results.map(l=><button key={l.id} onClick={()=>{setQuery("");openLesson(l)}}><span>{l.gradeLabel} · {String(l.number).padStart(2,"0")}</span><div><strong>{l.title}</strong><small>{l.tool}</small></div><ChevronRight/></button>)}</div>}
        </div>
      </header>
      <div className="hub-content">
        {view==="home"&&<HomeView openGrade={openGrade} openModule={openModule} openLesson={openLesson}/>} 
        {view==="grade"&&<GradeView gradeId={selectedGrade} openGrade={openGrade} openModule={openModule}/>} 
        {view==="module"&&<ModuleView module={selectedModule} back={()=>navigate("grade")} openLesson={openLesson}/>} 
        {view==="lesson"&&<LessonView lesson={selectedLesson} module={selectedModule} tab={tab} setTab={setTab} back={()=>navigate("module")} userName={userName} userEmail={userEmail}/>} 
        {view==="feedbacks"&&<FeedbackDashboard openLesson={openLesson}/>} 
      </div>
    </section>
  </main>;
}

function NavButton({active,icon,label,onClick}:{active:boolean;icon:ReactNode;label:string;onClick:()=>void}){return <button className={active?"active":""} onClick={onClick}>{icon}<span>{label}</span></button>}

function HomeView({openGrade,openModule,openLesson}:{openGrade:(id:string)=>void;openModule:(m:CurriculumModule)=>void;openLesson:(l:Lesson)=>void}){
  const {allLessons,getCurriculum,grades}=useCurriculumData();
  const grade3=getCurriculum("3");
  const fund1Grades=grades.filter(grade=>grade.level==="fund1");
  const fund2Grades=grades.filter(grade=>grade.level==="fund2");
  const totalModules=grades.reduce((sum,grade)=>sum+grade.modules,0);
  return <>
    <section className="hub-hero"><div><span className="hub-kicker light">CURRÍCULO EM MOVIMENTO</span><h1>Um lugar para preparar, aplicar e melhorar cada aula.</h1><p>Acesse planos, montagens específicas, mundos digitais e registros pedagógicos em uma sequência clara para toda a equipe TIER.</p><button onClick={()=>openLesson(grade3.modules[0].lessons[0])}>Começar pela aula 01 <ArrowRight/></button></div><div className="brain-grid" aria-hidden="true">{Array.from({length:30}).map((_,i)=><i key={i}/>)}</div></section>
    <section className="quick-stats"><article><BookOpen/><div><strong>{allLessons.length}</strong><span>aulas estruturadas</span></div></article><article><FolderOpen/><div><strong>{totalModules}</strong><span>módulos progressivos</span></div></article><article><ClipboardCheck/><div><strong>{grades.length}</strong><span>currículos ativos</span></div></article><article><MessageSquareText/><div><strong>Contínuo</strong><span>ciclo de feedback</span></div></article></section>
    <SectionHeader kicker="FUNDAMENTAL I" title="Escolha a série" text="Cada ano possui seus próprios módulos, aulas, materiais e histórico de aplicação."/>
    <GradeCards gradesList={fund1Grades} openGrade={openGrade}/>
    <SectionHeader kicker="FUNDAMENTAL II" title="Robótica, programação e tecnologia" text="Do 6º ao 9º ano, grupos de 3–4 estudantes avançam por Scratch, SPIKE Prime, VEXcode VR digital, micro:bit e Minecraft Education."/>
    <GradeCards gradesList={fund2Grades} openGrade={openGrade}/>
    <SectionHeader kicker="3º ANO" title="Módulos do ano" text="Uma progressão simples: compreender sequências, construir movimentos, programar respostas e criar uma solução."/>
    <ModuleGrid modules={grade3.modules} openModule={openModule}/>
  </>;
}

function GradeCards({gradesList,openGrade}:{gradesList:GradeSummary[];openGrade:(id:string)=>void}){
  const colors:Record<string,string>={"3":"orange","4":"purple","5":"red","6":"blue","7":"teal","8":"indigo","9":"gold"};
  return <div className={`grade-grid ${gradesList[0]?.level||""}`}>{gradesList.map(grade=><button key={grade.id} className={`grade-card ${colors[grade.id]||"orange"}`} onClick={()=>openGrade(grade.id)}><span className="grade-icon"><GraduationCap/></span><div><small>ENSINO {grade.levelLabel.toUpperCase()}</small><h3>{grade.label}</h3><p>{grade.description}</p></div><span className={`grade-status ${grade.status}`}><CheckCircle2/> Currículo ativo</span><ArrowRight className="grade-arrow"/></button>)}</div>;
}

function GradeView({gradeId,openGrade,openModule}:{gradeId:string;openGrade:(id:string)=>void;openModule:(m:CurriculumModule)=>void}){
  const {getCurriculum,grades}=useCurriculumData();
  const grade=grades.find(g=>g.id===gradeId)||grades[0];
  const curriculum=getCurriculum(grade.id);
  const peerGrades=grades.filter(item=>item.level===grade.level);
  return <>
    <Breadcrumb items={[grade.levelLabel,grade.label]}/>
    <div className="grade-switcher">{peerGrades.map(g=><button key={g.id} className={g.id===grade.id?"active":""} onClick={()=>openGrade(g.id)}>{g.label}</button>)}</div>
    <section className={`grade-banner grade-${grade.id}`}><div><span className="hub-kicker light">ENSINO {grade.levelLabel.toUpperCase()}</span><h1>{grade.label}</h1><p>{grade.description}</p></div><div><strong>{grade.modules}</strong><span>módulos</span><strong>{grade.lessons}</strong><span>aulas curriculares</span></div></section>
    <section className="module-intro"><div><strong>Progressão do ano</strong><p>{grade.progression}</p></div><div><strong>Recursos principais</strong><p>{resourcesForGrade(grade.id)}</p></div></section>
    <SectionHeader kicker="PROGRESSÃO ANUAL" title="Módulos e aulas" text="Abra um módulo para consultar a sequência, o plano, a montagem específica e o feedback de cada encontro."/><ModuleGrid modules={curriculum.modules} openModule={openModule}/>
  </>;
}

function ModuleGrid({modules,openModule}:{modules:CurriculumModule[];openModule:(m:CurriculumModule)=>void}){return <div className="module-grid">{modules.map(module=><article key={`${module.gradeId}-${module.id}`} className="module-card"><span className={`module-number ${toneClass(module.color)}`}>0{module.id}</span><div className="module-copy"><small>MÓDULO 0{module.id}</small><h3>{module.title}</h3><p>{module.description}</p></div><div className="module-meta"><span><Clock3/>{module.lessons.length} aulas</span><span>{module.question}</span></div><div className="module-progress"><i style={{width:"0%"}}/></div><button onClick={()=>openModule(module)}>Abrir módulo <ArrowRight/></button></article>)}</div>}

function ModuleView({module,back,openLesson}:{module:CurriculumModule;back:()=>void;openLesson:(l:Lesson,t?:Tab)=>void}){
  const {getCurriculum}=useCurriculumData();
  const grade=getCurriculum(module.gradeId);
  return <>
    <button className="back-button" onClick={back}><ArrowLeft/> Voltar para o {grade.label}</button>
    <section className={`module-banner ${toneClass(module.color)}`}><span>0{module.id}</span><div><small>MÓDULO 0{module.id} · 9 AULAS</small><h1>{module.title}</h1><p>{module.question}</p></div></section>
    <div className="module-intro"><div><strong>Sobre este módulo</strong><p>{module.description}</p></div><div><strong>Produto da unidade</strong><p>{module.product}</p></div></div>
    <SectionHeader kicker="SEQUÊNCIA DE AULAS" title="Encontros do módulo" text="Cada aula contém plano, recursos, desafio TIER e registro de feedback."/>
    <div className="lesson-list">{module.lessons.map(lesson=><article key={lesson.id}><span className={`lesson-order ${toneClass(module.color)}`}>{String(lesson.number).padStart(2,"0")}</span><div className="lesson-summary"><small>AULA {String(lesson.number).padStart(2,"0")} · {lesson.tool.toUpperCase()}</small><h3>{lesson.title}</h3><p>{lesson.focus}</p><div><span><FileText/> Plano de aula</span><span className={lesson.resources?.length?"":"muted"}><Wrench/> {lesson.resources?.some(r=>r.kind==="manual")?"Manual PDF específico":lesson.resources?.length?"Recurso oficial específico":"Sem recurso externo"}</span><span><MessageSquareText/> Feedback</span></div></div><div className="lesson-actions"><button onClick={()=>openLesson(lesson,"plan")}><span className="lesson-tool-emoji" aria-hidden="true">{toolEmoji(lesson.tool)}</span>Abrir aula <ArrowRight/></button><button onClick={()=>openLesson(lesson,"feedback")}>Registrar aplicação</button></div></article>)}</div>
  </>;
}

function LessonView({lesson,module,tab,setTab,back,userName,userEmail}:{lesson:Lesson;module:CurriculumModule;tab:Tab;setTab:(t:Tab)=>void;back:()=>void;userName:string;userEmail:string}){
  return <>
    <button className="back-button" onClick={back}><ArrowLeft/> Voltar ao módulo 0{module.id}</button>
    <section className="lesson-head"><div><span className={`lesson-order large ${toneClass(module.color)}`}>{String(lesson.number).padStart(2,"0")}</span><div><small>MÓDULO 0{module.id} · AULA {String(lesson.number).padStart(2,"0")}</small><h1>{lesson.title}</h1><p>{lesson.focus}</p></div></div><div className="lesson-head-meta"><span><Clock3/>50 minutos</span><span><b className="head-tool-emoji" aria-hidden="true">{toolEmoji(lesson.tool)}</b>{lesson.tool}</span></div></section>
    <div className="lesson-tabs" role="tablist"><button className={tab==="plan"?"active":""} onClick={()=>setTab("plan")}><FileText/>Plano de aula</button><button className={tab==="resources"?"active":""} onClick={()=>setTab("resources")}><PackageCheck/>Materiais e montagem</button><button className={tab==="feedback"?"active":""} onClick={()=>setTab("feedback")}><MessageSquareText/>Feedback da aplicação</button></div>
    {tab==="plan"&&<PlanTab lesson={lesson}/>} {tab==="resources"&&<ResourcesTab lesson={lesson}/>} {tab==="feedback"&&<FeedbackForm lesson={lesson} userName={userName} userEmail={userEmail}/>} 
  </>;
}

function PlanTab({lesson}:{lesson:Lesson}){
  const fund2=Number(lesson.gradeId)>=6;
  const group=fund2?"grupo":"dupla";
  const organization=fund2?"Grupos de 3–4 com papéis rotativos":"Duplas com papéis alternados";
  return <div className="lesson-layout"><section className="lesson-document">
    <div className="document-title"><span>PLANO DE AULA TIER</span><h2>{lesson.title}</h2><p>{lesson.gradeLabel} · Aula {String(lesson.number).padStart(2,"0")} · 50 minutos · {fund2?"grupos de 3–4":"duplas"}</p></div>
    <div className="lesson-outcome"><CheckCircle2/><div><strong>Resultado esperado ao final</strong><p>O {group} deverá concluir a atividade “{lesson.activity}” e apresentar como evidência: {lesson.evidence.toLowerCase()}.</p></div></div>
    <h3>Objetivos da aula</h3><ul>{lesson.objectives.map(o=><li key={o}>{o}</li>)}</ul>
    <h3>Antes da aula</h3><div className="teacher-prep-list">{lesson.preparation.map((item,index)=><article key={item}><span>{index+1}</span><p>{item}</p></article>)}</div>
    <h3>Materiais desta aula</h3><div className="plan-materials">{lesson.materials.map(item=><span key={item}><PackageCheck/>{item}</span>)}</div>
    <div className="plan-highlight"><strong>Atividade-base</strong><p>{lesson.activity}.</p></div>
    <h3>Passo a passo da aplicação</h3><p className="steps-intro">Siga a sequência abaixo. As falas sugeridas podem ser adaptadas, mas preserve o tempo de criação, o desafio e o registro final.</p>
    <div className="teacher-steps">{lesson.steps.map((step,index)=><article key={step.time}><div className="step-marker"><span>{index+1}</span><small>{step.time}</small></div><div className="step-content"><h4>{step.title}</h4><div><section><strong>Professor</strong><p>{step.teacher}</p></section><section><strong>Alunos</strong><p>{step.students}</p></section></div></div></article>)}</div>
    <div className="challenge-box"><Sparkles/><div><strong>Desafio TIER</strong><p>{lesson.challenge}.</p></div></div>
    <h3>Como avaliar nesta aula</h3><p>Procure por esta evidência: <strong>{lesson.evidence}</strong>. Observe se o estudante consegue relacionar sua ação ao resultado, explicar uma escolha e descrever uma melhoria realizada.</p>
  </section><aside className="lesson-aside"><ResourceMini icon={<span className="aside-emoji">{toolEmoji(lesson.tool)}</span>} label="Ferramenta principal" text={lesson.tool}/><ResourceMini icon={<ClipboardCheck/>} label="Avaliação formativa" text={lesson.evidence}/><ResourceMini icon={<CalendarDays/>} label="Organização" text={organization}/><ResourceMini icon={<PackageCheck/>} label="Materiais" text={`${lesson.materials.length} itens para conferir`}/>{lesson.gradeId==="3"&&<a className="download-card" href="/recursos/Plano_Curricular_TIER_3_Ano.docx" download><Download/><div><strong>Baixar plano anual</strong><span>Documento Word completo</span></div></a>}</aside></div>
}

function ResourcesTab({lesson}:{lesson:Lesson}){
  const resources=lesson.resources||[];
  const hasManual=resources.some(resource=>resource.kind==="manual");
  return <div className="resources-layout"><section><div className="resources-head"><span><PackageCheck/></span><div><small>CHECKLIST DA AULA</small><h2>Materiais necessários</h2><p>Confira antes da turma chegar.</p></div></div><div className="check-list">{lesson.materials.map(item=><label key={item}><input type="checkbox"/><span><Check/>{item}</span></label>)}</div>{resources.length>0&&<div className="official-note"><Star/><div><strong>Recurso oficial já selecionado</strong><p>Os links abaixo abrem exatamente a atividade, o mundo ou o manual usado nesta aula.</p></div></div>}</section><aside className="manual-card"><span className={resources.length?"available":"none"}>{lesson.construction?<Wrench/>:<Tablet/>}</span><small>{lesson.construction?"MONTAGEM ESPECÍFICA":"RECURSO DA ATIVIDADE"}</small><h2>{lesson.construction?(hasManual?"Manual PDF e aula oficial desta construção":"Atividade oficial com a construção desta aula"):resources.length?"Acesso direto ao recurso oficial":"Esta aula não exige recurso externo"}</h2><p>{lesson.construction?(hasManual?"Abra o plano oficial para preparar a mediação e use o PDF para acompanhar o passo a passo visual.":"A página oficial específica reúne a proposta, os exemplos de construção e as orientações de programação."):resources.length?"O acesso já está vinculado à proposta curricular desta aula.":"Utilize o plano de aula e os materiais indicados no checklist."}</p>{lesson.construction&&<ol><li>Teste previamente o pareamento do hub.</li><li>Abra o recurso específico abaixo.</li><li>Mostre apenas as etapas necessárias para a turma.</li><li>Finalize com o desafio TIER da aula.</li></ol>}<div className="resource-links">{resources.map(resource=><a key={`${resource.kind}-${resource.url}`} href={resource.url} target="_blank" rel="noreferrer"><span>{resource.kind==="manual"?<Download/>:<ExternalLink/>}</span><div><small>{resource.source} · {resource.kind==="manual"?"MANUAL PDF":resource.kind==="world"?"MUNDO/ATIVIDADE":resource.kind==="guide"?"GUIA":"PLANO OFICIAL"}</small><strong>{resource.title}</strong><p>{resource.description}</p></div><ArrowRight/></a>)}</div>{resources.length===0&&<div className="future-upload"><FolderOpen/><span><strong>Sem link adicional</strong>Todo o necessário está descrito no plano de aula.</span></div>}</aside></div>
}

function FeedbackForm({lesson,userName,userEmail}:{lesson:Lesson;userName:string;userEmail:string}){
  const [sent,setSent]=useState(false),[saving,setSaving]=useState(false),[error,setError]=useState("");
  const [form,setForm]=useState({className:"",taughtAt:new Date().toISOString().slice(0,10),completion:4,engagement:4,timing:"adequado",notes:"",strengths:"",challenges:"",adjustments:"",nextSteps:""});
  const update=(key:string,value:string|number)=>setForm(current=>({...current,[key]:value}));
  const submit=async(event:FormEvent)=>{event.preventDefault();setSaving(true);setError("");try{const response=await fetch("/api/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,lessonId:lesson.id,grade:lesson.gradeLabel,moduleId:lesson.moduleId,teacherName:userName,teacherEmail:userEmail})});const data=await response.json() as {error?:string};if(!response.ok)throw new Error(data.error||"Falha ao salvar.");setSent(true);}catch(e){setError(e instanceof Error?e.message:"Não foi possível salvar.");}finally{setSaving(false)}};
  if(sent)return <section className="feedback-success"><span><CheckCircle2/></span><h2>Feedback registrado</h2><p>Obrigado. Esse relato passa a compor o histórico da aula e ajudará a TIER a identificar ajustes no currículo.</p><button onClick={()=>setSent(false)}>Registrar outra turma</button></section>;
  return <form className="feedback-form" onSubmit={submit}><header><span><MessageSquareText/></span><div><small>CICLO DE MELHORIA TIER</small><h2>Como foi a aplicação desta aula?</h2><p>Registre fatos observáveis. Evite identificar alunos pelo nome.</p></div></header><div className="feedback-grid"><Field label="Turma" required><input value={form.className} onChange={e=>update("className",e.target.value)} placeholder={`Ex.: ${lesson.gradeLabel} A`} required/></Field><Field label="Data da aplicação" required><input type="date" value={form.taughtAt} onChange={e=>update("taughtAt",e.target.value)} required/></Field></div><div className="rating-grid"><Rating label="Objetivos alcançados" value={form.completion} onChange={v=>update("completion",v)}/><Rating label="Engajamento da turma" value={form.engagement} onChange={v=>update("engagement",v)}/></div><Field label="O tempo planejado foi suficiente?"><select value={form.timing} onChange={e=>update("timing",e.target.value)}><option value="curto">Faltou tempo</option><option value="adequado">Tempo adequado</option><option value="longo">Sobrou tempo</option></select></Field><Field label="Relato geral" required hint="Descreva o que aconteceu, com dados e exemplos observáveis."><textarea rows={5} value={form.notes} onChange={e=>update("notes",e.target.value)} placeholder="Como a turma respondeu à proposta?" required/></Field><div className="feedback-grid"><Field label="O que funcionou bem"><textarea rows={4} value={form.strengths} onChange={e=>update("strengths",e.target.value)} /></Field><Field label="Principais dificuldades"><textarea rows={4} value={form.challenges} onChange={e=>update("challenges",e.target.value)} /></Field><Field label="Adaptações realizadas"><textarea rows={4} value={form.adjustments} onChange={e=>update("adjustments",e.target.value)} /></Field><Field label="Sugestão para a próxima aplicação"><textarea rows={4} value={form.nextSteps} onChange={e=>update("nextSteps",e.target.value)} /></Field></div>{error&&<p className="form-error">{error}</p>}<footer><p>Ao enviar, o registro ficará associado à aula {String(lesson.number).padStart(2,"0")}.</p><button disabled={saving} type="submit"><Send/>{saving?"Salvando...":"Salvar feedback"}</button></footer></form>;
}

function FeedbackDashboard({openLesson}:{openLesson:(l:Lesson,t?:Tab)=>void}){
  const {allLessons}=useCurriculumData();
  const [items,setItems]=useState<FeedbackRow[]>([]),[loading,setLoading]=useState(true);
  useEffect(()=>{fetch("/api/feedback").then(r=>r.json() as Promise<{items?:FeedbackRow[]}>).then(d=>setItems(d.items||[])).catch(()=>setItems([])).finally(()=>setLoading(false));},[]);
  const lessonFor=(id:string|number)=>allLessons.find(l=>l.id===String(id));
  return <><SectionHeader kicker="ACOMPANHAMENTO" title="Feedbacks das aulas" text="Leia os registros da equipe para identificar padrões, materiais que precisam de ajuste e oportunidades de formação."/><section className="feedback-metrics"><article><MessageSquareText/><div><strong>{items.length}</strong><span>registros enviados</span></div></article><article><Star/><div><strong>{items.length?((items.reduce((s,i)=>s+Number(i.engagement||0),0)/items.length).toFixed(1)):"–"}</strong><span>engajamento médio</span></div></article><article><Clock3/><div><strong>{items.filter(i=>i.timing==="adequado").length}</strong><span>com tempo adequado</span></div></article></section>{loading?<div className="loading-state">Carregando registros...</div>:items.length===0?<section className="empty-feedback"><span><MessageSquareText/></span><h2>Nenhum feedback registrado ainda</h2><p>Abra uma aula, selecione “Feedback da aplicação” e salve o primeiro relato.</p><button onClick={()=>openLesson(allLessons[0],"feedback")}>Registrar primeiro feedback</button></section>:<div className="feedback-table">{items.map(item=>{const lesson=lessonFor(item.lesson_id);return <article key={String(item.id)}><div className="feedback-date"><strong>{new Date(String(item.taught_at)+"T12:00:00").toLocaleDateString("pt-BR",{day:"2-digit",month:"short"})}</strong><span>{String(item.class_name)}</span></div><div><small>{lesson?.gradeLabel||String(item.grade)} · AULA {lesson?.number||"–"} · {String(item.teacher_name)}</small><h3>{lesson?.title||"Aula curricular"}</h3><p>{String(item.notes)}</p><div><span>Objetivos {item.completion}/5</span><span>Engajamento {item.engagement}/5</span><span>Tempo: {String(item.timing)}</span></div></div>{lesson&&<button onClick={()=>openLesson(lesson)}>Abrir aula <ArrowRight/></button>}</article>})}</div>}</>;
}

function Field({label,hint,required,children}:{label:string;hint?:string;required?:boolean;children:ReactNode}){return <label className="field"><span>{label}{required&&<b> *</b>}</span>{children}{hint&&<small>{hint}</small>}</label>}
function Rating({label,value,onChange}:{label:string;value:number;onChange:(v:number)=>void}){return <div className="rating"><span>{label}</span><div>{[1,2,3,4,5].map(v=><button type="button" key={v} className={v<=value?"active":""} onClick={()=>onChange(v)} aria-label={`${label}: ${v} de 5`}><Star/></button>)}</div><small>{["","Muito abaixo","Abaixo","Parcialmente","Conforme esperado","Acima do esperado"][value]}</small></div>}
function ResourceMini({icon,label,text}:{icon:ReactNode;label:string;text:string}){return <article className="resource-mini"><span>{icon}</span><div><small>{label}</small><strong>{text}</strong></div></article>}
function Breadcrumb({items}:{items:string[]}){return <div className="breadcrumbs"><Home/>{items.map(i=><span key={i}><ChevronRight/>{i}</span>)}</div>}
function SectionHeader({kicker,title,text}:{kicker:string;title:string;text:string}){return <div className="hub-section-head"><div><span className="hub-kicker">{kicker}</span><h2>{title}</h2></div><p>{text}</p></div>}
function resourcesForGrade(id:string){return ({"3":"Tablets, ScratchJr e LEGO Education SPIKE Essential.","4":"Tablets, ScratchJr, SPIKE Essential e Minecraft Education.","5":"Tablets, SPIKE Essential, Minecraft Education e MakeCode.","6":"Tablets, Scratch, LEGO Education SPIKE Prime e VEXcode VR apenas digital.","7":"Tablets, Scratch, SPIKE Prime, micro:bit/MakeCode e Minecraft Education.","8":"Tablets, VEXcode VR digital, SPIKE Prime, micro:bit/MakeCode e Minecraft Education.","9":"Tablets, Scratch, VEXcode VR digital, SPIKE Prime, micro:bit CreateAI/MakeCode e Minecraft Education."} as Record<string,string>)[id]||"Tablets e plataformas de educação tecnológica."}
function toolEmoji(tool:string){if(tool.includes("SPIKE"))return "🧱";if(tool.includes("micro:bit"))return "💡";if(tool.includes("VEXcode VR"))return "🤖";if(tool.includes("Minecraft"))return "⛏️";if(tool.includes("ScratchJr"))return "🎬";if(tool.includes("Scratch"))return "🎮";if(tool.includes("Tablet")||tool.includes("tablet"))return "📱";if(tool.includes("desplugada"))return "🧠";return "🛠️"}
