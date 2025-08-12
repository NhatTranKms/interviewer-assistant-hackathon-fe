import type { SkillAnalysis, InterviewQuestion } from '../store/useInterviewStore';

// Import JSON data
import mockJobDescriptionData from '../data/mockJobDescription.json';
import mockResumeData from '../data/mockResume.json';
import mockSkillAnalysisData from '../data/mockSkillAnalysis.json';
import mockInterviewQuestionsData from '../data/mockInterviewQuestions.json';
import jobTitlesData from '../data/jobTitles.json';
import seniorityLevelsData from '../data/seniorityLevels.json';
import roundNumbersData from '../data/roundNumbers.json';
import interviewPersonasData from '../data/interviewPersonas.json';

// Export mock data from JSON files
export const mockJobDescription = mockJobDescriptionData.fullText;
export const mockResume = mockResumeData.fullText;
export const mockSkillAnalysis: SkillAnalysis = mockSkillAnalysisData;

// Flatten the categorized questions into a single array with proper types
export const mockInterviewQuestions: InterviewQuestion[] = [
  ...mockInterviewQuestionsData.technical.map(q => ({ ...q, category: 'Technical' as const })),
  ...mockInterviewQuestionsData.behavioral.map(q => ({ ...q, category: 'Behavioral' as const })),
  ...mockInterviewQuestionsData.screening.map(q => ({ ...q, category: 'Screening' as const }))
];

// Export dropdown options
export const jobTitles = jobTitlesData.titles;
export const seniorityLevels = seniorityLevelsData.levels;
export const roundNumbers = roundNumbersData.rounds;
export const interviewPersonas = interviewPersonasData.personas;

// Export default values
export const defaultJobTitle = jobTitlesData.defaultTitle;
export const defaultSeniorityLevel = seniorityLevelsData.defaultLevel;
export const defaultRoundNumber = roundNumbersData.defaultRound;
export const defaultInterviewPersona = interviewPersonasData.defaultPersona;

// Mock service functions
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const analyzeSkillGap = async (_jobDescription: string, _resume: string): Promise<SkillAnalysis> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real implementation, this would call an LLM API
  return mockSkillAnalysis;
};

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
  _roundNumber: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _interviewPersona: string
): Promise<InterviewQuestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real implementation, this would call an LLM API
  // Properly cast the categories to match our TypeScript interface
  const questionsWithProperTypes: InterviewQuestion[] = [
    ...mockInterviewQuestionsData.technical.map(q => ({ ...q, category: 'Technical' as const })),
    ...mockInterviewQuestionsData.behavioral.map(q => ({ ...q, category: 'Behavioral' as const })),
    ...mockInterviewQuestionsData.screening.map(q => ({ ...q, category: 'Screening' as const }))
  ];
  
  return questionsWithProperTypes;
};