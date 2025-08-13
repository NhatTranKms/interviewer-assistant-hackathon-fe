import { useQuery } from '@tanstack/react-query';
import { fetchJobTitles, fetchSeniorityLevels, fetchInterviewSimulators } from '../services/apiService';

export const useJobTitles = () => {
  return useQuery({
    queryKey: ['jobTitles'],
    queryFn: fetchJobTitles,
  });
};

export const useSeniorityLevels = () => {
  return useQuery({
    queryKey: ['seniorityLevels'],
    queryFn: fetchSeniorityLevels,
  });
};

export const useInterviewSimulators = () => {
  return useQuery({
    queryKey: ['interviewSimulators'],
    queryFn: fetchInterviewSimulators,
  });
};