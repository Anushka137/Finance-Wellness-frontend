import React from 'react';
import { InsightCard } from './InsightCard';
import { useFinancialData } from '../../hooks/useFinancialData';

export const InsightsPage: React.FC = () => {
  const { insights } = useFinancialData();

  const highPriorityInsights = insights.filter(i => i.priority === 'high');
  const otherInsights = insights.filter(i => i.priority !== 'high');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AI Financial Insights</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Refresh Insights
        </button>
      </div>

      {highPriorityInsights.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Urgent Actions Required</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {highPriorityInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Other Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {otherInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-2">AI-Powered Recommendations</h3>
        <p className="text-primary-100 mb-4">
          Our AI analyzes your spending patterns and suggests personalized improvements to boost your financial health.
        </p>
        <button className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};