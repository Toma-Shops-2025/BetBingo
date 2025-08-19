import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Calendar, Shield } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  amount: string;
  method: string;
  processing: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  amount,
  method,
  processing
}) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingZip: ''
  });

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    }
    
    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5);
    }
    
    // CVV only numbers
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    // Billing zip only numbers
    if (field === 'billingZip') {
      formattedValue = value.replace(/\D/g, '').substring(0, 5);
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Process payment
    onSubmit();
  };

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Card';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
              <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-purple-800/95 via-blue-800/95 to-purple-800/95 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-describedby="payment-modal-description"
      >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-2">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">Payment Details</h3>
                <p id="payment-modal-description" className="text-purple-300 text-sm">{method} - ${amount}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-purple-300 hover:text-white rounded-lg hover:bg-purple-600/30 transition-all"
              disabled={processing}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Card Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-purple-900/30 border border-purple-400/30 rounded-lg pl-4 pr-20 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  disabled={processing}
                />
                <div className="absolute right-3 top-3 text-purple-300 text-sm font-bold">
                  {getCardType(cardData.cardNumber)}
                </div>
              </div>
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">
                  Expiry Date *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-purple-900/30 border border-purple-400/30 rounded-lg pl-4 pr-10 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    disabled={processing}
                  />
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-purple-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">
                  CVV *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className="w-full bg-purple-900/30 border border-purple-400/30 rounded-lg pl-4 pr-10 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    disabled={processing}
                  />
                  <Lock className="absolute right-3 top-3 w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                value={cardData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                placeholder="John Doe"
                className="w-full bg-purple-900/30 border border-purple-400/30 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={processing}
              />
            </div>

            {/* Billing ZIP */}
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Billing ZIP Code
              </label>
              <input
                type="text"
                value={cardData.billingZip}
                onChange={(e) => handleInputChange('billingZip', e.target.value)}
                placeholder="12345"
                className="w-full bg-purple-900/30 border border-purple-400/30 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                disabled={processing}
              />
            </div>

            {/* Security Notice */}
            <div className="bg-blue-900/30 border border-blue-400/30 rounded-lg p-3 flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-blue-300 text-sm font-semibold">Secure Payment</p>
                <p className="text-blue-200 text-xs">Your payment information is encrypted and secure</p>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={processing}
              whileHover={{ scale: processing ? 1 : 1.02 }}
              whileTap={{ scale: processing ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                `Deposit $${amount}`
              )}
            </motion.button>

            {/* Demo Notice */}
            <div className="bg-yellow-900/30 border border-yellow-400/30 rounded-lg p-3 text-center">
              <p className="text-yellow-300 text-sm font-semibold">Demo Mode</p>
              <p className="text-yellow-200 text-xs">This is a simulation - no real payment will be processed</p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal; 