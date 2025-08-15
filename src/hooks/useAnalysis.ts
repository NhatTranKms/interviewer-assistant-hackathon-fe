import { useMemo } from 'react';
import { useInterviewStore } from '../store/useInterviewStore';
import type { LegacyAnalysisResponse } from '../models/api';

export const useAnalysis = () => {
  const { skillAnalysisData, cvAnalysisData } = useInterviewStore();

  // Memoize the transformation to prevent recreation on every render
  const transformedData: LegacyAnalysisResponse | undefined = useMemo(() => {
    if (!skillAnalysisData) {
      return undefined;
    }

    const skillMatcher = skillAnalysisData;
    
    return {
      candidate: {
        name: 'Candidate',
        title: skillMatcher.level_specific_gap_analysis.candidate_level,
        seniorityLevel: skillMatcher.level_specific_gap_analysis.candidate_level
      },
      matchScore: skillMatcher.overall_matching_score,
      summary: `Overall readiness: ${skillMatcher.readiness_assessment.readiness_level}. Readiness score: ${skillMatcher.readiness_assessment.readiness_score}%`,
      skills: {
        matched: skillMatcher.matched_skills.map(skill => skill.skill),
        extra: skillMatcher.strong_areas.map(area => area.description),
        missing: skillMatcher.missing_critical_skills.map(skill => skill.skill),
        gaps: skillMatcher.level_specific_gap_analysis.competency_gaps.map(gap => `${gap.area}: ${gap.gap_description}`)
      },
      criteriaMatch: [
        ...skillMatcher.matched_skills.map(skill => ({
          requirement: skill.skill,
          evidence: `Confidence: ${skill.confidence_score}% - ${skill.match_quality}`,
          status: 'matched' as const
        })),
        ...skillMatcher.missing_critical_skills.map(skill => ({
          requirement: skill.skill,
          evidence: skill.learning_recommendation,
          status: 'missing' as const
        }))
      ],
      education: {
        degree: cvAnalysisData?.education?.degree || 'Not specified',
        certifications: cvAnalysisData?.certifications || []
      },
      redFlags: skillMatcher.red_flags.map(flag => `${flag.issue} (${flag.severity_level} severity)`)
    };
  }, [skillAnalysisData, cvAnalysisData]);

  return {
    data: transformedData,
    isLoading: false,
    error: null,
  };
};