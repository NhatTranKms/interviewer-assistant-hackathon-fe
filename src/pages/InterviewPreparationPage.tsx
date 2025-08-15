import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Upload, FileText, X } from 'lucide-react';

import { useInterviewStore } from '../store/useInterviewStore';
import { prepareInterview } from '../services/apiService';

// Hardcoded dropdown options
const JOB_TITLES = ['Software Engineer', 'Testing Engineer', 'Business Analyst'];
const SENIORITY_LEVELS = ['Junior', 'Senior', 'Principle'];
const INTERVIEW_SIMULATORS = ['Tough Technical Lead', 'Engineering Manager'];

export default function InterviewPreparationPage() {
  const navigate = useNavigate();
  const {
    candidateInfo,
    jobDescription,
    resume,
    setCandidateInfo,
    setJobDescription,
    setResume,
    setSkillAnalysisData,
    setQuestionData,
    setCVAnalysisData,
    setIsLoading,
    isLoading
  } = useInterviewStore();


  const [formData, setFormData] = useState({
    title: candidateInfo.title || '',
    seniorityLevel: candidateInfo.seniorityLevel || '',
    interviewSimulator: candidateInfo.interviewSimulator || '',
    jobDescription: jobDescription || '',
    resume: resume || ''
  });

  const [uploadedResumeFile, setUploadedResumeFile] = useState<File | null>(null);


  const [resumeUploadError, setResumeUploadError] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    seniorityLevel?: string;
    jobDescription?: string;
    resume?: string;
  }>({});
  const resumeFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      title: prev.title || JOB_TITLES[0],
      seniorityLevel: prev.seniorityLevel || SENIORITY_LEVELS[0],
      interviewSimulator: prev.interviewSimulator || INTERVIEW_SIMULATORS[0]
    }));
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleResumeFileUpload = async (file: File) => {
    setResumeUploadError('');
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      setResumeUploadError('Invalid file type. Please upload a PDF or DOCX file only.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setResumeUploadError('File size exceeds limit. Please upload a file smaller than 10MB.');
      return;
    }

    setUploadedResumeFile(file);
    // Clear form error when file is successfully uploaded
    if (formErrors.resume) {
      setFormErrors(prev => ({ ...prev, resume: undefined }));
    }
  };



  const handleResumeFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleResumeFileUpload(file);
    }
  };



  const handleResumeDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleResumeFileUpload(file);
    }
  };



  const removeUploadedResumeFile = () => {
    setUploadedResumeFile(null);
    setResumeUploadError('');
    setFormData(prev => ({ ...prev, resume: '' }));
    if (resumeFileInputRef.current) {
      resumeFileInputRef.current.value = '';
    }
  };







  const validateForm = () => {
    const errors: typeof formErrors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.seniorityLevel.trim()) {
      errors.seniorityLevel = 'Seniority Level is required';
    }
    
    // Job Description is text only
    if (!formData.jobDescription.trim()) {
      errors.jobDescription = 'Job Description is required';
    }
    
    // Resume is file upload only
    if (!uploadedResumeFile) {
      errors.resume = 'Please upload a resume file';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!uploadedResumeFile) {
      alert('Please upload a resume file');
      return;
    }

    // Update store with UI form data (keep for display purposes)
    setCandidateInfo({
      name: '', // Name will be extracted from resume analysis
      title: formData.title,
      seniorityLevel: formData.seniorityLevel,
      interviewSimulator: formData.interviewSimulator
    });
    setJobDescription(formData.jobDescription);
    setResume(formData.resume);

    // Call the new API with only job description and resume file
    setIsLoading(true);
    try {
      const analysisData = await prepareInterview(formData.jobDescription, uploadedResumeFile);
      
      // Update candidate info from CV analysis if available
      if (analysisData.cv_analysis?.candidate_profile) {
        setCandidateInfo({
          name: analysisData.cv_analysis.candidate_profile.name,
          title: formData.title, // Keep the selected title from form
          seniorityLevel: formData.seniorityLevel, // Keep the selected seniority level from form
          interviewSimulator: formData.interviewSimulator
        });
      }
      
      // Save the analysis data to the store using the imported methods
      
      if (analysisData.skill_matcher) {
        setSkillAnalysisData(analysisData.skill_matcher);
      }
      if (analysisData.question_generator) {
        setQuestionData(analysisData.question_generator);
      }
      if (analysisData.cv_analysis) {
        setCVAnalysisData(analysisData.cv_analysis);
      }

      // Navigate to analysis page
      navigate('/analysis');
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing your request. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: JOB_TITLES[0],
      seniorityLevel: SENIORITY_LEVELS[0],
      interviewSimulator: INTERVIEW_SIMULATORS[0],
      jobDescription: '',
      resume: ''
    });
    setFormErrors({});
    removeUploadedResumeFile();
  };

  // const handleLoadMockData = () => {
  //   setFormData({
  //     title: defaultJobTitle,
  //     seniorityLevel: 'Mid-level',
  //     roundNumber: defaultRoundNumber,
  //     interviewPersona: defaultInterviewPersona,
  //     jobDescription: mockJobDescription,
  //     resume: mockResume
  //   });
  // };

  return (
    <div>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white">
          <CardHeader className="border-b px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
              I will help you prepare for the interview. Please provide the following information
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Row 1: Title and Seniority Level */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <Select 
                  value={formData.title} 
                  onValueChange={(value) => handleInputChange('title', value)}
                >
                  <SelectTrigger className={formErrors.title ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a title" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TITLES.map((title) => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.title && (
                  <p className="text-sm text-red-600">{formErrors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Seniority Level <span className="text-red-500">*</span>
                </label>
                <Select 
                  value={formData.seniorityLevel} 
                  onValueChange={(value) => handleInputChange('seniorityLevel', value)}
                >
                  <SelectTrigger className={formErrors.seniorityLevel ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select seniority level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SENIORITY_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.seniorityLevel && (
                  <p className="text-sm text-red-600">{formErrors.seniorityLevel}</p>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Job Description <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter job description here..."
                  className={`h-[120px] resize-none ${formErrors.jobDescription ? 'border-red-500' : ''}`}
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                />
                {formErrors.jobDescription && (
                  <p className="text-sm text-red-600">{formErrors.jobDescription}</p>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Resume <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {!uploadedResumeFile ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer h-[160px] flex flex-col justify-center ${
                      formErrors.resume ? 'border-red-300' : 'border-gray-300'
                    }`}
                    onDragOver={handleResumeDragOver}
                    onDrop={handleResumeDrop}
                    onClick={() => resumeFileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF or DOCX files only (max 10MB)</p>
                    <input
                      ref={resumeFileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={handleResumeFileInputChange}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{uploadedResumeFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadedResumeFile.size / 1024).toFixed(1)} KB • {uploadedResumeFile.type.includes('pdf') ? 'PDF' : 'DOCX'}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2 sm:space-x-0">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={removeUploadedResumeFile}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700 w-full sm:w-auto"
                        >
                          <X className="w-4 h-4" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {(resumeUploadError || formErrors.resume) && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <X className="w-4 h-4" />
                    <span>{resumeUploadError || formErrors.resume}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Interview Simulator (optional) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Interview Simulator <span className="text-gray-400">(optional)</span>
              </label>
              <Select 
                value={formData.interviewSimulator} 
                onValueChange={(value) => handleInputChange('interviewSimulator', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select interview style..." />
                </SelectTrigger>
                <SelectContent>
                  {INTERVIEW_SIMULATORS.map((simulator) => (
                    <SelectItem key={simulator} value={simulator}>
                      {simulator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {/* <Button 
                variant="outline" 
                onClick={handleLoadMockData}
                disabled={isLoading}
                className="text-blue-600 border-blue-300 hover:bg-blue-50 w-full sm:w-auto"
              >
                Load Test Data
              </Button> */}
              <div className="flex gap-3 sm:ml-auto">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none"
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.title.trim() || !formData.seniorityLevel.trim() || 
                    !formData.jobDescription.trim() || !uploadedResumeFile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 flex-1 sm:flex-none"
                >
                  {isLoading ? 'Analyzing...' : 'Submit'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>


    </div>
  );
}

