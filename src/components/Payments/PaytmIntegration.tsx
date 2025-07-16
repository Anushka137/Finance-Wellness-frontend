import React, { useState } from 'react';
import { CreditCardIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface PaytmPaymentProps {
  amount: number;
  orderId: string;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

export const PaytmIntegration: React.FC<PaytmPaymentProps> = ({
  amount,
  orderId,
  onSuccess,
  onFailure,
}) => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    
    try {
      // Mock Paytm payment flow for demonstration
      const paymentData = {
        orderId,
        amount,
        customerId: 'CUST_001',
        callbackUrl: `${window.location.origin}/payment/callback`,
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment response
      const mockResponse = {
        orderId,
        transactionId: `TXN_${Date.now()}`,
        amount,
        status: 'SUCCESS',
        paymentMethod: 'Paytm Wallet',
        timestamp: new Date().toISOString(),
      };

      onSuccess(mockResponse);
    } catch (error) {
      onFailure(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 max-w-md mx-auto">
      {/* Paytm Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-paytm-blue to-paytm-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">P</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Paytm Payment</h3>
        <p className="text-sm text-gray-500">Secure & Fast Payment Gateway</p>
      </div>

      {/* Payment Details */}
      <div className="bg-gradient-to-r from-paytm-lightBlue to-accent-50 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-gray-700">Amount to Pay:</span>
          <span className="text-2xl font-bold text-paytm-blue">₹{amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Order ID:</span>
          <span className="font-mono text-gray-800">{orderId}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Choose Payment Method</h4>
        <div className="space-y-3">
          <div className="flex items-center p-3 border-2 border-paytm-blue bg-paytm-lightBlue rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-paytm-blue to-paytm-cyan rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-paytm-blue">Paytm Wallet</p>
              <p className="text-xs text-paytm-navy">Balance: ₹2,450</p>
            </div>
            <div className="w-4 h-4 bg-paytm-blue rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex items-center p-3 border border-gray-200 rounded-xl hover:border-paytm-blue transition-colors cursor-pointer">
            <CreditCardIcon className="w-10 h-10 text-gray-400 mr-3" />
            <div className="flex-1">
              <p className="font-semibold text-gray-700">Credit/Debit Card</p>
              <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 border border-gray-200 rounded-xl hover:border-paytm-blue transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-gray-600 font-bold text-xs">UPI</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-700">UPI</p>
              <p className="text-xs text-gray-500">Pay using any UPI app</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={initiatePayment}
        disabled={loading}
        className="w-full bg-gradient-to-r from-paytm-blue to-paytm-cyan hover:from-paytm-cyan hover:to-paytm-blue disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-paytm hover:shadow-paytm-lg"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <LockClosedIcon className="h-5 w-5" />
            <span>Pay Securely</span>
          </>
        )}
      </button>

      {/* Security Info */}
      <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <ShieldCheckIcon className="h-4 w-4 text-success-500" />
          <span>256-bit SSL</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <LockClosedIcon className="h-4 w-4 text-success-500" />
          <span>PCI DSS Compliant</span>
        </div>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <span>Powered by Paytm</span>
      </div>
    </div>
  );
};