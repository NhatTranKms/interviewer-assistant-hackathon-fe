// import type { AnalysisResponse } from '../models';

// interface StreamAnalysisInput {
//   jobDescription: string;
//   resume: string;
// }

// type StreamCallback = (chunk: Partial<AnalysisResponse>, progress: number, section: string) => void;

// // Mock streaming service that simulates progressive analysis
// export const streamAnalysis = async (
//   _input: StreamAnalysisInput,
//   onChunk: StreamCallback
// ): Promise<void> => {
//   const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//   // Mock analysis data - in real implementation, this would come from your API
//   const mockAnalysis: AnalysisResponse = {
//     candidate: {
//       name: "John Doe",
//       title: "Senior Frontend Developer",
//       seniorityLevel: "Senior"
//     },
//     matchScore: 87,
//     summary: "Strong candidate with excellent frontend development skills and relevant experience. Shows proficiency in modern frameworks and tools required for the position.",
//     skills: {
//       matched: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Node.js", "Git"],
//       extra: ["Vue.js", "Angular", "Python", "Docker", "AWS"],
//       missing: ["GraphQL", "Testing frameworks"],
//       gaps: ["Performance optimization", "Accessibility standards"]
//     },
//     criteriaMatch: [
//       { requirement: "3+ years React experience", evidence: "5 years React development at TechCorp", status: 'matched' },
//       { requirement: "TypeScript proficiency", evidence: "Extensive TypeScript usage in recent projects", status: 'matched' },
//       { requirement: "Testing experience", evidence: "Limited testing framework experience mentioned", status: 'missing' },
//       { requirement: "Team leadership", evidence: "Led frontend team of 4 developers", status: 'matched' }
//     ],
//     education: {
//       degree: "Bachelor's in Computer Science, State University",
//       certifications: ["AWS Certified Developer", "React Developer Certification"]
//     },
//     redFlags: ["Gap in employment (6 months)", "Limited testing framework experience"]
//   };

//   // Simulate streaming chunks with more realistic timing
//   const streamingSteps = [
//     {
//       delay: 1200,
//       section: "Parsing resume content...",
//       progress: 10,
//       data: {}
//     },
//     {
//       delay: 800,
//       section: "Extracting candidate profile...",
//       progress: 20,
//       data: { candidate: mockAnalysis.candidate }
//     },
//     {
//       delay: 1000,
//       section: "Analyzing job requirements...",
//       progress: 30,
//       data: {}
//     },
//     {
//       delay: 1500,
//       section: "Calculating compatibility score...",
//       progress: 45,
//       data: { matchScore: mockAnalysis.matchScore }
//     },
//     {
//       delay: 1200,
//       section: "Generating analysis summary...",
//       progress: 55,
//       data: { summary: mockAnalysis.summary }
//     },
//     {
//       delay: 1000,
//       section: "Identifying matched skills...",
//       progress: 65,
//       data: { 
//         skills: {
//           matched: mockAnalysis.skills.matched,
//           missing: [],
//           gaps: [],
//           extra: []
//         }
//       }
//     },
//     {
//       delay: 800,
//       section: "Finding skill gaps and missing skills...",
//       progress: 72,
//       data: { 
//         skills: {
//           matched: mockAnalysis.skills.matched,
//           missing: mockAnalysis.skills.missing,
//           gaps: mockAnalysis.skills.gaps,
//           extra: []
//         }
//       }
//     },
//     {
//       delay: 600,
//       section: "Analyzing additional strengths...",
//       progress: 78,
//       data: { 
//         skills: {
//           matched: mockAnalysis.skills.matched,
//           missing: mockAnalysis.skills.missing,
//           gaps: mockAnalysis.skills.gaps,
//           extra: mockAnalysis.skills.extra
//         }
//       }
//     },
//     {
//       delay: 1400,
//       section: "Evaluating job criteria alignment...",
//       progress: 87,
//       data: { criteriaMatch: mockAnalysis.criteriaMatch }
//     },
//     {
//       delay: 900,
//       section: "Verifying education and certifications...",
//       progress: 93,
//       data: { education: mockAnalysis.education }
//     },
//     {
//       delay: 700,
//       section: "Performing quality checks...",
//       progress: 96,
//       data: {}
//     },
//     {
//       delay: 800,
//       section: "Identifying potential concerns...",
//       progress: 99,
//       data: { redFlags: mockAnalysis.redFlags }
//     }
//   ];

//   for (const step of streamingSteps) {
//     await delay(step.delay);
//     onChunk(step.data, step.progress, step.section);
//   }

//   await delay(300);
//   onChunk({}, 100, "Analysis complete");
// };

// // Simulate typing effect for text content
// export const streamText = async (
//   text: string,
//   onProgress: (partialText: string) => void,
//   speed: number = 30
// ): Promise<void> => {
//   const words = text.split(' ');
//   let currentText = '';
  
//   for (let i = 0; i < words.length; i++) {
//     currentText += (i > 0 ? ' ' : '') + words[i];
//     onProgress(currentText);
//     await new Promise(resolve => setTimeout(resolve, speed));
//   }
// };
