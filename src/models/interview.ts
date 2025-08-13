export interface CandidateInfo {
  name: string;
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
  category: 'Core Knowledge' | 'Practical Skills' | 'Tools & Technology' | 'Scenario-Based' | 'Process & Best Practices';
  expectedAnswer: string;
  evaluationCriteria: string | string[];
  scoringGuide?: ScoringItem[];
}