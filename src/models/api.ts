export interface JobTitle {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobTitlesResponse {
  data: JobTitle[];
  total: number;
}

export interface SeniorityLevel {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeniorityLevelsResponse {
  data: SeniorityLevel[];
  total: number;
}

export interface InterviewSimulator {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewSimulatorsResponse {
  data: InterviewSimulator[];
  total: number;
}

export interface AnalysisResponse {
  candidate: {
    name: string;
    title: string;
    seniorityLevel: string;
  };
  matchScore: number;
  summary: string;
  skills: {
    matched: string[];
    extra: string[];
    missing: string[];
    gaps: string[];
  };
  criteriaMatch: {
    requirement: string;
    evidence: string;
    status: 'matched' | 'missing';
  }[];
  education: {
    degree: string;
    certifications: string[];
  };
  redFlags: string[];
}