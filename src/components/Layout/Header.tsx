import React from 'react';
import { BellIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onMenuToggle }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-paytm-blue hover:bg-paytm-lightBlue transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-paytm-blue to-paytm-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-paytm-blue to-paytm-darkBlue bg-clip-text text-transparent">
                  Paytm Finance
                </h1>
                <p className="text-xs text-gray-500">Financial Wellness</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Balance Card */}
            <div className="hidden sm:block bg-gradient-to-r from-paytm-blue to-paytm-cyan rounded-xl px-4 py-2 text-white">
              <p className="text-xs opacity-90">Wallet Balance</p>
              <p className="text-lg font-bold">₹{user.totalBalance.toLocaleString()}</p>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-paytm-blue hover:bg-paytm-lightBlue rounded-lg transition-colors">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-error-500 text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Health Score:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          user.financialHealth >= 70 ? 'bg-success-500' : 
                          user.financialHealth >= 50 ? 'bg-warning-500' : 'bg-error-500'
                        }`}
                        style={{ width: `${user.financialHealth}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      user.financialHealth >= 70 ? 'text-success-600' : 
                      user.financialHealth >= 50 ? 'text-warning-600' : 'text-error-600'
                    }`}>
                      {user.financialHealth}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-paytm-blue to-paytm-cyan rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};