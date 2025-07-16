import React from 'react';
import { 
  LightBulbIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  TrophyIcon 
} from '@heroicons/react/24/solid';
import { FinancialInsight } from '../../types';

interface InsightCardProps {
  insight: FinancialInsight;
}

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'spending':
      return ExclamationTriangleIcon;
    case 'saving':
      return CheckCircleIcon;
    case 'goal':
      return TrophyIcon;
    default:
      return LightBulbIcon;
  }
};

const getInsightColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-red-200 bg-red-50';
    case 'medium':
      return 'border-yellow-200 bg-yellow-50';
    default:
      return 'border-green-200 bg-green-50';
  }
};

const getIconColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    default:
      return 'text-green-600';
  }
};

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const Icon = getInsightIcon(insight.type);
  const cardColor = getInsightColor(insight.priority);
  const iconColor = getIconColor(insight.priority);

  return (
    <div className={`${cardColor} border rounded-xl p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-lg bg-white`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
          <p className="text-gray-700 mb-4">{insight.description}</p>
          {insight.actionRequired && (
            <button className="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 transition-colors">
              Take Action
            </button>
          )}
        </div>
      </div>
    </div>
  );
};