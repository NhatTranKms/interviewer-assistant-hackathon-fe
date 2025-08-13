import type { SkillAnalysis, InterviewQuestion } from '../models';


import mockInterviewQuestionsData from '../data/mockInterviewQuestions.json';

// Export the questions array directly
export const mockInterviewQuestions: InterviewQuestion[] = mockInterviewQuestionsData as InterviewQuestion[];





export const generateInterviewQuestions = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _jobDescription: string, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _resume: string, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _skillAnalysis: SkillAnalysis,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _candidateTitle: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _seniorityLevel: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _interviewSimulator?: string
): Promise<InterviewQuestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real implementation, this would call an LLM API
  return mockInterviewQuestions;
};