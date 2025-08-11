import React from 'react';
import { Github, Heart, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Drug Checker</span>
            </div>
            <p className="text-sm text-gray-600">
              AI-powered drug interaction checker helping prevent dangerous medication combinations worldwide.
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#api" className="hover:text-blue-600 transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600 transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#data" className="hover:text-blue-600 transition-colors">
                  Data Sources
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#faq" className="hover:text-blue-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#feedback" className="hover:text-blue-600 transition-colors">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#report" className="hover:text-blue-600 transition-colors">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Open Source */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Open Source</h4>
            <p className="text-sm text-gray-600">
              This project is open source and available on GitHub.
            </p>
            <a
              href="https://github.com/elngovind/drug-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>© 2025 Drug Interaction Checker</span>
              <span>•</span>
              <span>Created by Govind & Ermanno</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for global healthcare</span>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and does not constitute medical advice. 
              Always consult with qualified healthcare professionals before making any medical decisions. 
              In case of medical emergency, call your local emergency number immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;