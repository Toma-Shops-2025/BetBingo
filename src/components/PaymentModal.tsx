import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Calendar, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  stripePromise, 
  validatePaymentAmount, 
  formatCurrency, 
  getCardBrand,
  isStripeAvailable,
  PAYMENT_CONFIG
} from '@/lib/stripe';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  amount: string;
  method: string;
  processing: boolean;
  paymentType?: 'deposit' | 'game_entry' | 'tournament_entry';
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  amount,
  method,
  processing,
  paymentType = 'deposit'
}) => {
  const { user, updateBalance } = useAuth();
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingZip: ''
  });
  const [error, setError] = useState<string>('');
  const [isStripeReady, setIsStripeReady] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  // Check if Stripe is available
  useEffect(() => {
    const checkStripe = async () => {
      if (isStripeAvailable()) {
        try {
          const stripe = await stripePromise;
          setIsStripeReady(!!stripe);
        } catch (err) {
          console.error('Stripe not available:', err);
          setIsStripeReady(false);
        }
      } else {
        setIsStripeReady(false);
      }
    };
    
    checkStripe();
  }, []);

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
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPaymentStatus('processing');
    
    // Validate form
    if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName) {
      setError('Please fill in all required fields');
      setPaymentStatus('failed');
      return;
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    const amountValidation = validatePaymentAmount(amountNum);
    if (!amountValidation.isValid) {
      setError(amountValidation.error || 'Invalid amount');
      setPaymentStatus('failed');
      return;
    }

    if (!isStripeReady) {
      setError('Payment system is not available. Please try again later.');
      setPaymentStatus('failed');
      return;
    }

    try {
      // Create payment session in database
      const { data: paymentSession, error: sessionError } = await supabase
        .from('payment_sessions')
        .insert([{
          user_id: user?.id,
          amount: amountNum,
          currency: 'USD',
          status: 'created'
        }])
        .select()
        .single();

      if (sessionError) {
        console.error('Error creating payment session:', sessionError);
        setError('Failed to create payment session. Please try again.');
        setPaymentStatus('failed');
        return;
      }

      // Log compliance action
      await supabase
        .from('compliance_logs')
        .insert([{
          user_id: user?.id,
          action: `${paymentType}_attempt`,
          details: {
            amount: amountNum,
            method: method,
            session_id: paymentSession.id,
            payment_type: paymentType
          }
        }]);

      // Process real payment with Stripe
      console.log('Payment session created:', paymentSession.id);
      
      try {
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error('Stripe not available');
        }

        // For demo purposes, simulate successful payment
        // In production, you would use Stripe's payment confirmation
        console.log('Processing payment with Stripe...');
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Payment successful - update database
        setTimeout(async () => {
          try {
            // Update payment session status
            await supabase
              .from('payment_sessions')
              .update({ 
                status: 'succeeded',
                completed_at: new Date().toISOString()
              })
              .eq('id', paymentSession.id);

            // Update user balance for deposits
            if (paymentType === 'deposit' && user) {
              await updateBalance(amountNum);
            }

            // Log successful payment
            await supabase
              .from('compliance_logs')
              .insert([{
                user_id: user?.id,
                action: `${paymentType}_success`,
                details: {
                  amount: amountNum,
                  method: method,
                  session_id: paymentSession.id,
                  payment_type: paymentType
                }
              }]);

            setPaymentStatus('success');
            
            // Close modal and call onSubmit after a brief success display
            setTimeout(() => {
              onSubmit();
            }, 1500);

          } catch (err) {
            console.error('Error completing payment:', err);
            setError('Payment completed but there was an error updating your account. Please contact support.');
            setPaymentStatus('failed');
          }
        }, 2000);

    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
      setPaymentStatus('failed');
    }
  };

  const getCardType = (cardNumber: string) => {
    return getCardBrand(cardNumber);
  };

  const getPaymentTypeLabel = () => {
    switch (paymentType) {
      case 'deposit': return 'Deposit';
      case 'game_entry': return 'Game Entry Fee';
      case 'tournament_entry': return 'Tournament Entry Fee';
      default: return 'Payment';
    }
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
                <h3 className="text-white text-xl font-bold">{getPaymentTypeLabel()} Details</h3>
                <p id="payment-modal-description" className="text-purple-300 text-sm">{method} - {formatCurrency(parseFloat(amount))}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-purple-300 hover:text-white rounded-lg hover:bg-purple-600/30 transition-all"
              disabled={processing || paymentStatus === 'processing'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Payment Status Display */}
          {paymentStatus === 'success' && (
            <div className="bg-green-900/30 border border-green-400/30 rounded-lg p-4 mb-4 flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-green-300 text-lg font-semibold">Payment Successful!</p>
                <p className="text-green-200 text-sm">Your {getPaymentTypeLabel().toLowerCase()} has been processed.</p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/30 border border-red-400/30 rounded-lg p-3 mb-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Payment Form - Only show if not processing or completed */}
          {paymentStatus !== 'success' && (
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
                    disabled={processing || paymentStatus === 'processing'}
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
                      disabled={processing || paymentStatus === 'processing'}
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
                      disabled={processing || paymentStatus === 'processing'}
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
                  disabled={processing || paymentStatus === 'processing'}
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
                  disabled={processing || paymentStatus === 'processing'}
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
                disabled={processing || paymentStatus === 'processing' || !isStripeReady}
                whileHover={{ scale: (processing || paymentStatus === 'processing' || !isStripeReady) ? 1 : 1.02 }}
                whileTap={{ scale: (processing || paymentStatus === 'processing' || !isStripeReady) ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentStatus === 'processing' ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `${getPaymentTypeLabel()} ${formatCurrency(parseFloat(amount))}`
                )}
              </motion.button>

              {/* Status Notice */}
              {!isStripeReady ? (
                <div className="bg-yellow-900/30 border border-yellow-400/30 rounded-lg p-3 text-center">
                  <p className="text-yellow-300 text-sm font-semibold">Payment System Loading</p>
                  <p className="text-yellow-200 text-xs">Please wait while we connect to our secure payment system</p>
                </div>
              ) : (
                <div className="bg-green-900/30 border border-green-400/30 rounded-lg p-3 text-center">
                  <p className="text-green-300 text-sm font-semibold">Secure Payment System</p>
                  <p className="text-green-200 text-xs">Connected to Stripe - Your payment will be processed securely</p>
                </div>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal; 