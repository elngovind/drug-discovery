import React from 'react';
import { Shield, Heart, AlertTriangle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Drug Interaction Checker
              </h1>
              <p className="text-sm text-gray-600">
                AI-Powered Healthcare Safety
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#checker" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Checker
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </a>
            <a 
              href="#api" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              API
            </a>
          </nav>

          {/* Emergency Notice */}
          <div className="hidden lg:flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              For emergencies, call 911
            </span>
          </div>
        </div>

        {/* Mobile Emergency Notice */}
        <div className="lg:hidden mt-3 flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">
            For medical emergencies, call 911
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;