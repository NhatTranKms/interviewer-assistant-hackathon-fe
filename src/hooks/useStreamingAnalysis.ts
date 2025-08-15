// import { useState, useCallback } from 'react';
// import type { AnalysisResponse } from '../models';
// import { streamAnalysis } from '../services/streamingApiService';

// export interface PartialAnalysisResponse {
//   candidate?: AnalysisResponse['candidate'];
//   matchScore?: number;
//   summary?: string;
//   skills?: Partial<AnalysisResponse['skills']>;
//   criteriaMatch?: AnalysisResponse['criteriaMatch'];
//   education?: AnalysisResponse['education'];
//   redFlags?: string[];
// }

// export interface StreamingAnalysisState {
//   data: PartialAnalysisResponse;
//   isStreaming: boolean;
//   isComplete: boolean;
//   error: string | null;
//   progress: number; // 0-100
//   currentSection: string | null;
// }

// export const useStreamingAnalysis = () => {
//   const [state, setState] = useState<StreamingAnalysisState>({
//     data: {},
//     isStreaming: false,
//     isComplete: false,
//     error: null,
//     progress: 0,
//     currentSection: null,
//   });

//   const startAnalysis = useCallback(async (jobDescription: string, resume: string) => {
//     setState({
//       data: {},
//       isStreaming: true,
//       isComplete: false,
//       error: null,
//       progress: 0,
//       currentSection: 'Initializing analysis...',
//     });

//     try {
//       await streamAnalysis(
//         { jobDescription, resume },
//         (chunk: Partial<AnalysisResponse>, progress: number, section: string) => {
//           setState(prev => ({
//             ...prev,
//             data: {
//               ...prev.data,
//               ...chunk,
//               // Deep merge skills to avoid overwriting existing skills
//               skills: chunk.skills ? {
//                 ...prev.data.skills,
//                 ...chunk.skills
//               } : prev.data.skills
//             },
//             progress,
//             currentSection: section,
//           }));
//         }
//       );

//       setState(prev => ({
//         ...prev,
//         isStreaming: false,
//         isComplete: true,
//         progress: 100,
//         currentSection: 'Analysis complete',
//       }));
//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         isStreaming: false,
//         error: error instanceof Error ? error.message : 'Analysis failed',
//         currentSection: null,
//       }));
//     }
//   }, []);

//   const reset = useCallback(() => {
//     setState({
//       data: {},
//       isStreaming: false,
//       isComplete: false,
//       error: null,
//       progress: 0,
//       currentSection: null,
//     });
//   }, []);

//   return {
//     ...state,
//     startAnalysis,
//     reset,
//   };
// };