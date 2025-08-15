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

// New structure based on sample4.json

export interface ContactDetails {
  contact_person: string;
  email: string;
  phone_number: string;
  linkedin: string;
  github: string;
}

export interface BasicInformation {
  job_title: string;
  company: string;
  location: string;
  contact_details: ContactDetails;
}

export interface RoleDetails {
  responsibilities: string[];
  qualifications: string[];
  nice_to_have: string[];
}

export interface SkillsAnalysis {
  must_have: string[];
  nice_to_have: string[];
}

export interface Qualifications {
  must_have: string[];
  nice_to_have: string[];
}

export interface CompanyCulture {
  description: string;
}

export interface JDAnalysis {
  basic_information: BasicInformation;
  role_details: RoleDetails;
  skills_analysis: SkillsAnalysis;
  qualifications: Qualifications;
  company_culture: CompanyCulture;
  analysis_insights: string[];
}

export interface CandidateProfile {
  name: string;
  contact_information: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
}

export interface ProfessionalSummary {
  summary: string;
  experience_level: string;
}

export interface WorkExperience {
  position: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  university: string;
  graduation_year: string;
}

export interface CVSkillsAnalysis {
  matched_skills: string[];
  gaps: string[];
}

export interface OverallAnalysis {
  completeness_score: number;
  strengths: string[];
  weaknesses: string[];
  red_flags: string[];
  missing_sections: string[];
  recommendations: string[];
}

export interface CVAnalysis {
  candidate_profile: CandidateProfile;
  professional_summary: ProfessionalSummary;
  work_experience: WorkExperience[];
  education: Education;
  technical_skills: string[];
  certifications: string[];
  skills_analysis: CVSkillsAnalysis;
  overall_analysis: OverallAnalysis;
}

export interface MatchedSkill {
  skill: string;
  confidence_score: number;
  match_quality: string;
}

export interface MissingCriticalSkill {
  skill: string;
  impact_level: string;
  learning_recommendation: string;
}

export interface CompetencyGap {
  area: string;
  gap_description: string;
  development_plan: string;
}

export interface LevelSpecificGapAnalysis {
  candidate_level: string;
  target_position_level: string;
  competency_gaps: CompetencyGap[];
}

export interface StrongArea {
  area: string;
  description: string;
}

export interface RedFlag {
  issue: string;
  severity_level: string;
}

export interface ReadinessAssessmentBlocker {
  blocker: string;
  development_timeline: string;
}

export interface ReadinessAssessment {
  readiness_level: string;
  readiness_score: number;
  blockers: ReadinessAssessmentBlocker[];
}

export interface SkillMatcherResponse {
  overall_matching_score: number;
  matched_skills: MatchedSkill[];
  missing_critical_skills: MissingCriticalSkill[];
  level_specific_gap_analysis: LevelSpecificGapAnalysis;
  strong_areas: StrongArea[];
  red_flags: RedFlag[];
  readiness_assessment: ReadinessAssessment;
}

export interface EvaluationCriteria {
  clarity: string;
  accuracy: string;
  depth: string;
  practical_application: string;
}

export interface ScoringGuide {
  "1_star": string;
  "2_star": string;
  "3_star": string;
  "4_star": string;
  "5_star": string;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  difficulty: string;
  question_text: string;
  expected_answer: string;
  evaluation_rubric: EvaluationCriteria;
  scoring_guide: ScoringGuide;
  time_allocation: string;
  skills_assessed: string[];
  follow_up_questions: string[];
}

export interface InterviewStrategy {
  overall_guidance: string;
  time_management: string;
  key_decision_points: string[];
  interviewer_preparation: string[];
}

export interface QuestionGeneratorResponse {
  questions: InterviewQuestion[];
  interview_strategy: InterviewStrategy;
}

export interface AnalysisResponse {
  status: string;
  execution_time: number;
  timestamp: string;
  jd_analysis: JDAnalysis;
  cv_analysis: CVAnalysis;
  skill_matcher: SkillMatcherResponse;
  question_generator: QuestionGeneratorResponse;
}

// Legacy interface for backward compatibility with existing UI
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