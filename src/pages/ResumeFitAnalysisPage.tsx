import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, FloatingPortal } from '@floating-ui/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, User, Database } from 'lucide-react';
import { useInterviewStore } from '../store/useInterviewStore';
import { useAnalysis } from '../hooks/useAnalysis';
import type { LegacyAnalysisResponse } from '../models/api';

export default function ResumeFitAnalysisPage() {
  const navigate = useNavigate();
  const {
    // candidateInfo,
    skillAnalysisData,
    isLoading
  } = useInterviewStore();
  
  const { data: analysisData, error } = useAnalysis() as { 
    data: LegacyAnalysisResponse | undefined, 
    error: Error | null 
  };

  // Fake loading progress state
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Orchestrator Routing . . .');

  // Reset loading progress when component mounts
  useEffect(() => {
    setLoadingProgress(0);
    setLoadingStage('Orchestrator Routing . . .');
  }, []);

  // Navigate to preparation page if no skill analysis data
  useEffect(() => {
    if (!skillAnalysisData && !isLoading) {
      navigate('/preparation');
    }
  }, [skillAnalysisData, isLoading, navigate]);

  // Simulate loading progress with specific stages and timing
  useEffect(() => {
    console.log('Loading effect triggered:', { isLoading, skillAnalysisData: !!skillAnalysisData });
    
    if (!isLoading) {
      return;
    }

    // Reset progress when loading starts
    setLoadingProgress(0);
    setLoadingStage('Orchestrator Routing');

    const stages = [
      { progress: 10, message: 'Orchestrator Routing . . .', duration: 10000 }, // 10 seconds
      { progress: 20, message: 'JD & Resume Analyzing . . .', duration: 20000 }, // 20 seconds
      { progress: 50, message: 'Skill Matches and Gaps Detecting . . .', duration: 30000 }, // 40 seconds
      { progress: 95, message: 'Interview Question Generating . . .', duration: 15000 } // 15 seconds
    ];

    let currentStageIndex = 0;
    let stageStartTime = Date.now();
    let isActive = true;

    // Set initial stage
    setLoadingStage(stages[0].message);

    const updateProgress = () => {
      if (!isActive || currentStageIndex >= stages.length) return;

      const currentStage = stages[currentStageIndex];
      const elapsed = Date.now() - stageStartTime;
      const progress = Math.min(elapsed / currentStage.duration, 1);
      
      // Calculate the progress value for this stage
      const prevProgress = currentStageIndex === 0 ? 0 : stages[currentStageIndex - 1].progress;
      const targetProgress = currentStage.progress;
      const progressDiff = targetProgress - prevProgress;
      const newProgress = prevProgress + (progressDiff * progress);
      
      setLoadingProgress(newProgress);

      // Check if current stage is complete
      if (progress >= 1) {
        currentStageIndex++;
        if (currentStageIndex < stages.length) {
          setLoadingStage(stages[currentStageIndex].message);
          stageStartTime = Date.now();
          console.log(`Starting stage ${currentStageIndex + 1}:`, stages[currentStageIndex].message);
        }
      }
    };

    // Update progress every 200ms (less intensive)
    const intervalId = setInterval(updateProgress, 200);

    return () => {
      console.log('Cleaning up loading effect');
      isActive = false;
      clearInterval(intervalId);
    };
  }, [isLoading]);

  // Handle completion when data arrives
  useEffect(() => {
    if (!isLoading && skillAnalysisData) {
      setLoadingProgress(100);
      setLoadingStage('Analysis complete!');
    }
  }, [isLoading, skillAnalysisData]);



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

  // Skeleton Loading Component
  const SkeletonLoading = () => (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 w-full">
        {/* Loading Progress Bar */}
        <div className="mb-8">
          <div className="text-center mb-4">
                         <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4">Processing Resume Fit Analysis...</h1>
             <div className="flex items-center justify-center gap-3 mb-6">
               <p className="text-gray-600 font-mono text-2xl">{loadingStage}</p>
               

             </div>
            <div className="max-w-md mx-auto">
              <ProgressBar 
                progress={loadingProgress} 
                showPercentage={true}
                className="mb-4"
              />
            </div>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <SkeletonLoader variant="text" className="w-48 h-6" />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <SkeletonLoader variant="text" className="w-72 h-8" />
            </div>
            <div className="flex-shrink-0">
              <SkeletonLoader variant="text" className="w-32 h-8" />
            </div>
          </div>
          <div className="space-y-2">
            <SkeletonLoader variant="text" className="w-full" />
            <SkeletonLoader variant="text" className="w-5/6" />
            <SkeletonLoader variant="text" className="w-4/5" />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Skills Overview Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-blue-600" />
            <SkeletonLoader variant="text" className="w-32 h-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Skills Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <SkeletonLoader variant="text" className="w-28 h-5" />
              </div>
              <div className="flex flex-wrap gap-2">
                <SkeletonLoader variant="badge" count={6} />
              </div>
            </div>

            {/* Extra Skills Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <SkeletonLoader variant="text" className="w-24 h-5" />
              </div>
              <div className="space-y-2">
                <SkeletonLoader variant="rectangle" className="h-12" />
                <SkeletonLoader variant="rectangle" className="h-12" />
              </div>
            </div>

            {/* Missing Skills Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-600" />
                <SkeletonLoader variant="text" className="w-28 h-5" />
              </div>
              <div className="flex flex-wrap gap-2">
                <SkeletonLoader variant="badge" count={4} />
              </div>
            </div>

            {/* Skill Gaps Skeleton */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <SkeletonLoader variant="text" className="w-24 h-5" />
              </div>
              <div className="space-y-2">
                <SkeletonLoader variant="rectangle" className="h-12" />
                <SkeletonLoader variant="rectangle" className="h-12" />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Criteria Match Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-blue-600" />
            <SkeletonLoader variant="text" className="w-32 h-6" />
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                  <SkeletonLoader variant="text" className="w-full mb-2" />
                  <SkeletonLoader variant="text" className="w-4/5 mb-2" />
                  <SkeletonLoader variant="text" className="w-3/5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Education Skeleton */}
        <div className="mb-8">
          <SkeletonLoader variant="text" className="w-48 h-6 mb-4" />
          <div className="space-y-3">
            <SkeletonLoader variant="text" className="w-full" />
            <SkeletonLoader variant="text" className="w-3/4" />
            <SkeletonLoader variant="text" className="w-5/6" />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Red Flags Skeleton */}
        <div className="mb-8">
          <SkeletonLoader variant="text" className="w-40 h-6 mb-4" />
          <div className="space-y-2">
            <SkeletonLoader variant="text" className="w-full" />
            <SkeletonLoader variant="text" className="w-4/5" />
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <SkeletonLoader variant="rectangle" className="w-full sm:w-24 h-10" />
          <SkeletonLoader variant="rectangle" className="w-full sm:w-48 h-10" />
        </div>
      </div>
    </div>
  );

  // Show loading state when analysis is being processed
  if (isLoading) {
    return <SkeletonLoading />;
  }

  // Early return if no data (navigation handled by useEffect above)
  if (!skillAnalysisData) {
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

  const matchScore = analysisData?.matchScore || 0;
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Resume Fit Analysis</h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-bold break-words">
                {analysisData.candidate.name} - {analysisData.candidate.title} - {analysisData.candidate.seniorityLevel}
              </h2>
            </div>
            <div className="flex-shrink-0">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 whitespace-nowrap">
                Match Score: {matchScore}%
              </span>
            </div>
          </div>
          <div className="text-sm sm:text-base text-gray-600 break-words mt-2 leading-relaxed whitespace-pre-wrap">
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
                      className="bg-green-100 text-green-800 hover:bg-green-100 animate-in fade-in duration-300 break-words max-w-full py-1 px-2 min-h-fit"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="break-all leading-relaxed">{skill}</span>
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

              <div className="space-y-2">
                {analysisData.skills?.extra ? (
                  analysisData.skills.extra.map((description, index) => (
                    <div 
                      key={index} 
                      className="text-sm text-blue-800 p-3 bg-blue-50 rounded-lg break-words leading-relaxed animate-in fade-in duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {description}
                    </div>
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
                      className="bg-red-100 text-red-800 hover:bg-red-100 animate-in fade-in duration-300 break-words max-w-full py-1 px-2 min-h-fit"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="break-all leading-relaxed">{skill}</span>
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
              <div className="space-y-2">
                {analysisData.skills?.gaps ? (
                  analysisData.skills.gaps.map((gap, index) => (
                    <div 
                      key={index} 
                      className="text-sm text-yellow-800 p-3 bg-yellow-50 rounded-lg break-words leading-relaxed animate-in fade-in duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {gap}
                    </div>
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
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-3 font-medium text-gray-900">JD Requirement</th>
                        <th className="text-left py-3 px-3 font-medium text-gray-900">CV Evidence</th>
                        <th className="text-center py-3 px-3 font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {analysisData.criteriaMatch.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-25">
                          <td className="py-3 px-3 text-gray-700 break-words">{item.requirement}</td>
                          <td className="py-3 px-3 text-gray-700 break-words">{item.evidence}</td>
                          <td className="py-3 px-3 text-center">
                            {item.status === 'matched' ? (
                              <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {analysisData.criteriaMatch.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Requirement</span>
                            {item.status === 'matched' ? (
                              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 break-words leading-relaxed">
                            {item.requirement}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Evidence</div>
                        <p className="text-sm text-gray-700 break-words leading-relaxed">
                          {item.evidence}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
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
            <div className="space-y-3 text-sm sm:text-base">
              <div className="break-words">
                <span className="font-medium text-gray-900">Education: </span>
                <span className="text-gray-700">{analysisData.education.degree}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Certifications:</span>
              </div>
              <div className="space-y-1">
                {analysisData.education.certifications.map((cert, index) => (
                  <div key={index} className="text-gray-700 break-words pl-4">{cert}</div>
                ))}
              </div>
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
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              {analysisData.redFlags.map((flag, index) => (
                <div key={index} className="break-words leading-relaxed">• {flag}</div>
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
                ? "Match score must be 80% or higher to generate interview questions. Current score is below the threshold." 
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