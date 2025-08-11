import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Info, Clock, Shield, ExternalLink, Zap, TrendingUp, Eye } from 'lucide-react';
import { useDrugContext } from '../context/DrugContext';
import { SeverityLevel } from '../types';
import { getAlternatives } from '../data/mockData';

const InteractionResults: React.FC = () => {
  const { state } = useDrugContext();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showNewInteraction, setShowNewInteraction] = useState(false);

  // Simulate real-time analysis when drugs change
  useEffect(() => {
    if (state.selectedDrugs.length >= 2) {
      setIsAnalyzing(true);
      setShowNewInteraction(false);
      
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        if (state.interactions.length > 0) {
          setShowNewInteraction(true);
          // Auto-hide the "new" indicator after 3 seconds
          setTimeout(() => setShowNewInteraction(false), 3000);
        }
      }, 800); // Simulate analysis time

      return () => clearTimeout(timer);
    } else {
      setIsAnalyzing(false);
      setShowNewInteraction(false);
    }
  }, [state.selectedDrugs, state.interactions.length]);

  const getSeverityIcon = (severity: SeverityLevel, isAnimated: boolean = false) => {
    const baseClass = `w-5 h-5 ${isAnimated ? 'animate-pulse' : ''}`;
    switch (severity) {
      case SeverityLevel.CRITICAL:
        return <AlertTriangle className={`${baseClass} text-red-600`} />;
      case SeverityLevel.MAJOR:
        return <AlertTriangle className={`${baseClass} text-orange-600`} />;
      case SeverityLevel.MODERATE:
        return <Info className={`${baseClass} text-yellow-600`} />;
      case SeverityLevel.MINOR:
        return <Info className={`${baseClass} text-green-600`} />;
      default:
        return <Info className={`${baseClass} text-gray-500`} />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-50';
    if (confidence >= 0.7) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return 'High Confidence';
    if (confidence >= 0.7) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  const getSeverityClass = (severity: SeverityLevel) => {
    switch (severity) {
      case SeverityLevel.CRITICAL:
        return 'severity-critical border-l-4 border-l-critical-500';
      case SeverityLevel.MAJOR:
        return 'severity-major border-l-4 border-l-major-500';
      case SeverityLevel.MODERATE:
        return 'severity-moderate border-l-4 border-l-moderate-500';
      case SeverityLevel.MINOR:
        return 'severity-minor border-l-4 border-l-safe-500';
      default:
        return 'bg-gray-50 border-l-4 border-l-gray-500';
    }
  };

  const getSeverityText = (severity: SeverityLevel) => {
    switch (severity) {
      case SeverityLevel.CRITICAL:
        return 'Critical';
      case SeverityLevel.MAJOR:
        return 'Major';
      case SeverityLevel.MODERATE:
        return 'Moderate';
      case SeverityLevel.MINOR:
        return 'Minor';
      default:
        return 'Unknown';
    }
  };

  // Show welcome message if no drugs selected
  if (state.selectedDrugs.length === 0) {
    return (
      <div className="card text-center">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Ready to Check Interactions
        </h3>
        <p className="text-gray-600 mb-6">
          Add medications using the search form to check for potential interactions.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Disclaimer:</strong> This tool is for informational purposes only. 
            Always consult with healthcare professionals before making medication decisions.
          </p>
        </div>
      </div>
    );
  }

  // Show message for single drug
  if (state.selectedDrugs.length === 1) {
    return (
      <div className="card text-center">
        <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Add More Medications
        </h3>
        <p className="text-gray-600 mb-4">
          You've selected <strong>{state.selectedDrugs[0].name}</strong>. 
          Add at least one more medication to check for interactions.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            About {state.selectedDrugs[0].name}:
          </h4>
          <p className="text-sm text-gray-600">
            {state.selectedDrugs[0].description}
          </p>
        </div>
      </div>
    );
  }

  // Show interactions
  return (
    <div className="space-y-6">
      {/* Prominent Interaction Alert Banner */}
      {state.interactions.length > 0 && !isAnalyzing && (
        <div className={`
          p-6 rounded-xl border-2 shadow-lg
          ${state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) 
            ? 'bg-red-50 border-red-300 animate-pulse' 
            : state.interactions.some(i => i.severity === SeverityLevel.MAJOR)
            ? 'bg-orange-50 border-orange-300'
            : 'bg-yellow-50 border-yellow-300'}
        `}>
          <div className="flex items-center space-x-4">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) 
                ? 'bg-red-100' 
                : state.interactions.some(i => i.severity === SeverityLevel.MAJOR)
                ? 'bg-orange-100'
                : 'bg-yellow-100'}
            `}>
              <AlertTriangle className={`
                w-6 h-6
                ${state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) 
                  ? 'text-red-600' 
                  : state.interactions.some(i => i.severity === SeverityLevel.MAJOR)
                  ? 'text-orange-600'
                  : 'text-yellow-600'}
              `} />
            </div>
            <div className="flex-1">
              <h3 className={`
                text-xl font-bold mb-2
                ${state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) 
                  ? 'text-red-900' 
                  : state.interactions.some(i => i.severity === SeverityLevel.MAJOR)
                  ? 'text-orange-900'
                  : 'text-yellow-900'}
              `}>
                {state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) 
                  ? '🚨 CRITICAL DRUG INTERACTIONS DETECTED' 
                  : state.interactions.some(i => i.severity === SeverityLevel.MAJOR)
                  ? '⚠️ MAJOR DRUG INTERACTIONS DETECTED'
                  : '⚡ DRUG INTERACTIONS DETECTED'}
              </h3>
              <p className={`
                text-lg
                ${state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) 
                  ? 'text-red-800' 
                  : state.interactions.some(i => i.severity === SeverityLevel.MAJOR)
                  ? 'text-orange-800'
                  : 'text-yellow-800'}
              `}>
                {state.interactions.length} interaction{state.interactions.length !== 1 ? 's' : ''} found between your medications.
                {state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) && 
                  ' Seek immediate medical attention.'}
                {state.interactions.some(i => i.severity === SeverityLevel.MAJOR) && 
                  !state.interactions.some(i => i.severity === SeverityLevel.CRITICAL) &&
                  ' Consult your healthcare provider soon.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Summary Dashboard */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Real-Time Interaction Analysis
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {state.selectedDrugs.length} medications • {state.interactions.length} interactions
            </div>
            {isAnalyzing && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">Analyzing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Risk Level Summary */}
        {state.selectedDrugs.length >= 2 && !isAnalyzing && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-medium text-gray-900 mb-3">Risk Assessment Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { level: 'Critical', count: state.interactions.filter(i => i.severity === SeverityLevel.CRITICAL).length, color: 'red' },
                { level: 'Major', count: state.interactions.filter(i => i.severity === SeverityLevel.MAJOR).length, color: 'orange' },
                { level: 'Moderate', count: state.interactions.filter(i => i.severity === SeverityLevel.MODERATE).length, color: 'yellow' },
                { level: 'Minor', count: state.interactions.filter(i => i.severity === SeverityLevel.MINOR).length, color: 'green' }
              ].map(({ level, count, color }) => (
                <div key={level} className={`text-center p-3 rounded-lg bg-${color}-50 border border-${color}-200`}>
                  <div className={`text-2xl font-bold text-${color}-600`}>{count}</div>
                  <div className={`text-sm text-${color}-700`}>{level}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Analyzing Drug Interactions...
            </h3>
            <p className="text-gray-600">
              Checking {state.selectedDrugs.length} medications against our comprehensive database.
            </p>
          </div>
        ) : state.interactions.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-green-700 mb-2">
              No Known Interactions Found
            </h3>
            <p className="text-gray-600">
              Based on current data, no significant interactions were detected between your selected medications.
            </p>
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                ✓ Continue monitoring for any unusual symptoms and consult your healthcare provider 
                if you have concerns.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {state.interactions.map((interaction, index) => (
              <div
                key={interaction.id}
                className={`relative p-4 rounded-lg ${getSeverityClass(interaction.severity)} ${
                  showNewInteraction ? 'fade-in' : ''
                } transition-all duration-300 hover:shadow-md`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* New Interaction Badge */}
                {showNewInteraction && (
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
                    ✨ NEW
                  </div>
                )}

                {/* Interaction Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getSeverityIcon(interaction.severity, showNewInteraction)}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {interaction.drugA.name} + {interaction.drugB.name}
                      </h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          interaction.severity === SeverityLevel.CRITICAL 
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : interaction.severity === SeverityLevel.MAJOR
                            ? 'bg-orange-100 text-orange-800 border border-orange-200'
                            : interaction.severity === SeverityLevel.MODERATE
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {getSeverityText(interaction.severity)} Risk
                        </span>
                        
                        {/* Confidence Indicator */}
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getConfidenceColor(interaction.confidence)}`}>
                          <TrendingUp className="w-3 h-3" />
                          <span>{getConfidenceText(interaction.confidence)}</span>
                          <span className="font-medium">({Math.round(interaction.confidence * 100)}%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Action Button */}
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </div>

                {/* Mechanism */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Mechanism:
                  </h4>
                  <p className="text-sm text-gray-700">
                    {interaction.mechanism}
                  </p>
                </div>

                {/* Clinical Effects */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Clinical Effects:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {interaction.clinicalEffects.map((effect, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Management */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Management:
                  </h4>
                  <p className="text-sm text-gray-700">
                    {interaction.management}
                  </p>
                </div>

                {/* Timing */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Onset: {interaction.onset}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ExternalLink className="w-4 h-4" />
                    <span>{interaction.evidence.sources.length} sources</span>
                  </div>
                </div>

                {/* Enhanced Critical Warning */}
                {interaction.severity === SeverityLevel.CRITICAL && (
                  <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg shadow-lg">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 text-lg mb-2">
                          ⚠️ CRITICAL INTERACTION ALERT
                        </h4>
                        <p className="text-red-800 font-medium mb-2">
                          Immediate medical attention may be required
                        </p>
                        <p className="text-sm text-red-700 mb-3">
                          Contact your healthcare provider immediately to discuss this interaction.
                        </p>
                        <div className="bg-red-100 p-3 rounded border border-red-200">
                          <p className="text-xs text-red-800">
                            <strong>Emergency:</strong> If experiencing severe symptoms, call emergency services immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Major Warning */}
                {interaction.severity === SeverityLevel.MAJOR && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-orange-800">
                        Significant interaction - Monitor closely
                      </span>
                    </div>
                    <p className="text-sm text-orange-700 mt-1">
                      Consult your healthcare provider about this combination and monitoring requirements.
                    </p>
                  </div>
                )}

                {/* Moderate Warning */}
                {interaction.severity === SeverityLevel.MODERATE && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Info className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        Moderate interaction - Be aware
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Monitor for symptoms and discuss with your healthcare provider if concerned.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alternatives Section */}
      {state.interactions.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alternative Medications
          </h3>
          <div className="space-y-4">
            {state.selectedDrugs.map((drug) => {
              const alternatives = getAlternatives(drug);
              if (alternatives.length === 0) return null;

              return (
                <div key={drug.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Alternatives to {drug.name}:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {alternatives.slice(0, 4).map((alt) => (
                      <div key={alt.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium text-gray-900">{alt.name}</div>
                        <div className="text-sm text-gray-600">{alt.genericName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {alt.therapeuticClass.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Consult your healthcare provider before switching medications.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Important Medical Disclaimer
            </h4>
            <p className="text-sm text-blue-800">
              This tool provides general information about drug interactions and should not replace 
              professional medical advice. Always consult with your healthcare provider, pharmacist, 
              or other qualified medical professional before making any changes to your medications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionResults;