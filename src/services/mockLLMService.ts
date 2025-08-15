import type { SkillAnalysis, UIInterviewQuestion } from '../models';


import mockInterviewQuestionsData from '../data/mockInterviewQuestions.json';

// Export the questions array directly
export const mockInterviewQuestions: UIInterviewQuestion[] = mockInterviewQuestionsData as UIInterviewQuestion[];





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
): Promise<UIInterviewQuestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real implementation, this would call an LLM API
  return mockInterviewQuestions;
};