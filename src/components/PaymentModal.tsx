import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  X, 
  CreditCard, 
  DollarSign, 
  Gem, 
  Gift, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Lock,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, method: string) => void;
  amount: number;
  method: string;
  processing: boolean;
  paymentType?: 'deposit' | 'withdrawal' | 'entry-fee';
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
  const { user, updateBalance, isDemoMode } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(amount);
  const [selectedMethod, setSelectedMethod] = useState(method);
  const [customAmount, setCustomAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const presetAmounts = [5, 10, 25, 50, 100, 200];
  const paymentMethods = [
    { id: 'debit', name: 'Debit Card', icon: CreditCard, color: 'blue' },
    { id: 'credit', name: 'Credit Card', icon: CreditCard, color: 'green' },
    { id: 'bank', name: 'Bank Transfer', icon: DollarSign, color: 'purple' },
    { id: 'crypto', name: 'Cryptocurrency', icon: Zap, color: 'orange' }
  ];

  const handleSubmit = async () => {
    if (processing) return;

    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount <= 0) return;

    try {
      if (isDemoMode) {
        // Demo mode - simulate successful payment
        console.log(`Demo mode: Processing ${paymentType} of $${finalAmount}`);
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Update balance in demo mode
        if (updateBalance) {
          await updateBalance(finalAmount);
        }
        
        console.log(`Demo mode: ${paymentType} successful! New balance: $${(user?.balance || 0) / 100 + finalAmount}`);
        
        // Close modal and show success
        onClose();
        return;
      }

      // Real payment processing would go here
      await onSubmit(finalAmount, selectedMethod);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const getPaymentIcon = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    return method ? method.icon : CreditCard;
  };

  const getPaymentColor = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    return method ? method.color : 'blue';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <Card className="glass-card border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <CardHeader className="relative pb-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-2 right-2 text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-8 h-8 text-green-400 mr-3" />
                <span className="text-white text-2xl font-bold">
                  {paymentType === 'deposit' ? 'Add Money' : 
                   paymentType === 'withdrawal' ? 'Withdraw Money' : 'Pay Entry Fee'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                {paymentType === 'deposit' ? 'Choose amount and payment method' :
                 paymentType === 'withdrawal' ? 'Withdraw your winnings' :
                 'Pay to join the game'}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Demo Mode Banner */}
            {isDemoMode && (
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">Demo Mode Active</span>
                </div>
                <p className="text-yellow-300 text-xs mt-1">
                  Payments are simulated. No real money will be charged.
                </p>
              </div>
            )}

            {/* Amount Selection */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Select Amount</Label>
              <div className="grid grid-cols-3 gap-2">
                {presetAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant={selectedAmount === amt ? "default" : "outline"}
                    onClick={() => setSelectedAmount(amt)}
                    className={`${
                      selectedAmount === amt 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    ${amt}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-white text-sm">Custom Amount:</Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Payment Method</Label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant={selectedMethod === method.id ? "default" : "outline"}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`${
                      selectedMethod === method.id 
                        ? `bg-${method.color}-500 hover:bg-${method.color}-600 text-white` 
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <method.icon className="w-4 h-4 mr-2" />
                    {method.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Card Details (if card selected) */}
            {(selectedMethod === 'debit' || selectedMethod === 'credit') && (
              <div className="space-y-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <Label className="text-white font-medium">Card Details</Label>
                <Input
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Input
                  placeholder="Cardholder Name"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Security & Trust */}
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Protected</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Amount:</span>
                <span className="text-white font-bold">
                  ${customAmount ? parseFloat(customAmount) || selectedAmount : selectedAmount}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Method:</span>
                <span className="text-white">
                  {paymentMethods.find(m => m.id === selectedMethod)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Fee:</span>
                <span className="text-green-400">$0.00</span>
              </div>
              <div className="border-t border-white/10 mt-2 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total:</span>
                  <span className="text-white font-bold text-lg">
                    ${customAmount ? parseFloat(customAmount) || selectedAmount : selectedAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={processing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {processing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      {paymentType === 'deposit' ? 'Add Money' : 
                       paymentType === 'withdrawal' ? 'Withdraw' : 'Pay & Play'}
                    </span>
                  </div>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>

            {/* Bonus Information */}
            {paymentType === 'deposit' && (
              <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center space-x-2 mb-1">
                  <Gift className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">Bonus Available!</span>
                </div>
                <p className="text-purple-300 text-xs">
                  Get up to 100% bonus on your first deposit! Terms apply.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentModal; 