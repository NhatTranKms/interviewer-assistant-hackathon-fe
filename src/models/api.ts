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

// New structure based on sample5.json

export interface BasicInfo {
  job_title: string;
  company: string;
  location: string;
  job_type: string;
  employment_type: string;
  experience_level: string;
  salary_range: string | null;
}

export interface RoleDetails {
  department: string;
  summary: string;
  key_responsibilities: string[];
  success_metrics: string[];
}

export interface TechnicalRequirements {
  programming_languages: string[];
  frameworks_tools: string[];
  platforms: string[];
  certifications: string[];
  experience_years: {
    min: number;
    max: number | null;
  };
}

export interface Qualifications {
  must_have: string[];
  nice_to_have: string[];
  education: string;
  certifications: string[];
}

export interface SkillPriority {
  critical: string[];
  important: string[];
  beneficial: string[];
}

export interface SkillsAnalysis {
  hard_skills: string[];
  soft_skills: string[];
  domain_expertise: string[];
  skill_priority: SkillPriority;
}

export interface CompanyCulture {
  company_size: string;
  values: string[];
  benefits: string[];
  work_environment: string;
}

export interface JDAnalysisDetails {
  complexity_level: string;
  market_competitiveness: string;
  completeness_score: number;
  red_flags: string[];
  missing_info: string[];
  key_insights: string[];
}

export interface JDAnalysis {
  basic_info: BasicInfo;
  role_details: RoleDetails;
  technical_requirements: TechnicalRequirements;
  qualifications: Qualifications;
  skills_analysis: SkillsAnalysis;
  company_culture: CompanyCulture;
  analysis: JDAnalysisDetails;
  status: string;
  timestamp: string | null;
  processing_time: string | null;
  agent_version: string;
}

export interface CandidateProfile {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface ProfessionalSummary {
  title: string;
  years_experience: number;
  summary: string;
  key_achievements: string[];
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  graduation_year: string;
  gpa: number | null;
  relevant_coursework: string[];
}

export interface TechnicalSkills {
  programming_languages: string[];
  frameworks_tools: string[];
  platforms: string[];
  databases: string[];
  certifications: string[];
  skill_levels: Record<string, string | number>;
}

export interface CVSkillsAnalysis {
  hard_skills: string[];
  soft_skills: string[];
  domain_expertise: string[];
  skill_gaps: string[];
}

export interface CVAnalysisDetails {
  experience_level: string;
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
  education: Education[];
  technical_skills: TechnicalSkills;
  skills_analysis: CVSkillsAnalysis;
  analysis: CVAnalysisDetails;
  status: string;
  timestamp: string;
  processing_time: string;
  agent_version: string;
}

export interface MatchedSkill {
  skill_name: string;
  confidence_score: number;
  jd_requirement_level: string;
  cv_proficiency_level: string;
  match_quality: string;
  evidence: string[];
}

export interface MissingCriticalSkill {
  skill_name: string;
  impact_level: string;
  priority: string;
  suggested_learning_path: string;
  can_be_learned_quickly: boolean;
  alternative_skills: string[];
}

export interface LevelGapAnalysis {
  target_level: string;
  candidate_current_level: string;
  level_gap: string;
  key_competencies_missing: string[];
  development_areas: string[];
  estimated_time_to_readiness: string;
}

export interface StrongArea {
  area_name: string;
  description: string;
  exceeds_requirement_by: string;
  competitive_advantage: boolean;
}

export interface RedFlag {
  concern: string;
  severity: string;
  potential_impact: string;
  mitigation_strategy: string;
}

export interface ReadinessAssessment {
  overall_readiness: string;
  readiness_score: number;
  key_blockers: string[];
  quick_wins: string[];
  long_term_development: string[];
  recommended_timeline: string;
}

export interface SkillMatcherResponse {
  overall_match_score: number;
  matched_skills: MatchedSkill[];
  missing_critical_skills: MissingCriticalSkill[];
  level_gap_analysis: LevelGapAnalysis;
  strong_areas: StrongArea[];
  red_flags: RedFlag[];
  readiness_assessment: ReadinessAssessment;
  total_required_skills: number;
  matched_skills_count: number;
  missing_skills_count: number;
  match_percentage: number;
  immediate_actions: string[];
  skill_development_plan: string[];
  interview_focus_areas: string[];
  status: string;
  timestamp: string;
  processing_time: string;
  agent_version: string;
}

export interface EvaluationRubric {
  clarity: string;
  accuracy: string;
  depth: string;
  practical_application: string;
}

export interface ScoringGuide {
  score_1: string;
  score_2: string;
  score_3: string;
  score_4: string;
  score_5: string;
}

export interface InterviewQuestion {
  question_id: string;
  category: string;
  difficulty_level: string;
  question_text: string;
  context: string;
  expected_answer: string;
  evaluation_rubric: EvaluationRubric;
  scoring_guide: ScoringGuide;
  follow_up_questions: string[];
  time_allocation: number;
  skills_assessed: string[];
}

export interface CategorySummary {
  category: string;
  question_count: number;
  total_time: number;
  focus_areas: string[];
  rationale: string;
}

export interface QuestionGeneratorResponse {
  questions: InterviewQuestion[];
  category_summaries: CategorySummary[];
  target_position: string;
  candidate_level: string;
  total_interview_time: number;
  interview_focus: string[];
  strengths_to_validate: string[];
  gaps_to_assess: string[];
  red_flags_to_investigate: string[];
  core_knowledge_count: number;
  practical_skills_count: number;
  tools_technology_count: number;
  scenario_problem_solving_count: number;
  process_best_practices_count: number;
  interview_strategy: string;
  key_decision_points: string[];
  preparation_notes: string[];
  status: string;
  timestamp: string | null;
  processing_time: string | null;
  agent_version: string;
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