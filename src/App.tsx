import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InsightsPage } from './components/Insights/InsightsPage';
import { GoalsPage } from './components/Goals/GoalsPage';
import { useFinancialData } from './hooks/useFinancialData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useFinancialData();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'insights':
        return <InsightsPage />;
      case 'goals':
        return <GoalsPage />;
      case 'transactions':
        return (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-r from-paytm-blue to-paytm-cyan rounded-2xl p-6 text-white mb-8">
              <h1 className="text-2xl font-bold mb-2">Transaction History</h1>
              <p className="text-paytm-lightBlue">View and manage all your transactions</p>
            </div>
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-paytm-lightBlue rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-paytm-blue font-bold text-2xl">₹</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction Management</h3>
              <p className="text-gray-600 mb-6">Advanced transaction filtering and analytics coming soon...</p>
              <button className="bg-gradient-to-r from-paytm-blue to-paytm-cyan text-white px-6 py-3 rounded-xl font-medium hover:shadow-paytm transition-all">
                View All Transactions
              </button>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-r from-paytm-darkBlue to-paytm-navy rounded-2xl p-6 text-white mb-8">
              <h1 className="text-2xl font-bold mb-2">Financial Analytics</h1>
              <p className="text-blue-200">Deep insights into your spending patterns</p>
            </div>
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-600 font-bold text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 mb-6">Comprehensive financial reports and trends analysis coming soon...</p>
              <button className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-card-hover transition-all">
                Explore Analytics
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-6 text-white mb-8">
              <h1 className="text-2xl font-bold mb-2">Settings</h1>
              <p className="text-gray-300">Manage your account and preferences</p>
            </div>
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-600 font-bold text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
              <p className="text-gray-600 mb-6">Profile management, security settings, and preferences coming soon...</p>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all">
                Manage Settings
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-0 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;