export type UserRole = "professor" | "coordenador" | "gestor";
export type Status = "rascunho" | "em_revisao" | "aprovado" | "aplicado" | "arquivado";
export type SkillLevel = "consolidada" | "desenvolvimento" | "retomar";

export interface School {
  id: string;
  name: string;
  unit: string;
  city: string;
  segments: string[];
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  initials: string;
  title: string;
  detail: string;
  classes: string[];
}

export interface ClassGroup {
  id: string;
  code: string;
  year: string;
  segment: string;
  shift: "Manhã" | "Tarde";
  teacher: string;
  subject: string;
  students: number;
  average: number;
  attendance: number;
  nextClass: string;
  skills: Array<{ code: string; label: string; level: SkillLevel; score: number }>;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  classId: string;
  classCode: string;
  attendance: number;
  average: number;
  followUp: "Ativo" | "Atenção" | "Sem acompanhamento";
  strength: string;
  interest: string;
  developing: string;
  objective: string;
  strategy: string;
  nextStep: string;
}

export interface Guardian {
  id: string;
  name: string;
  relationship: string;
  studentIds: string[];
  channel: string;
  bestTime: string;
  meetings: number;
  agreements: string[];
  pending: string[];
  restriction?: string;
}

export interface Observation {
  id: string;
  studentId: string;
  author: string;
  date: string;
  fact: string;
  interpretation: string;
  action: string;
  result: string;
  nextFollowUp: string;
}

export interface Question {
  id: string;
  code: string;
  prompt: string;
  supportText?: string;
  subject: string;
  segment: string;
  year: string;
  content: string;
  bncc: string;
  type: "Múltipla escolha" | "Discursiva" | "Verdadeiro ou falso";
  difficulty: "Fácil" | "Média" | "Difícil";
  cognitive: "Lembrar" | "Compreender" | "Aplicar" | "Analisar";
  status: Status;
  author: string;
  accuracy: number;
  lastUsed: string;
  objective: string;
  estimatedTime: number;
  tags: string[];
  alternatives: string[];
  correctAnswer: string;
  explanation: string;
  source: string;
  selected?: boolean;
}

export interface QuestionFamily {
  id: string;
  name: string;
  referenceQuestionId: string;
  questionIds: string[];
  rationale: string;
}

export interface Assessment {
  id: string;
  name: string;
  classCode: string;
  subject: string;
  date: string;
  author: string;
  questionIds: string[];
  versions: string[];
  status: Status;
  totalPoints: number;
  duration: number;
  period: string;
  instructions: string;
  adaptations: string[];
  dateIso?: string;
  matrix?: AssessmentMatrixRow[];
  questionPoints?: Record<string, number>;
  versionSettings?: AssessmentVersionSettings;
  versionSnapshots?: AssessmentVersion[];
  adaptationIds?: string[];
  updatedAt?: string;
}

export interface AssessmentMatrixRow {
  content: string;
  skill: string;
  count: number;
  difficulty: string;
  cognitive: string;
}

export interface AssessmentVersionSettings {
  count: number;
  shuffleQuestions: boolean;
  shuffleAlternatives: boolean;
  equivalentQuestions: boolean;
  keepFirstQuestion: boolean;
}

export interface AssessmentVersion {
  id: string;
  assessmentId: string;
  label: string;
  questionIds: string[];
  estimatedTime: number;
  totalPoints: number;
  equivalence: number;
  questionPoints?: Record<string, number>;
}

export type StudentChatAudience = "student" | "educator";

export interface StudentChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
  sources?: string[];
}

export interface StudentChatThread {
  id: string;
  studentId: string;
  audience: StudentChatAudience;
  title: string;
  updatedAt: string;
  messages: StudentChatMessage[];
}

export interface Adaptation {
  id: string;
  name: string;
  description: string;
  changes: string[];
  preserves: string[];
  active: boolean;
}

export interface LessonPlan {
  id: string;
  title: string;
  classCode: string;
  subject: string;
  duration: number;
  type: string;
  date: string;
  status: "Rascunho" | "Pronto" | "Aplicado";
  objectives: string;
  bncc: string[];
  resources: string;
  methodology: string;
  stages: string[];
  formative: string;
  adaptations: string;
  alternativePlan: string;
}

export interface Meeting {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  relatedTo: string;
  participants: string[];
  status: "Agendada" | "Preparação" | "Concluída";
  pending: string[];
}

export interface Document {
  id: string;
  name: string;
  folder: string;
  type: string;
  updatedAt: string;
  author: string;
  permission: string;
  aiContext: boolean;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

export interface FollowUpPlan {
  id: string;
  studentId: string;
  situation: string;
  evidence: string;
  objective: string;
  strategies: string[];
  owners: string[];
  deadline: string;
  indicators: string[];
  status: "planejado" | "em_andamento" | "em_revisao" | "concluido";
  results: string[];
}

export interface AppState {
  questions: Question[];
  assessments: Assessment[];
  observations: Observation[];
  followUps: FollowUpPlan[];
  lessonPlans: LessonPlan[];
  meetings: Meeting[];
  documents: Document[];
  studentChats: StudentChatThread[];
}
