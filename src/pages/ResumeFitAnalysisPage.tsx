import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, User, Database } from 'lucide-react';
import { useInterviewStore } from '../store/useInterviewStore';
import { generateInterviewQuestions } from '../services/mockLLMService';

export default function ResumeFitAnalysisPage() {
  const navigate = useNavigate();
  const {
    skillAnalysis,
    candidateInfo,
    jobDescription,
    resume,
    setQuestions,
    setIsLoading,
    isLoading
  } = useInterviewStore();

  if (!skillAnalysis) {
    navigate('/preparation');
    return null;
  }

  const handleGenerateQuestions = async () => {
    setIsLoading(true);
    try {
      const questions = await generateInterviewQuestions(
        jobDescription,
        resume,
        skillAnalysis,
        candidateInfo.title,
        candidateInfo.seniorityLevel,
        candidateInfo.roundNumber,
        candidateInfo.interviewPersona
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
    navigate('/preparation');
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume Fit Analysis</h1>
          <div className="text-center mb-4">
            <span className="text-lg font-semibold text-blue-600">Match Score: 78% (Medium)</span>
          </div>
          <p className="text-gray-700 mb-6">
            Strong technical skills in Java and AWS. Missing Agile Project Management and Docker experience.
          </p>
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
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Java</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">AWS</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">REST APIs</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Spring Boot</Badge>
              </div>
            </div>

            {/* Extra Skills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold text-blue-600">Extra Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Kubernetes</Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Machine Learning</Badge>
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-red-600" />
                <h3 className="font-semibold text-red-600">Missing Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Agile Project Management</Badge>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Docker</Badge>
              </div>
            </div>

            {/* Skill Gaps */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <h3 className="font-semibold text-yellow-600">Skill Gaps</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Python - JD: Advanced | CV: Basic</Badge>
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
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-900">JD Requirement</th>
                  <th className="text-left py-2 font-medium text-gray-900">CV Evidence</th>
                  <th className="text-center py-2 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 text-gray-700">5+ years Java</td>
                  <td className="py-2 text-gray-700">7 years Java at XYZ Corp</td>
                  <td className="py-2 text-center">
                    <CheckCircle className="w-4 h-4 text-blue-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-700">Agile Project Management</td>
                  <td className="py-2 text-gray-700">Not mentioned</td>
                  <td className="py-2 text-center">
                    <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-700">AWS Certification</td>
                  <td className="py-2 text-gray-700">AWS Certified Developer</td>
                  <td className="py-2 text-center">
                    <CheckCircle className="w-4 h-4 text-blue-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-700">Docker experience</td>
                  <td className="py-2 text-gray-700">Not mentioned</td>
                  <td className="py-2 text-center">
                    <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Education & Certifications */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education & Certifications</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-900">Education: </span>
              <span className="text-gray-700">Bachelor in Computer Science (meets requirement)</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Certifications:</span>
            </div>
            <div className="text-gray-700">AWS Certified Developer -</div>
            <div className="text-gray-700">PMP -</div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Potential Red Flags */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Potential Red Flags</h2>
          <div className="space-y-1 text-sm text-gray-700">
            <div>2-year employment gap (2018-2020)</div>
            <div>Two short-term roles (&lt; 6 months each)</div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="px-6 py-2"
          >
            Reset
          </Button>
          <Button 
            onClick={handleGenerateQuestions}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isLoading ? 'Generating...' : 'Prepare for Interview'}
          </Button>
        </div>
      </div>
    </div>
  );
}