import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InterviewPreparationPage from '@/pages/InterviewPreparationPage';
import SkillAnalysisPage from '@/pages/SkillAnalysisPage';
import QuestionGeneratorPage from '@/pages/QuestionGeneratorPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preparation" element={<InterviewPreparationPage />} />
          <Route path="/analysis" element={<SkillAnalysisPage />} />
          <Route path="/questions" element={<QuestionGeneratorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;