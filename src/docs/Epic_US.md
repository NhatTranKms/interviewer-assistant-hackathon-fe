# **Product Requirements Document: Interview Prep Assistant**

## **Epics and User Stories**

### **Epic 1: Pre-Interview Preparation Module**

**Goal:** Allow an interviewer to input a candidate's resume and a job description to generate a customized interview plan, including skill analysis and a set of tailored questions. This corresponds to the user flow: *Visit the app \-\> Enter Info \-\> Upload Resume & Paste JD \-\> Highlight Skills \-\> Generate Interview Questions*.

* **User Story 1.1: As an interviewer, I want to input candidate details so that I can provide context for the interview.**  
  * **Acceptance Criteria:**  
    * The user can select a candidate role (e.g., Software Engineer, QA, Business Analyst).  
    * The user can select a seniority level (e.g., Junior, Mid-level, Senior).  
    * The user can select an optional "Interview Simulator" type.  
* **User Story 1.2: As an interviewer, I want to provide a job description and a candidate resume so that the system can analyze the content.**  
  * **Acceptance Criteria:**  
    * The user can paste text for the job description.  
    * The user can paste text for the candidate's resume.  
    * The user can upload a PDF or DOCX file for the resume.  
    * The system validates that all required fields are filled before submission.  
* **User Story 1.3: As an interviewer, I want to see a skill-gap analysis so that I can quickly identify the candidate's strengths and weaknesses.**  
  * **Acceptance Criteria:**  
    * The system compares skills from the resume against the job description.  
    * The system outputs a clear, side-by-side comparison.  
    * The output highlights matched skills, missing skills, strong areas, and potential red flags.  
* **User Story 1.4: As an interviewer, I want the system to generate relevant interview questions so that I can conduct a structured and effective interview.**  
  * **Acceptance Criteria:**  
    * The system generates 15 questions categorized into "Technical," "Behavioral," and "System Design."  
    * Each question is accompanied by an "Expected Answer" and an "Evaluation Criteria."  
    * The generated questions are tailored to the specific role, seniority, and skill analysis.  
* **User Story 1.5: As an interviewer, I want to be able to download the generated interview plan so that I can easily reference it during the interview.**  
  * **Acceptance Criteria:**  
    * The system provides a "Save as PDF" option.  
    * The generated PDF includes the skill gap analysis and the complete set of questions, expected answers, and evaluation criteria.

### **Epic 2: Post-Interview Assessment Module**

**Goal:** Enable the interviewer to upload a transcript of an interview and receive a detailed, AI-driven evaluation of the candidate's performance.

* **User Story 2.1: As an interviewer, I want to upload the interview transcript so that the system can begin its analysis.**  
  * **Acceptance Criteria:**  
    * The user can upload an audio file (.mp3, .wav) or a text transcript file (.txt, .docx, .pdf).  
    * If an audio file is uploaded, the system automatically converts it to a transcript using a speech-to-text engine.  
    * The system segments the transcript into a Q\&A format.  
* **User Story 2.2: As an interviewer, I want to receive a comprehensive evaluation of the candidate's answers so that I can make a well-informed decision.**  
  * **Acceptance Criteria:**  
    * The AI evaluates each candidate response based on relevance, clarity, logical flow, and communication skills.  
    * The system provides a per-question score (e.g., 1-5 stars) and a quick comment.  
    * The system identifies and flags hesitations and filler words.  
* **User Story 2.3: As an interviewer, I want a summary of the candidate's performance so that I have a clear overview of their interview.**  
  * **Acceptance Criteria:**  
    * The system displays category scores (Technical, Behavioral, Communication).  
    * The system provides an overall score and a recommended candidate level.  
    * The system lists the candidate's overall strengths and weaknesses.  
    * The user can download a full evaluation report as a PDF.

### **Epic 3: Data Governance and Security**

**Goal:** Ensure that all candidate data is handled securely and that system interactions are logged for auditability.

* **User Story 3.1: As a user, I want to know my data is safe so that I can trust the application with sensitive information.**  
  * **Acceptance Criteria:**  
    * Candidate CVs and JDs are stored securely.  
    * Access to data is restricted via role-based access controls.  
    * The system provides an optional setting to anonymize candidate information before it is sent to the AI model.  
* **User Story 3.2: As a system administrator, I want to be able to audit all AI interactions so that I can ensure compliance and track usage.**  
  * **Acceptance Criteria:**  
    * The system logs every AI interaction.  
    * The audit logs are accessible to authorized personnel.

### **Epic 4: Additional Enhancements (Phase 2\)**

**Goal:** Implement non-essential but valuable features to improve the interviewer's experience.

* **User Story 4.1: As an interviewer, I want to provide feedback on the generated questions so that the AI model can be fine-tuned over time.**  
  * **Acceptance Criteria:**  
    * The user can rate the quality of the generated questions.  
    * This feedback is used to improve the model's future outputs.  
* **User Story 4.2: As an interviewer, I want to save high-quality questions so that I can easily reuse them for other interviews.**  
  * **Acceptance Criteria:**  
    * The user can "bookmark" or save individual questions.  
    * A list of bookmarked questions is available for reuse.