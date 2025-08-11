import React from 'react';
import { AlertTriangle, CheckCircle, Info, Clock, Shield, ExternalLink } from 'lucide-react';
import { useDrugContext } from '../context/DrugContext';
import { SeverityLevel } from '../types';
import { getAlternatives } from '../data/mockData';

const InteractionResults: React.FC = () => {
  const { state } = useDrugContext();

  const getSeverityIcon = (severity: SeverityLevel) => {
    switch (severity) {
      case SeverityLevel.CRITICAL:
        return <AlertTriangle className="w-5 h-5 text-critical-600" />;
      case SeverityLevel.MAJOR:
        return <AlertTriangle className="w-5 h-5 text-major-600" />;
      case SeverityLevel.MODERATE:
        return <Info className="w-5 h-5 text-moderate-600" />;
      case SeverityLevel.MINOR:
        return <Info className="w-5 h-5 text-safe-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
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
      {/* Summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Interaction Analysis
          </h2>
          <div className="text-sm text-gray-500">
            {state.selectedDrugs.length} medications checked
          </div>
        </div>

        {state.interactions.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-safe-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-safe-700 mb-2">
              No Known Interactions Found
            </h3>
            <p className="text-gray-600">
              Based on current data, no significant interactions were detected between your selected medications.
            </p>
            <div className="mt-4 p-3 bg-safe-50 rounded-lg">
              <p className="text-sm text-safe-800">
                Continue monitoring for any unusual symptoms and consult your healthcare provider 
                if you have concerns.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {state.interactions.map((interaction) => (
              <div
                key={interaction.id}
                className={`p-4 rounded-lg ${getSeverityClass(interaction.severity)}`}
              >
                {/* Interaction Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getSeverityIcon(interaction.severity)}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {interaction.drugA.name} + {interaction.drugB.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium">
                          {getSeverityText(interaction.severity)} Interaction
                        </span>
                        <span className="text-sm text-gray-500">
                          • {Math.round(interaction.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
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

                {/* Critical Warning */}
                {interaction.severity === SeverityLevel.CRITICAL && (
                  <div className="mt-4 p-3 bg-critical-100 border border-critical-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-critical-600" />
                      <span className="font-medium text-critical-800">
                        Immediate medical attention may be required
                      </span>
                    </div>
                    <p className="text-sm text-critical-700 mt-1">
                      Contact your healthcare provider immediately to discuss this interaction.
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