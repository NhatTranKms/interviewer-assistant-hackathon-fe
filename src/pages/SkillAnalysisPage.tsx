import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Bot, CheckCircle, XCircle, AlertTriangle, Star, ArrowRight } from 'lucide-react';
import { useInterviewStore } from '../store/useInterviewStore';
import { generateInterviewQuestions } from '../services/mockLLMService';

export default function SkillAnalysisPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Skill Gap Analyzer</span>
            </div>
            <Button variant="ghost" onClick={() => navigate('/preparation')}>
              Back to Preparation
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill Gap Analyzer</h1>
          <p className="text-gray-600">Comparison of Job Description vs Candidate Resume</p>
        </div>

        {/* Skills Comparison */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Job Description Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Key Skills from Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Node.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">PostgreSQL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Docker</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">AWS Lambda</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">CI/CD with GitHub Actions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">RESTful APIs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Agile/Scrum</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidate Resume Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Skills from Candidate Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Node.js</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">MongoDB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Docker</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">RESTful APIs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Jenkins</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Git</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results - 2x2 Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Matched Skills */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg font-semibold text-green-800">Matched Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillAnalysis.matchedSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-green-100 border-green-300 text-green-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Missing Skills */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <CardTitle className="text-lg font-semibold text-orange-800">Missing Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillAnalysis.missingSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-orange-100 border-orange-300 text-orange-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Potential Red Flags */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <CardTitle className="text-lg font-semibold text-red-800">Potential Red Flags</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {skillAnalysis.potentialRedFlags.map((flag, index) => (
                  <li key={index} className="text-sm text-red-700">{flag}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Strong Areas */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg font-semibold text-blue-800">Strong Areas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {skillAnalysis.strongAreas.map((area, index) => (
                  <li key={index} className="text-sm text-blue-700">{area}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Interview Questions Section */}
        <Card className="mt-8 border-purple-200 bg-purple-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-lg font-semibold text-purple-800">Interview Question</CardTitle>
            </div>
            <CardDescription className="text-purple-700">
              Tailored Questions Based on Candidate's Resume & JD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex space-x-4 text-sm">
                  <Badge variant="outline" className="bg-white border-purple-300 text-purple-700">
                    Technical Questions (5)
                  </Badge>
                  <Badge variant="outline" className="bg-white border-purple-300 text-purple-700">
                    Behavioral Questions (5)
                  </Badge>
                  <Badge variant="outline" className="bg-white border-orange-300 text-orange-700">
                    Screening Questions (5)
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={handleGenerateQuestions}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? 'Generating...' : (
                  <>
                    Generate Questions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

