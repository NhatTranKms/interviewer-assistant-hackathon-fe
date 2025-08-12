import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Mic, Menu, Bot } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Interview Assistant</span>
            </div>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your smart companion for interview preparation and post-interview evaluation.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Interview Preparation Card */}
          <Card className="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Interview Preparation
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm leading-relaxed">
                Upload your Resume and Job Description. We'll analyze the skill gap and generate 
                personalized interview questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => navigate('/preparation')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                Start Preparation
              </Button>
            </CardContent>
          </Card>

          {/* Post-Interview Analysis Card */}
          <Card className="bg-purple-50 border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Post-Interview Analysis
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm leading-relaxed">
                Upload an interview audio or transcript. Our AI will evaluate each response and provide 
                scoring and feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-2"
                disabled
              >
                Start Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">No account needed. Get started instantly.</p>
          <div className="flex justify-center space-x-4">
            <button className="hover:text-gray-700">FAQ</button>
            <button className="hover:text-gray-700">Contact</button>
            <button className="hover:text-gray-700">Privacy Policy</button>
          </div>
        </div>
      </main>
    </div>
  );
}

