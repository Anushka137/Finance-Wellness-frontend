import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  WalletIcon,
  BanknotesIcon,
  ChartBarIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import { User } from '../../types';

interface OverviewCardsProps {
  user: User;
  monthlySpending: number;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({ user, monthlySpending }) => {
  const savingsRate = ((user.monthlyIncome - monthlySpending) / user.monthlyIncome) * 100;
  
  const cards = [
    {
      title: 'Monthly Income',
      value: `₹${user.monthlyIncome.toLocaleString()}`,
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: BanknotesIcon,
      gradient: 'from-success-500 to-success-600',
      bgGradient: 'from-success-50 to-success-100',
    },
    {
      title: 'Monthly Expenses',
      value: `₹${monthlySpending.toLocaleString()}`,
      change: '-2.1%',
      changeType: 'positive' as const,
      icon: WalletIcon,
      gradient: 'from-paytm-blue to-paytm-cyan',
      bgGradient: 'from-paytm-lightBlue to-accent-50',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      change: '+1.3%',
      changeType: 'positive' as const,
      icon: ChartBarIcon,
      gradient: 'from-accent-500 to-accent-600',
      bgGradient: 'from-accent-50 to-accent-100',
    },
    {
      title: 'Financial Health',
      value: `${user.financialHealth}%`,
      change: '+3.2%',
      changeType: 'positive' as const,
      icon: HeartIcon,
      gradient: user.financialHealth >= 70 ? 'from-success-500 to-success-600' : 
                user.financialHealth >= 50 ? 'from-warning-500 to-warning-600' : 'from-error-500 to-error-600',
      bgGradient: user.financialHealth >= 70 ? 'from-success-50 to-success-100' : 
                  user.financialHealth >= 50 ? 'from-warning-50 to-warning-100' : 'from-error-50 to-error-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 p-6 transition-all duration-300 hover:scale-105 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${card.bgGradient}`}>
              <card.icon className={`h-6 w-6 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`} />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              card.changeType === 'positive' 
                ? 'bg-success-100 text-success-700' 
                : 'bg-error-100 text-error-700'
            }`}>
              {card.changeType === 'positive' ? (
                <ArrowUpIcon className="h-3 w-3" />
              ) : (
                <ArrowDownIcon className="h-3 w-3" />
              )}
              <span>{card.change}</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{card.value}</p>
            <p className="text-xs text-gray-500">vs last month</p>
          </div>
        </div>
      ))}
    </div>
  );
};