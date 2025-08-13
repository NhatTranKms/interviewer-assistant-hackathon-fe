import { create } from 'zustand';
import type { CandidateInfo, SkillAnalysis, InterviewQuestion } from '../models';

interface InterviewStore {
  // Form data
  candidateInfo: CandidateInfo;
  jobDescription: string;
  resume: string;
  
  // Analysis results
  skillAnalysis: SkillAnalysis | null;
  questions: InterviewQuestion[];
  
  // UI state
  currentStep: number;
  isLoading: boolean;
  
  // Actions
  setCandidateInfo: (info: CandidateInfo) => void;
  setJobDescription: (jd: string) => void;
  setResume: (resume: string) => void;
  setSkillAnalysis: (analysis: SkillAnalysis) => void;
  setQuestions: (questions: InterviewQuestion[]) => void;
  setCurrentStep: (step: number) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  candidateInfo: {
    title: '',
    seniorityLevel: '',
    interviewSimulator: '',
  },
  jobDescription: '',
  resume: '',
  skillAnalysis: null,
  questions: [],
  currentStep: 0,
  isLoading: false,
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  ...initialState,
  
  setCandidateInfo: (info: CandidateInfo) =>
    set({ candidateInfo: info }),
  
  setJobDescription: (jd: string) =>
    set({ jobDescription: jd }),
  
  setResume: (resume: string) =>
    set({ resume }),
  
  setSkillAnalysis: (analysis: SkillAnalysis) =>
    set({ skillAnalysis: analysis }),
  
  setQuestions: (questions: InterviewQuestion[]) =>
    set({ questions }),
  
  setCurrentStep: (step: number) =>
    set({ currentStep: step }),
  
  setIsLoading: (loading: boolean) =>
    set({ isLoading: loading }),
  
  reset: () => set(initialState),
}));

