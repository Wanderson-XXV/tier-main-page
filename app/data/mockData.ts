import type {
  Adaptation,
  AppState,
  Assessment,
  ClassGroup,
  Document,
  FollowUpPlan,
  Guardian,
  LessonPlan,
  Meeting,
  Notification,
  Observation,
  Question,
  School,
  Student,
  StudentChatThread,
  UserProfile,
} from "../types";

export const school: School = {
  id: "school-tier-01",
  name: "Colégio Demonstração TIER",
  unit: "Unidade Vila Mariana",
  city: "São Paulo · SP",
  segments: ["Anos Iniciais", "Anos Finais"],
};

export const profiles: UserProfile[] = [
  { id: "u-mariana", role: "professor", name: "Mariana Costa", initials: "MC", title: "Professora de Matemática", detail: "Turmas 5101, 6101 e 6201", classes: ["5101", "6101", "6201"] },
  { id: "u-rafael", role: "coordenador", name: "Rafael Almeida", initials: "RA", title: "Coordenador pedagógico", detail: "Ensino Fundamental", classes: ["5101", "5201", "6101", "6201", "7101", "8101"] },
  { id: "u-carla", role: "gestor", name: "Carla Menezes", initials: "CM", title: "Gestora escolar", detail: "Colégio Demonstração TIER", classes: ["5101", "5201", "6101", "6201", "7101", "8101"] },
];

export const classes: ClassGroup[] = [
  { id: "c-5101", code: "5101", year: "5º ano", segment: "Anos Iniciais", shift: "Manhã", teacher: "Mariana Costa", subject: "Matemática", students: 26, average: 7.8, attendance: 94, nextClass: "Hoje, 10h20", skills: [
    { code: "EF05MA07", label: "Problemas de adição e subtração", level: "consolidada", score: 86 },
    { code: "EF05MA08", label: "Multiplicação e divisão", level: "desenvolvimento", score: 69 },
    { code: "EF05MA19", label: "Medidas de comprimento", level: "retomar", score: 52 },
  ] },
  { id: "c-5201", code: "5201", year: "5º ano", segment: "Anos Iniciais", shift: "Tarde", teacher: "Beatriz Nunes", subject: "Língua Portuguesa", students: 25, average: 7.2, attendance: 92, nextClass: "Amanhã, 13h30", skills: [
    { code: "EF05LP04", label: "Inferência em textos", level: "desenvolvimento", score: 67 },
    { code: "EF05LP08", label: "Coesão textual", level: "retomar", score: 54 },
    { code: "EF05LP16", label: "Leitura de notícias", level: "consolidada", score: 82 },
  ] },
  { id: "c-6101", code: "6101", year: "6º ano", segment: "Anos Finais", shift: "Manhã", teacher: "Mariana Costa", subject: "Matemática", students: 29, average: 6.9, attendance: 91, nextClass: "Hoje, 14h10", skills: [
    { code: "EF06MA07", label: "Frações equivalentes", level: "desenvolvimento", score: 64 },
    { code: "EF06MA11", label: "Números racionais", level: "retomar", score: 48 },
    { code: "EF06MA17", label: "Plano cartesiano", level: "consolidada", score: 81 },
  ] },
  { id: "c-6201", code: "6201", year: "6º ano", segment: "Anos Finais", shift: "Tarde", teacher: "Mariana Costa", subject: "Matemática", students: 28, average: 7.4, attendance: 93, nextClass: "Amanhã, 15h", skills: [
    { code: "EF06MA09", label: "Cálculo com frações", level: "desenvolvimento", score: 71 },
    { code: "EF06MA14", label: "Igualdade matemática", level: "consolidada", score: 84 },
    { code: "EF06MA24", label: "Ângulos", level: "retomar", score: 57 },
  ] },
  { id: "c-7101", code: "7101", year: "7º ano", segment: "Anos Finais", shift: "Manhã", teacher: "Lucas Ferreira", subject: "Ciências", students: 30, average: 7.1, attendance: 90, nextClass: "Sexta, 8h", skills: [
    { code: "EF07CI04", label: "Máquinas simples", level: "consolidada", score: 79 },
    { code: "EF07CI06", label: "Equilíbrio térmico", level: "desenvolvimento", score: 66 },
    { code: "EF07CI09", label: "Ecossistemas", level: "retomar", score: 55 },
  ] },
  { id: "c-8101", code: "8101", year: "8º ano", segment: "Anos Finais", shift: "Tarde", teacher: "Fernanda Lima", subject: "Robótica", students: 24, average: 8.2, attendance: 96, nextClass: "Sexta, 14h", skills: [
    { code: "ROB08-01", label: "Pensamento computacional", level: "consolidada", score: 88 },
    { code: "ROB08-02", label: "Prototipagem", level: "desenvolvimento", score: 74 },
    { code: "ROB08-03", label: "Sensores e automação", level: "desenvolvimento", score: 69 },
  ] },
];

