import { useQuery } from '@tanstack/react-query';
import { fetchAnalysis } from '../services/apiService';

export const useAnalysis = () => {
  return useQuery({
    queryKey: ['analysis'],
    queryFn: fetchAnalysis,
  });
};