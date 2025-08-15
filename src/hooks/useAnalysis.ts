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
        name: cvAnalysisData?.candidate_profile?.full_name || 'Candidate',
        title: skillMatcher.level_gap_analysis?.candidate_current_level || 'Not specified',
        seniorityLevel: skillMatcher.level_gap_analysis?.candidate_current_level || 'Not specified'
      },
      matchScore: skillMatcher.overall_match_score,
      summary: `Overall readiness: ${skillMatcher.readiness_assessment.overall_readiness}. Readiness score: ${skillMatcher.readiness_assessment.readiness_score}%`,
      skills: {
        matched: skillMatcher.matched_skills.map(skill => skill.skill_name),
        extra: skillMatcher.strong_areas.map(area => area.description),
        missing: skillMatcher.missing_critical_skills.map(skill => skill.skill_name),
        gaps: skillMatcher.level_gap_analysis?.development_areas || []
      },
      criteriaMatch: [
        ...skillMatcher.matched_skills.map(skill => ({
          requirement: skill.skill_name,
          evidence: skill.evidence.join('; '),
          status: 'matched' as const
        })),
        ...skillMatcher.missing_critical_skills.map(skill => ({
          requirement: skill.skill_name,
          evidence: skill.suggested_learning_path,
          status: 'missing' as const
        }))
      ],
      education: {
        degree: Array.isArray(cvAnalysisData?.education) && cvAnalysisData.education.length > 0 
          ? cvAnalysisData.education[0].degree || 'Not specified' 
          : 'Not specified',
        certifications: cvAnalysisData?.technical_skills?.certifications || []
      },
      redFlags: skillMatcher.red_flags.map(flag => `${flag.concern} (${flag.severity} severity): ${flag.potential_impact}`)
    };
  }, [skillAnalysisData, cvAnalysisData]);

  return {
    data: transformedData,
    isLoading: false,
    error: null,
  };
};