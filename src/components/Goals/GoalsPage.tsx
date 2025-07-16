import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { GoalCard } from './GoalCard';
import { useFinancialData } from '../../hooks/useFinancialData';

export const GoalsPage: React.FC = () => {
  const { goals } = useFinancialData();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
        <button className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      <div className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-2">Achieve Your Dreams</h3>
        <p className="text-accent-100 mb-4">
          Set clear financial goals and track your progress. Our AI will help you stay on track with personalized recommendations.
        </p>
        <button className="bg-white text-accent-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors">
          Learn More About Goal Setting
        </button>
      </div>
    </div>
  );
};