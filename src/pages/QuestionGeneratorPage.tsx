import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Download, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { useInterviewStore } from '../store/useInterviewStore';
import { PDFExportService } from '../services/pdfExportService';

export default function QuestionGeneratorPage() {
  const navigate = useNavigate();
  const { candidateInfo, questionData, skillAnalysisData } = useInterviewStore();
  
  // Memoize the questions transformation to prevent infinite re-renders
  const questions = useMemo(() => {

    
    if (!questionData?.questions) {
      return [];
    }
    
    // Transform API questions to UI format inline
    return questionData.questions.map(apiQuestion => {
      const categoryMap: Record<string, 'Core Knowledge' | 'Practical Skills' | 'Tools & Technology' | 'Scenario-Based' | 'Process & Best Practices'> = {
        'CORE KNOWLEDGE': 'Core Knowledge',
        'PRACTICAL SKILLS': 'Practical Skills', 
        'TOOLS & TECHNOLOGY': 'Tools & Technology',
        'SCENARIO-BASED / PROBLEM-SOLVING': 'Scenario-Based',
        'PROCESS & BEST PRACTICES': 'Process & Best Practices'
      };

              const scoringGuide = [
          { stars: 1, description: apiQuestion.scoring_guide.score_1 },
          { stars: 2, description: apiQuestion.scoring_guide.score_2 },
          { stars: 3, description: apiQuestion.scoring_guide.score_3 },
          { stars: 4, description: apiQuestion.scoring_guide.score_4 },
          { stars: 5, description: apiQuestion.scoring_guide.score_5 }
        ];

        const evaluationCriteria = [
          apiQuestion.evaluation_rubric.clarity,
          apiQuestion.evaluation_rubric.accuracy,
          apiQuestion.evaluation_rubric.depth,
          apiQuestion.evaluation_rubric.practical_application
        ];

        return {
          id: apiQuestion.question_id,
          question: apiQuestion.question_text,
          category: categoryMap[apiQuestion.category] || 'Core Knowledge',
          expectedAnswer: apiQuestion.expected_answer,
          evaluationCriteria,
          scoringGuide
        };
    });
  }, [questionData]);
  
  // Get match score from skill analysis data
  const matchScore = skillAnalysisData?.overall_match_score || 0;
  const [activeTab, setActiveTab] = useState<'Core Knowledge' | 'Practical Skills' | 'Tools & Technology' | 'Scenario-Based' | 'Process & Best Practices'>('Core Knowledge');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  // Navigate to preparation page if no questions available
  useEffect(() => {
    if (!questions.length && questionData !== null) {
      navigate('/preparation');
    }
  }, [questions.length, questionData, navigate]);

  // Show loading state if questionData is null (not yet loaded)
  if (questionData === null) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  // Return early if no questions (but don't navigate during render)
  if (!questions.length) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">No questions available. Please check the console for debugging info.</p>
            <Button onClick={() => navigate('/preparation')}>Go Back to Preparation</Button>
          </div>
        </div>
      </div>
    );
  }

  const questionsByCategory = {
    'Core Knowledge': questions.filter(q => q.category === 'Core Knowledge'),
    'Practical Skills': questions.filter(q => q.category === 'Practical Skills'),
    'Tools & Technology': questions.filter(q => q.category === 'Tools & Technology'),
    'Scenario-Based': questions.filter(q => q.category === 'Scenario-Based'),
    'Process & Best Practices': questions.filter(q => q.category === 'Process & Best Practices')
  };

  const toggleQuestionExpansion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleSaveAsPDF = () => {
    const pdfService = new PDFExportService();
    pdfService.exportInterviewQuestions(candidateInfo, questionsByCategory);
  };

  const handleSave = () => {
    alert('Save functionality will be implemented soon!');
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border p-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">Resume Fit Analysis</h1>
          </div>
          {/* <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 break-words">
            Technical Interview Questions
          </h1> */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl sm:text-2xl text-gray-700 font-bold break-words">
              {candidateInfo.name ? `${candidateInfo.name} - ${candidateInfo.title} - ${candidateInfo.seniorityLevel}` : `${candidateInfo.title} (${candidateInfo.seniorityLevel})`}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              Match Score: {matchScore}%
            </span>
          </div>
          <p className="text-sm sm:text-lg text-gray-600 break-words mt-2">
            {candidateInfo.interviewSimulator ? `${candidateInfo.interviewSimulator} Style | ` : ''}{questions.length} AI-Generated Questions Across 5 Technical Categories
          </p>
        </div>

        {/* Question Categories Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit min-w-full sm:min-w-0">
            {(['Core Knowledge', 'Practical Skills', 'Tools & Technology', 'Scenario-Based', 'Process & Best Practices'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-1 sm:flex-none ${
                  activeTab === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                {category} ({questionsByCategory[category].length})
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questionsByCategory[activeTab].map((question, index) => {
            const isExpanded = expandedQuestions.has(question.id);
            return (
              <Card key={question.id} className="border-gray-200">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleQuestionExpansion(question.id)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2 flex-wrap">
                        <Badge 
                          variant="outline" 
                          className={`text-xs flex-shrink-0 ${
                            question.category === 'Core Knowledge' ? 'border-blue-300 text-blue-700' :
                            question.category === 'Practical Skills' ? 'border-green-300 text-green-700' :
                            question.category === 'Tools & Technology' ? 'border-purple-300 text-purple-700' :
                            question.category === 'Scenario-Based' ? 'border-orange-300 text-orange-700' :
                            question.category === 'Process & Best Practices' ? 'border-teal-300 text-teal-700' :
                            'border-gray-300 text-gray-700'
                          }`}
                        >
                          {question.category}
                        </Badge>
                        <span className="text-sm text-gray-500 flex-shrink-0">Q{index + 1}</span>
                      </div>
                      <CardTitle className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed break-words">
                        {question.question}
                      </CardTitle>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                                 {isExpanded && (
                   <CardContent className="pt-0 border-t bg-gray-50">
                     <div className="space-y-4">
                       <div>
                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Expected Answer (Ideal Sample):</h4>
                         <p className="text-sm text-gray-600 leading-relaxed bg-white p-3 rounded border">
                           {question.expectedAnswer}
                         </p>
                       </div>
                       <div>
                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Evaluation Rubric (What to Look For):</h4>
                         <div className="bg-white p-3 rounded border">
                           <div className="mb-2 text-xs text-gray-500 italic">Assess for: Clarity, Accuracy, Depth</div>
                           {Array.isArray(question.evaluationCriteria) ? (
                             <ul className="space-y-1">
                               {question.evaluationCriteria.map((criteria, idx) => (
                                 <li key={idx} className="flex items-start space-x-2">
                                   <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                   <span className="text-sm text-gray-600">{criteria}</span>
                                 </li>
                               ))}
                             </ul>
                           ) : (
                             <p className="text-sm text-gray-600 leading-relaxed">
                               {question.evaluationCriteria}
                             </p>
                           )}
                         </div>
                       </div>
                       {question.scoringGuide && (
                         <div>
                           <h4 className="text-sm font-semibold text-gray-700 mb-2">Scoring Guide (1-5 Stars):</h4>
                           <div className="bg-white p-3 rounded border space-y-2">
                             {question.scoringGuide.map((score, idx) => (
                               <div key={idx} className="flex items-center space-x-3">
                                 <div className="flex space-x-1">
                                   {[1, 2, 3, 4, 5].map((star) => (
                                     <span
                                       key={star}
                                       className={`text-sm ${
                                         star <= score.stars ? 'text-orange-400' : 'text-gray-300'
                                       }`}
                                     >
                                       ★
                                     </span>
                                   ))}
                                 </div>
                                 <span className="text-sm text-gray-600">{score.description}</span>
                               </div>
                             ))}
                           </div>
                         </div>
                       )}
                     </div>
                   </CardContent>
                 )}
              </Card>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline"
            onClick={handleSave}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </Button>
          <Button 
            onClick={handleSaveAsPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            <span>Save as PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

