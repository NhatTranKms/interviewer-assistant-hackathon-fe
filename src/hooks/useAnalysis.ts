import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useMemo } from 'react';
import { fetchAnalysis } from '../services/apiService';
import { useInterviewStore } from '../store/useInterviewStore';
import type { LegacyAnalysisResponse, AnalysisResponse } from '../models/api';

export const useAnalysis = () => {
  const query = useQuery<AnalysisResponse>({
    queryKey: ['analysis'],
    queryFn: fetchAnalysis,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1, // Only retry once on failure
  });

  // Use ref to track if we've already saved the data to avoid infinite loops
  const savedDataRef = useRef<AnalysisResponse | null>(null);

  useEffect(() => {
    if (query.data && query.data !== savedDataRef.current) {
      savedDataRef.current = query.data;
      
      // Split the large response into smaller parts for better performance
      const store = useInterviewStore.getState();
      
      // Save skill analysis data (for ResumeFitAnalysisPage)
      if (query.data.skill_matcher?.SkillMatcherResponse) {
        store.setSkillAnalysisData(query.data.skill_matcher.SkillMatcherResponse);
      }
      
      // Save question data (for QuestionGeneratorPage)
      if (query.data.question_generator?.QuestionGeneratorResponse) {
        store.setQuestionData(query.data.question_generator.QuestionGeneratorResponse);
      }
    }
  }, [query.data]);

  // Memoize the transformation to prevent recreation on every render
  const transformedData: LegacyAnalysisResponse | undefined = useMemo(() => {
    if (!query.data?.skill_matcher?.SkillMatcherResponse) {
      return undefined;
    }

    const skillMatcher = query.data.skill_matcher.SkillMatcherResponse;
    
    return {
      candidate: {
        name: 'Candidate',
        title: skillMatcher.level_specific_gap_analysis.candidate_level,
        seniorityLevel: skillMatcher.level_specific_gap_analysis.candidate_level
      },
      matchScore: skillMatcher.overall_matching_score,
      summary: `Overall readiness: ${skillMatcher.readiness_assessment.overall_readiness_level}. ${skillMatcher.readiness_assessment.development_timeline}`,
      skills: {
        matched: skillMatcher.matched_skills.map(skill => skill.skill),
        extra: skillMatcher.strong_areas,
        missing: skillMatcher.missing_critical_skills.map(skill => skill.skill),
        gaps: skillMatcher.level_specific_gap_analysis.competency_gaps
      },
      criteriaMatch: [
        ...skillMatcher.matched_skills.map(skill => ({
          requirement: skill.skill,
          evidence: `Confidence: ${skill.confidence_score}% (${skill.match_quality})`,
          status: 'matched' as const
        })),
        ...skillMatcher.missing_critical_skills.map(skill => ({
          requirement: skill.skill,
          evidence: skill.learning_recommendation,
          status: 'missing' as const
        }))
      ],
      education: {
        degree: 'Not specified',
        certifications: []
      },
      redFlags: skillMatcher.red_flags.map(flag => `${flag.issue} (${flag.severity_level} severity)`)
    };
  }, [query.data]);

  return {
    ...query,
    data: transformedData,
  };
};