const studentNames = [
  "Ana Clara Souza", "Bruno Martins", "Camila Ribeiro", "Daniel Oliveira", "Eduarda Alves",
  "Felipe Santos", "Gabriela Rocha", "Heitor Mendes", "Isabela Freitas", "João Pedro Lima",
  "Larissa Gomes", "Mateus Carvalho", "Nicole Azevedo", "Otávio Barbosa", "Paula Fernandes",
  "Rafael Moreira", "Sofia Cardoso", "Thiago Moura", "Valentina Dias", "Yasmin Teixeira",
  "Arthur Rezende", "Bianca Monteiro", "Caio Macedo", "Débora Viana",
];

export const students: Student[] = studentNames.map((name, index) => {
  const classGroup = classes[index % classes.length];
  const initials = name.split(" ").slice(0, 2).map((part) => part[0]).join("");
  const followUp = index % 7 === 0 ? "Ativo" : index % 5 === 0 ? "Atenção" : "Sem acompanhamento";
  return {
    id: `student-${index + 1}`,
    name,
    initials,
    classId: classGroup.id,
    classCode: classGroup.code,
    attendance: 86 + (index * 3) % 13,
    average: Number((5.8 + ((index * 7) % 34) / 10).toFixed(1)),
    followUp,
    strength: ["Raciocínio lógico", "Leitura e argumentação", "Colaboração", "Criatividade"][index % 4],
    interest: ["Jogos de estratégia", "Experimentos", "Histórias em quadrinhos", "Tecnologia"][index % 4],
    developing: ["Organização de cálculos", "Inferência textual", "Comunicação de hipóteses", "Autonomia"][index % 4],
    objective: "Explicar o próprio raciocínio com clareza e registrar as etapas da resolução.",
    strategy: "Enunciados segmentados, exemplos concretos e checagem de compreensão.",
    nextStep: "Retomar a habilidade em pequeno grupo e registrar evidências na próxima quinzena.",
  };
});

export const guardians: Guardian[] = [
  { id: "g-1", name: "Renata Souza", relationship: "Mãe", studentIds: ["student-1"], channel: "WhatsApp", bestTime: "Após 18h", meetings: 2, agreements: ["Acompanhar rotina semanal de estudos"], pending: ["Confirmar reunião de 22/07"] },
  { id: "g-2", name: "Marcelo Martins", relationship: "Pai", studentIds: ["student-2"], channel: "E-mail", bestTime: "12h às 13h", meetings: 1, agreements: ["Incentivar leitura das instruções"], pending: [] },
  { id: "g-3", name: "Patrícia Ribeiro", relationship: "Responsável legal", studentIds: ["student-3", "student-21"], channel: "Telefone", bestTime: "Após 17h", meetings: 3, agreements: ["Manter comunicação quinzenal"], pending: ["Enviar síntese pedagógica"], restriction: "Contato exclusivamente pelos canais cadastrados." },
  { id: "g-4", name: "André Oliveira", relationship: "Pai", studentIds: ["student-4"], channel: "Agenda escolar", bestTime: "Manhã", meetings: 1, agreements: ["Organizar materiais na véspera"], pending: [] },
  { id: "g-5", name: "Juliana Alves", relationship: "Mãe", studentIds: ["student-5"], channel: "WhatsApp", bestTime: "Após 19h", meetings: 2, agreements: ["Revisar plano de estudos"], pending: ["Retorno sobre rotina"] },
];

const subjectConfig = [
  ["Matemática", "Frações e proporcionalidade", "EF06MA07"],
  ["Língua Portuguesa", "Leitura e interpretação", "EF06LP03"],
  ["Ciências", "Ecossistemas brasileiros", "EF07CI07"],
  ["História", "Povos da Antiguidade", "EF06HI07"],
  ["Geografia", "Paisagens e território", "EF06GE01"],
  ["Robótica", "Sensores e automação", "ROB08-03"],
] as const;

