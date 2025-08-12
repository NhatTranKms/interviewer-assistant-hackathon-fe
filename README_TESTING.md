# Interview Prep Assistant - Testing Guide

## Overview
This is an AI-powered Interview Preparation Assistant that helps interviewers prepare for candidate interviews by analyzing resumes, job descriptions, and generating tailored interview questions.

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:** `http://localhost:5173`

## Testing the Application Flow

### Step 1: Homepage
- Visit the homepage at `http://localhost:5173`
- You'll see two main options:
  - **Interview Preparation** (functional)
  - **Post-Interview Analysis** (coming soon)

### Step 2: Interview Preparation
- Click "Start Preparation" to go to `/preparation`
- You'll see a form with the following fields:
  - **Title:** Dropdown with job titles (Software Engineer, etc.)
  - **Seniority Level:** Junior, Mid-level, Senior, etc.
  - **Job Description:** Text area for job requirements
  - **Resume:** Text area for candidate's resume
  - **Interview Simulator:** Optional interview style

### Step 3: Load Test Data (Recommended)
- Click the **"Load Test Data"** button to automatically fill the form with realistic mock data
- This includes a sample job description for a Software Engineer position and a candidate's resume

### Step 4: Submit and Analyze
- Click **"Submit"** to start the skill analysis
- The system will simulate AI processing (2-second delay)
- You'll be redirected to the **Skill Analysis page** at `/analysis`

### Step 5: Skill Analysis Results
The analysis page shows:
- **Side-by-side comparison** of job requirements vs candidate skills
- **Matched Skills** (green badges)
- **Missing Skills** (red badges) 
- **Potential Red Flags** (yellow alerts)
- **Strong Areas** (blue highlights)

### Step 6: Generate Interview Questions
- Click **"Generate Questions"** on the analysis page
- The system will simulate AI processing (3-second delay)
- You'll be redirected to the **Questions page** at `/questions`

### Step 7: Interview Questions
The questions page displays:
- **15 total questions** organized in 3 categories:
  - Technical Questions (5)
  - Behavioral Questions (5) 
  - System Design Questions (5)
- **Tabbed interface** to switch between categories
- **Expandable questions** showing:
  - Expected answers
  - Evaluation criteria
- **PDF export option** (placeholder for future implementation)

## Mock Data Details

The application includes realistic mock data for testing:

### Sample Job Description:
- Software Engineer position
- Required skills: Node.js, PostgreSQL, React.js, AWS, etc.
- Nice-to-have skills: Docker, CI/CD, microservices

### Sample Resume:
- Candidate: John Smith, Software Developer
- Experience with: React.js, Node.js, MongoDB, Docker, Jenkins
- Some skill gaps compared to job requirements

### Generated Analysis:
- **Matched Skills:** Node.js, React.js, RESTful APIs, Git, Agile, JavaScript
- **Missing Skills:** PostgreSQL, TypeScript, AWS Services, GitHub Actions
- **Red Flags:** MongoDB vs PostgreSQL requirement, limited cloud experience
- **Strong Areas:** Frontend development, API experience, modern workflows

## Features Implemented

✅ **Complete User Flow:** Visit → Enter Info → Upload Resume → Analyze Skills → Generate Questions  
✅ **Responsive Design:** Works on desktop and mobile  
✅ **Modern UI:** Uses shadcn/ui components with Tailwind CSS  
✅ **State Management:** Zustand store for app state  
✅ **Mock AI Services:** Simulated LLM responses with realistic delays  
✅ **Interactive Components:** Expandable questions, tabbed interface  
✅ **Loading States:** Visual feedback during processing  
✅ **Navigation:** Seamless routing between pages  

## Technical Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Routing:** React Router DOM
- **State Management:** Zustand
- **Build Tool:** Vite
- **Icons:** Lucide React

## Future Enhancements

- File upload for PDF/DOCX resumes
- PDF export functionality
- Real AI integration (OpenAI, Claude, etc.)
- Post-interview analysis module
- User authentication and data persistence
- Question bookmarking and reuse

## Browser Support

Tested on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

---

**Note:** This is a demonstration application with mock AI responses. In production, you would integrate with actual AI services for skill analysis and question generation.

