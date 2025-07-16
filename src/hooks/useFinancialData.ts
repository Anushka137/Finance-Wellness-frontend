import { useState, useEffect } from 'react';
import { Transaction, Budget, Goal, User, FinancialInsight } from '../types';

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  financialHealth: 78,
  totalBalance: 45000,
  monthlyIncome: 75000,
  monthlyExpenses: 52000,
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    type: 'expense',
    category: 'Food',
    description: 'Grocery shopping',
    date: new Date('2024-01-15'),
    paymentMethod: 'Paytm',
  },
  {
    id: '2',
    amount: 75000,
    type: 'income',
    category: 'Salary',
    description: 'Monthly salary',
    date: new Date('2024-01-01'),
  },
  {
    id: '3',
    amount: 15000,
    type: 'expense',
    category: 'Entertainment',
    description: 'Movie tickets and dining',
    date: new Date('2024-01-14'),
    paymentMethod: 'Paytm',
  },
  {
    id: '4',
    amount: 8000,
    type: 'expense',
    category: 'Transportation',
    description: 'Fuel and maintenance',
    date: new Date('2024-01-12'),
  },
];

const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food',
    limit: 15000,
    spent: 8500,
    period: 'monthly',
  },
  {
    id: '2',
    category: 'Entertainment',
    limit: 10000,
    spent: 15000,
    period: 'monthly',
  },
  {
    id: '3',
    category: 'Transportation',
    limit: 12000,
    spent: 8000,
    period: 'monthly',
  },
];

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 200000,
    currentAmount: 125000,
    deadline: new Date('2024-12-31'),
    category: 'Savings',
  },
  {
    id: '2',
    title: 'Vacation Trip',
    targetAmount: 50000,
    currentAmount: 32000,
    deadline: new Date('2024-06-30'),
    category: 'Travel',
  },
];

const mockInsights: FinancialInsight[] = [
  {
    id: '1',
    type: 'budget',
    title: 'Entertainment Budget Exceeded',
    description: 'You have exceeded your entertainment budget by ₹5,000 this month.',
    priority: 'high',
    actionRequired: true,
  },
  {
    id: '2',
    type: 'saving',
    title: 'Great Savings Progress',
    description: 'You are on track to meet your emergency fund goal by December.',
    priority: 'medium',
    actionRequired: false,
  },
];

export const useFinancialData = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [insights, setInsights] = useState<FinancialInsight[]>(mockInsights);
  const [loading, setLoading] = useState(false);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateBudget = (budgetId: string, updates: Partial<Budget>) => {
    setBudgets(prev => 
      prev.map(budget => 
        budget.id === budgetId ? { ...budget, ...updates } : budget
      )
    );
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const getSpendingByCategory = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);
  };

  const getMonthlySpending = () => {
    const currentMonth = new Date().getMonth();
    return transactions
      .filter(t => t.type === 'expense' && t.date.getMonth() === currentMonth)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return {
    user,
    transactions,
    budgets,
    goals,
    insights,
    loading,
    addTransaction,
    updateBudget,
    addGoal,
    getSpendingByCategory,
    getMonthlySpending,
  };
};