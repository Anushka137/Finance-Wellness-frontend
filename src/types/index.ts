export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date;
  paymentMethod?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly';
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
}

export interface PaytmPayment {
  orderId: string;
  amount: number;
  customerId: string;
  callbackUrl: string;
}

export interface FinancialInsight {
  id: string;
  type: 'spending' | 'saving' | 'goal' | 'budget';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  financialHealth: number;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}