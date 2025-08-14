import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, FloatingPortal } from '@floating-ui/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, User, Database } from 'lucide-react';
import { useInterviewStore } from '../store/useInterviewStore';
import { useAnalysis } from '../hooks/useAnalysis';
import type { LegacyAnalysisResponse } from '../models/api';

// Tooltip component - defined outside to prevent recreation on every render
const Tooltip = ({ children, content, showTooltip }: { children: React.ReactNode; content: string; showTooltip: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  if (showTooltip) {
    return (
      <>
        <div ref={refs.setReference} {...getReferenceProps()}>
          {children}
        </div>
        {isOpen && (
          <FloatingPortal>
            <div
              className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg z-50 max-w-xs"
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {content}
            </div>
          </FloatingPortal>
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default function ResumeFitAnalysisPage() {
  const navigate = useNavigate();
  const {
    candidateInfo,
    jobDescription,
    resume,
    setCandidateInfo
  } = useInterviewStore();
  
  const { data: analysisData, error } = useAnalysis() as { 
    data: LegacyAnalysisResponse | undefined, 
    error: Error | null 
  };

  // Save candidate info to global state when analysis data is loaded
  useEffect(() => {
    if (analysisData && analysisData.candidate) {
      setCandidateInfo({
        name: analysisData.candidate.name,
        title: analysisData.candidate.title,
        seniorityLevel: analysisData.candidate.seniorityLevel,
        interviewSimulator: currentInterviewSimulator.current // Keep existing simulator selection
      });
    }
  }, [analysisData, setCandidateInfo]);

  // Stable reference to current interview simulator to avoid dependency loops
  const currentInterviewSimulator = useRef(candidateInfo.interviewSimulator);
  useEffect(() => {
    currentInterviewSimulator.current = candidateInfo.interviewSimulator;
  }, [candidateInfo.interviewSimulator]);

  // Navigate to preparation page if missing required data
  useEffect(() => {
    if (!jobDescription || !resume) {
      navigate('/preparation');
    }
  }, [jobDescription, resume, navigate]);

  if (!jobDescription || !resume) {
    return null;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load analysis: {error.message}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/preparation')}>Go Back</Button>
              <Button onClick={() => window.location.reload()}>Retry Analysis</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Loading analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  const matchScore = analysisData.matchScore || 0;
  const isEligibleForInterview = matchScore >= 80;

  const handleGenerateQuestions = () => {
    // Questions are already available from the analysis API
    // Just navigate to the questions page
    navigate('/questions');
  };

  const handleReset = () => {
    navigate('/preparation');
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">Resume Fit Analysis</h1>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl sm:text-2xl text-gray-700 font-bold">
              {analysisData.candidate.name} - {analysisData.candidate.title} - {analysisData.candidate.seniorityLevel}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              Match Score: {matchScore}%
            </span>
          </div>
          <div className="text-sm sm:text-lg text-gray-600 break-words mt-2">
            {analysisData.summary}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Skills Overview */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Skills Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <h3 className="font-semibold text-green-600">Matched Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {analysisData.skills?.matched ? (
                  analysisData.skills.matched.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className="bg-green-100 text-green-800 hover:bg-green-100 animate-in fade-in duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">Loading skills...</div>
                )}
              </div>
            </div>

            {/* Extra Skills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-blue-600">Extra Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {analysisData.skills?.extra ? (
                  analysisData.skills.extra.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className="bg-blue-100 text-blue-800 hover:bg-blue-100 animate-in fade-in duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">Loading skills...</div>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-red-600">Missing Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {analysisData.skills?.missing ? (
                  analysisData.skills.missing.map((skill, index) => (
                    <Badge 
                      key={index} 
                      className="bg-red-100 text-red-800 hover:bg-red-100 animate-in fade-in duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">Loading skills...</div>
                )}
              </div>
            </div>

            {/* Skill Gaps */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <h3 className="font-semibold text-yellow-600">Skill Gaps</h3>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {analysisData.skills?.gaps ? (
                  analysisData.skills.gaps.map((gap, index) => (
                    <Badge 
                      key={index} 
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 animate-in fade-in duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {gap}
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">Loading skills...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Criteria Match */}
        <div className="mb-8">
           <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Criteria Match</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            {analysisData.criteriaMatch ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-900">JD Requirement</th>
                    <th className="text-left py-2 font-semibold text-gray-900">CV Evidence</th>
                    <th className="text-center py-2 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analysisData.criteriaMatch.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 text-gray-700">{item.requirement}</td>
                      <td className="py-2 text-gray-700">{item.evidence}</td>
                      <td className="py-2 text-center">
                        {item.status === 'matched' ? (
                          <CheckCircle className="w-4 h-4 text-blue-600 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">Loading criteria match...</div>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Education & Certifications */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education & Certifications</h2>
          {analysisData.education ? (
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-900">Education: </span>
                <span className="text-gray-700">{analysisData.education.degree}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Certifications:</span>
              </div>
              {analysisData.education.certifications.map((cert, index) => (
                <div key={index} className="text-gray-700">{cert}</div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Loading education information...</div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Potential Red Flags */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Potential Red Flags</h2>
          {analysisData.redFlags ? (
            <div className="space-y-1 text-sm text-gray-700">
              {analysisData.redFlags.map((flag, index) => (
                <div key={index}>{flag}</div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Loading potential issues...</div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="px-6 py-2 w-full sm:w-auto"
          >
            Reset
          </Button>
          
          <Tooltip 
            content={!isEligibleForInterview 
                ? "Match score must be 80% or higher to view interview questions. Current score is below the threshold." 
                : ""
            }
            showTooltip={!isEligibleForInterview}
          >
            <Button 
              onClick={handleGenerateQuestions}
              disabled={!isEligibleForInterview}
              className={`px-6 py-2 w-full sm:w-auto ${
                isEligibleForInterview 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
              }`}
            >
              View Interview Questions
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}