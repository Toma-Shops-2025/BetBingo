import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  CreditCard, 
  Banknote, 
  Bitcoin, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Gift,
  Trophy,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PaymentModal from './PaymentModal';
import { formatCurrency, PAYMENT_CONFIG } from '@/lib/stripe';

const CashierScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'entry_fees'>('deposit');
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'deposit' | 'game_entry' | 'tournament_entry'>('deposit');

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Instant deposit',
      minDeposit: PAYMENT_CONFIG.minDeposit,
      maxDeposit: PAYMENT_CONFIG.maxDeposit,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CreditCard,
      description: 'Fast & secure',
      minDeposit: 5,
      maxDeposit: 2500,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: Banknote,
      description: 'Lower fees',
      minDeposit: 25,
      maxDeposit: 10000,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: 'Modern payments',
      minDeposit: 20,
      maxDeposit: 25000,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  const recentTransactions = [
    { type: 'deposit', amount: 50, method: 'Credit Card', status: 'completed', time: '2 hours ago' },
    { type: 'withdraw', amount: 125, method: 'PayPal', status: 'processing', time: '1 day ago' },
    { type: 'deposit', amount: 25, method: 'PayPal', status: 'completed', time: '3 days ago' },
    { type: 'game_entry', amount: 5, method: 'Credit Card', status: 'completed', time: '1 week ago' },
    { type: 'tournament_entry', amount: 50, method: 'Credit Card', status: 'completed', time: '1 week ago' }
  ];

  const handlePayment = (type: 'deposit' | 'game_entry' | 'tournament_entry', amount: string, method: string) => {
    setPaymentType(type);
    setSelectedAmount(amount);
    setSelectedMethod(method);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Refresh user data or show success message
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case 'withdraw': return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'game_entry': return <Gamepad2 className="w-4 h-4 text-blue-400" />;
      case 'tournament_entry': return <Trophy className="w-4 h-4 text-yellow-400" />;
      default: return <DollarSign className="w-4 h-4 text-purple-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'bg-green-500/20 border-green-400/30';
      case 'withdraw': return 'bg-red-500/20 border-red-400/30';
      case 'game_entry': return 'bg-blue-500/20 border-blue-400/30';
      case 'tournament_entry': return 'bg-yellow-500/20 border-yellow-400/30';
      default: return 'bg-purple-500/20 border-purple-400/30';
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'deposit': return 'Deposit';
      case 'withdraw': return 'Withdrawal';
      case 'game_entry': return 'Game Entry';
      case 'tournament_entry': return 'Tournament Entry';
      default: return 'Transaction';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💰 Cashier</h1>
          <p className="text-purple-200 text-lg">Manage your funds and payments</p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-400/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">
                {formatCurrency(user?.balance || 0)}
              </p>
              <p className="text-green-200 text-sm">Ready to play</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border-blue-400/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Gift className="w-5 h-5 mr-2 text-blue-400" />
                Bonus Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">
                {formatCurrency(user?.bonus || 0)}
              </p>
              <p className="text-blue-200 text-sm">Claimable rewards</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border-purple-400/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-purple-400" />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">
                {formatCurrency(user?.totalEarnings || 0)}
              </p>
              <p className="text-purple-200 text-sm">Lifetime winnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-purple-900/30 border border-purple-400/30">
            <TabsTrigger value="deposit" className="text-white">Deposit</TabsTrigger>
            <TabsTrigger value="entry_fees" className="text-white">Entry Fees</TabsTrigger>
            <TabsTrigger value="withdraw" className="text-white">Withdraw</TabsTrigger>
          </TabsList>

          {/* Deposit Tab */}
          <TabsContent value="deposit" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ArrowDownLeft className="w-5 h-5 mr-2 text-green-400" />
                  Add Funds to Your Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Methods */}
                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`bg-gradient-to-r ${method.color} p-4 rounded-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform`}
                      onClick={() => handlePayment('deposit', '50', method.name)}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className="w-8 h-8 text-white" />
                        <div>
                          <h3 className="text-white font-semibold">{method.name}</h3>
                          <p className="text-white/80 text-sm">{method.description}</p>
                          <p className="text-white/60 text-xs">
                            ${method.minDeposit} - ${method.maxDeposit.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Amounts */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Quick Amounts</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="bg-purple-900/30 border-purple-400/30 text-white hover:bg-purple-800/50"
                        onClick={() => handlePayment('deposit', amount.toString(), 'Credit Card')}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Entry Fees Tab */}
          <TabsContent value="entry_fees" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Gamepad2 className="w-5 h-5 mr-2 text-blue-400" />
                  Game & Tournament Entry Fees
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Game Entry Fees */}
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Gamepad2 className="w-4 h-4 mr-2" />
                    Game Entry Fees
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { name: 'Penny Bingo', fee: 0.50, color: 'from-green-500 to-emerald-600' },
                      { name: 'Quick Cash', fee: 1.00, color: 'from-blue-500 to-cyan-600' },
                      { name: 'High Roller', fee: 5.00, color: 'from-purple-500 to-pink-600' },
                      { name: 'Championship', fee: 10.00, color: 'from-yellow-500 to-orange-600' },
                      { name: 'Lucky Sevens', fee: 2.50, color: 'from-red-500 to-rose-600' },
                      { name: 'Mega Jackpot', fee: 3.00, color: 'from-orange-500 to-red-600' }
                    ].map((game) => (
                      <div
                        key={game.name}
                        className={`bg-gradient-to-r ${game.color} p-4 rounded-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform`}
                        onClick={() => handlePayment('game_entry', game.fee.toString(), 'Credit Card')}
                      >
                        <h4 className="text-white font-semibold">{game.name}</h4>
                        <p className="text-white/80 text-sm">Entry Fee</p>
                        <p className="text-white text-xl font-bold">${game.fee}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tournament Entry Fees */}
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Tournament Entry Fees
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'Weekly Championship', fee: 50, prize: 5000, color: 'from-yellow-500 to-orange-600' },
                      { name: 'Monthly Masters', fee: 100, prize: 15000, color: 'from-purple-500 to-pink-600' },
                      { name: 'Season Finale', fee: 75, prize: 10000, color: 'from-blue-500 to-cyan-600' },
                      { name: 'Grand Slam', fee: 150, prize: 25000, color: 'from-red-500 to-rose-600' }
                    ].map((tournament) => (
                      <div
                        key={tournament.name}
                        className={`bg-gradient-to-r ${tournament.color} p-4 rounded-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform`}
                        onClick={() => handlePayment('tournament_entry', tournament.fee.toString(), 'Credit Card')}
                      >
                        <h4 className="text-white font-semibold">{tournament.name}</h4>
                        <p className="text-white/80 text-sm">Entry Fee</p>
                        <p className="text-white text-xl font-bold">${tournament.fee}</p>
                        <p className="text-white/60 text-xs">Prize Pool: ${tournament.prize.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="space-y-6">
            <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border-red-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ArrowUpRight className="w-5 h-5 mr-2 text-red-400" />
                  Withdraw Your Winnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Withdrawal System</h3>
                  <p className="text-red-200 mb-4">
                    Withdrawals are processed within 24-48 hours for security verification.
                  </p>
                  <p className="text-red-300 text-sm">
                    Minimum withdrawal: ${PAYMENT_CONFIG.minWithdrawal}<br />
                    Maximum withdrawal: ${PAYMENT_CONFIG.maxWithdrawal}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Transactions */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border-purple-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <History className="w-5 h-5 mr-2 text-purple-400" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getTransactionColor(transaction.type)}`}
                >
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="text-white font-medium">
                        {getTransactionLabel(transaction.type)}
                      </p>
                      <p className="text-white/60 text-sm">{transaction.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {transaction.type === 'withdraw' ? '-' : '+'}${transaction.amount}
                    </p>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSubmit={handlePaymentSuccess}
        amount={selectedAmount}
        method={selectedMethod}
        processing={false}
        paymentType={paymentType}
      />
    </div>
  );
};

export default CashierScreen; 