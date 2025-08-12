# Mock Data Structure

This directory contains JSON files with mock data for the Interview Prep Assistant application.

## Files

### `mockJobDescription.json`
Contains structured job description data:
- `title`: Job position title
- `description`: Brief job overview
- `requiredSkills`: Array of required technical skills
- `niceToHave`: Array of preferred but optional skills
- `responsibilities`: Array of job responsibilities
- `benefits`: Company benefits description
- `fullText`: Complete formatted job description text

### `mockResume.json`
Contains structured candidate resume data:
- `personalInfo`: Name and current title
- `experience`: Array of work experience objects
- `skills`: Categorized technical skills object
- `fullText`: Complete formatted resume text

### `mockSkillAnalysis.json`
Contains the results of skill gap analysis:
- `matchedSkills`: Skills that appear in both job description and resume
- `missingSkills`: Required skills not found in the resume
- `potentialRedFlags`: Concerns or mismatches identified
- `strongAreas`: Candidate's key strengths

### `mockInterviewQuestions.json`
Contains categorized interview questions:
- `technical`: Array of technical interview questions
- `behavioral`: Array of behavioral interview questions
- `screening`: Array of simple screening questions focused on CV content

Each question object contains:
- `id`: Unique identifier
- `question`: The interview question text
- `category`: Question category
- `expectedAnswer`: Sample ideal response
- `evaluationCriteria`: What to look for when evaluating the answer

### `jobTitles.json`
Contains available job title options for the dropdown:
- `titles`: Array of job title objects with `value`, `label`, and `category`
- `defaultTitle`: Default selected job title

### `seniorityLevels.json`
Contains seniority level options for the dropdown:
- `levels`: Array of seniority level objects with `value`, `label`, `description`, and `yearsExperience`
- `defaultLevel`: Default selected seniority level

### `roundNumbers.json`
Contains interview round options for the dropdown:
- `rounds`: Array of round objects with `value`, `label`, `description`, `focus`, and `duration`
- `defaultRound`: Default selected interview round

### `interviewPersonas.json`
Contains interview persona options for the dropdown:
- `personas`: Array of persona objects with `value`, `label`, `description`, `characteristics`, and `questionStyle`
- `defaultPersona`: Default selected interview persona

## Usage

These JSON files are imported and used by the `mockLLMService.ts` to provide realistic test data for the application. This structure allows for:

1. **Easy maintenance**: Update mock data by editing JSON files
2. **Type safety**: TypeScript interfaces ensure data consistency
3. **Modularity**: Separate files for different data types
4. **Extensibility**: Easy to add new mock scenarios or data variations

## Adding New Mock Data

To add new mock scenarios:
1. Create new JSON files following the same structure
2. Update `mockLLMService.ts` to import and use the new data
3. Consider adding selection logic to choose between different scenarios
