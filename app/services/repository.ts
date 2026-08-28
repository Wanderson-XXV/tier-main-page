"use client";

import { initialState } from "../data/mockData";
import type { AppState, Assessment, Document, FollowUpPlan, LessonPlan, Meeting, Observation, Question, StudentChatThread } from "../types";

const STORAGE_KEY = "tier-nexo-demo-state-v1";

export interface TierRepository {
  load(): AppState;
  save(state: AppState): void;
  addQuestion(state: AppState, question: Question): AppState;
  updateQuestion(state: AppState, question: Question): AppState;
  addAssessment(state: AppState, assessment: Assessment): AppState;
  upsertAssessment(state: AppState, assessment: Assessment): AppState;
  addObservation(state: AppState, observation: Observation): AppState;
  addFollowUp(state: AppState, followUp: FollowUpPlan): AppState;
  addLessonPlan(state: AppState, plan: LessonPlan): AppState;
  addMeeting(state: AppState, meeting: Meeting): AppState;
  addDocument(state: AppState, document: Document): AppState;
  upsertStudentChat(state: AppState, chat: StudentChatThread): AppState;
  reset(): AppState;
}

function cloneInitial(): AppState {
  return JSON.parse(JSON.stringify(initialState)) as AppState;
}

export const localRepository: TierRepository = {
  load() {
    if (typeof window === "undefined") return cloneInitial();
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? { ...cloneInitial(), ...JSON.parse(saved) } : cloneInitial();
    } catch {
      return cloneInitial();
    }
  },
  save(state) {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  addQuestion: (state, question) => ({ ...state, questions: [question, ...state.questions] }),
  updateQuestion: (state, question) => ({ ...state, questions: state.questions.map((item) => item.id === question.id ? question : item) }),
  addAssessment: (state, assessment) => ({ ...state, assessments: [assessment, ...state.assessments] }),
  upsertAssessment: (state, assessment) => ({
    ...state,
    assessments: state.assessments.some((item) => item.id === assessment.id)
      ? state.assessments.map((item) => item.id === assessment.id ? assessment : item)
      : [assessment, ...state.assessments],
  }),
  addObservation: (state, observation) => ({ ...state, observations: [observation, ...state.observations] }),
  addFollowUp: (state, followUp) => ({ ...state, followUps: [followUp, ...state.followUps] }),
  addLessonPlan: (state, plan) => ({ ...state, lessonPlans: [plan, ...state.lessonPlans] }),
  addMeeting: (state, meeting) => ({ ...state, meetings: [meeting, ...state.meetings] }),
  addDocument: (state, document) => ({ ...state, documents: [document, ...state.documents] }),
  upsertStudentChat: (state, chat) => ({
    ...state,
    studentChats: state.studentChats.some((item) => item.id === chat.id)
      ? state.studentChats.map((item) => item.id === chat.id ? chat : item)
      : [chat, ...state.studentChats],
  }),
  reset() {
    const state = cloneInitial();
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  },
};

export async function simulate<T>(value: T, delay = 650): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return value;
}

// Troque apenas esta implementação por clientes HTTP quando as APIs estiverem disponíveis.
export const tierRepository: TierRepository = localRepository;
