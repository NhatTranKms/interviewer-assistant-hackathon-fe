import { create } from 'zustand';
import type { CandidateInfo, SkillAnalysis, InterviewQuestion } from '../models';
import type { SkillMatcherResponse, QuestionGeneratorResponse } from '../models/api';

interface InterviewStore {
  // Form data
  candidateInfo: CandidateInfo;
  jobDescription: string;
  resume: string;
  
  // Analysis results - Split into two parts for better performance
  skillAnalysisData: SkillMatcherResponse | null; // For ResumeFitAnalysisPage
  questionData: QuestionGeneratorResponse | null; // For QuestionGeneratorPage
  
  // Legacy fields (keeping for compatibility)
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
  setSkillAnalysisData: (data: SkillMatcherResponse) => void; // New: For skill analysis
  setQuestionData: (data: QuestionGeneratorResponse) => void; // New: For questions
  setCurrentStep: (step: number) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  candidateInfo: {
    name: '',
    title: '',
    seniorityLevel: '',
    interviewSimulator: '',
  },
  jobDescription: '',
  resume: '',
  // Split data for better performance
  skillAnalysisData: null,
  questionData: null,
  // Legacy fields
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
  
  setSkillAnalysisData: (data: SkillMatcherResponse) =>
    set({ skillAnalysisData: data }),
  
  setQuestionData: (data: QuestionGeneratorResponse) =>
    set({ questionData: data }),
  
  setCurrentStep: (step: number) =>
    set({ currentStep: step }),
  
  setIsLoading: (loading: boolean) =>
    set({ isLoading: loading }),
  
  reset: () => set(initialState),
}));

