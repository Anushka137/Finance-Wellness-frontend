import React from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { Budget } from '../../types';

interface BudgetProgressProps {
  budgets: Budget[];
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({ budgets }) => {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Budget Tracker</h3>
          <p className="text-sm text-gray-500">Monthly spending limits</p>
        </div>
        <button className="text-paytm-blue hover:text-paytm-darkBlue text-sm font-medium transition-colors">
          Manage Budgets
        </button>
      </div>
      
      <div className="space-y-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage > 80 && percentage <= 100;
          const remaining = budget.limit - budget.spent;
          
          return (
            <div key={budget.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isOverBudget ? 'bg-error-100' : isNearLimit ? 'bg-warning-100' : 'bg-success-100'
                  }`}>
                    {isOverBudget ? (
                      <ExclamationTriangleIcon className="h-4 w-4 text-error-600" />
                    ) : isNearLimit ? (
                      <ClockIcon className="h-4 w-4 text-warning-600" />
                    ) : (
                      <CheckCircleIcon className="h-4 w-4 text-success-600" />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">{budget.category}</span>
                    <p className="text-xs text-gray-500 capitalize">{budget.period} budget</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{budget.spent.toLocaleString()} / ₹{budget.limit.toLocaleString()}
                  </p>
                  <p className={`text-xs font-medium ${
                    remaining >= 0 ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {remaining >= 0 ? `₹${remaining.toLocaleString()} left` : `₹${Math.abs(remaining).toLocaleString()} over`}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverBudget
                        ? 'bg-gradient-to-r from-error-500 to-error-600'
                        : isNearLimit
                        ? 'bg-gradient-to-r from-warning-500 to-warning-600'
                        : 'bg-gradient-to-r from-paytm-blue to-paytm-cyan'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                  {isOverBudget && (
                    <div
                      className="absolute top-0 left-0 h-full bg-error-600 opacity-30 rounded-full"
                      style={{ width: '100%' }}
                    />
                  )}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{percentage.toFixed(1)}% used</span>
                  <span>{budget.period}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Budget Button */}
      <button className="w-full mt-6 py-3 border-2 border-dashed border-paytm-blue text-paytm-blue hover:bg-paytm-lightBlue rounded-xl transition-colors font-medium">
        + Add New Budget
      </button>
    </div>
  );
};