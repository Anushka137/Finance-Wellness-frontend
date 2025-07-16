import React from 'react';
import { OverviewCards } from './OverviewCards';
import { SpendingChart } from './SpendingChart';
import { BudgetProgress } from './BudgetProgress';
import { RecentTransactions } from './RecentTransactions';
import { useFinancialData } from '../../hooks/useFinancialData';
import { PlusIcon, BoltIcon } from '@heroicons/react/24/outline';

export const Dashboard: React.FC = () => {
  const { user, transactions, budgets, getSpendingByCategory, getMonthlySpending } = useFinancialData();
  
  const spendingData = getSpendingByCategory();
  const monthlySpending = getMonthlySpending();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-paytm-blue via-paytm-cyan to-accent-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-paytm-lightBlue">
              Your financial wellness score has improved by 3.2% this month
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-2">
              <BoltIcon className="h-5 w-5" />
              <span>AI Insights</span>
            </button>
            <button className="bg-white text-paytm-blue hover:bg-gray-100 px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-2">
              <PlusIcon className="h-5 w-5" />
              <span>Quick Pay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <OverviewCards user={user} monthlySpending={monthlySpending} />
      
      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingChart spendingData={spendingData} />
        <BudgetProgress budgets={budgets} />
      </div>
      
      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} />

      {/* Paytm Services Banner */}
      <div className="bg-gradient-to-r from-paytm-darkBlue to-paytm-navy rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Explore Paytm Services</h3>
            <p className="text-blue-200 mb-4">
              Recharge, pay bills, book tickets, and much more with Paytm
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Mobile Recharge</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Bill Payments</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Travel Booking</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Insurance</span>
            </div>
          </div>
          <button className="bg-white text-paytm-darkBlue px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all">
            Explore All
          </button>
        </div>
      </div>
    </div>
  );
};