export const questions: Question[] = Array.from({ length: 30 }, (_, index) => {
  const config = subjectConfig[index % subjectConfig.length];
  const subject = config[0];
  const basePrompts: Record<string, string> = {
    Matemática: `Uma turma utilizou ${12 + index} de 40 peças em um protótipo. Qual fração representa a parte utilizada?`,
    "Língua Portuguesa": "Leia o trecho e identifique a informação que sustenta a conclusão apresentada pelo narrador.",
    Ciências: "Considere as relações alimentares descritas. Que alteração pode afetar primeiro o equilíbrio desse ecossistema?",
    História: "Com base na fonte histórica, explique uma característica da organização social apresentada.",
    Geografia: "Observe a descrição da paisagem e indique a ação humana que mais contribuiu para sua transformação.",
    Robótica: "Um sensor deve acionar o motor apenas quando detectar um objeto. Qual sequência lógica atende ao desafio?",
  };
  const type = (["Múltipla escolha", "Discursiva", "Múltipla escolha", "Verdadeiro ou falso"] as const)[index % 4];
  return {
    id: `q-${String(index + 1).padStart(3, "0")}`,
    code: `TIER-${String(index + 1).padStart(4, "0")}`,
    prompt: basePrompts[subject],
    supportText: index % 3 === 0 ? "Use as informações apresentadas e registre as etapas do raciocínio." : undefined,
    subject,
    segment: index % 4 === 0 ? "Anos Iniciais" : "Anos Finais",
    year: index % 4 === 0 ? "5º ano" : `${6 + (index % 3)}º ano`,
    content: config[1],
    bncc: config[2],
    type,
    difficulty: (["Fácil", "Média", "Média", "Difícil"] as const)[index % 4],
    cognitive: (["Lembrar", "Compreender", "Aplicar", "Analisar"] as const)[index % 4],
    status: (["aprovado", "aprovado", "em_revisao", "rascunho"] as const)[index % 4],
    author: index % 3 === 0 ? "Mariana Costa" : index % 3 === 1 ? "Banco institucional" : "Rafael Almeida",
    accuracy: 43 + (index * 7) % 49,
    lastUsed: index % 5 === 0 ? "Nunca utilizada" : `${2 + (index % 20)} jun. 2026`,
    objective: `Mobilizar conhecimentos de ${config[1].toLowerCase()} em uma situação contextualizada.`,
    estimatedTime: 3 + (index % 6),
    tags: [subject, config[2], index % 2 === 0 ? "contextualizada" : "formativa"],
    alternatives: type === "Discursiva" ? [] : ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
    correctAnswer: type === "Discursiva" ? "Resposta esperada conforme rubrica." : "Alternativa B",
    explanation: "A resposta mobiliza a habilidade indicada e deve ser justificada com base nos dados do enunciado.",
    source: "Autoria institucional · uso autorizado",
  };
});

export const assessments: Assessment[] = [
  { id: "a-1", name: "Avaliação bimestral · Números racionais", classCode: "6101", subject: "Matemática", date: "24/07/2026", author: "Mariana Costa", questionIds: questions.filter(q => q.subject === "Matemática").slice(0, 5).map(q => q.id), versions: ["A", "B", "C"], status: "rascunho", totalPoints: 10, duration: 60, period: "2º bimestre", instructions: "Leia com atenção e registre os cálculos.", adaptations: ["Apoio de leitura"] },
  { id: "a-2", name: "Leitura e interpretação", classCode: "5201", subject: "Língua Portuguesa", date: "18/07/2026", author: "Beatriz Nunes", questionIds: questions.filter(q => q.subject === "Língua Portuguesa").slice(0, 4).map(q => q.id), versions: ["A", "B"], status: "em_revisao", totalPoints: 10, duration: 50, period: "2º bimestre", instructions: "Responda com base nos textos.", adaptations: [] },
  { id: "a-3", name: "Ecossistemas e relações ecológicas", classCode: "7101", subject: "Ciências", date: "12/06/2026", author: "Lucas Ferreira", questionIds: questions.filter(q => q.subject === "Ciências").slice(0, 5).map(q => q.id), versions: ["A"], status: "aplicado", totalPoints: 10, duration: 60, period: "2º bimestre", instructions: "Analise as situações propostas.", adaptations: ["Fonte ampliada"] },
  { id: "a-4", name: "Território e paisagem", classCode: "6201", subject: "Geografia", date: "30/07/2026", author: "Rafael Almeida", questionIds: questions.filter(q => q.subject === "Geografia").slice(0, 4).map(q => q.id), versions: ["A", "B"], status: "aprovado", totalPoints: 8, duration: 50, period: "2º bimestre", instructions: "Observe os contextos apresentados.", adaptations: [] },
  { id: "a-5", name: "Desafio de automação", classCode: "8101", subject: "Robótica", date: "05/06/2026", author: "Fernanda Lima", questionIds: questions.filter(q => q.subject === "Robótica").slice(0, 4).map(q => q.id), versions: ["A"], status: "aplicado", totalPoints: 10, duration: 90, period: "Projeto 2", instructions: "Documente a lógica do protótipo.", adaptations: [] },
  { id: "a-6", name: "Povos da Antiguidade", classCode: "6101", subject: "História", date: "09/08/2026", author: "Rafael Almeida", questionIds: questions.filter(q => q.subject === "História").slice(0, 4).map(q => q.id), versions: ["A"], status: "arquivado", totalPoints: 10, duration: 50, period: "Banco de modelos", instructions: "Relacione as fontes às sociedades estudadas.", adaptations: [] },
];

