import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Download, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useInterviewStore } from '../store/useInterviewStore';
import { PDFExportService } from '../services/pdfExportService';

export default function QuestionGeneratorPage() {
  const navigate = useNavigate();
  const { questions, candidateInfo } = useInterviewStore();
  const [activeTab, setActiveTab] = useState<'Core Knowledge' | 'Practical Skills' | 'Tools & Technology' | 'Scenario-Based' | 'Process & Best Practices'>('Core Knowledge');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  if (!questions.length) {
    navigate('/preparation');
    return null;
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

  return (
    <div>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">
            {candidateInfo.name ? `${candidateInfo.name} – ${candidateInfo.title} – ${candidateInfo.seniorityLevel}` : `Technical Interview Questions for ${candidateInfo.title} (${candidateInfo.seniorityLevel})`}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 break-words">
            {candidateInfo.interviewSimulator ? `${candidateInfo.interviewSimulator} Style | ` : ''}15 AI-Generated Questions Across 5 Technical Categories
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
            onClick={() => navigate('/preparation')}
            className="flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <FileText className="w-4 h-4" />
            <span>New Preparation</span>
          </Button>
          <Button 
            onClick={handleSaveAsPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            <span>Save as PDF</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

