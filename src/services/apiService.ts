import axios from 'axios';
import type { 
  JobTitle, 
  JobTitlesResponse, 
  SeniorityLevel, 
  SeniorityLevelsResponse, 
  InterviewSimulator, 
  InterviewSimulatorsResponse,
  AnalysisResponse
} from '../models';

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchJobTitles = async (): Promise<JobTitle[]> => {
  const response = await apiClient.get<JobTitlesResponse>('/titles');
  return response.data.data;
};

export const fetchSeniorityLevels = async (): Promise<SeniorityLevel[]> => {
  const response = await apiClient.get<SeniorityLevelsResponse>('/seniority-levels');
  return response.data.data;
};

export const fetchInterviewSimulators = async (): Promise<InterviewSimulator[]> => {
  const response = await apiClient.get<InterviewSimulatorsResponse>('/interview-simulators');
  return response.data.data;
};

export const fetchAnalysis = async (): Promise<AnalysisResponse> => {
  const response = await apiClient.get<AnalysisResponse>('/analysis');
  return response.data;
};