export const observations: Observation[] = [
  { id: "obs-1", studentId: "student-1", author: "Mariana Costa", date: "10/07/2026", fact: "Durante a atividade em dupla, registrou corretamente o procedimento, mas não explicou a escolha da operação.", interpretation: "A comunicação do raciocínio ainda requer apoio estruturado.", action: "Foi oferecido um roteiro com perguntas-guia.", result: "Conseguiu explicar oralmente duas das três etapas.", nextFollowUp: "Revisar o registro na semana de 20/07." },
  { id: "obs-2", studentId: "student-1", author: "Rafael Almeida", date: "26/06/2026", fact: "Concluiu 8 de 10 itens com autonomia e solicitou ajuda para interpretar dois enunciados longos.", interpretation: "Textos extensos aumentam a carga de leitura da tarefa.", action: "Enunciados foram segmentados sem alterar o objetivo.", result: "Resolveu os dois itens após a segmentação.", nextFollowUp: "Observar em nova situação avaliativa." },
  { id: "obs-3", studentId: "student-6", author: "Mariana Costa", date: "08/07/2026", fact: "Entregou três atividades sem os registros intermediários.", interpretation: "É necessário tornar o critério de registro mais explícito.", action: "Compartilhado modelo de resolução em etapas.", result: "Aplicará o modelo na próxima lista.", nextFollowUp: "15/07/2026" },
];

export const followUps: FollowUpPlan[] = [
  { id: "fu-1", studentId: "student-1", situation: "Comunicação do raciocínio matemático", evidence: "Registros de atividades de junho e julho", objective: "Explicitar as etapas da resolução em 4 de 5 atividades.", strategies: ["Roteiro de autorregulação", "Modelagem de resposta", "Duplas produtivas"], owners: ["Mariana Costa", "Rafael Almeida"], deadline: "31/08/2026", indicators: ["Quantidade de etapas registradas", "Autonomia na revisão"], status: "em_andamento", results: ["Primeiro registro completo em 10/07"] },
  { id: "fu-2", studentId: "student-8", situation: "Organização da rotina de atividades", evidence: "Duas entregas fora do prazo", objective: "Entregar atividades no período combinado.", strategies: ["Checklist visual", "Divisão da tarefa"], owners: ["Lucas Ferreira"], deadline: "15/08/2026", indicators: ["Entregas no prazo"], status: "planejado", results: [] },
];

