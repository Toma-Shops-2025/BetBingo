import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Bitcoin,
  DollarSign,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Shield,
  Star,
  Gift,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CashierScreen: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Instant deposit',
      minDeposit: 10,
      maxDeposit: 5000,
      fee: 0,
      bonus: 10,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Smartphone,
      description: 'Fast & secure',
      minDeposit: 5,
      maxDeposit: 2500,
      fee: 0,
      bonus: 5,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: Building,
      description: '1-2 business days',
      minDeposit: 25,
      maxDeposit: 10000,
      fee: 0,
      bonus: 15,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: 'Bitcoin, Ethereum',
      minDeposit: 20,
      maxDeposit: 25000,
      fee: 0,
      bonus: 20,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  const recentTransactions = [
    { type: 'deposit', amount: 50, method: 'Credit Card', status: 'completed', time: '2 hours ago' },
    { type: 'withdraw', amount: 125, method: 'PayPal', status: 'processing', time: '1 day ago' },
    { type: 'deposit', amount: 25, method: 'PayPal', status: 'completed', time: '3 days ago' },
  ];

  const handleDeposit = async () => {
    if (!selectedMethod || !amount) return;
    
    setProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      const depositAmount = parseFloat(amount);
      const method = paymentMethods.find(m => m.id === selectedMethod);
      const bonusAmount = method ? (depositAmount * method.bonus) / 100 : 0;
      
      updateUser({
        balance: user.balance + depositAmount + bonusAmount,
        bonus: user.bonus + bonusAmount
      });
      
      setProcessing(false);
      setAmount('');
      setSelectedMethod('');
      
      alert(`Deposit successful! $${depositAmount.toFixed(2)} added to your account${bonusAmount > 0 ? ` + $${bonusAmount.toFixed(2)} bonus!` : ''}`);
    }, 2000);
  };

  const handleWithdraw = async () => {
    if (!selectedMethod || !amount) return;
    
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > user.balance) {
      alert('Insufficient balance!');
      return;
    }
    
    setProcessing(true);
    
    setTimeout(() => {
      updateUser({
        balance: user.balance - withdrawAmount
      });
      
      setProcessing(false);
      setAmount('');
      setSelectedMethod('');
      
      alert(`Withdrawal request submitted! $${withdrawAmount.toFixed(2)} will be sent to your ${paymentMethods.find(m => m.id === selectedMethod)?.name}.`);
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
          CASHIER
        </h1>
        <p className="text-purple-300 text-lg">Manage your funds safely & securely</p>
      </motion.div>

      {/* Current Balance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400/40 rounded-2xl p-6 backdrop-blur-md"
      >
        <div className="text-center">
          <div className="text-green-300 text-4xl font-black mb-2">
            ${user.balance.toFixed(2)}
          </div>
          <p className="text-green-400 text-lg">Available Balance</p>
          {user.bonus > 0 && (
            <div className="mt-3 inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-400/30 rounded-lg px-3 py-1">
              <Gift className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 font-bold">${user.bonus.toFixed(2)} Bonus</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex bg-purple-900/30 rounded-2xl p-1 backdrop-blur-md"
      >
        <button
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'deposit'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <ArrowDownLeft className="w-5 h-5" />
          <span>DEPOSIT</span>
        </button>
        <button
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'withdraw'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-5 h-5" />
          <span>WITHDRAW</span>
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Quick Amounts */}
          {activeTab === 'deposit' && (
            <div className="space-y-4">
              <h3 className="text-white text-lg font-bold">Quick Amounts</h3>
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((quickAmount) => (
                  <motion.button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-400/30 rounded-xl p-3 backdrop-blur-md hover:from-purple-600/40 hover:to-blue-600/40 transition-all ${
                      amount === quickAmount.toString() ? 'ring-2 ring-purple-400' : ''
                    }`}
                  >
                    <div className="text-white font-bold">${quickAmount}</div>
                    <div className="text-purple-300 text-xs">+ {Math.round(quickAmount * 0.1)}% bonus</div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">
              {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'} Amount
            </h3>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 w-6 h-6" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-purple-900/30 border border-purple-400/30 rounded-xl pl-12 pr-4 py-4 text-white text-xl font-bold placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md"
              />
            </div>
            {amount && selectedMethod && (
              <div className="text-center">
                <p className="text-purple-300 text-sm">
                  {activeTab === 'deposit' 
                    ? `You'll receive $${(parseFloat(amount) + (parseFloat(amount) * (paymentMethods.find(m => m.id === selectedMethod)?.bonus || 0) / 100)).toFixed(2)} (including bonus)`
                    : `$${parseFloat(amount).toFixed(2)} will be sent to your account`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;
                
                return (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r ${method.color}/20 border-2 ${
                      isSelected ? `${method.color.replace('from-', 'border-').replace(' to-.*', '')}/60` : `${method.color.replace('from-', 'border-').replace(' to-.*', '')}/30`
                    } rounded-xl p-4 backdrop-blur-md transition-all ${
                      isSelected ? 'ring-2 ring-white' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 bg-gradient-to-r ${method.color} rounded-xl`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-bold">{method.name}</h4>
                          <p className="text-purple-300 text-sm">{method.description}</p>
                          <div className="flex items-center space-x-3 mt-1 text-xs">
                            <span className="text-green-400">
                              Min: ${method.minDeposit}
                            </span>
                            <span className="text-blue-400">
                              Max: ${method.maxDeposit.toLocaleString()}
                            </span>
                            {activeTab === 'deposit' && method.bonus > 0 && (
                              <span className="text-yellow-400">
                                +{method.bonus}% bonus
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {method.fee === 0 && (
                        <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-2 py-1">
                          <span className="text-green-300 text-xs font-bold">No Fee</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            onClick={activeTab === 'deposit' ? handleDeposit : handleWithdraw}
            disabled={!selectedMethod || !amount || processing}
            whileHover={{ scale: processing ? 1 : 1.02 }}
            whileTap={{ scale: processing ? 1 : 0.98 }}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              activeTab === 'deposit'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
            } text-white shadow-lg ${
              (!selectedMethod || !amount || processing) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {processing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `${activeTab === 'deposit' ? 'DEPOSIT' : 'WITHDRAW'} ${amount ? `$${parseFloat(amount).toFixed(2)}` : 'FUNDS'}`
            )}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-white text-lg font-bold">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div
              key={index}
              className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-4 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'deposit' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                    </div>
                    <div className="text-purple-300 text-sm">
                      {transaction.method} • {transaction.time}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  transaction.status === 'completed'
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {transaction.status === 'completed' ? (
                    <div className="flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Processing</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-900/30 border border-blue-400/30 rounded-xl p-4 backdrop-blur-md"
      >
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-blue-400" />
          <div>
            <h4 className="text-blue-300 font-bold">Secure & Protected</h4>
            <p className="text-blue-200 text-sm">
              All transactions are encrypted and protected by bank-level security. 
              Your financial information is never stored on our servers.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CashierScreen; 