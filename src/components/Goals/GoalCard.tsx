import React from 'react';
import { TrophyIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Goal } from '../../types';
import { format } from 'date-fns';

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-100 rounded-lg">
            <TrophyIcon className="h-6 w-6 text-accent-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
            <p className="text-sm text-gray-600">{goal.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4" />
          <span>{format(goal.deadline, 'MMM dd, yyyy')}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{progress.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-accent-500 to-accent-600 h-3 rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
          </span>
          <span className="font-medium text-gray-900">
            ₹{remaining.toLocaleString()} remaining
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="flex-1 bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
          Add Money
        </button>
        <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
          Edit Goal
        </button>
      </div>
    </div>
  );
};