export const lessonPlans: LessonPlan[] = [
  { id: "lp-1", title: "Frações no cotidiano", classCode: "6101", subject: "Matemática", duration: 50, type: "Plano de aula", date: "17/07/2026", status: "Pronto", objectives: "Comparar e representar frações em situações cotidianas.", bncc: ["EF06MA07"], resources: "Cartões fracionários e projetor", methodology: "Resolução colaborativa de problemas", stages: ["Aquecimento com estimativas", "Investigação em duplas", "Sistematização coletiva", "Bilhete de saída"], formative: "Registro das estratégias e bilhete de saída", adaptations: "Apoio visual e leitura compartilhada quando necessário", alternativePlan: "Usar objetos disponíveis em sala para representar as frações." },
  { id: "lp-2", title: "Plano cartesiano em movimento", classCode: "6201", subject: "Matemática", duration: 100, type: "Sequência didática", date: "21/07/2026", status: "Rascunho", objectives: "Localizar e descrever pontos no plano cartesiano.", bncc: ["EF06MA16"], resources: "Fita adesiva e cartões", methodology: "Aprendizagem baseada em desafios", stages: ["Construção do plano no chão", "Desafio de coordenadas", "Formalização"], formative: "Rubrica de comunicação matemática", adaptations: "Pistas de orientação por cores", alternativePlan: "Usar malha impressa em grupos." },
  { id: "lp-3", title: "Notícia e ponto de vista", classCode: "5201", subject: "Língua Portuguesa", duration: 50, type: "Atividade", date: "18/07/2026", status: "Aplicado", objectives: "Distinguir fato e opinião.", bncc: ["EF05LP16"], resources: "Notícias selecionadas", methodology: "Leitura guiada", stages: ["Leitura", "Marcação", "Debate"], formative: "Quadro de evidências", adaptations: "Textos com extensão graduada", alternativePlan: "Leitura coletiva projetada." },
  { id: "lp-4", title: "Mini-ecossistemas", classCode: "7101", subject: "Ciências", duration: 100, type: "Projeto", date: "25/07/2026", status: "Pronto", objectives: "Analisar relações em ecossistemas.", bncc: ["EF07CI07"], resources: "Potes, solo e sementes", methodology: "Investigação científica", stages: ["Hipóteses", "Montagem", "Registro"], formative: "Diário de investigação", adaptations: "Papéis distribuídos no grupo", alternativePlan: "Analisar um modelo fotográfico." },
  { id: "lp-5", title: "Sensor de proximidade", classCode: "8101", subject: "Robótica", duration: 100, type: "Lista de exercícios", date: "29/07/2026", status: "Rascunho", objectives: "Programar uma condição de acionamento.", bncc: ["ROB08-03"], resources: "Kit de robótica", methodology: "Cultura maker", stages: ["Teste", "Programação", "Depuração"], formative: "Checklist do protótipo", adaptations: "Código em blocos com alto contraste", alternativePlan: "Simulador offline." },
];

export const meetings: Meeting[] = [
  { id: "m-1", title: "Acompanhamento · Ana Clara", type: "Família", date: "22/07/2026", time: "17h30", relatedTo: "Ana Clara Souza", participants: ["Rafael Almeida", "Mariana Costa", "Renata Souza"], status: "Preparação", pending: ["Consolidar evidências do bimestre"] },
  { id: "m-2", title: "Conselho de classe · 6101", type: "Conselho de classe", date: "31/07/2026", time: "14h", relatedTo: "Turma 6101", participants: ["Equipe do 6º ano"], status: "Agendada", pending: ["Revisar habilidades prioritárias"] },
  { id: "m-3", title: "Revisão do plano de ação", type: "Pedagógica", date: "18/07/2026", time: "11h", relatedTo: "Felipe Santos", participants: ["Rafael Almeida", "Mariana Costa"], status: "Agendada", pending: [] },
  { id: "m-4", title: "Planejamento interdisciplinar", type: "Equipe", date: "09/07/2026", time: "16h", relatedTo: "7º ano", participants: ["Lucas Ferreira", "Fernanda Lima"], status: "Concluída", pending: ["Compartilhar sequência revisada"] },
];

export const documents: Document[] = [
  { id: "d-1", name: "Proposta pedagógica 2026", folder: "Institucional", type: "PDF", updatedAt: "02/02/2026", author: "Carla Menezes", permission: "Todos os profissionais", aiContext: true },
  { id: "d-2", name: "Regimento escolar", folder: "Institucional", type: "PDF", updatedAt: "15/01/2026", author: "Secretaria", permission: "Coordenação e gestão", aiContext: true },
  { id: "d-3", name: "Matriz curricular · Ensino Fundamental", folder: "Currículo", type: "Planilha", updatedAt: "10/03/2026", author: "Rafael Almeida", permission: "Todos os profissionais", aiContext: true },
  { id: "d-4", name: "Calendário letivo", folder: "Calendários", type: "PDF", updatedAt: "20/01/2026", author: "Secretaria", permission: "Todos os profissionais", aiContext: false },
  { id: "d-5", name: "Diretrizes de avaliação", folder: "Avaliação", type: "Documento", updatedAt: "08/04/2026", author: "Coordenação", permission: "Docentes e coordenação", aiContext: true },
  { id: "d-6", name: "Modelo de relatório descritivo", folder: "Modelos", type: "Documento", updatedAt: "11/05/2026", author: "Rafael Almeida", permission: "Docentes e coordenação", aiContext: false },
  { id: "d-7", name: "Protocolo de registro pedagógico", folder: "Protocolos", type: "PDF", updatedAt: "19/05/2026", author: "Carla Menezes", permission: "Todos os profissionais", aiContext: true },
];

