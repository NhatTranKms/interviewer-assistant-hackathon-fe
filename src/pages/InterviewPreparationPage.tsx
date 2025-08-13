import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Upload, FileText, Type, X } from 'lucide-react';

import { useInterviewStore } from '../store/useInterviewStore';
import { useJobTitles, useSeniorityLevels, useInterviewSimulators } from '../hooks/useApi';

export default function InterviewPreparationPage() {
  const navigate = useNavigate();
  const {
    candidateInfo,
    jobDescription,
    resume,
    setCandidateInfo,
    setJobDescription,
    setResume,
    // setSkillAnalysis,
    setIsLoading,
    isLoading
  } = useInterviewStore();

  const { data: jobTitles = [], isLoading: jobTitlesLoading } = useJobTitles();
  const { data: seniorityLevels = [], isLoading: seniorityLevelsLoading } = useSeniorityLevels();
  const { data: interviewSimulators = [], isLoading: simulatorsLoading } = useInterviewSimulators();
  
  const loading = jobTitlesLoading || seniorityLevelsLoading || simulatorsLoading;
  const [formData, setFormData] = useState({
    title: candidateInfo.title || '',
    seniorityLevel: candidateInfo.seniorityLevel || '',
    interviewSimulator: candidateInfo.interviewSimulator || '',
    jobDescription: jobDescription || '',
    resume: resume || ''
  });

  const [resumeInputMode, setResumeInputMode] = useState<'text' | 'file'>('text');
  const [jobDescInputMode, setJobDescInputMode] = useState<'text' | 'file'>('text');
  const [uploadedResumeFile, setUploadedResumeFile] = useState<File | null>(null);
  const [uploadedJobDescFile, setUploadedJobDescFile] = useState<File | null>(null);


  const [resumeUploadError, setResumeUploadError] = useState<string>('');
  const [jobDescUploadError, setJobDescUploadError] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    seniorityLevel?: string;
    jobDescription?: string;
    resume?: string;
  }>({});
  const resumeFileInputRef = useRef<HTMLInputElement>(null);
  const jobDescFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && jobTitles.length > 0 && seniorityLevels.length > 0 && interviewSimulators.length > 0) {
      setFormData(prev => ({
        ...prev,
        title: prev.title || jobTitles[0].name,
        seniorityLevel: prev.seniorityLevel || seniorityLevels[0].name,
        interviewSimulator: prev.interviewSimulator || interviewSimulators[0].name
      }));
    }
  }, [loading, jobTitles, seniorityLevels, interviewSimulators]);

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

  const handleJobDescFileUpload = async (file: File) => {
    setJobDescUploadError('');
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      setJobDescUploadError('Invalid file type. Please upload a PDF or DOCX file only.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setJobDescUploadError('File size exceeds limit. Please upload a file smaller than 10MB.');
      return;
    }

    setUploadedJobDescFile(file);
    // Clear form error when file is successfully uploaded
    if (formErrors.jobDescription) {
      setFormErrors(prev => ({ ...prev, jobDescription: undefined }));
    }
  };

  const handleResumeFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleResumeFileUpload(file);
    }
  };

  const handleJobDescFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleJobDescFileUpload(file);
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

  const handleJobDescDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleJobDescDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleJobDescFileUpload(file);
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

  const removeUploadedJobDescFile = () => {
    setUploadedJobDescFile(null);
    setJobDescUploadError('');
    setFormData(prev => ({ ...prev, jobDescription: '' }));
    if (jobDescFileInputRef.current) {
      jobDescFileInputRef.current.value = '';
    }
  };

  const switchResumeToTextMode = () => {
    setResumeInputMode('text');
    removeUploadedResumeFile();
  };

  const switchResumeToFileMode = () => {
    setResumeInputMode('file');
    setFormData(prev => ({ ...prev, resume: '' }));
  };

  const switchJobDescToTextMode = () => {
    setJobDescInputMode('text');
    removeUploadedJobDescFile();
  };

  const switchJobDescToFileMode = () => {
    setJobDescInputMode('file');
    setFormData(prev => ({ ...prev, jobDescription: '' }));
  };



  const validateForm = () => {
    const errors: typeof formErrors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.seniorityLevel.trim()) {
      errors.seniorityLevel = 'Seniority Level is required';
    }
    
    const hasJobDescription = jobDescInputMode === 'text' ? formData.jobDescription.trim() : uploadedJobDescFile;
    if (!hasJobDescription) {
      errors.jobDescription = jobDescInputMode === 'text' 
        ? 'Job Description is required' 
        : 'Please upload a job description file';
    }
    
    const hasResume = resumeInputMode === 'text' ? formData.resume.trim() : uploadedResumeFile;
    if (!hasResume) {
      errors.resume = resumeInputMode === 'text' 
        ? 'Resume is required' 
        : 'Please upload a resume file';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Update store
    setCandidateInfo({
      name: '', // Name will be extracted from resume analysis
      title: formData.title,
      seniorityLevel: formData.seniorityLevel,
      interviewSimulator: formData.interviewSimulator
    });
    setJobDescription(formData.jobDescription);
    setResume(formData.resume);

    // Navigate to analysis page
    setIsLoading(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/analysis');
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: jobTitles.length > 0 ? jobTitles[0].name : '',
      seniorityLevel: seniorityLevels.length > 0 ? seniorityLevels[0].name : '',
      interviewSimulator: interviewSimulators.length > 0 ? interviewSimulators[0].name : '',
      jobDescription: '',
      resume: ''
    });
    setResumeInputMode('text');
    setJobDescInputMode('text');
    setFormErrors({});
    removeUploadedResumeFile();
    removeUploadedJobDescFile();
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
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold text-gray-900">
              I will help you prepare for the interview. Please provide the following information
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Row 1: Title and Seniority Level */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <Select 
                  value={formData.title} 
                  onValueChange={(value) => handleInputChange('title', value)}
                  disabled={loading}
                >
                  <SelectTrigger className={formErrors.title ? 'border-red-500' : ''}>
                    <SelectValue placeholder={loading ? 'Loading...' : 'Select a title'} />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTitles.map((title) => (
                      <SelectItem key={title.id} value={title.name}>
                        {title.name}
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
                  disabled={loading}
                >
                  <SelectTrigger className={formErrors.seniorityLevel ? 'border-red-500' : ''}>
                    <SelectValue placeholder={loading ? 'Loading...' : 'Select seniority level'} />
                  </SelectTrigger>
                  <SelectContent>
                    {seniorityLevels.map((level) => (
                      <SelectItem key={level.id} value={level.name}>
                        {level.name}
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
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant={jobDescInputMode === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={switchJobDescToTextMode}
                    className={`flex items-center space-x-1 ${
                      jobDescInputMode === 'text' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Type className="w-4 h-4" />
                    <span>Text Input</span>
                  </Button>
                  <Button
                    type="button"
                    variant={jobDescInputMode === 'file' ? 'default' : 'outline'}
                    size="sm"
                    onClick={switchJobDescToFileMode}
                    className={`flex items-center space-x-1 ${
                      jobDescInputMode === 'file' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>File Upload</span>
                  </Button>
                </div>
              </div>

              <div className="min-h-[120px]">
                {jobDescInputMode === 'text' ? (
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
                ) : (
                  <div className="space-y-3 h-full">
                    {!uploadedJobDescFile ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer h-[120px] flex flex-col justify-center ${
                          formErrors.jobDescription ? 'border-red-300' : 'border-gray-300'
                        }`}
                        onDragOver={handleJobDescDragOver}
                        onDrop={handleJobDescDrop}
                        onClick={() => jobDescFileInputRef.current?.click()}
                      >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF or DOCX files only (max 10MB)</p>
                        <input
                          ref={jobDescFileInputRef}
                          type="file"
                          accept=".pdf,.docx,.doc"
                          onChange={handleJobDescFileInputChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{uploadedJobDescFile.name}</p>
                              <p className="text-xs text-gray-500">
                                {(uploadedJobDescFile.size / 1024).toFixed(1)} KB • {uploadedJobDescFile.type.includes('pdf') ? 'PDF' : 'DOCX'}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeUploadedJobDescFile}
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                            <span>Remove</span>
                          </Button>
                        </div>
                      </div>
                    )}
                    {(jobDescUploadError || formErrors.jobDescription) && (
                      <p className="text-sm text-red-600 flex items-center space-x-1">
                        <X className="w-4 h-4" />
                        <span>{jobDescUploadError || formErrors.jobDescription}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant={resumeInputMode === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={switchResumeToTextMode}
                    className={`flex items-center space-x-1 ${
                      resumeInputMode === 'text' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Type className="w-4 h-4" />
                    <span>Text Input</span>
                  </Button>
                  <Button
                    type="button"
                    variant={resumeInputMode === 'file' ? 'default' : 'outline'}
                    size="sm"
                    onClick={switchResumeToFileMode}
                    className={`flex items-center space-x-1 ${
                      resumeInputMode === 'file' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    <span>File Upload</span>
                  </Button>
                </div>
              </div>

              <div className="min-h-[160px]">
                {resumeInputMode === 'text' ? (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Enter your resume text here..."
                      className={`h-[160px] resize-none ${formErrors.resume ? 'border-red-500' : ''}`}
                      value={formData.resume}
                      onChange={(e) => handleInputChange('resume', e.target.value)}
                    />
                    {formErrors.resume && (
                      <p className="text-sm text-red-600">{formErrors.resume}</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 h-full">
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
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? 'Loading...' : 'Select interview style...'} />
                </SelectTrigger>
                <SelectContent>
                  {interviewSimulators.map((simulator) => (
                    <SelectItem key={simulator.id} value={simulator.name}>
                      {simulator.name}
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
                    !(jobDescInputMode === 'text' ? formData.jobDescription.trim() : uploadedJobDescFile) ||
                    !(resumeInputMode === 'text' ? formData.resume.trim() : uploadedResumeFile)}
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

