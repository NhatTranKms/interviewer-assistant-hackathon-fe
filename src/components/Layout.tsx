import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Bot } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationButton = () => {
    switch (location.pathname) {
      case '/':
        return null;
      case '/preparation':
        return (
          <Button variant="ghost" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        );
      case '/analysis':
        return (
          <Button variant="ghost" onClick={() => navigate('/preparation')}>
            Back to Prep
          </Button>
        );
      case '/questions':
        return (
          <Button variant="ghost" onClick={() => navigate('/analysis')}>
            Back to Analysis
          </Button>
        );
      default:
        return (
          <Button variant="ghost" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI-Powered Interview Assistant</span>
            </div>
            <div className="w-32 flex justify-end">
              {getNavigationButton()}
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;