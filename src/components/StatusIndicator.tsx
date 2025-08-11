import React from 'react';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';

interface StatusIndicatorProps {
  isAnalyzing: boolean;
  interactionCount: number;
  drugCount: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isAnalyzing,
  interactionCount,
  drugCount
}) => {
  if (drugCount < 2) {
    return (
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <Shield className="w-4 h-4" />
        <span>Add medications to check interactions</span>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="flex items-center space-x-2 text-blue-600 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Analyzing {drugCount} medications...</span>
      </div>
    );
  }

  if (interactionCount > 0) {
    return (
      <div className="flex items-center space-x-2 text-orange-600 text-sm">
        <AlertTriangle className="w-4 h-4" />
        <span>{interactionCount} interaction{interactionCount !== 1 ? 's' : ''} found</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-green-600 text-sm">
      <Shield className="w-4 h-4" />
      <span>No interactions detected</span>
    </div>
  );
};

export default StatusIndicator;