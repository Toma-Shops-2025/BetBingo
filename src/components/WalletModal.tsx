import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Wallet, CreditCard, CreditCard as Paypal, ArrowUpRight, ArrowDownLeft, History, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WalletModal: React.FC = () => {
  const { user, updateBalance, claimBonus } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = async () => {
    if (!user || !withdrawAmount || !paypalEmail) return;
    
    const amount = parseFloat(withdrawAmount);
    if (amount <= 0 || amount > user.balance) return;

    setIsProcessing(true);
    try {
      // Simulate PayPal withdrawal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update balance
      await updateBalance(-amount);
      
      // Reset form
      setWithdrawAmount('');
      setPaypalEmail('');
      setIsOpen(false);
      
      // Show success message
      alert(`Successfully withdrew $${amount.toFixed(2)} to ${paypalEmail}`);
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert('Withdrawal failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClaimBonus = async () => {
    if (!user || user.bonus <= 0) return;
    
    try {
      await claimBonus();
      alert(`Successfully claimed $${user.bonus.toFixed(2)} bonus!`);
    } catch (error) {
      console.error('Bonus claim error:', error);
      alert('Failed to claim bonus. Please try again.');
    }
  };

  const recentTransactions = [
    {
      id: 1,
      type: 'win' as const,
      amount: 12.50,
      description: 'Bingo Win',
      date: '2024-01-15',
      status: 'completed' as const,
    },
    {
      id: 2,
      type: 'withdrawal' as const,
      amount: -25.00,
      description: 'PayPal Withdrawal',
      date: '2024-01-14',
      status: 'completed' as const,
    },
    {
      id: 3,
      type: 'bonus' as const,
      amount: 5.00,
      description: 'Welcome Bonus',
      date: '2024-01-13',
      status: 'completed' as const,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
          <Wallet className="w-4 h-4 mr-2" />
          Wallet
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-md bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 border-white/20"
        aria-describedby="wallet-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-xl">💰 Wallet & Payments</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="balance" className="text-white">Balance</TabsTrigger>
            <TabsTrigger value="withdraw" className="text-white">Withdraw</TabsTrigger>
            <TabsTrigger value="history" className="text-white">History</TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="space-y-4">
            {/* Balance Overview */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Available Balance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  ${user?.balance?.toFixed(2) || '0.00'}
                </div>
                <p className="text-purple-200 text-sm">Ready to withdraw</p>
              </CardContent>
            </Card>

            {/* Bonus Section */}
            {user?.bonus && user.bonus > 0 && (
              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Gift className="w-5 h-5 text-green-400" />
                    Welcome Bonus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      ${user.bonus.toFixed(2)}
                    </div>
                    <p className="text-green-200 text-sm">Claim your welcome bonus!</p>
                  </div>
                  <Button 
                    onClick={handleClaimBonus}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Claim Bonus
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
                <div className="text-white font-bold text-lg">${user?.totalEarnings?.toFixed(2) || '0.00'}</div>
                <div className="text-purple-200 text-xs">Total Earned</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
                <div className="text-white font-bold text-lg">{user?.gamesWon || 0}</div>
                <div className="text-purple-200 text-xs">Games Won</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Paypal className="w-5 h-5 text-blue-400" />
                  Withdraw to PayPal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount" className="text-white">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    min="1"
                    max={user?.balance || 0}
                    step="0.01"
                  />
                  <p className="text-purple-200 text-xs mt-1">
                    Available: ${user?.balance?.toFixed(2) || '0.00'}
                  </p>
                </div>

                <div>
                  <Label htmlFor="paypal" className="text-white">PayPal Email</Label>
                  <Input
                    id="paypal"
                    type="email"
                    placeholder="your-email@paypal.com"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <Button 
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || !paypalEmail || isProcessing || parseFloat(withdrawAmount) <= 0}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isProcessing ? 'Processing...' : 'Withdraw to PayPal'}
                </Button>

                <div className="text-center">
                  <p className="text-purple-200 text-xs">
                    💳 Minimum withdrawal: $1.00
                  </p>
                  <p className="text-purple-200 text-xs">
                    ⚡ Instant transfer to PayPal
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-purple-400" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center bg-white/5 rounded p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'win' ? 'bg-green-500/20' :
                          transaction.type === 'withdrawal' ? 'bg-red-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          {transaction.type === 'win' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                          ) : transaction.type === 'withdrawal' ? (
                            <ArrowDownLeft className="w-4 h-4 text-red-400" />
                          ) : (
                            <Gift className="w-4 h-4 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">
                            {transaction.description}
                          </div>
                          <div className="text-purple-200 text-xs">
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;