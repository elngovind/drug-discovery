import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import DrugSearchForm from './components/DrugSearchForm';
import InteractionResults from './components/InteractionResults';
import Footer from './components/Footer';
import { DrugProvider } from './context/DrugContext';
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DrugProvider>
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
      </DrugProvider>
    </QueryClientProvider>
  );
}

export default App;