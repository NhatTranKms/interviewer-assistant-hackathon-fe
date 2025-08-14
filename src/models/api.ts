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

export interface MatchedSkill {
  skill: string;
  confidence_score: number;
  match_quality: 'High' | 'Medium' | 'Low';
}

export interface MissingSkill {
  skill: string;
  impact_level: 'High' | 'Medium' | 'Low';
  learning_recommendation: string;
}

export interface RedFlag {
  issue: string;
  severity_level: 'High' | 'Medium' | 'Low';
}

export interface ReadinessAssessment {
  overall_readiness_level: string;
  readiness_score: number;
  blockers: string[];
  development_timeline: string;
}

export interface LevelGapAnalysis {
  candidate_level: string;
  target_position_level: string;
  competency_gaps: string[];
}

export interface SkillMatcherResponse {
  overall_matching_score: number;
  matched_skills: MatchedSkill[];
  missing_critical_skills: MissingSkill[];
  level_specific_gap_analysis: LevelGapAnalysis;
  strong_areas: string[];
  red_flags: RedFlag[];
  readiness_assessment: ReadinessAssessment;
}

export interface AnalysisResponse {
  status: string;
  execution_time: number;
  timestamp: string;
  skill_matcher: {
    SkillMatcherResponse: SkillMatcherResponse;
  };
  question_generator?: {
    QuestionGeneratorResponse: QuestionGeneratorResponse;
  };
}

// Legacy interface for backward compatibility
export interface ApiInterviewQuestion {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  expected_answer: string;
  evaluation_rubric: {
    clarity: string;
    accuracy: string;
    depth: string;
    practical_application: string;
  };
  scoring_guide: {
    "1_star": string;
    "2_star": string;
    "3_star": string;
    "4_star": string;
    "5_star": string;
  };
  time_allocation: string;
  skills_assessed: string[];
  follow_up_questions: string[];
}

export interface QuestionGeneratorResponse {
  interview_questions: ApiInterviewQuestion[];
  interview_strategy: {
    overall_guidance: string;
    time_allocation: {
      technical_assessment: string;
      system_design: string;
      behavioral_assessment: string;
    };
    key_decision_points: string[];
    interviewer_preparation: string;
  };
}

export interface LegacyAnalysisResponse {
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