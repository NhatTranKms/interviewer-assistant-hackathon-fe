import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Bot, Upload, FileText, Type, X } from 'lucide-react';

import { useInterviewStore } from '../store/useInterviewStore';
import { 
  analyzeSkillGap, 
  // mockJobDescription, 
  // mockResume,
  jobTitles,
  seniorityLevels,
  roundNumbers,
  interviewPersonas,
  defaultJobTitle,
  defaultSeniorityLevel,
  defaultRoundNumber,
  defaultInterviewPersona
} from '../services/mockLLMService';

export default function InterviewPreparationPage() {
  const navigate = useNavigate();
  const {
    candidateInfo,
    jobDescription,
    resume,
    setCandidateInfo,
    setJobDescription,
    setResume,
    setSkillAnalysis,
    setIsLoading,
    isLoading
  } = useInterviewStore();

  const [formData, setFormData] = useState({
    title: candidateInfo.title || defaultJobTitle,
    seniorityLevel: candidateInfo.seniorityLevel || defaultSeniorityLevel,
    roundNumber: candidateInfo.roundNumber || defaultRoundNumber,
    interviewPersona: candidateInfo.interviewPersona || defaultInterviewPersona,
    jobDescription: jobDescription || '',
    resume: resume || ''
  });

  const [resumeInputMode, setResumeInputMode] = useState<'text' | 'file'>('text');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);


  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file: File) => {
    setUploadError('');
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload a PDF or DOCX file only.');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB.');
      return;
    }

    setUploadedFile(file);
    
    // For demo purposes, we'll simulate file content extraction
    // In a real app, you'd use a library like pdf-parse or mammoth.js
    const mockContent = `[File Content Preview]
File: ${file.name}
Size: ${(file.size / 1024).toFixed(1)} KB
Type: ${file.type}

--- Extracted Text ---
This is a simulated extraction of the resume content from the uploaded file.
In a real implementation, you would use appropriate libraries to extract text from PDF or DOCX files.

John Doe
Software Engineer

Experience:
- 5 years of React development
- Node.js backend development
- AWS cloud services

Skills:
- JavaScript, TypeScript
- React, Redux
- Node.js, Express
- MongoDB, PostgreSQL
- Docker, AWS`;
    

    setFormData(prev => ({ ...prev, resume: mockContent }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);


    setUploadError('');
    setFormData(prev => ({ ...prev, resume: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const switchToTextMode = () => {
    setResumeInputMode('text');
    removeUploadedFile();
  };

  const switchToFileMode = () => {
    setResumeInputMode('file');
    setFormData(prev => ({ ...prev, resume: '' }));
  };



  const handleSubmit = async () => {
    if (!formData.jobDescription.trim() || !formData.resume.trim()) {
      alert('Please fill in both Job Description and Resume fields.');
      return;
    }

    // Update store
    setCandidateInfo({
      title: formData.title,
      seniorityLevel: formData.seniorityLevel,
      roundNumber: formData.roundNumber,
      interviewPersona: formData.interviewPersona
    });
    setJobDescription(formData.jobDescription);
    setResume(formData.resume);

    // Start analysis
    setIsLoading(true);
    try {
      const analysis = await analyzeSkillGap(formData.jobDescription, formData.resume);
      setSkillAnalysis(analysis);
      navigate('/analysis');
    } catch (error) {
      console.error('Error analyzing skills:', error);
      alert('Error analyzing skills. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: defaultJobTitle,
      seniorityLevel: defaultSeniorityLevel,
      roundNumber: defaultRoundNumber,
      interviewPersona: defaultInterviewPersona,
      jobDescription: '',
      resume: ''
    });
    setResumeInputMode('text');
    removeUploadedFile();
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
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Select 
                  value={formData.title} 
                  onValueChange={(value) => handleInputChange('title', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTitles.map((title) => (
                      <SelectItem key={title.value} value={title.value}>
                        {title.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Seniority Level</label>
                <Select 
                  value={formData.seniorityLevel} 
                  onValueChange={(value) => handleInputChange('seniorityLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {seniorityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Job Description</label>
              <Textarea
                placeholder="Enter job description here..."
                className="min-h-[120px] resize-none"
                value={formData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
              />
            </div>

            {/* Resume */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Resume</label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant={resumeInputMode === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={switchToTextMode}
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
                    onClick={switchToFileMode}
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
                  <Textarea
                    placeholder="Enter your resume text here..."
                    className="h-[160px] resize-none"
                    value={formData.resume}
                    onChange={(e) => handleInputChange('resume', e.target.value)}
                  />
                ) : (
                  <div className="space-y-3 h-full">
                    {!uploadedFile ? (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer h-[160px] flex flex-col justify-center"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF or DOCX files only (max 10MB)</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.docx,.doc"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                              <p className="text-xs text-gray-500">
                                {(uploadedFile.size / 1024).toFixed(1)} KB • {uploadedFile.type.includes('pdf') ? 'PDF' : 'DOCX'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2 sm:space-x-0">

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={removeUploadedFile}
                              className="flex items-center space-x-1 text-red-600 hover:text-red-700 w-full sm:w-auto"
                            >
                              <X className="w-4 h-4" />
                              <span>Remove</span>
                            </Button>
                          </div>
                        </div>

                      </div>
                    )}
                    {uploadError && (
                      <p className="text-sm text-red-600 flex items-center space-x-1">
                        <X className="w-4 h-4" />
                        <span>{uploadError}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Round Number and Interview Persona */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Round Number</label>
                <Select 
                  value={formData.roundNumber} 
                  onValueChange={(value) => handleInputChange('roundNumber', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roundNumbers.map((round) => (
                      <SelectItem key={round.value} value={round.value}>
                        {round.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Interview Persona</label>
                <Select 
                  value={formData.interviewPersona} 
                  onValueChange={(value) => handleInputChange('interviewPersona', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewPersonas.map((persona) => (
                      <SelectItem key={persona.value} value={persona.value}>
                        {persona.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                  disabled={isLoading || !formData.jobDescription.trim() || !formData.resume.trim()}
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

