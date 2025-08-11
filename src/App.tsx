import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import DrugSearchForm from './components/DrugSearchForm';
import InteractionResults from './components/InteractionResults';
import StatusIndicator from './components/StatusIndicator';
import Footer from './components/Footer';
import { DrugProvider, useDrugContext } from './context/DrugContext';
import './styles/globals.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Inner component to access DrugContext
const AppContent: React.FC = () => {
  const { state } = useDrugContext();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle analysis state
  useEffect(() => {
    if (state.selectedDrugs.length >= 2) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsAnalyzing(false);
    }
  }, [state.selectedDrugs.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Drug Interaction Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check for dangerous drug interactions and get AI-powered explanations 
              to keep your medications safe.
            </p>
            
            {/* Enhanced Status Indicator */}
            <div className="flex justify-center pt-4">
              <div className={`
                px-6 py-3 rounded-full border-2 transition-all duration-300
                ${state.interactions.length > 0 && !isAnalyzing
                  ? state.interactions.some(i => i.severity === 'CRITICAL')
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : state.interactions.some(i => i.severity === 'MAJOR')
                    ? 'bg-orange-50 border-orange-300 text-orange-800'
                    : 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  : isAnalyzing
                  ? 'bg-blue-50 border-blue-300 text-blue-800'
                  : 'bg-green-50 border-green-300 text-green-800'}
              `}>
                <StatusIndicator
                  isAnalyzing={isAnalyzing}
                  interactionCount={state.interactions.length}
                  drugCount={state.selectedDrugs.length}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Drug Search Form */}
            <div className="lg:col-span-1">
              <DrugSearchForm />
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <InteractionResults />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DrugProvider>
        <AppContent />
      </DrugProvider>
    </QueryClientProvider>
  );
}

export default App;