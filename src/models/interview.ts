export interface CandidateInfo {
  title: string;
  seniorityLevel: string;
  interviewSimulator?: string;
}

export interface SkillAnalysis {
  matchedSkills: string[];
  missingSkills: string[];
  potentialRedFlags: string[];
  strongAreas: string[];
}

export interface ScoringItem {
  stars: number;
  description: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Technical' | 'Behavioral' | 'Screening';
  expectedAnswer: string;
  evaluationCriteria: string | string[];
  scoringGuide?: ScoringItem[];
}