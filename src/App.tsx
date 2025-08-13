import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import InterviewPreparationPage from '@/pages/InterviewPreparationPage';
import ResumeFitAnalysisPage from '@/pages/ResumeFitAnalysisPage';
import QuestionGeneratorPage from '@/pages/QuestionGeneratorPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preparation" element={<InterviewPreparationPage />} />
          <Route path="/analysis" element={<ResumeFitAnalysisPage />} />
          <Route path="/questions" element={<QuestionGeneratorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;