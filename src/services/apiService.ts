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

// Use environment variable or fallback to the IP address
const API_BASE_URL = 'http://52.221.250.230';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000000,
  
});

const oldApiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000000,
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
  const response = await oldApiClient.get<InterviewSimulatorsResponse>('/interview-simulators');
  return response.data.data;
};

export const prepareInterview = async (jobDescription: string, resumeFile: File): Promise<AnalysisResponse> => {
  // Create FormData to send job description and resume file
  const formData = new FormData();
  formData.append('jd_text', jobDescription);  // Job description as text with key "jd_text"
  formData.append('cv_file', resumeFile);      // Resume file with key "cv_file"

  const response = await apiClient.post<AnalysisResponse>('/prepare-interview', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 600000, // 60 seconds for file upload and processing
  });
  
  return response.data;
};

// Keep the old function for backward compatibility (if needed)
export const fetchAnalysis = async (): Promise<AnalysisResponse> => {
  // GET analysis mock data from backend
  const response = await apiClient.get<AnalysisResponse>('/analysis');
  return response.data;
};