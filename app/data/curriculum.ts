export type LessonResource = {
  title: string;
  source: "LEGO Education" | "Minecraft Education" | "Scratch" | "VEX Education" | "micro:bit" | "TIER Education";
  kind: "manual" | "lesson" | "world" | "guide";
  url: string;
  description: string;
};

export type LessonStep = {
  time: string;
  title: string;
  teacher: string;
  students: string;
};

export type Lesson = {
  id: string;
  gradeId: string;
  gradeLabel: string;
  number: number;
  moduleId: number;
  title: string;
  tool: string;
  focus: string;
  activity: string;
  challenge: string;
  evidence: string;
  objectives: string[];
  materials: string[];
  preparation: string[];
  steps: LessonStep[];
  resources?: LessonResource[];
  construction?: boolean;
};

export type CurriculumModule = {
  id: number;
  gradeId: string;
  title: string;
  question: string;
  description: string;
  product: string;
  color: string;
  lessons: Lesson[];
};

export type GradeCurriculum = {
  id: string;
  label: string;
  level: "fund1" | "fund2";
  levelLabel: "Fundamental I" | "Fundamental II";
  status: "active";
  description: string;
  progression: string;
  modules: CurriculumModule[];
  lessons: number;
};

type RawLesson = readonly [number: number, title: string, tool: string, focus: string, activity: string, challenge: string, evidence: string, resourceKey?: string];

const legoPtBrUrl = (url:string) => url
  .replace("education.lego.com/en-us/lessons/", "education.lego.com/pt-br/lessons/")
  .replace("locale=en-us", "locale=pt-br");

const manual = (title:string, url:string, description="PDF oficial com o passo a passo visual da construção."):LessonResource => ({title,source:"LEGO Education",kind:"manual",url:legoPtBrUrl(url),description});
const legoLesson = (title:string, url:string, description="Plano oficial da atividade, com preparação, programação e critérios de avaliação."):LessonResource => ({title,source:"LEGO Education",kind:"lesson",url:legoPtBrUrl(url),description});
const minecraft = (title:string, url:string, kind:"lesson"|"world"|"guide"="lesson", description="Atividade oficial com orientações para o professor e acesso ao mundo quando disponível."):LessonResource => ({title,source:"Minecraft Education",kind,url,description});
const scratch = (title:string, url:string, description="Recurso oficial do Scratch para apoiar criação, programação e autoria digital."):LessonResource => ({title,source:"Scratch",kind:"guide",url,description});
const vex = (title:string, url:string, description="Atividade oficial para programar um robô virtual em blocos no navegador."):LessonResource => ({title,source:"VEX Education",kind:"lesson",url,description});
const microbit = (title:string, url:string, description="Sequência oficial com plano, recursos docentes e projetos em MakeCode."):LessonResource => ({title,source:"micro:bit",kind:"lesson",url,description});

