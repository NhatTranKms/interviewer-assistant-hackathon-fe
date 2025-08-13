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