import React from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CreditCardIcon, 
  TrophyIcon,
  CogIcon,
  LightBulbIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', id: 'dashboard', icon: HomeIcon, color: 'text-paytm-blue' },
  { name: 'Transactions', id: 'transactions', icon: CreditCardIcon, color: 'text-paytm-navy' },
  { name: 'Analytics', id: 'analytics', icon: ChartBarIcon, color: 'text-paytm-cyan' },
  { name: 'Goals', id: 'goals', icon: TrophyIcon, color: 'text-warning-500' },
  { name: 'AI Insights', id: 'insights', icon: LightBulbIcon, color: 'text-accent-500' },
  { name: 'Settings', id: 'settings', icon: CogIcon, color: 'text-gray-500' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen = true, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 pb-4">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose?.();
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-paytm-blue to-paytm-cyan text-white shadow-paytm'
                      : 'text-gray-700 hover:bg-paytm-lightBlue hover:text-paytm-blue'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-colors ${
                    isActive ? 'text-white' : `${item.color} group-hover:text-paytm-blue`
                  }`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 p-4 bg-gradient-to-br from-paytm-lightBlue to-accent-50 rounded-xl">
            <h3 className="text-sm font-semibold text-paytm-darkBlue mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-paytm-navy hover:text-paytm-blue transition-colors">
                Add Money to Wallet
              </button>
              <button className="w-full text-left text-sm text-paytm-navy hover:text-paytm-blue transition-colors">
                Pay Bills
              </button>
              <button className="w-full text-left text-sm text-paytm-navy hover:text-paytm-blue transition-colors">
                Send Money
              </button>
            </div>
          </div>

          {/* Paytm Offers */}
          <div className="mt-6 p-4 bg-gradient-to-r from-warning-50 to-warning-100 rounded-xl border border-warning-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse" />
              <h3 className="text-sm font-semibold text-warning-800">Special Offers</h3>
            </div>
            <p className="text-xs text-warning-700">
              Get cashback on your next transaction!
            </p>
            <button className="mt-2 text-xs text-warning-800 font-medium hover:text-warning-900">
              View Offers →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};