const resourceLibrary: Record<string, LessonResource[]> = {
  river:[
    legoLesson("Atividade River Ferry", "https://education.lego.com/en-us/lessons/spikeessential-happy-traveler/spikeessential-river-ferry/", "Atividade oficial iniciante para construir, programar e melhorar uma balsa."),
    manual("Montagem River Ferry — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blte0961649ada62484/5f57301dd0db724679d620a1/U3L1.pdf?locale=en-us"),
  ],
  taxi:[
    legoLesson("Atividade Taxi! Taxi!", "https://education.lego.com/en-us/lessons/spikeessential-happy-traveler/spikeessential-taxi-taxi/"),
    manual("Montagem Taxi! Taxi! — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltad482daa5492437d/612e28618f8f7644bdf4d50b/U3L2.pdf?locale=en-us"),
  ],
  helicopter:[
    legoLesson("Atividade Hovering Helicopter", "https://education.lego.com/en-us/lessons/spikeessential-happy-traveler/spikeessential-hovering-helicopter/"),
    manual("Montagem Hovering Helicopter — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt4a781db4f91fa814/5f57301927a6ca5b5b1a6e4b/U3L3.pdf?locale=en-us"),
  ],
  swamp:[
    legoLesson("Atividade Swamp Boat", "https://education.lego.com/en-us/lessons/spikeessential-happy-traveler/spikeessential-swamp-boat/"),
    manual("Montagem Swamp Boat — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltccaa3a1dd4179dde/5f573022d0db724679d620a5/U3L4.pdf?locale=en-us"),
  ],
  bowling:[
    legoLesson("Atividade Bowling Fun", "https://education.lego.com/en-us/lessons/spikeessential-crazy-carnival-games/spikeessential-bowling-fun/"),
    manual("Montagem Bowling Fun — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltf77eaedc69ab50d2/5f5730c458d02047f3edc503/U4L2.pdf?locale=en-us"),
  ],
  helper:[
    legoLesson("Atividade Big Little Helper", "https://education.lego.com/en-us/lessons/spikeessential-quirky-creations/spikeessential-big-little-helper/"),
    manual("Montagem Big Little Helper — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt93ea077df67017ea/612e2a484a33fd4461328509/U5L2.pdf?locale=en-us"),
  ],
  literary:[
    legoLesson("Atividade Literary Randomizer", "https://education.lego.com/en-us/lessons/spikeessential-quirky-creations/spikeessential-literary-randomizer/"),
    manual("Montagem Literary Randomizer — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltcbb258835f290fe4/5f57314e29374c4763433dbf/U5L6.pdf?locale=en-us"),
  ],
  maze:[
    legoLesson("Atividade A-Maze-Ing", "https://education.lego.com/en-us/lessons/spikeessential-crazy-carnival-games/spikeessential-a-maze-ing/"),
    manual("Montagem A-Maze-Ing — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt5550700b02f80b17/5f5730d527a6ca5b5b1a6e4f/U4L4.pdf?locale=en-us"),
  ],
  morning:[
    legoLesson("Atividade Good Morning Machine", "https://education.lego.com/en-us/lessons/spikeessential-quirky-creations/spikeessential-good-morning-machine/"),
    manual("Montagem Good Morning Machine — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt4d5db7166adf0cd6/5f573135ac662d484762ac0c/U5L1.pdf?locale=en-us"),
  ],
  hockey:[
    legoLesson("Atividade High Stick Hockey", "https://education.lego.com/en-us/lessons/spikeessential-crazy-carnival-games/spikeessential-high-stick-hockey/"),
    manual("Montagem High Stick Hockey — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt6293ac41751f6874/5f5730cc029d6345f1b4ebbb/U4L3.pdf?locale=en-us"),
  ],
  playground:[
    legoLesson("Atividade High-Tech Playground", "https://education.lego.com/en-us/lessons/spikeessential-quirky-creations/spikeessential-high-tech-playground/"),
    manual("Montagem High-Tech Playground — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt35c3f42c715a44fc/612e2ab78faa7a6bbfbfdb60/U5L3.pdf?locale=en-us"),
  ],
  golf:[
    legoLesson("Atividade Mini Mini-Golf", "https://education.lego.com/en-us/lessons/spikeessential-crazy-carnival-games/spikeessential-mini-mini-golf/"),
    manual("Montagem Mini Mini-Golf — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt40a95bf6408c91e2/5f5730c44b239959f43aa736/U4L1.pdf?locale=en-us"),
  ],
  pinball:[
    legoLesson("Atividade Junior Pinball", "https://education.lego.com/en-us/lessons/spikeessential-crazy-carnival-games/spikessential-junior-pinball/"),
    manual("Montagem Junior Pinball — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltb5904cc6744e5ab9/602242dd37c7bc6afba5277a/U4L6.pdf?locale=en-us"),
  ],
  trash:[
    legoLesson("Atividade Trash Monster Machine", "https://education.lego.com/en-us/lessons/spikeessential-quirky-creations/spikeessential-trash-monster-machine/"),
    manual("Montagem Trash Monster Machine — PDF", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltb566ed322268f5e5/5f57315229f439476a01c7eb/U5L4.pdf?locale=en-us"),
  ],
  eyes:[legoLesson("Como os Olhos Veem", "https://education.lego.com/pt-br/lessons/spikeessential-science-connections/spikeessential-how-eyes-see/", "Atividade oficial em português com referências específicas de construção e programação.")],
  animals:[legoLesson("Estruturas Animais", "https://education.lego.com/pt-br/lessons/spikeessential-science-connections/spikeessential-animal-structures/", "Atividade oficial em português com exemplos de estruturas e funções.")],
  energy:[legoLesson("Recursos Energéticos", "https://education.lego.com/pt-br/lessons/spikeessential-science-connections/spikeessential-energy-resources/", "Atividade oficial em português para investigar fontes e impactos da energia.")],
  hazards:[legoLesson("Preparação para Perigos Naturais", "https://education.lego.com/pt-br/lessons/spikeessential-science-connections/spikeessential-prepare-for-natural-hazards/", "Atividade oficial em português com edifício e máquina de teste de terremoto.")],
  information:[legoLesson("Transferência de Informações", "https://education.lego.com/pt-br/lessons/spikeessential-science-connections/spikeessential-information-transfer/", "Atividade oficial em português para criar e testar códigos com luz, som e símbolos.")],
  mcAgency:[minecraft("Unit 1: The Agency", "https://education.minecraft.net/en-us/lessons/computing-the-agency", "world", "Unidade oficial de introdução aos controles, ao Code Builder e ao Agent.")],
  mcClassroom:[minecraft("Craft Our Classroom!", "https://education.minecraft.net/en-us/lessons/craft-our-classroom", "lesson", "Construção colaborativa de um mapa 3D da sala de aula.")],
  mcCommunity:[minecraft("Build and Share a Community", "https://education.minecraft.net/en-us/lessons/build-and-share-a-community", "world", "Desafio oficial para projetar, construir, compartilhar e melhorar uma comunidade.")],
  mcAgent:[minecraft("Coding Your Agent", "https://education.minecraft.net/en-us/lessons/coding-your-agent", "world", "Desafio oficial para programar o Agent, construir formas 3D e trabalhar com variáveis.")],
  mcLiteracy:[minecraft("League of Literacy", "https://education.minecraft.net/en-us/lessons/league-of-literacy", "world", "Desafio oficial de leitura, planejamento, construção e apresentação.")],
  mcAI:[minecraft("Hour of Code: AI for Good", "https://education.minecraft.net/en-us/lessons/hour-of-code-ai-for-good2", "world", "Mundo oficial sobre sequências, eventos, loops, condicionais, dados e incêndios florestais.")],
  mcFirstNight:[minecraft("Hour of AI: The First Night", "https://education.minecraft.net/en-us/lessons/hour-of-ai-the-first-night", "world", "Experiência oficial em português sobre padrões, verificação, depuração e supervisão humana da IA.")],
  mcChallenges:[minecraft("Kit de desafios de construção", "https://education.minecraft.net/en-us/resources/classroom-build-challenge", "guide", "Guia oficial para planejar, aplicar e avaliar desafios de construção.")],
  scratchStart:[scratch("Primeiros passos com Scratch", "https://scratch.mit.edu/ideas", "Tutoriais e cartões oficiais para iniciar projetos no Scratch tradicional.")],
  scratchEducators:[scratch("Scratch para educadores", "https://scratch.mit.edu/educators", "Orientações oficiais, ideias de projetos e materiais para aplicação em sala.")],
  primeDance:[
    legoLesson("Atividade Break Dance", "https://education.lego.com/en-us/lessons/prime-life-hacks/break-dance/", "Atividade oficial iniciante sobre motores, tempo, luz e sincronização."),
    manual("Break Dance — base e pernas (parte 1)", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt1b1cabca80846180/5ec9079400455b25665b177d/break-dance-bi-pdf-book1of2.pdf?locale=en-us"),
    manual("Break Dance — parte superior (parte 2)", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blta15ecafc09d28bab/5ec90760f8b8c35280dbf68c/break-dance-bi-pdf-book2of2.pdf?locale=en-us"),
  ],
  primeHopper:[
    legoLesson("Atividade Hopper Race", "https://education.lego.com/en-us/lessons/prime-invention-squad/hopper-race/", "Atividade oficial de prototipagem e melhoria de um robô que se desloca sem rodas."),
    manual("Hopper Race — montagem completa", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt7bbfa65868142763/5ec96ddaf1de13036f79e970/hopper-bi-pdf-book1of1.pdf?locale=en-us"),
  ],
  primeCleanup:[
    legoLesson("Atividade Super Cleanup", "https://education.lego.com/en-us/lessons/prime-invention-squad/super-cleanup/", "Atividade oficial para construir, comparar e testar dois tipos de garra."),
    manual("Super Cleanup — controle manual", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt7f0d32ef5ad51e71/5ec96f446676f37c355f9599/supercleaup-bi-pdf-book1of3.pdf?locale=en-us"),
    manual("Super Cleanup — garra 1", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt109d7e1105803297/5ec96f592faa6a256062b52f/supercleaup-bi-pdf-book2of3.pdf?locale=en-us"),
    manual("Super Cleanup — garra 2", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltdb108d96005a741c/5ec96f33e014445192ea99e2/supercleaup-bi-pdf-book3of3.pdf?locale=en-us"),
  ],
  primeDrive:[
    legoLesson("Training Camp 1: Driving Around", "https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-1-driving-around/", "Atividade oficial para construir uma base motriz e controlar movimentos com precisão."),
    manual("Practice Driving Base — montagem completa", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt06873e1b438a0d7e/5ec8e66f033ad5045f4c79a6/driving-base-bi-pdf-book1of1.pdf?locale=en-us"),
  ],
  primeDistance:[
    legoLesson("Training Camp 2: Playing with Objects", "https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-2-playing-with-objects/", "Atividade oficial com sensor de distância, braço e coleta de objeto."),
    manual("Driving Base — braço, marcador e cubo", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt4e022269eb67e4d6/5ec8e6ef694dd13eb3ffac29/driving-base-tools-accessories-bi-pdf-book1of1.pdf?locale=en-us"),
  ],
  primeLine:[
    legoLesson("Training Camp 3: Reacting to Lines", "https://education.lego.com/en-us/lessons/prime-competition-ready/training-camp-3-react-to-lines/", "Atividade oficial para usar sensor de cor e criar um seguidor de linha."),
    manual("Driving Base com sensor de cor", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt1e6ac4849c880a3d/5ec8e74f56542b5199dc012f/driving-base-with-color-sensor-bi-pdf-book1of1.pdf?locale=en-us"),
  ],
  primeAdvanced:[
    legoLesson("Assembling an Advanced Driving Base", "https://education.lego.com/en-us/lessons/prime-competition-ready/assembling-an-advanced-driving-base/", "Projeto oficial em quatro frentes de montagem para equipes de quatro estudantes."),
    manual("Advanced Driving Base — módulo 1", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt2d17fa746ea991e5/5ec8e83df11f7e3ed6d502d7/advanced-driving-base-bi-pdf-book1of5.pdf?locale=en-us"),
    manual("Advanced Driving Base — módulo 2", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltaab3ff32deffc66d/5ec8e800f32b1a633f9052dd/advanced-driving-base-bi-pdf-book2of5.pdf?locale=en-us"),
    manual("Advanced Driving Base — módulo 3", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt43751cee8daa89a7/5ec8e7f4f32b1a633f9052d7/advanced-driving-base-bi-pdf-book3of5.pdf?locale=en-us"),
    manual("Advanced Driving Base — módulo 4", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltbaec24f63e4075fc/5ec8e806f555a00375660930/advanced-driving-base-bi-pdf-book4of5.pdf?locale=en-us"),
    manual("Advanced Driving Base — união dos módulos", "https://assets.education.lego.com/v3/assets/blt293eea581807678a/bltdfc58a87376f5440/5ec8e868afa52a7b5193fda0/advanced-driving-base-bi-pdf-book5of5.pdf?locale=en-us"),
  ],
  primeBlocks:[legoLesson("My Code, Our Program", "https://education.lego.com/en-us/lessons/prime-competition-ready/my-code-our-program/", "Atividade oficial sobre Meus Blocos, organização do código e trajetórias geométricas.")],
  primeMission:[legoLesson("Mission Ready", "https://education.lego.com/en-us/lessons/prime-competition-ready/mission-ready/", "Desafio oficial avançado que integra movimentos, sensores, ferramentas e código modular.")],
  vexCastle:[vex("Castle Crasher Challenge", "https://education.vex.com/stemlabs/cs/cs-level-1-vexcode-vr-blocks/moving-your-robot/lesson-4-castle-crasher-challenge", "Desafio oficial de sequência e controle de deslocamento no VEXcode VR.")],
  vexHouse:[vex("Draw a House Challenge", "https://education.vex.com/stemlabs/cs/cs-level-1-vexcode-vr-blocks/repeating-behaviors/lesson-3-draw-a-house-challenge", "Desafio oficial com caneta virtual, formas geométricas e repetição.")],
  vexWall:[vex("Wall Maze Challenge", "https://education.vex.com/stemlabs/cs/cs-level-1-vexcode-vr-blocks/navigating-a-maze/lesson-4-wall-maze-challenge", "Desafio oficial para navegar com sensor de colisão e condição de espera.")],
  vexColor:[vex("Disk Maze Challenge", "https://education.vex.com/stemlabs/cs/cs-level-1-vexcode-vr-blocks/decisions-with-colors/lesson-5-disk-maze-challenge", "Desafio oficial com sensor de cor, decisões e repetição contínua.")],
  vexDisks:[vex("Disk Mover Challenge", "https://education.vex.com/stemlabs/cs/cs-level-1-vexcode-vr-blocks/moving-disks-with-loops/lesson-5-disk-mover-challenge", "Desafio oficial com eletroímã, sensores e laços aninhados.")],
  vexDynamic:[vex("Dynamic Castle Crasher", "https://education.vex.com/stemlabs/cs/cs-level-1-vexcode-vr-blocks/developing-algorithms/lesson-4-dynamic-castle-crasher-challenge", "Desafio oficial de algoritmo adaptativo em um cenário que muda a cada execução.")],
  mbStart:[microbit("Primeiras aulas com MakeCode e micro:bit", "https://microbit.org/teach/lessons/first-lessons-with-makecode-and-the-microbit/", "Seis aulas oficiais sobre entrada, saída, sensores, variáveis, seleção e aleatoriedade.")],
  mbSensory:[microbit("Sensory Classroom", "https://www.microbit.org/teach/lessons/sensory-classroom/", "Quatro aulas oficiais para criar um recurso sensorial acessível com entradas, saídas, iteração e seleção.")],
  mbCyber:[microbit("Introduction to Cyber Security", "https://microbit.org/teach/lessons/cyber-security/", "Três aulas oficiais sobre segurança, senhas, variáveis e gerador de senha forte.")],
  mbEnergy:[microbit("Energy Awareness", "https://microbit.org/teach/lessons/energy-awareness/", "Unidade oficial para coletar, tratar e apresentar dados sobre uso de energia.")],
  mbOceans:[microbit("Healthy Oceans", "https://www.microbit.org/teach/lessons/healthy-oceans/", "Desafio oficial sobre sensores sem fio, redes e monitoramento ambiental.")],
  mbAI:[microbit("First Lessons with micro:bit CreateAI", "https://microbit.org/teach/lessons/first-lessons-with-microbit-createai/", "Sete aulas oficiais para coletar dados, treinar, testar e melhorar modelos de movimento.")],
  mcCS:[minecraft("Computer Science Resources", "https://education.minecraft.net/en-us/resources/computer-science", "guide", "Portal oficial com progressão de programação em blocos, Agent, IA e cidadania digital.")],
  mcCyber:[minecraft("Cyber Fundamentals", "https://education.minecraft.net/en-us/lessons/cyber-fundamentals-2-the-interceptors", "world", "Mundo oficial sobre autenticação, resposta a incidentes e carreiras em cibersegurança.")],
  mcCloud:[minecraft("Cloud Community", "https://education.minecraft.net/en-us/lessons/cloud-community", "world", "Experiência oficial sobre datacenters, sustentabilidade, segurança e carreiras digitais.")],
};

const year3: RawLesson[] = [
  [1,"Tecnologia ao nosso redor","Tablet + desplugada","Uso responsável, rotina e papéis","Criar um mapa de tecnologias da escola","Classificar uma tecnologia e explicar sua escolha","Observação inicial"],
  [2,"Primeira montagem: Balsa do Rio","SPIKE Essential","Peças, sequência e primeira construção","Montar a River Ferry com o manual oficial e executar o programa inicial","Modificar um detalhe da balsa sem comprometer o movimento","Checklist de montagem","river"],
  [3,"Primeiros passos no ScratchJr","ScratchJr","Interface, personagem e comando iniciar","Mover um personagem até um ponto","Chegar a um destino combinado","Produto curto"],
  [4,"Eventos e cenas","ScratchJr","Início por bandeira ou toque e cenários","Criar a entrada de um personagem","Usar duas formas de iniciar uma ação","Observação"],
  [5,"Tempo, movimento e som","ScratchJr","Espera, movimento e áudio","Animar uma ação cotidiana","Sincronizar fala e movimento","Captura de tela e explicação"],
  [6,"Repetir para simplificar","ScratchJr","Padrões e repetição","Criar uma dança com padrão","Reduzir blocos repetidos","Comparação antes e depois"],
  [7,"Depurar é aprender","ScratchJr","Erro, previsão, teste e correção","Consertar programas preparados","Encontrar e corrigir dois erros","Registro de depuração"],
  [8,"História interativa","ScratchJr","Planejamento de cenas","Produzir uma história em dupla","Incluir evento e repetição","Rubrica leve"],
  [9,"Mostra e retomada","ScratchJr + SPIKE","Comunicação e conexão entre mídias","Apresentar a história e retomar a primeira construção","Explicar uma semelhança entre os dois programas","Autoavaliação","river"],
  [10,"Conhecendo o kit por funções","SPIKE Essential","Hub, motor, sensor e conexões","Organizar o kit e reconstruir a base da balsa","Localizar peças e explicar seu uso","Checklist do kit","river"],
  [11,"Primeiro veículo motorizado","SPIKE Essential","Motor, início e fim","Construir e programar o Taxi! Taxi!","Alterar a duração do movimento com intenção","Execução do modelo","taxi"],
  [12,"Direção e movimento","SPIKE Essential","Sentido, inclinação e previsão","Construir o Hovering Helicopter e testar respostas","Prever um resultado antes de executar","Tabela de testes","helicopter"],
  [13,"Estruturas firmes","SPIKE Essential","Estabilidade e reforço","Montar a base do High-Tech Playground","Melhorar uma parte instável","Observação docente","playground"],
  [14,"Eixos e deslocamento","SPIKE Essential","Rotação e movimento","Construir o Swamp Boat e observar sua transmissão","Percorrer uma distância-alvo","Medição simples","swamp"],
  [15,"Engrenagens em ação","SPIKE Essential","Transmissão, tamanho e rotação","Montar o Mini Mini-Golf e comparar movimentos","Modificar a força ou velocidade do mecanismo","Explicação oral","golf"],
  [16,"Movimento com propósito","SPIKE Essential","Função do mecanismo","Construir o Big Little Helper","Adicionar uma função útil ao modelo","Rubrica curta","helper"],
  [17,"Desafio da precisão","SPIKE Essential","Iteração e variável controlada","Montar o Bowling Fun e atingir uma marca","Mudar apenas uma variável por vez","Ficha de testes","bowling"],
  [18,"Mini projeto mecânico","SPIKE Essential","Integração e apresentação","Montar e adaptar o Junior Pinball","Demonstrar funcionamento confiável","Rubrica da unidade","pinball"],
  [19,"Máquinas que percebem","SPIKE + desplugada","Entrada, processamento e saída","Jogar o desafio dos sentidos e identificar partes","Classificar exemplos como entrada ou saída","Perguntas orais"],
  [20,"Luz e percepção","SPIKE Essential","Sensor de cor e resposta","Usar a atividade Como os Olhos Veem","Criar uma resposta visual ou sonora","Execução do programa","eyes"],
  [21,"Evento e resposta","SPIKE Essential","Causa e efeito","Construir o High-Tech Playground e programar uma resposta","Criar duas respostas diferentes","Observação","playground"],
  [22,"Repetição no robô","SPIKE Essential","Loop e comportamento contínuo","Usar a montagem Swamp Boat em ciclos","Parar o comportamento de forma controlada","Leitura do programa","swamp"],
  [23,"Decisão simples","SPIKE Essential","Regra se/então introdutória","Adaptar a montagem Como os Olhos Veem","Explicar a regra em palavras","Explicação oral","eyes"],
  [24,"Dados para melhorar","SPIKE Essential + tablet","Registro e comparação","Realizar três testes com o Bowling Fun","Escolher a melhor configuração com evidência","Tabela de evidências","bowling"],
  [25,"Missão acessível","SPIKE Essential","Tecnologia, função e pessoas","Construir o Big Little Helper","Adaptar a solução para um usuário","Empatia e função","helper"],
  [26,"Depuração colaborativa","SPIKE Essential","Diagnóstico e comunicação","Trocar modelos A-Maze-Ing entre duplas","Dar feedback específico","Dois acertos e uma sugestão","maze"],
  [27,"Desafio autônomo","SPIKE Essential","Integração sensor-programa","Programar o Trash Monster Machine","Cumprir dois critérios de sucesso","Rubrica da unidade","trash"],
  [28,"Descobrir um problema","Tablet + observação","Empatia e investigação","Observar uma rotina da turma ou escola","Definir usuário e necessidade","Ficha do problema"],
  [29,"Imaginar soluções","Tablet + papel","Ideação e critérios","Gerar três ideias e escolher uma","Justificar a escolha com critérios","Conferência docente"],
  [30,"Planejar o protótipo","Tablet + papel","Desenho, sequência e papéis","Criar storyboard, esboço e lista de peças","Prever como a solução será testada","Plano aprovado"],
  [31,"Protótipo 1","SPIKE Essential","Construção incremental","Usar a base Good Morning Machine para criar a função principal","Fazer a versão mínima funcionar","Observação","morning"],
  [32,"Programa 1","SPIKE Essential","Integração de comandos","Programar o comportamento central do protótipo","Nomear os blocos usados","Teste funcional","morning"],
  [33,"Testar com critérios","SPIKE Essential + tablet","Evidência e feedback","Realizar testes entre duplas com a base Big Little Helper","Registrar uma falha e sua causa provável","Ficha de teste","helper"],
  [34,"Melhorar e integrar","SPIKE + ScratchJr","Iteração e comunicação multimídia","Revisar o protótipo e criar explicação digital","Implementar uma melhoria comprovável","Comparação antes e depois","helper"],
  [35,"Preparar a apresentação","Tablet + protótipo","Síntese e oralidade","Criar roteiro problema-solução-teste","Garantir que todos falem e demonstrem","Ensaio com pares","helper"],
  [36,"Mostra TIER","Todos os recursos","Autoria, reflexão e celebração","Apresentar solução e portfólio","Responder perguntas e propor próximo passo","Rubrica final e autoavaliação","helper"],
];

const year4: RawLesson[] = [
  [1,"Reentrada digital e papéis","Tablet + ScratchJr","Autonomia, segurança e colaboração","Revisar combinados e montar duplas produtivas","Criar um protocolo de cuidado com os equipamentos","Checklist inicial"],
  [2,"Mensagens entre personagens","ScratchJr","Eventos coordenados","Criar duas ações conectadas por mensagem","Sincronizar três personagens","Leitura do programa"],
  [3,"Narrativa com escolhas","ScratchJr","Planejamento e causa e efeito","Criar duas cenas e uma escolha para o usuário","Explicar o fluxo com setas","Mapa da narrativa"],
  [4,"Projeto e depuração","ScratchJr","Critérios, teste e melhoria","Testar a narrativa de outra dupla","Corrigir um erro e justificar a mudança","Registro antes e depois"],
  [5,"Do plano 2D ao espaço 3D","Tablet + papel","Escala, perspectiva e mapeamento","Desenhar a sala em uma grade","Converter cinco objetos em blocos","Mapa quadriculado"],
  [6,"Primeiros passos no Minecraft","Minecraft Education","Controles, inventário e cidadania digital","Explorar um mundo-modelo com missões guiadas","Localizar e registrar cinco recursos","Checklist de navegação","mcAgency"],
  [7,"Nossa sala em blocos","Minecraft Education","Representação espacial","Construir parte da sala a partir do mapa","Manter proporções combinadas","Captura de tela comentada","mcClassroom"],
  [8,"Comunidade colaborativa","Minecraft Education","Construção em equipe e feedback","Criar uma casa em uma comunidade compartilhada","Melhorar após visita de outra equipe","Rubrica de colaboração","mcCommunity"],
  [9,"Mostra do mundo digital","Minecraft + tablet","Comunicação e autoria","Apresentar percurso, escolhas e melhorias","Conectar o projeto a uma necessidade real","Apresentação curta","mcCommunity"],
  [10,"Retomada do SPIKE","SPIKE Essential","Componentes, pareamento e função","Reconstruir e programar a Balsa do Rio","Criar uma sequência mais eficiente","Checklist técnico","river"],
  [11,"Energia e movimento","SPIKE Essential","Energia, força e transferência","Construir o Mini Mini-Golf","Comparar duas configurações","Tabela de resultados","golf"],
  [12,"Força com precisão","SPIKE Essential","Potência e distância","Montar Bowling Fun","Atingir o alvo três vezes","Registro de consistência","bowling"],
  [13,"Ângulos em ação","SPIKE Essential","Ângulo, direção e potência","Construir High Stick Hockey","Controlar o ângulo do movimento","Medição e explicação","hockey"],
  [14,"Labirinto de energia","SPIKE Essential","Colisão, energia e dados","Montar A-Maze-Ing","Alterar apenas uma variável","Ficha de testes","maze"],
  [15,"Mecanismo de lançamento","SPIKE Essential","Armazenamento e liberação de energia","Construir Junior Pinball","Criar um lançamento previsível","Demonstração","pinball"],
  [16,"Dados do parque","SPIKE + tablet","Coleta e representação de dados","Comparar resultados de três montagens","Criar um gráfico simples","Gráfico e conclusão","bowling"],
  [17,"Melhoria de engenharia","SPIKE Essential","Critérios, restrições e iteração","Escolher uma montagem do módulo para melhorar","Comprovar a melhoria com dados","Antes e depois","golf"],
  [18,"Parque TIER","SPIKE Essential","Integração mecânica","Organizar um circuito com duas atrações","Criar regras claras para o visitante","Rubrica da unidade","pinball"],
  [19,"Luz e visão","SPIKE Essential + Ciências","Reflexão da luz e sensores","Realizar Como os Olhos Veem","Comparar superfícies claras e escuras","Tabela de observação","eyes"],
  [20,"Estruturas dos animais","SPIKE Essential + Ciências","Estrutura e função","Criar um modelo inspirado em uma estrutura animal","Relacionar forma e função","Explicação científica","animals"],
  [21,"Recursos energéticos","SPIKE Essential + tablet","Fontes renováveis e impacto","Investigar e modelar uma fonte de energia","Defender uma escolha com evidências","Mapa de argumentos","energy"],
  [22,"Códigos de luz e som","SPIKE Essential","Informação, padrão e código","Construir um sistema de comunicação","Enviar uma mensagem sem fala","Decodificação por pares","information"],
  [23,"Edifícios contra terremotos","SPIKE Essential","Estabilidade, força e teste","Construir a máquina de terremoto e um edifício","Manter a estrutura em quatro velocidades","Tabela de resistência","hazards"],
  [24,"Teste justo","SPIKE + tablet","Variável controlada e evidência","Comparar duas estruturas na máquina de teste","Mudar somente uma condição","Ficha de investigação","hazards"],
  [25,"Explicar ciência com mídia","ScratchJr + tablet","Síntese e comunicação","Criar uma animação sobre a investigação","Usar dados reais no roteiro","Produto multimídia"],
  [26,"Redesenhar com evidências","SPIKE Essential","Iteração orientada por dados","Melhorar o edifício resistente","Justificar cada alteração","Comparação técnica","hazards"],
  [27,"Feira de ciência TIER","Todos os recursos","Investigação e argumentação","Apresentar modelo, dados e conclusão","Responder uma pergunta com evidência","Rubrica da unidade","hazards"],
  [28,"Problemas da comunidade","Tablet + observação","Empatia, território e prioridades","Mapear um problema da escola ou bairro","Escolher um problema viável","Ficha de oportunidade"],
  [29,"Comunidade sustentável","Minecraft Education","Planejamento urbano e colaboração","Projetar uma solução no mundo compartilhado","Atender três critérios de sustentabilidade","Registro visual","mcCommunity"],
  [30,"Arquitetura da solução","Minecraft + papel","Sistema, partes e fluxo","Desenhar o caminho do usuário","Identificar entrada, processo e saída","Diagrama do sistema","mcChallenges"],
  [31,"Protótipo físico","SPIKE Essential","Construção funcional","Usar Trash Monster Machine como base de solução","Adaptar a entrada de resíduos","Teste funcional","trash"],
  [32,"Automação simples","SPIKE Essential","Eventos, repetição e resposta","Programar o protótipo para reagir","Criar um estado de segurança","Leitura do código","trash"],
  [33,"Gêmeo digital","Minecraft Education","Representação e simulação","Construir no Minecraft o contexto de uso","Simular o percurso de um usuário","Vídeo curto","mcCommunity"],
  [34,"Integração e teste","SPIKE + Minecraft","Critérios e evidências","Testar solução física e cenário digital","Registrar uma falha de cada parte","Protocolo de teste","trash"],
  [35,"Pitch da comunidade","Tablet + protótipos","Síntese e comunicação","Preparar apresentação problema-solução-evidência","Falar em até três minutos","Ensaio avaliado"],
  [36,"Mostra TIER 4º ano","Todos os recursos","Autoria, impacto e reflexão","Apresentar solução híbrida","Propor a próxima melhoria","Rubrica final","mcCommunity"],
];

const year5: RawLesson[] = [
  [1,"Sistemas e responsabilidade digital","Tablet + Minecraft","Papéis, segurança e pensamento sistêmico","Mapear pessoas, regras e componentes de uma plataforma","Explicar duas relações do sistema","Mapa inicial"],
  [2,"Conhecendo o Agent","Minecraft Education + MakeCode","Comandos, eventos e coordenadas","Iniciar a unidade The Agency","Fazer o Agent localizar e comunicar uma posição","Checklist de comandos","mcAgency"],
  [3,"Sequências eficientes","Minecraft + MakeCode","Algoritmo e decomposição","Programar deslocamentos do Agent","Resolver a rota com menos blocos","Comparação de programas","mcAgency"],
  [4,"Loops para construir","Minecraft + MakeCode","Repetição e padrões","Programar o Agent para construir uma ponte","Alterar comprimento sem reescrever tudo","Leitura do loop","mcAgency"],
  [5,"Coordenadas e formas 3D","Minecraft + MakeCode","Geometria e localização","Planejar uma forma tridimensional","Prever vértices e dimensões","Esboço técnico","mcAgent"],
  [6,"Agent construtor","Minecraft + MakeCode","Automação e geometria","Programar a construção de uma forma 3D","Construir uma segunda forma","Produto digital","mcAgent"],
  [7,"Variáveis mudam projetos","Minecraft + MakeCode","Variáveis e generalização","Alterar dimensões do algoritmo","Criar três tamanhos com o mesmo programa","Tabela de parâmetros","mcAgent"],
  [8,"Depuração por evidências","Minecraft + MakeCode","Teste, erro e rastreamento","Corrigir algoritmos de outra equipe","Descrever causa e correção","Diário de depuração","mcAgent"],
  [9,"Desafio do bairro automatizado","Minecraft Education","Integração e colaboração","Construir uma parte da comunidade com Agent","Cumprir critérios de forma e eficiência","Rubrica da unidade","mcCommunity"],
  [10,"Sistemas automáticos físicos","SPIKE Essential","Entrada, processo e saída","Analisar a Good Morning Machine","Diagramar o fluxo completo","Diagrama do sistema","morning"],
  [11,"Rotinas programadas","SPIKE Essential","Eventos e sequência","Construir Good Morning Machine","Criar uma segunda rotina","Teste funcional","morning"],
  [12,"Ajudante automatizado","SPIKE Essential","Critérios, restrições e função","Construir Big Little Helper","Adaptar para um usuário específico","Rubrica de função","helper"],
  [13,"Sistema com múltiplas ações","SPIKE Essential","Coordenação e decomposição","Construir High-Tech Playground","Coordenar dois movimentos","Leitura do código","playground"],
  [14,"Máquina para resíduos","SPIKE Essential","Automação e sustentabilidade","Construir Trash Monster Machine","Definir uma regra operacional","Demonstração","trash"],
  [15,"Gerador de ideias","SPIKE Essential","Aleatoriedade e autoria","Construir Literary Randomizer","Criar categorias próprias","Produto e explicação","literary"],
  [16,"Condições e sensores","SPIKE Essential","Se/então/senão","Adaptar Como os Olhos Veem","Criar duas respostas conforme a leitura","Teste de casos","eyes"],
  [17,"Otimização com dados","SPIKE + tablet","Métricas e iteração","Executar cinco testes de uma automação","Melhorar uma métrica definida","Tabela comparativa","helper"],
  [18,"Sistema autônomo TIER","SPIKE Essential","Integração e confiabilidade","Criar uma automação a partir de uma base oficial","Funcionar em três testes seguidos","Rubrica da unidade","trash"],
  [19,"Dados, padrões e inteligência artificial","Tablet + desplugada","Classificação, previsão e supervisão","Classificar exemplos e discutir erros","Encontrar um caso ambíguo","Mapa conceitual"],
  [20,"IA para o bem","Minecraft Education + MakeCode","Dados, incêndios e Agent","Iniciar Hour of Code: AI for Good","Programar o Agent para coletar dados","Registro das missões","mcAI"],
  [21,"Sequências na missão","Minecraft + MakeCode","Decomposição e eventos","Resolver as primeiras missões da floresta","Explicar a ordem necessária","Leitura do programa","mcAI"],
  [22,"Loops em larga escala","Minecraft + MakeCode","Repetição e eficiência","Automatizar a remoção de riscos","Comparar código manual e repetido","Contagem de blocos","mcAI"],
  [23,"Condições e classificação","Minecraft + MakeCode","Decisão e critérios","Programar o Agent para decidir sobre materiais","Testar um falso positivo","Tabela de casos","mcAI"],
  [24,"Verificar antes de confiar","Minecraft + tablet","Validação e supervisão humana","Auditar as decisões do Agent","Documentar um erro e sua consequência","Relato de auditoria","mcAI"],
  [25,"A primeira noite com IA","Minecraft Education","Padrões, generalização e correção","Explorar Hour of AI: The First Night","Corrigir uma orientação da IA","Registro de decisão","mcFirstNight"],
  [26,"Tecnologia responsável","Tablet + debate","Privacidade, viés e impacto","Analisar cenários de uso de IA","Criar três regras de uso responsável","Carta de princípios","mcFirstNight"],
  [27,"Missão sustentável","Minecraft + MakeCode","Integração de código, dados e ciência","Concluir e explicar uma solução da floresta","Defender a solução com evidências","Rubrica da unidade","mcAI"],
  [28,"Desafio final e ODS","Tablet + pesquisa","Problema, usuário e impacto","Escolher um desafio alinhado a um ODS","Definir indicador de sucesso","Briefing do projeto","mcChallenges"],
  [29,"Pesquisa e requisitos","Tablet + entrevistas","Evidência, restrição e prioridade","Coletar dados do contexto","Transformar achados em requisitos","Quadro de requisitos"],
  [30,"Arquitetura da solução","Minecraft + papel","Sistema híbrido e fluxo de dados","Modelar cenário, usuário e automação","Identificar falhas possíveis","Diagrama e mundo-base","mcCommunity"],
  [31,"Protótipo físico avançado","SPIKE Essential","Construção modular","Usar Big Little Helper como referência","Trocar um módulo sem refazer a base","Teste modular","helper"],
  [32,"Código da automação","SPIKE Essential","Condição, loop e estado","Programar o comportamento completo","Adicionar modo seguro","Matriz de testes","helper"],
  [33,"Simulação no Minecraft","Minecraft Education","Cenário, escala e experiência","Simular o contexto de uso","Observar um usuário externo","Registro da simulação","mcCommunity"],
  [34,"Teste integrado e iteração","SPIKE + Minecraft + tablet","Métrica, causa e melhoria","Testar partes físicas e digitais","Comprovar uma melhoria","Relatório antes e depois","helper"],
  [35,"Pitch com evidências","Tablet + protótipos","Argumentação, dados e síntese","Preparar demonstração e portfólio","Responder objeções com evidências","Banca simulada"],
  [36,"Mostra TIER 5º ano","Todos os recursos","Autonomia, impacto e próximos passos","Apresentar projeto final híbrido","Avaliar impacto e continuidade","Rubrica final e autoavaliação","mcCommunity"],
];

const year6: RawLesson[] = [
  [1,"Entrada no Fundamental II","Tablet + desplugada","Rotina, papéis de equipe e diagnóstico","Resolver um desafio de instruções ambíguas e construir os combinados do laboratório","Reescrever uma instrução para que outra equipe execute sem perguntas","Registro diagnóstico"],
  [2,"Scratch: eventos e coordenadas","Scratch","Palco, atores, eventos e posição","Criar uma animação em que um personagem percorre três pontos do palco","Usar dois eventos de início e exibir as coordenadas finais","Projeto salvo","scratchStart"],
  [3,"Sequências que contam histórias","Scratch","Sequência, tempo e mensagens","Programar uma cena com começo, conflito e encerramento","Coordenar dois personagens por mensagens","Roteiro e execução","scratchStart"],
  [4,"Movimento com precisão","Scratch","Coordenadas, direção e operadores","Criar um percurso guiado por setas no palco","Chegar ao destino com no máximo oito blocos de movimento","Código comentado","scratchStart"],
  [5,"Loops e padrões visuais","Scratch","Repetição e regularidade","Programar um ator para desenhar um padrão com a extensão Caneta","Transformar comandos repetidos em um único loop","Comparação do código","scratchStart"],
  [6,"Decisões no jogo","Scratch","Condições, toque e pontuação","Criar um minijogo de coleta com condição de acerto","Adicionar uma regra de vitória comunicada ao jogador","Teste por pares","scratchStart"],
  [7,"Variáveis registram estados","Scratch","Variável, estado e atualização","Adicionar pontos e cronômetro ao minijogo","Impedir que a pontuação continue após o fim","Matriz de testes","scratchStart"],
  [8,"Depuração em equipe","Scratch","Rastreamento, hipótese e correção","Trocar projetos e localizar três falhas preparadas","Registrar causa, correção e novo teste de cada falha","Diário de depuração","scratchEducators"],
  [9,"Arcade TIER","Scratch","Integração e comunicação","Finalizar e apresentar um minijogo jogável","Receber um teste externo e implementar uma melhoria","Rubrica do módulo","scratchEducators"],
  [10,"Conhecendo o SPIKE Prime","SPIKE Prime","Hub, portas, motores, matriz de luz e segurança","Identificar componentes, parear o hub e executar três comandos de teste","Criar um sinal de início e um de encerramento na matriz","Checklist técnico"],
  [11,"Primeira montagem: Break Dance","SPIKE Prime","Motor, tempo e sincronização","Montar o Break Dance seguindo os dois manuais oficiais e executar o programa inicial","Sincronizar pernas, luz e um som em ciclos regulares","Modelo funcionando","primeDance"],
  [12,"Velocidade, graus e rotações","SPIKE Prime","Parâmetros de motor e unidades","Usar o Break Dance para comparar segundos, graus e rotações","Produzir o mesmo movimento com duas unidades diferentes","Tabela de equivalências","primeDance"],
  [13,"Protótipos sem rodas","SPIKE Prime","Prototipagem, atrito e locomoção","Montar o Hopper Race e testar o deslocamento original","Criar um segundo formato de perna e comparar o tempo","Ficha de testes","primeHopper"],
  [14,"Teste justo no Hopper","SPIKE Prime + tablet","Variável controlada, distância e tempo","Realizar três corridas mudando apenas uma variável","Calcular velocidade média e justificar a melhor configuração","Tabela e conclusão","primeHopper"],
  [15,"Engrenagens e transmissão","SPIKE Prime","Relação de transmissão, torque e velocidade","Construir um mecanismo curto com duas engrenagens e observar a saída","Inverter o objetivo de velocidade para força sem trocar o motor","Esquema do mecanismo"],
  [16,"Estruturas resistentes","SPIKE Prime","Triangulação, apoio e rigidez","Construir uma torre com limite de peças e aplicar carga progressiva","Reforçar a torre usando no máximo seis peças extras","Registro antes e depois"],
  [17,"Mecanismo com finalidade","SPIKE Prime","Função, critérios e restrições","Projetar um mecanismo que mova um objeto por 20 cm","Cumprir precisão, segurança e repetibilidade em três testes","Checklist de critérios"],
  [18,"Desafio mecânico TIER","SPIKE Prime","Integração mecânica e apresentação","Criar uma máquina com entrada manual e saída motorizada","Explicar energia, transmissão e uma melhoria baseada em teste","Rubrica do módulo"],
  [19,"Robô virtual e mundo físico","VEXcode VR (digital)","Simulação, sequência e comparação","Abrir o VEXcode VR no tablet e mapear comandos equivalentes aos do SPIKE","Prever três movimentos antes de executar","Quadro comparativo","vexCastle"],
  [20,"Castle Crasher","VEXcode VR (digital)","Movimento, giro e sequência","Resolver o desafio Castle Crasher com blocos de deslocamento","Reduzir o número de blocos mantendo todos os alvos","Projeto salvo","vexCastle"],
  [21,"Desenhar com loops","VEXcode VR (digital)","Repetição e geometria","Resolver Draw a House usando Caneta e repetição","Criar uma segunda figura regular com um loop parametrizado","Captura e código","vexHouse"],
  [22,"Base motriz do SPIKE","SPIKE Prime","Motores pareados, direção e pseudocódigo","Montar a Practice Driving Base com o manual oficial","Programar um quadrado e marcar o erro final de posição","Trajeto e medição","primeDrive"],
  [23,"Calibrar para a distância","SPIKE Prime + tablet","Circunferência, rotação e calibração","Medir o deslocamento por rotação e criar uma constante prática","Percorrer 50 cm com erro máximo de 5 cm","Planilha de calibração","primeDrive"],
  [24,"Sensor de distância","SPIKE Prime","Entrada, limiar e resposta","Montar o braço e programar a coleta de um cubo a 30 cm","Alterar o limiar para dois pontos de partida","Matriz de casos","primeDistance"],
  [25,"Labirinto com colisão","VEXcode VR (digital)","Sensor de colisão e condição","Resolver o Wall Maze com sensor Bumper e esperar até","Substituir uma sequência fixa por um padrão reutilizável","Execução completa","vexWall"],
  [26,"Do virtual ao físico","SPIKE Prime + VEXcode VR","Transferência de estratégias e limites da simulação","Comparar um percurso no VEXcode VR com a base motriz do SPIKE","Listar duas diferenças e recalibrar o programa físico","Relatório comparativo","primeDrive"],
  [27,"Missão autônoma inicial","SPIKE Prime","Sensores, condição e confiabilidade","Programar a base para se aproximar, parar e mover um objeto","Concluir a missão em três execuções consecutivas","Rubrica do módulo","primeDistance"],
  [28,"Investigar um problema","Tablet + observação","Usuário, necessidade e evidência","Observar uma rotina escolar e entrevistar um possível usuário","Transformar achados em uma frase de problema sem propor solução","Briefing do problema"],
  [29,"Critérios e ideias","Tablet + papel","Ideação, critérios e restrições","Gerar quatro ideias e selecionar uma com matriz de decisão","Incluir segurança, utilidade e viabilidade na escolha","Matriz de decisão"],
  [30,"Arquitetura do protótipo","Tablet + papel","Entrada, processamento, saída e papéis","Desenhar o sistema, separar tarefas e elaborar protocolo de teste","Prever uma falha e uma resposta segura","Diagrama aprovado"],
  [31,"Construção da versão mínima","SPIKE Prime","Prototipagem incremental","Construir apenas a função principal da solução com o kit","Demonstrar a função antes de acrescentar acabamento","Teste funcional"],
  [32,"Programação e estados","SPIKE Prime","Eventos, estados e fluxo","Programar início, funcionamento e parada segura","Adicionar um sinal claro para cada estado","Diagrama e código"],
  [33,"Teste com usuários","SPIKE Prime + tablet","Protocolo, observação e feedback","Aplicar três casos de teste com outra equipe","Registrar uma falha reproduzível e sua causa provável","Ficha de testes"],
  [34,"Iterar com evidências","SPIKE Prime","Melhoria, métrica e comparação","Implementar uma alteração baseada nos testes","Comprovar a melhoria com a mesma métrica inicial","Antes e depois"],
  [35,"Documentar e apresentar","Tablet + protótipo","Documentação, autoria e comunicação","Criar um pitch com problema, sistema, testes e resultado","Apresentar em três minutos com participação de todos","Ensaio avaliado"],
  [36,"Mostra TIER 6º ano","Todos os recursos","Autoria, colaboração e reflexão","Apresentar a solução para uma banca da turma","Responder uma pergunta técnica e definir o próximo passo","Rubrica final e autoavaliação"],
];

const year7: RawLesson[] = [
  [1,"Retomada e contrato de equipe","Tablet + Scratch","Diagnóstico, arquivos e papéis","Revisar um projeto curto e diagnosticar eventos, loops, condições e variáveis","Distribuir funções para uma equipe de quatro e definir regra de versionamento","Checklist diagnóstico","scratchEducators"],
  [2,"Variáveis em um simulador","Scratch","Variáveis, operadores e interface","Criar um simulador que converte uma medida escolhida","Validar três entradas e tratar um valor inválido","Tabela de testes","scratchStart"],
  [3,"Listas organizam dados","Scratch","Listas, registro e consulta","Criar um placar que armazena nomes e pontuações","Ordenar ou destacar o maior valor sem apagar os dados","Projeto salvo","scratchStart"],
  [4,"Blocos personalizados","Scratch","Decomposição, parâmetro e reuso","Transformar uma ação repetida em Meu Bloco com parâmetro","Usar o mesmo bloco em três situações diferentes","Leitura do código","scratchStart"],
  [5,"Clones e padrões","Scratch","Clonagem, evento e eficiência","Criar objetos que surgem e se comportam por clones","Controlar quantidade e tempo de vida dos clones","Teste de desempenho","scratchEducators"],
  [6,"Jogo com níveis","Scratch","Estados, dificuldade e progressão","Planejar e programar dois níveis de um jogo","Aumentar dificuldade alterando parâmetros, não duplicando telas","Fluxograma e projeto","scratchEducators"],
  [7,"Dados do jogador","Scratch","Métricas, balanceamento e evidência","Coletar tempo, tentativas ou acertos de três jogadores","Ajustar uma regra com base nos dados","Relatório de balanceamento","scratchEducators"],
  [8,"Teste de usabilidade","Scratch + tablet","Usabilidade, acessibilidade e feedback","Aplicar roteiro de teste com outra equipe","Implementar uma melhoria de clareza ou acessibilidade","Antes e depois","scratchEducators"],
  [9,"Festival de jogos TIER","Scratch","Integração, autoria e apresentação","Publicar localmente e apresentar o jogo com manual do usuário","Defender uma decisão de código e uma de design","Rubrica do módulo","scratchEducators"],
  [10,"Base motriz e papéis técnicos","SPIKE Prime","Montagem modular e colaboração","Montar a Practice Driving Base dividindo funções entre montador, programador, analista e documentador","Testar portas, cabos e sentido dos motores sem ajuda do professor","Checklist técnico","primeDrive"],
  [11,"Geometria do movimento","SPIKE Prime","Rotação, circunferência e ângulo","Calibrar a base para percorrer segmentos e giros planejados","Desenhar um triângulo com erro final medido","Tabela de calibração","primeDrive"],
  [12,"Garra e critérios de projeto","SPIKE Prime","Mecanismo, força e comparação","Montar as duas garras do Super Cleanup e definir critérios","Comparar objetos de mesmo tamanho e massas diferentes","Tabela ponderada","primeCleanup"],
  [13,"Teste justo de garras","SPIKE Prime + tablet","Variável controlada e análise","Executar protocolo de testes nas duas garras oficiais","Recomendar uma garra para três objetos com evidências","Relatório técnico","primeCleanup"],
  [14,"Redesenho de uma garra","SPIKE Prime","Iteração e otimização","Projetar uma terceira garra a partir dos resultados","Superar a melhor garra oficial em um critério definido","Antes e depois","primeCleanup"],
  [15,"Sensor de cor e limiar","SPIKE Prime","Luz refletida, calibração e condição","Montar a base com sensor de cor e medir preto e branco","Definir um limiar usando a média das leituras","Registro de calibração","primeLine"],
  [16,"Seguidor de linha","SPIKE Prime","Controle por realimentação e loop","Programar a base para seguir uma linha simples","Completar duas curvas sem sair do percurso","Vídeo e código","primeLine"],
  [17,"Otimizar o seguidor","SPIKE Prime + tablet","Velocidade, precisão e métrica","Testar três velocidades no mesmo percurso","Escolher a configuração com melhor equilíbrio entre tempo e erros","Gráfico e conclusão","primeLine"],
  [18,"Circuito autônomo TIER","SPIKE Prime","Integração, confiabilidade e comunicação","Criar um circuito com linha, parada e coleta","Concluir três missões seguidas e explicar o algoritmo","Rubrica do módulo","primeLine"],
  [19,"micro:bit é um sistema","micro:bit + MakeCode","Entradas, saídas e transferência de código","Identificar componentes, criar um crachá e transferir o programa","Exibir nome e ícone usando sequência e loop","Micro:bit funcionando","mbStart"],
  [20,"Botões e estados","micro:bit + MakeCode","Eventos, entrada e saída","Criar um crachá de emoções controlado pelos botões","Adicionar um terceiro estado usando A+B","Matriz de eventos","mbStart"],
  [21,"Acelerômetro e variável","micro:bit + MakeCode","Sensor, evento e contagem","Construir um contador de passos e calibrar o gesto","Reduzir falsos positivos em dez movimentos de teste","Tabela de precisão","mbStart"],
  [22,"Luz automática","micro:bit + MakeCode","Sensor de luz, condição e loop","Programar uma luz noturna com se/senão","Calibrar o limiar para dois ambientes da escola","Matriz de casos","mbStart"],
  [23,"Aleatoriedade e justiça","micro:bit + MakeCode","Número aleatório, variável e simulação","Criar pedra-papel-tesoura eletrônico","Executar 30 rodadas e discutir distribuição dos resultados","Tabela de frequência","mbStart"],
  [24,"Planejar um recurso sensorial","micro:bit + MakeCode","Acessibilidade, empatia e requisitos","Investigar necessidades e desenhar um apoio sensorial para a sala","Definir usuário, entrada, saída e critério de sucesso","Plano do protótipo","mbSensory"],
  [25,"Padrões de luz acessíveis","micro:bit + MakeCode","Pseudocódigo, iteração e percepção","Programar dois padrões de luz controlados por botão","Evitar piscadas desconfortáveis e justificar escolhas","Teste de acessibilidade","mbSensory"],
  [26,"Sistema sensorial responsivo","micro:bit + MakeCode","Seleção, entrada e saída","Integrar sensor ou botão ao recurso sensorial","Oferecer ao usuário duas formas de controle","Protótipo funcional","mbSensory"],
  [27,"Avaliação com usuário","micro:bit + MakeCode","Usabilidade, feedback e melhoria","Aplicar teste por pares com roteiro de acessibilidade","Implementar uma melhoria solicitada pelo usuário","Rubrica do módulo","mbSensory"],
  [28,"Ambiente inteligente: problema","Tablet + observação","Sistema, usuário e sustentabilidade","Mapear um desconforto ou desperdício em um ambiente da escola","Coletar três evidências antes de escolher o foco","Briefing com evidências"],
  [29,"Cenário no Minecraft","Minecraft Education","Modelagem espacial e experiência do usuário","Construir o ambiente atual e marcar pontos de intervenção","Representar escala e circulação de pessoas","Registro do mundo","mcCommunity"],
  [30,"Arquitetura da solução","Tablet + papel","Sensores, atuadores, dados e fluxo","Desenhar uma solução que combine micro:bit ou SPIKE ao cenário","Identificar dados necessários e decisões do sistema","Diagrama técnico"],
  [31,"Protótipo físico 1","SPIKE Prime ou micro:bit","Prototipagem modular e segurança","Construir a função principal com um kit por grupo","Demonstrar entrada, processamento e saída","Teste funcional"],
  [32,"Código e interface","SPIKE Prime ou micro:bit","Estados, feedback e controle","Programar o fluxo e criar sinais compreensíveis ao usuário","Incluir modo manual e parada segura","Matriz de estados"],
  [33,"Simular o contexto","Minecraft + tablet","Cenário, percurso e casos de uso","Simular duas pessoas usando a solução no mundo digital","Encontrar um ponto de atrito e registrá-lo","Relato de simulação","mcCommunity"],
  [34,"Teste integrado","SPIKE Prime + micro:bit + Minecraft","Integração, métrica e iteração","Executar o mesmo caso no protótipo e no cenário","Comprovar uma melhoria com antes e depois","Relatório integrado"],
  [35,"Pitch do ambiente inteligente","Tablet + protótipo","Argumentação, evidências e papéis","Preparar apresentação com problema, sistema, dados e impacto","Responder a uma objeção de custo, acesso ou segurança","Ensaio com banca"],
  [36,"Mostra TIER 7º ano","Todos os recursos","Autoria, impacto e reflexão","Apresentar a solução de ambiente inteligente","Avaliar contribuição individual e próximo passo do sistema","Rubrica final e autoavaliação"],
];

const year8: RawLesson[] = [
  [1,"Algoritmos que se adaptam","Tablet + desplugada","Algoritmo, entrada variável e estratégia","Resolver três versões de um percurso com regras que mudam","Criar uma regra geral que funcione sem conhecer o mapa","Registro diagnóstico"],
  [2,"Simulação com variáveis","Scratch","Modelo, parâmetro e comportamento","Criar uma simulação de crescimento, movimento ou contágio","Permitir ao usuário alterar dois parâmetros","Projeto comentado","scratchEducators"],
  [3,"Procedimentos reutilizáveis","Scratch","Meu Bloco, parâmetro e abstração","Decompor a simulação em três blocos personalizados","Alterar o comportamento mudando apenas os parâmetros","Mapa de blocos","scratchEducators"],
  [4,"Listas como conjunto de dados","Scratch","Lista, amostragem e visualização","Registrar resultados de 20 execuções da simulação","Calcular ou destacar uma tendência observável","Tabela e conclusão","scratchEducators"],
  [5,"Robô virtual com sensores","VEXcode VR (digital)","Condição, sensor e navegação","Resolver o Wall Maze usando leitura de sensores","Comparar solução com movimentos fixos e solução reativa","Quadro comparativo","vexWall"],
  [6,"Decisões com cores","VEXcode VR (digital)","Se, repetição e sensor de cor","Resolver o Disk Maze com decisões por cor","Fazer o robô retornar e reiniciar o percurso continuamente","Projeto salvo","vexColor"],
  [7,"Loops aninhados e eletroímã","VEXcode VR (digital)","Laços aninhados, sensores e atuador","Programar a coleta inicial de discos com eletroímã","Mover todos os discos de uma cor usando repetição","Código e captura","vexDisks"],
  [8,"Algoritmo em cenário dinâmico","VEXcode VR (digital)","Algoritmo adaptativo, tempo e otimização","Resolver uma versão do Dynamic Castle Crasher","Funcionar em três mapas diferentes e registrar o tempo","Tabela de execuções","vexDynamic"],
  [9,"Laboratório de simulações","Scratch + VEXcode VR","Modelo, limite e comunicação","Apresentar uma simulação e um algoritmo robótico","Explicar o que cada ambiente representa bem e o que simplifica","Rubrica do módulo","vexDynamic"],
  [10,"Reconstruir e calibrar a base","SPIKE Prime","Base motriz, erro e calibração","Montar a Practice Driving Base e criar tabela de movimento","Percorrer 100 cm com erro máximo de 3 cm","Ficha de calibração","primeDrive"],
  [11,"Sensor de distância em malha","SPIKE Prime","Realimentação, limiar e estado","Montar o braço e programar aproximação sem colisão","Coletar um objeto partindo de três distâncias","Matriz de testes","primeDistance"],
  [12,"Luz refletida e ruído","SPIKE Prime","Dados de sensor, variação e calibração","Coletar dez leituras em três superfícies","Definir faixas que reduzam classificações erradas","Tabela de dados","primeLine"],
  [13,"Seguidor proporcional introdutório","SPIKE Prime","Erro, correção e controle","Programar correções diferentes conforme a distância do limiar","Comparar com o seguidor liga/desliga no mesmo circuito","Gráfico de desempenho","primeLine"],
  [14,"Base avançada em quatro frentes","SPIKE Prime","Montagem modular, integração e gestão de cabos","Construir os quatro módulos da Advanced Driving Base e uni-los","Cada integrante apresentar seu módulo e a interface com os demais","Checklist de montagem","primeAdvanced"],
  [15,"Meus Blocos no robô","SPIKE Prime","Função, parâmetro e código legível","Criar Meus Blocos para avançar, girar e executar uma figura","Programar triângulo e quadrado reutilizando os mesmos blocos","Revisão de código","primeBlocks"],
  [16,"Ferramentas modulares","SPIKE Prime","Mecanismo, interface e troca rápida","Projetar uma ferramenta removível para mover um objeto","Trocar a ferramenta em menos de 30 segundos com segurança","Teste modular"],
  [17,"Missão com múltiplos sensores","SPIKE Prime","Máquina de estados e autonomia","Programar sequência com linha, distância e ferramenta","Recuperar de um caso inesperado sem reiniciar o hub","Matriz de estados"],
  [18,"Desafio de robótica autônoma","SPIKE Prime","Confiabilidade, tempo e estratégia","Cumprir duas missões em sequência com a base avançada","Realizar três rodadas e melhorar o tempo médio","Rubrica do módulo","primeMission"],
  [19,"Dados ambientais com micro:bit","micro:bit + MakeCode","Sensor, variável e coleta","Programar leituras periódicas de luz ou temperatura","Definir intervalo adequado e registrar uma linha de base","Conjunto de dados","mbEnergy"],
  [20,"Planejar dados confiáveis","micro:bit + MakeCode","Amostragem, calibração e viés","Escolher locais e horários para medir uso de luz","Identificar três fontes de erro e como reduzi-las","Plano de coleta","mbEnergy"],
  [21,"Coletar e tratar dados","micro:bit + MakeCode + tablet","Registro, limpeza e organização","Realizar a coleta planejada e organizar os resultados","Identificar um valor atípico e decidir se deve ser mantido","Tabela tratada","mbEnergy"],
  [22,"Visualizar para decidir","Tablet + dados do micro:bit","Gráfico, tendência e inferência","Criar um gráfico e escrever duas conclusões apoiadas nos dados","Propor uma ação mensurável para reduzir desperdício","Gráfico comentado","mbEnergy"],
  [23,"Cibersegurança e ameaças","micro:bit + tablet","Dados, malware, ética e proteção","Analisar cenários de segurança e classificar riscos","Criar um protocolo de resposta para uma situação escolar","Mapa de riscos","mbCyber"],
  [24,"Gerador de senha forte","micro:bit + MakeCode","Variáveis, seleção e aleatoriedade","Planejar e programar um gerador de senha demonstrativa","Testar requisitos de tamanho e diversidade de caracteres","Matriz de requisitos","mbCyber"],
  [25,"Rede sem fio e oceano","micro:bit + MakeCode","Rádio, sensor e IoT","Prototipar um nó que envia uma leitura ambiental a outro micro:bit","Enviar identificação, valor e alerta em uma mensagem","Demonstração da rede","mbOceans"],
  [26,"Confiabilidade da comunicação","micro:bit + MakeCode","Pacote, alcance e perda de dados","Executar testes de rádio em três distâncias ou barreiras","Criar confirmação visual de mensagem recebida","Tabela de conectividade","mbOceans"],
  [27,"Painel de decisões","micro:bit + tablet","Dados, segurança e recomendação","Integrar dados ambientais a um painel de alerta","Justificar limiar e risco de falso alerta","Rubrica do módulo","mbEnergy"],
  [28,"Desafio de sustentabilidade","Tablet + pesquisa","ODS, evidências e impacto","Selecionar um problema ambiental observável na escola","Definir indicador, usuário e limite do projeto","Briefing de impacto"],
  [29,"Modelar o sistema","Minecraft Education","Cenário, infraestrutura e fluxo","Construir no Minecraft o sistema atual e a intervenção proposta","Representar fonte, fluxo e destino de um recurso","Mundo documentado","mcCloud"],
  [30,"Arquitetura híbrida","Tablet + papel","Sensor, robô, dados e decisão","Projetar como SPIKE ou micro:bit atuará no cenário","Identificar dependências, riscos e modo seguro","Diagrama de arquitetura"],
  [31,"Protótipo do subsistema","SPIKE Prime ou micro:bit","Prototipagem modular e interface","Construir o subsistema de coleta ou atuação","Demonstrar a interface com o restante do sistema","Teste de módulo"],
  [32,"Programa orientado a dados","SPIKE Prime ou micro:bit","Limiar, estado e resposta","Programar decisões com base em dados medidos","Tratar um valor fora da faixa ou perda de leitura","Matriz de casos"],
  [33,"Simular impacto","Minecraft + tablet","Cenários, métricas e consequências","Simular situação atual e situação com a solução","Comparar as duas com o mesmo indicador","Relatório visual","mcCloud"],
  [34,"Auditoria e iteração","Todos os recursos","Teste, risco e melhoria","Trocar projetos entre equipes para uma auditoria técnica","Corrigir uma falha de confiabilidade ou segurança","Relatório de auditoria"],
  [35,"Pitch com dados","Tablet + protótipo","Argumentação, visualização e viabilidade","Preparar apresentação com evidências, arquitetura e limites","Responder a uma pergunta sobre custo ou escalabilidade","Banca simulada"],
  [36,"Mostra TIER 8º ano","Todos os recursos","Autoria, sustentabilidade e reflexão","Apresentar solução híbrida orientada por dados","Defender impacto e reconhecer uma limitação","Rubrica final e autoavaliação"],
];

const year9: RawLesson[] = [
  [1,"Pensar em sistemas complexos","Tablet + desplugada","Sistema, componente, interface e risco","Analisar um serviço digital e mapear pessoas, dados, regras e infraestrutura","Identificar um ponto único de falha e uma salvaguarda","Mapa diagnóstico"],
  [2,"Arquitetura antes do código","Scratch + tablet","Requisitos, módulos e fluxo","Planejar um aplicativo ou simulador em três módulos","Definir entradas, saídas e contratos entre módulos","Diagrama de arquitetura","scratchEducators"],
  [3,"Dados e listas relacionadas","Scratch","Estrutura de dados e consistência","Criar registros em listas paralelas para um catálogo ou painel","Impedir que um registro incompleto seja salvo","Matriz de testes","scratchEducators"],
  [4,"Blocos como funções","Scratch","Abstração, parâmetro e retorno simulado","Criar biblioteca de Meus Blocos para cálculos e interface","Documentar cada bloco com nome, entrada e efeito","Documentação do código","scratchEducators"],
  [5,"VEX VR: algoritmo adaptativo","VEXcode VR (digital)","Sensores, decisão e generalização","Construir solução para Dynamic Castle Crasher","Funcionar em cinco configurações sem alterar o código","Tabela de desempenho","vexDynamic"],
  [6,"VEX VR: logística autônoma","VEXcode VR (digital)","Loops aninhados, sensor e eletroímã","Resolver o Disk Mover com todos os discos","Reduzir tempo ou número de blocos em 15%","Comparação de versões","vexDisks"],
  [7,"Teste, logs e rastreamento","Scratch + VEXcode VR","Observabilidade, caso de teste e depuração","Criar um painel ou log que revele o estado do programa","Diagnosticar uma falha apenas pelos registros","Diário de depuração"],
  [8,"Revisão técnica entre equipes","Tablet + projetos","Critérios, legibilidade e segurança","Aplicar checklist em um projeto de outra equipe","Entregar três recomendações priorizadas","Parecer técnico"],
  [9,"Produto digital mínimo","Scratch ou VEXcode VR","Integração, usuário e entrega","Finalizar um produto digital para um problema definido","Demonstrar uso, código modular e evidências de teste","Rubrica do módulo","scratchEducators"],
  [10,"Base avançada e gestão de equipe","SPIKE Prime","Montagem paralela, integração e qualidade","Construir a Advanced Driving Base em quatro frentes","Validar cabos, portas, alinhamento e contribuição individual","Checklist de qualidade","primeAdvanced"],
  [11,"Biblioteca de movimentos","SPIKE Prime","Meus Blocos, parâmetros e padronização","Criar biblioteca para deslocamento, giro e alinhamento","Executar três trajetórias usando somente a biblioteca","Documentação dos blocos","primeBlocks"],
  [12,"Máquina de estados do robô","SPIKE Prime","Estado, transição e recuperação","Modelar e programar espera, busca, ação, retorno e falha","Forçar uma falha e demonstrar recuperação segura","Diagrama e vídeo"],
  [13,"Fusão de sensores","SPIKE Prime","Múltiplas entradas e confiabilidade","Combinar cor, distância e giroscópio em uma missão","Evitar uma decisão incorreta usando confirmação por dois sensores","Matriz de casos"],
  [14,"Ferramenta de missão","SPIKE Prime","Módulo mecânico, critério e troca rápida","Projetar ferramenta compatível com a base avançada","Cumprir a tarefa e ser trocada em menos de 30 segundos","Teste modular"],
  [15,"Estratégia e ordem das missões","SPIKE Prime + tablet","Planejamento, tempo e dependência","Comparar duas ordens para executar três tarefas","Escolher a estratégia pelo tempo médio e risco","Quadro estratégico"],
  [16,"Confiabilidade por repetição","SPIKE Prime","Taxa de sucesso, causa e melhoria","Executar dez rodadas do programa autônomo","Elevar a taxa de sucesso após identificar o erro dominante","Relatório de confiabilidade"],
  [17,"Código compartilhado","SPIKE Prime","Versionamento, integração e leitura coletiva","Cada integrante desenvolver e explicar um Meu Bloco","Integrar sem duplicar funções e revisar nomes e parâmetros","Revisão de código","primeBlocks"],
  [18,"Missão autônoma TIER","SPIKE Prime","Sistema completo, desempenho e apresentação","Executar uma missão com base, sensores e ferramenta","Realizar três rodadas válidas e defender escolhas técnicas","Rubrica do módulo","primeMission"],
  [19,"IA começa pelos dados","micro:bit CreateAI","Classes, amostras e representação","Explorar exemplos de IA e definir três movimentos distinguíveis","Antecipar dados que podem causar confusão","Mapa de classes","mbAI"],
  [20,"Coletar e rotular movimentos","micro:bit CreateAI","Dado de treino, rótulo e sensor","Coletar amostras de movimentos com o acelerômetro","Equilibrar quantidade e diversidade entre as classes","Conjunto de treino","mbAI"],
  [21,"Treinar e testar o modelo","micro:bit CreateAI","Treino, teste e matriz de confusão","Treinar o modelo e testar exemplos novos","Registrar acertos e erros por classe","Matriz de resultados","mbAI"],
  [22,"Limpar e ampliar os dados","micro:bit CreateAI","Outlier, diversidade e iteração","Remover amostras ruins e adicionar dados de diferentes pessoas","Melhorar a menor taxa de acerto sem piorar as demais","Comparação de modelos","mbAI"],
  [23,"IA dentro do programa","micro:bit CreateAI + MakeCode","Modelo como entrada e lógica","Usar a classe prevista para controlar uma saída no micro:bit","Adicionar confirmação para evitar acionamento acidental","Protótipo funcional","mbAI"],
  [24,"Viés e desempenho","micro:bit CreateAI","Viés de dados, inclusão e limite","Testar o sistema com pessoas fora do grupo de treino","Propor correções para um desempenho desigual","Relatório de auditoria","mbAI"],
  [25,"Cibersegurança em sistemas de IA","Minecraft Education + tablet","Dados, autenticação e infraestrutura","Explorar o Cloud Community ou Cyber Fundamentals","Identificar três controles que protegem pessoas e dados","Mapa de segurança","mcCloud"],
  [26,"Decisão humana e responsabilidade","Tablet + debate","Supervisão, transparência e impacto","Analisar cenários de decisão automatizada","Criar princípios de uso e um mecanismo de contestação","Carta de responsabilidade"],
  [27,"Demonstração de IA responsável","micro:bit CreateAI","Modelo, código, limites e comunicação","Apresentar o protótipo de reconhecimento de movimento","Explicar dados, taxa de acerto, viés e quando não usar","Rubrica do módulo","mbAI"],
  [28,"Projeto TIER Impacto: oportunidade","Tablet + pesquisa","Problema real, usuário, evidência e ODS","Escolher um desafio escolar ou comunitário e coletar evidências","Definir indicador de sucesso e limite ético","Briefing validado"],
  [29,"Requisitos e priorização","Tablet + entrevistas","Requisito, restrição e viabilidade","Converter dados de usuários em requisitos priorizados","Separar indispensável, desejável e fora do escopo","Backlog priorizado"],
  [30,"Arquitetura e plano de testes","Tablet + papel","Componentes, dados, interface e risco","Desenhar solução usando SPIKE Prime, micro:bit ou ambiente digital","Criar casos de teste e plano de contingência","Arquitetura aprovada"],
  [31,"Sprint 1: versão mínima","SPIKE Prime ou micro:bit","Entrega incremental e integração","Construir a menor versão que prova a função central","Demonstrar a função com um caso de teste","Revisão de sprint"],
  [32,"Sprint 2: autonomia e interface","SPIKE Prime ou micro:bit","Automação, feedback e segurança","Integrar sensores, estados e comunicação com o usuário","Tratar falha de sensor ou entrada inválida","Matriz de estados"],
  [33,"Sprint 3: cenário e dados","Minecraft + tablet","Contexto, simulação e evidências","Modelar o contexto no Minecraft ou criar painel de dados","Executar dois cenários contrastantes","Relatório de simulação","mcCloud"],
  [34,"Validação e auditoria","Todos os recursos","Usuário, confiabilidade, ética e iteração","Aplicar testes técnicos e de uso com outra equipe","Corrigir o risco mais crítico e comprovar a mudança","Dossiê de validação"],
  [35,"Pitch e portfólio técnico","Tablet + protótipo","Síntese, viabilidade e argumentação","Preparar pitch com problema, arquitetura, dados, testes e limites","Responder perguntas técnicas sem ocultar incertezas","Banca simulada"],
  [36,"Mostra TIER Impacto","Todos os recursos","Autoria, legado e próximos passos","Apresentar o projeto final e o portfólio do percurso","Defender impacto, reconhecer limites e propor continuidade","Rubrica final e autoavaliação"],
];

const moduleDefinitions: Record<string, Omit<CurriculumModule,"lessons"|"gradeId">[]> = {
  "3":[
    {id:1,title:"Comandos, histórias e primeira montagem",question:"Como damos instruções claras?",description:"Cidadania digital, algoritmos, ScratchJr e uma construção simples já no início do percurso.",product:"História interativa e Balsa do Rio funcional.",color:"orange"},
    {id:2,title:"Movimento e mecanismos",question:"Como uma máquina produz movimento?",description:"Motor, direção, estabilidade, eixos, engrenagens, teste e medição.",product:"Mecanismo móvel confiável.",color:"purple"},
    {id:3,title:"Robôs que percebem e decidem",question:"Como o robô responde ao ambiente?",description:"Sensores, eventos, repetição, decisões simples, dados e melhoria.",product:"Protótipo que reage a um estímulo.",color:"red"},
    {id:4,title:"Projeto TIER: solução para a escola",question:"Como transformar uma ideia em solução?",description:"Empatia, ideação, prototipagem, integração de mídias e apresentação.",product:"Solução autoral apresentada à turma.",color:"green"},
  ],
  "4":[
    {id:1,title:"Criar e colaborar em mundos digitais",question:"Como representamos um espaço e construímos juntos?",description:"ScratchJr avançado, pensamento espacial e introdução guiada ao Minecraft Education.",product:"Comunidade digital colaborativa.",color:"orange"},
    {id:2,title:"Energia, força e mecanismos",question:"Como controlar energia e movimento?",description:"Mecanismos do SPIKE, ângulos, potência, medidas, dados e melhoria de engenharia.",product:"Parque TIER com atrações programadas.",color:"purple"},
    {id:3,title:"Ciência que podemos testar",question:"Como modelos e dados explicam fenômenos?",description:"Luz, estruturas, energia, informação, terremotos e investigação científica.",product:"Modelo científico com dados e conclusão.",color:"red"},
    {id:4,title:"Projeto TIER: comunidade inteligente",question:"Como integrar protótipo e mundo digital?",description:"Problema local, urbanismo, automação, Minecraft e SPIKE em uma solução híbrida.",product:"Solução física e cenário digital integrados.",color:"green"},
  ],
  "5":[
    {id:1,title:"Programar agentes e sistemas",question:"Como automatizamos uma construção digital?",description:"Minecraft Education, MakeCode, Agent, loops, coordenadas, variáveis e depuração.",product:"Construção 3D automatizada.",color:"orange"},
    {id:2,title:"Automação e confiabilidade",question:"Como criar um sistema físico autônomo?",description:"SPIKE Essential, eventos, sensores, condições, estados, métricas e otimização.",product:"Sistema automático confiável.",color:"purple"},
    {id:3,title:"Dados, IA e sustentabilidade",question:"Como usar dados e IA com responsabilidade?",description:"Classificação, padrões, Agent, condições, supervisão humana e desafios ambientais.",product:"Missão codificada com auditoria das decisões.",color:"red"},
    {id:4,title:"Projeto TIER: impacto e futuro",question:"Como provar que uma solução gera impacto?",description:"ODS, requisitos, arquitetura híbrida, simulação, protótipo, testes e pitch.",product:"Projeto final híbrido com evidências de impacto.",color:"green"},
  ],
  "6":[
    {id:1,title:"Programação, jogos e lógica",question:"Como transformar regras em uma experiência interativa?",description:"Scratch tradicional, eventos, coordenadas, loops, condições, variáveis e depuração.",product:"Minijogo jogável e testado por pares.",color:"orange"},
    {id:2,title:"Mecanismos com SPIKE Prime",question:"Como controlar movimento e transformar energia?",description:"Primeiro contato com o kit, Break Dance, Hopper, engrenagens, estruturas e teste justo.",product:"Máquina mecânica programada e explicada.",color:"purple"},
    {id:3,title:"Robótica física e virtual",question:"O que muda quando o robô sai da simulação?",description:"VEXcode VR digital, base motriz do SPIKE, sensores, calibração e transferência de estratégias.",product:"Missão autônoma inicial em três execuções confiáveis.",color:"red"},
    {id:4,title:"Projeto TIER: robô útil",question:"Como um robô pode melhorar uma rotina real?",description:"Investigação, requisitos, arquitetura, prototipagem, testes com usuários e apresentação.",product:"Solução robótica útil validada por evidências.",color:"green"},
  ],
  "7":[
    {id:1,title:"Jogos, dados e código modular",question:"Como criar programas maiores sem perder clareza?",description:"Scratch com listas, clones, Meus Blocos, níveis, dados de uso e acessibilidade.",product:"Jogo com níveis, documentação e teste de usabilidade.",color:"orange"},
    {id:2,title:"Mecânica, sensores e controle",question:"Como dados tornam um robô mais preciso?",description:"Base motriz, garras, teste justo, sensor de cor, seguidor de linha e otimização.",product:"Circuito autônomo calibrado e confiável.",color:"purple"},
    {id:3,title:"Computação física com micro:bit",question:"Como entradas e saídas criam produtos acessíveis?",description:"MakeCode, sensores, variáveis, seleção, aleatoriedade e projeto Sensory Classroom.",product:"Recurso sensorial testado por usuários.",color:"red"},
    {id:4,title:"Projeto TIER: ambiente inteligente",question:"Como integrar protótipo e espaço digital?",description:"Problema ambiental, Minecraft, arquitetura, protótipo físico e simulação de uso.",product:"Ambiente inteligente híbrido com teste integrado.",color:"green"},
  ],
  "8":[
    {id:1,title:"Algoritmos e simulações",question:"Como criar soluções que respondem a cenários variáveis?",description:"Scratch, VEXcode VR, modelos, listas, sensores, decisões e algoritmos adaptativos.",product:"Laboratório de simulações com análise de limites.",color:"orange"},
    {id:2,title:"Robôs autônomos e controle",question:"Como aumentar autonomia sem perder confiabilidade?",description:"Calibração, dados de sensores, base avançada, código modular e missões autônomas.",product:"Robô de missão com desempenho medido.",color:"purple"},
    {id:3,title:"Dados, redes e cibersegurança",question:"Como coletar e usar dados com confiança?",description:"micro:bit, energia, visualização, senhas, rádio, IoT e decisão orientada por dados.",product:"Painel de decisão baseado em dados ambientais.",color:"red"},
    {id:4,title:"Projeto TIER: tecnologia sustentável",question:"Como demonstrar impacto com dados?",description:"ODS, Minecraft, arquitetura híbrida, sensores, atuação, auditoria e pitch.",product:"Solução sustentável simulada e auditada.",color:"green"},
  ],
  "9":[
    {id:1,title:"Arquitetura de sistemas digitais",question:"Como projetar sistemas compreensíveis e adaptáveis?",description:"Requisitos, módulos, listas, funções, VEXcode VR, logs, testes e revisão técnica.",product:"Produto digital mínimo com documentação técnica.",color:"orange"},
    {id:2,title:"Robótica avançada e confiabilidade",question:"Como organizar um robô autônomo complexo?",description:"Base avançada, biblioteca de movimentos, estados, múltiplos sensores, estratégia e taxa de sucesso.",product:"Missão autônoma com relatório de confiabilidade.",color:"purple"},
    {id:3,title:"IA física e responsabilidade",question:"Como dados, pessoas e código moldam uma IA?",description:"micro:bit CreateAI, coleta, rotulagem, treino, teste, viés, segurança e supervisão humana.",product:"Protótipo de IA física com auditoria de limites.",color:"red"},
    {id:4,title:"Projeto TIER Impacto",question:"Como entregar uma solução relevante, ética e comprovável?",description:"Problema real, requisitos, arquitetura, sprints, simulação, validação, portfólio e banca.",product:"Projeto final com evidências técnicas, sociais e éticas.",color:"green"},
  ],
};

function makeLesson(gradeId:string, gradeLabel:string, row:RawLesson):Lesson {
  const [number,title,tool,focus,activity,challenge,evidence,resourceKey] = row;
  const construction = tool.includes("SPIKE") && Boolean(resourceKey);
  const resources=resourceKey ? resourceLibrary[resourceKey] : undefined;
  return {
    id:`${gradeId}-${number}`, gradeId, gradeLabel, number, moduleId:Math.ceil(number/9), title, tool, focus, activity, challenge, evidence,
    objectives:[`Compreender ${focus.toLowerCase()}.`,`Aplicar o conceito em uma produção prática.`,`Explicar uma escolha usando evidências do teste.`],
    materials: materialsFor(gradeId,tool,resources),
    preparation: preparationFor(gradeId,tool,resources),
    steps: stepsFor(gradeId,title,tool,focus,activity,challenge,evidence,resources),
    resources,
    construction,
  };
}

const isFund2=(gradeId:string)=>Number(gradeId)>=6;
const groupNoun=(gradeId:string)=>isFund2(gradeId)?"grupo":"dupla";
const groupSize=(gradeId:string)=>isFund2(gradeId)?"grupo de 3–4 estudantes":"dupla";

function materialsFor(gradeId:string,tool:string,resources?:LessonResource[]):string[] {
  const items:string[]=[];
  const group=groupSize(gradeId);
  const hasTablet=tool.includes("Tablet")||tool.includes("tablet")||tool.includes("Scratch")||tool.includes("SPIKE")||tool.includes("Minecraft")||tool.includes("VEXcode VR")||tool.includes("micro:bit")||tool.includes("Todos os recursos");
  if(tool.includes("SPIKE")||tool.includes("Todos os recursos"))items.push(`1 kit LEGO Education ${isFund2(gradeId)?"SPIKE Prime":"SPIKE Essential"} completo para cada ${group}`);
  if(hasTablet)items.push(`1 tablet carregado para cada ${group}, identificado com o número da equipe`);
  if(tool.includes("SPIKE")||tool.includes("Todos os recursos"))items.push("Aplicativo LEGO Education SPIKE instalado e hub com bateria");
  if(tool.includes("Minecraft")||tool.includes("Todos os recursos"))items.push("Minecraft Education instalado e conta escolar testada");
  if(tool.includes("ScratchJr")||(tool.includes("Todos os recursos")&&!isFund2(gradeId)))items.push("ScratchJr instalado e um projeto novo preparado");
  if((tool.includes("Scratch")&&!tool.includes("ScratchJr"))||(tool.includes("Todos os recursos")&&isFund2(gradeId)))items.push("Scratch tradicional aberto no navegador ou aplicativo, com projeto novo preparado");
  if(tool.includes("VEXcode VR"))items.push("VEXcode VR aberto no navegador do tablet — somente ambiente digital em blocos; nenhum kit VEX físico");
  if(tool.includes("micro:bit")||(tool.includes("Todos os recursos")&&Number(gradeId)>=7))items.push(`1 micro:bit com bateria e cabo compatível ou conexão pelo aplicativo para cada ${group}`,"Microsoft MakeCode ou aplicativo micro:bit aberto no tablet, com a transferência testada");
  if(tool.includes("papel")||tool.includes("desplugada")||tool.includes("observação")||tool.includes("entrevistas")||tool.includes("pesquisa"))items.push(`1 folha de registro por ${group}, lápis e borracha`);
  if(tool.includes("desplugada"))items.push("Cartões de comandos, fita crepe e espaço livre para o percurso");
  if(resources?.length)items.push(`Recurso oficial aberto antes da aula: ${resources[0].title}`);
  if(!items.length)items.push(`1 tablet ou material de registro por ${group}, conforme a atividade`);
  return [...new Set(items)];
}

function preparationFor(gradeId:string,tool:string,resources?:LessonResource[]):string[] {
  const items=["Leia o objetivo, a atividade-base e o desafio TIER antes de receber a turma.",isFund2(gradeId)?"Organize grupos de 3–4 estudantes. Defina montador, programador, analista de testes e documentador/apresentador; em grupos de três, una os dois últimos papéis. Faça a rotação no meio da aula.":"Organize as duplas e defina os papéis: pessoa que executa e pessoa que registra; os papéis devem ser trocados no meio da aula."];
  if(tool.includes("SPIKE")||tool.includes("Todos os recursos"))items.push("Confira as peças principais, carregue os hubs e teste o pareamento de um kit com o tablet.");
  if(tool.includes("Minecraft")||tool.includes("Todos os recursos"))items.push("Teste o login dos estudantes e abra o mundo indicado; se a atividade for coletiva, defina previamente quem hospedará o mundo.");
  if(tool.includes("ScratchJr")||(tool.includes("Todos os recursos")&&!isFund2(gradeId)))items.push("Abra o ScratchJr em um tablet, crie um projeto de teste e confirme como os arquivos serão nomeados e salvos.");
  if((tool.includes("Scratch")&&!tool.includes("ScratchJr"))||(tool.includes("Todos os recursos")&&isFund2(gradeId)))items.push("Abra o Scratch tradicional, confirme áudio e extensões necessárias e defina o padrão de nome e salvamento dos projetos.");
  if(tool.includes("VEXcode VR"))items.push("Abra o VEXcode VR no navegador de um tablet, selecione o Playground indicado e confirme que a programação está no modo Blocks.");
  if(tool.includes("micro:bit")||(tool.includes("Todos os recursos")&&Number(gradeId)>=7))items.push("Abra o MakeCode ou aplicativo micro:bit, teste a transferência de um programa e confira conexão, cabos compatíveis e baterias.");
  if(tool.includes("desplugada"))items.push("Separe os cartões de comandos e demarque o percurso antes da entrada dos estudantes.");
  if(resources?.length)items.push(`Deixe aberto o recurso “${resources[0].title}”${resources.some(resource=>resource.kind==="manual")?" e o respectivo manual PDF":""}.`);
  return items;
}

function demonstrationFor(tool:string,focus:string,resources?:LessonResource[]):string {
  if(tool.includes("SPIKE"))return `Mostre o hub, a peça ou o bloco de programação relacionado a ${focus.toLowerCase()}. Abra ${resources?.[0]?.title||"o modelo indicado"} e demonstre somente o primeiro movimento; não entregue a solução completa.`;
  if(tool.includes("Minecraft"))return `Projete os controles ou o Code Builder e demonstre uma única ação necessária para ${focus.toLowerCase()}. Confirme que todos entraram no mundo correto antes de continuar.`;
  if(tool.includes("ScratchJr"))return `Projete o ScratchJr, mostre onde iniciar o projeto e modele um exemplo curto relacionado a ${focus.toLowerCase()}. Apague o exemplo antes da produção das duplas.`;
  if(tool.includes("Scratch"))return `Projete o Scratch, localize os blocos relacionados a ${focus.toLowerCase()} e monte apenas um exemplo de três blocos. Execute, peça uma previsão e apague o exemplo antes da criação dos grupos.`;
  if(tool.includes("VEXcode VR"))return `Abra o VEXcode VR em Blocks, carregue o Playground indicado e execute somente um movimento relacionado a ${focus.toLowerCase()}. Mostre como reiniciar a simulação antes de cada teste.`;
  if(tool.includes("micro:bit"))return `Projete o MakeCode, destaque a entrada e a saída relacionadas a ${focus.toLowerCase()} e transfira um exemplo mínimo para um micro:bit. Depois, apague o código de demonstração.`;
  if(tool.includes("desplugada"))return `Faça uma rodada de exemplo com um estudante e pense em voz alta sobre ${focus.toLowerCase()}. Mostre como registrar uma tentativa.`;
  return `Apresente um exemplo concreto de ${focus.toLowerCase()} e mostre o formato do registro esperado, sem resolver a tarefa pela turma.`;
}

function setupFor(gradeId:string,tool:string):string {
  const group=groupNoun(gradeId);
  if(tool.includes("SPIKE"))return `Distribuem um kit e um tablet por ${group}, conferem hub, motores, sensores e peças indicadas e mantêm a tampa organizadora próxima.`;
  if(tool.includes("Minecraft"))return "Entram com a conta escolar, abrem o mundo indicado e confirmam o ponto inicial com o professor antes de construir ou programar.";
  if(tool.includes("ScratchJr"))return "Criam um projeto novo com o nome combinado, escolhem personagens e cenário e testam um comando simples.";
  if(tool.includes("Scratch"))return "Criam um projeto com o nome combinado, escolhem o ator inicial e salvam uma primeira versão antes de programar.";
  if(tool.includes("VEXcode VR"))return "Abrem o VEXcode VR em Blocks, selecionam o Playground indicado, renomeiam o projeto e testam os botões iniciar e reiniciar.";
  if(tool.includes("micro:bit"))return "Abrem o MakeCode, criam e nomeiam o projeto, conectam o micro:bit e transferem um ícone de teste antes da atividade principal.";
  if(tool.includes("desplugada"))return "Organizam os cartões, reconhecem o percurso e repetem oralmente as regras da atividade.";
  return `Organizam os materiais do ${group}, registram os papéis e repetem o critério de sucesso com suas próprias palavras.`;
}

function stepsFor(gradeId:string,title:string,tool:string,focus:string,activity:string,challenge:string,evidence:string,resources?:LessonResource[]):LessonStep[] {
  const group=groupNoun(gradeId);
  return [
    {time:"0–5 min",title:"Conectar com o tema",teacher:`Apresente “${title}” e pergunte: “Onde percebemos ${focus.toLowerCase()} no nosso dia a dia?”. Ouça duas ou três respostas e escreva uma palavra-chave.`,students:"Observam o exemplo, compartilham conhecimentos prévios e registram a palavra-chave da aula."},
    {time:"5–10 min",title:"Mostrar o essencial",teacher:demonstrationFor(tool,focus,resources),students:"Acompanham a demonstração sem copiar ainda, fazem perguntas e antecipam o que deverá acontecer."},
    {time:"10–15 min",title:`Organizar ${isFund2(gradeId)?"os grupos":"as duplas"}`,teacher:isFund2(gradeId)?"Distribua os materiais, confirme os quatro papéis da equipe — montador, programador, analista de testes e documentador/apresentador — e leia o critério de sucesso.":"Distribua os materiais, indique quem começa executando e quem começa registrando e leia em voz alta o critério de sucesso da atividade.",students:setupFor(gradeId,tool)},
    {time:"15–30 min",title:"Realizar a atividade-base",teacher:`Oriente cada ${group} a: ${activity.toLowerCase()}. Circule pela sala e intervenha com perguntas — “O que vocês esperavam?”, “O que aconteceu?” e “Qual será o próximo teste?”.`,students:`Executam a proposta: ${activity.toLowerCase()}. Fazem pelo menos um teste e registram o resultado antes de pedir ajuda.`},
    {time:"30–40 min",title:"Aplicar o Desafio TIER",teacher:`Interrompa a turma, apresente o desafio — ${challenge.toLowerCase()} — e esclareça o que não pode ser alterado. Avise quando faltarem cinco minutos.`,students:`Rotacionam os papéis do ${group}, modificam a solução, testam novamente e verificam se conseguiram ${challenge.toLowerCase()}.`},
    {time:"40–47 min",title:"Compartilhar e comparar",teacher:`Escolha dois ${isFund2(gradeId)?"grupos":"pares"} com estratégias diferentes para demonstrar. Peça que expliquem uma decisão, uma dificuldade e a evidência de que a solução funciona.`,students:`Apresentam ou observam as soluções, comparam estratégias e oferecem um comentário objetivo a outro ${group}.`},
    {time:"47–50 min",title:"Registrar e organizar",teacher:`Recolha ou confira a evidência: ${evidence.toLowerCase()}. Verifique a organização dos materiais antes de liberar a turma.`,students:`Salvam ou entregam ${evidence.toLowerCase()}, desmontam quando indicado, conferem as peças e devolvem os materiais organizados.`},
  ];
}

function makeGrade(id:string,label:string,description:string,progression:string,rows:RawLesson[]):GradeCurriculum {
  const lessons=rows.map(row=>makeLesson(id,label,row));
  const modules=moduleDefinitions[id].map(def=>({...def,gradeId:id,lessons:lessons.slice((def.id-1)*9,def.id*9)}));
  const level=isFund2(id)?"fund2":"fund1";
  return {id,label,level,levelLabel:level==="fund2"?"Fundamental II":"Fundamental I",status:"active",description,progression,modules,lessons:lessons.length};
}

export const curricula:GradeCurriculum[] = [
  makeGrade("3","3º ano","Sequências, criatividade digital, mecanismos, sensores e primeiro projeto autoral.","Começa com instruções simples e uma montagem já na aula 02; avança para programação, sensores e uma solução para a escola.",year3),
  makeGrade("4","4º ano","Colaboração em mundos 3D, engenharia com dados, investigação científica e solução híbrida.","Amplia a autonomia, introduz Minecraft Education e conecta modelos físicos, dados e fenômenos científicos.",year4),
  makeGrade("5","5º ano","Programação com Agent e MakeCode, automação, IA responsável e projeto de impacto.","Consolida lógica, variáveis e condições; integra SPIKE e Minecraft em sistemas mais autônomos e justificáveis.",year5),
  makeGrade("6","6º ano","Scratch, mecanismos com SPIKE Prime, robótica virtual e primeiro projeto robótico do Fundamental II.","Parte de lógica e jogos, introduz o SPIKE Prime e o VEXcode VR digital e termina com um robô útil validado por usuários.",year6),
  makeGrade("7","7º ano","Código modular, robôs guiados por sensores, computação física com micro:bit e ambiente inteligente.","Amplia o uso de dados e funções, introduz micro:bit/MakeCode e integra protótipo físico a um cenário no Minecraft.",year7),
  makeGrade("8","8º ano","Algoritmos adaptativos, autonomia robótica, dados ambientais, redes e tecnologia sustentável.","Avança de simulações para controle autônomo, coleta confiável de dados e uma solução sustentável auditada.",year8),
  makeGrade("9","9º ano","Arquitetura de sistemas, robótica avançada, IA física responsável e projeto final de impacto.","Consolida código modular, confiabilidade e uso crítico de dados em um projeto completo, ético e comprovável.",year9),
];

export const grades = curricula.map(({id,label,level,levelLabel,status,description,modules,lessons,progression})=>({id,label,level,levelLabel,status,description,modules:modules.length,lessons,progression}));
export const allLessons = curricula.flatMap(grade=>grade.modules.flatMap(module=>module.lessons));
export const getCurriculum = (id:string)=>curricula.find(grade=>grade.id===id)||curricula[0];
