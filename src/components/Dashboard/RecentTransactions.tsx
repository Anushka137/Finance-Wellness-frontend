import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  ShoppingBagIcon,
  FilmIcon,
  TruckIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid';
import { Transaction } from '../../types';
import { format } from 'date-fns';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return ShoppingBagIcon;
    case 'entertainment':
      return FilmIcon;
    case 'transportation':
      return TruckIcon;
    case 'education':
      return AcademicCapIcon;
    default:
      return ShoppingBagIcon;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return 'bg-success-100 text-success-600';
    case 'entertainment':
      return 'bg-accent-100 text-accent-600';
    case 'transportation':
      return 'bg-warning-100 text-warning-600';
    case 'education':
      return 'bg-paytm-lightBlue text-paytm-blue';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const recentTransactions = transactions.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
          <p className="text-sm text-gray-500">Latest financial activities</p>
        </div>
        <button className="text-paytm-blue hover:text-paytm-darkBlue text-sm font-medium transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentTransactions.map((transaction, index) => {
          const CategoryIcon = getCategoryIcon(transaction.category);
          const categoryColor = getCategoryColor(transaction.category);
          
          return (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${categoryColor}`}>
                  <CategoryIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{transaction.description}</p>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                    <span className="font-medium">{transaction.category}</span>
                    <span>•</span>
                    <span>{format(transaction.date, 'MMM dd, yyyy')}</span>
                    {transaction.paymentMethod && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-1 bg-paytm-lightBlue text-paytm-blue rounded-full text-xs font-medium">
                          {transaction.paymentMethod}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' ? 'bg-success-100' : 'bg-error-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpIcon className="h-4 w-4 text-success-600" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-error-600" />
                  )}
                </div>
                <span className={`font-bold text-lg ${
                  transaction.type === 'income' ? 'text-success-600' : 'text-error-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-paytm-blue to-paytm-cyan text-white rounded-xl font-medium hover:shadow-paytm transition-all">
            <ArrowUpIcon className="h-4 w-4" />
            <span>Add Money</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-3 border border-paytm-blue text-paytm-blue rounded-xl font-medium hover:bg-paytm-lightBlue transition-all">
            <ArrowDownIcon className="h-4 w-4" />
            <span>Send Money</span>
          </button>
        </div>
      </div>
    </div>
  );
};