export const notifications: Notification[] = [
  { id: "n-1", title: "Avaliação aguardando revisão", description: "Leitura e interpretação · Turma 5201", time: "há 18 min", read: false, type: "warning" },
  { id: "n-2", title: "Plano atualizado", description: "Ana Clara teve uma nova evidência registrada.", time: "há 1h", read: false, type: "info" },
  { id: "n-3", title: "Questões aprovadas", description: "4 itens foram incluídos no banco institucional.", time: "ontem", read: true, type: "success" },
];

export const adaptations: Adaptation[] = [
  { id: "ad-1", name: "Apoio de leitura", description: "Segmenta instruções longas e destaca verbos de comando.", changes: ["Enunciados segmentados", "Comandos em destaque"], preserves: ["Habilidade", "Contexto", "Critério de correção"], active: true },
  { id: "ad-2", name: "Baixa carga visual", description: "Reduz elementos simultâneos e amplia espaçamento.", changes: ["Uma questão por bloco", "Mais espaço em branco"], preserves: ["Quantidade de itens", "Pontuação"], active: true },
  { id: "ad-3", name: "Fonte ampliada", description: "Aplica tipografia de 16 pontos e maior entrelinha.", changes: ["Fonte 16 pt", "Entrelinha 1,5"], preserves: ["Conteúdo", "Habilidades"], active: true },
  { id: "ad-4", name: "Avaliação por etapas", description: "Organiza a aplicação em blocos curtos.", changes: ["Blocos de 20 minutos", "Pausas orientadas"], preserves: ["Tempo total previsto", "Matriz"], active: false },
];

export const studentChats: StudentChatThread[] = [
  {
    id: "chat-student-1-tutor",
    studentId: "student-1",
    audience: "student",
    title: "Frações passo a passo",
    updatedAt: "Hoje, 09h42",
    messages: [
      { id: "msg-1", role: "assistant", text: "Olá, Ana! Vamos estudar no seu ritmo. Posso explicar com um exemplo visual, fazer uma pergunta por vez ou montar um exercício curto.", createdAt: "09h40" },
      { id: "msg-2", role: "user", text: "Pode me explicar por que 2/4 é igual a 1/2?", createdAt: "09h41" },
      { id: "msg-3", role: "assistant", text: "Imagine uma barra dividida em 4 partes iguais. Se pintarmos 2 partes, pintamos exatamente metade da barra. Quando juntamos cada par de quartos, temos 1 de 2 metades. Por isso, 2/4 e 1/2 representam a mesma quantidade.", createdAt: "09h42", sources: ["Objetivo atual", "EF06MA07"] },
    ],
  },
  {
    id: "chat-student-1-educator",
    studentId: "student-1",
    audience: "educator",
    title: "Próxima intervenção",
    updatedAt: "Ontem, 16h10",
    messages: [
      { id: "msg-4", role: "assistant", text: "Este espaço organiza evidências e produz rascunhos para a equipe. As observações internas não aparecem no tutor da estudante.", createdAt: "16h08" },
      { id: "msg-5", role: "user", text: "Sugira uma intervenção curta para a próxima aula.", createdAt: "16h09" },
      { id: "msg-6", role: "assistant", text: "Sugestão: uma atividade de 15 minutos com cartões fracionários. Primeiro, Ana forma pares equivalentes; depois, explica oralmente uma escolha usando o roteiro ‘eu comparei... porque...’. Finalize com um registro de três etapas.", createdAt: "16h10", sources: ["2 observações pedagógicas", "Objetivo de acompanhamento", "Estratégia que funcionou"] },
    ],
  },
];

export const initialState: AppState = {
  questions,
  assessments,
  observations,
  followUps,
  lessonPlans,
  meetings,
  documents,
  studentChats,
};
