import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, FloatingPortal } from '@floating-ui/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StreamingText } from '../components/ui/StreamingText';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, User, Database, Loader2 } from 'lucide-react';
import { useInterviewStore } from '../store/useInterviewStore';
import { generateInterviewQuestions } from '../services/mockLLMService';
import { useStreamingAnalysis } from '../hooks/useStreamingAnalysis';

export default function ResumeFitAnalysisPage() {
  const navigate = useNavigate();
  const {
    candidateInfo,
    jobDescription,
    resume,
    setQuestions,
    setIsLoading,
    isLoading,
    setCandidateInfo
  } = useInterviewStore();
  
  const {
    data: analysisData,
    isStreaming,
    isComplete,
    error,
    progress,
    currentSection,
    startAnalysis,
    reset
  } = useStreamingAnalysis();

  // Start streaming analysis when component mounts
  useEffect(() => {
    if (jobDescription && resume && !isStreaming && !isComplete && !error) {
      startAnalysis(jobDescription, resume);
    }
  }, [jobDescription, resume, startAnalysis, isStreaming, isComplete, error]);

  // Save candidate info to global state when analysis data is loaded
  useEffect(() => {
    if (analysisData && analysisData.candidate) {
      setCandidateInfo({
        name: analysisData.candidate.name,
        title: analysisData.candidate.title,
        seniorityLevel: analysisData.candidate.seniorityLevel,
        interviewSimulator: candidateInfo.interviewSimulator // Keep existing simulator selection
      });
    }
  }, [analysisData, setCandidateInfo, candidateInfo.interviewSimulator]);

  // Floating UI Tooltip component
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

  if (!jobDescription || !resume) {
    navigate('/preparation');
    return null;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load analysis: {error}</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/preparation')}>Go Back</Button>
              <Button onClick={() => {
                reset();
                startAnalysis(jobDescription, resume);
              }}>Retry Analysis</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const matchScore = analysisData.matchScore || 0;
  const isEligibleForInterview = matchScore >= 80;

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    try {
      const questions = await generateInterviewQuestions(
        jobDescription,
        resume,
        {
          matchedSkills: analysisData.skills?.matched || [],
          missingSkills: analysisData.skills?.missing || [],
          potentialRedFlags: analysisData.redFlags || [],
          strongAreas: analysisData.skills?.extra || []
        },
        candidateInfo.title,
        candidateInfo.seniorityLevel,
        candidateInfo.interviewSimulator
      );
      setQuestions(questions);
      navigate('/questions');
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    navigate('/preparation');
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
        {/* Streaming Progress */}
        {isStreaming && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-blue-800 font-medium">Analyzing Resume...</span>
            </div>
            <ProgressBar 
              progress={progress} 
              label={currentSection || ''} 
              showPercentage 
              className="mb-2"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">Resume Fit Analysis</h1>
          </div>
          <div className="flex justify-between items-center mb-3">
            {analysisData.candidate ? (
              <span className="text-xl sm:text-2xl text-gray-700 font-bold">
                {analysisData.candidate.name} - {analysisData.candidate.title} - {analysisData.candidate.seniorityLevel}
              </span>
            ) : (
              <SkeletonLoader className="w-96 h-8" />
            )}
            {analysisData.matchScore !== undefined ? (
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                Match Score: {matchScore}%
              </span>
            ) : (
              <SkeletonLoader className="w-32 h-8" />
            )}
          </div>
          {analysisData.summary ? (
            <div className="text-sm sm:text-lg text-gray-600 break-words mt-2">
              <StreamingText 
                text={analysisData.summary} 
                startStreaming={!isComplete && !!analysisData.summary}
                speed={15}
              />
            </div>
          ) : (
            <SkeletonLoader count={3} className="mt-2" />
          )}
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
                  <div className="flex flex-wrap gap-2">
                    <SkeletonLoader variant="badge" count={6} className="mb-2" />
                  </div>
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
                  <div className="flex flex-wrap gap-2">
                    <SkeletonLoader variant="badge" count={4} className="mb-2" />
                  </div>
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
                  <div className="flex flex-wrap gap-2">
                    <SkeletonLoader variant="badge" count={3} className="mb-2" />
                  </div>
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
                  <div className="flex flex-wrap gap-2">
                    <SkeletonLoader variant="badge" count={2} className="mb-2" />
                  </div>
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
                    <th className="text-left py-2 font-medium text-gray-900">JD Requirement</th>
                    <th className="text-left py-2 font-medium text-gray-900">CV Evidence</th>
                    <th className="text-center py-2 font-medium text-gray-900">Status</th>
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
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <SkeletonLoader className="h-4" />
                  <SkeletonLoader className="h-4" />
                  <SkeletonLoader className="h-4 w-8 mx-auto" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <SkeletonLoader className="h-4" />
                  <SkeletonLoader className="h-4" />
                  <SkeletonLoader className="h-4 w-8 mx-auto" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <SkeletonLoader className="h-4" />
                  <SkeletonLoader className="h-4" />
                  <SkeletonLoader className="h-4 w-8 mx-auto" />
                </div>
              </div>
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
            <div className="space-y-2">
              <SkeletonLoader className="w-80" />
              <SkeletonLoader className="w-32" />
              <SkeletonLoader className="w-64" />
              <SkeletonLoader className="w-48" />
            </div>
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
            <div className="space-y-1">
              <SkeletonLoader className="w-96" />
              <SkeletonLoader className="w-80" />
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={isStreaming}
            className="px-6 py-2 w-full sm:w-auto"
          >
            {isStreaming ? 'Analyzing...' : 'Reset'}
          </Button>
          
          <Tooltip 
            content={!isComplete 
              ? "Please wait for analysis to complete" 
              : !isEligibleForInterview 
                ? "Match score must be 80% or higher to generate interview questions. Current score is below the threshold." 
                : ""
            }
            showTooltip={!isComplete || !isEligibleForInterview}
          >
            <Button 
              onClick={handleGenerateQuestions}
              disabled={isLoading || isStreaming || !isComplete || !isEligibleForInterview}
              className={`px-6 py-2 w-full sm:w-auto ${
                isComplete && isEligibleForInterview 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
              }`}
            >
              {isLoading ? 'Generating...' : 
               isStreaming ? 'Analyzing...' : 
               'Generate Interview Questions'}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}