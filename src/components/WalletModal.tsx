import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wallet, CreditCard, Bitcoin } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const balances = {
    USD: 1250.00,
    ETH: 0.5,
    USDC: 100.0
  };

  const handleTransaction = () => {
    // Simulate transaction
    console.log(`${activeTab} ${amount} ${currency}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Balances */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Current Balances</h3>
            <div className="space-y-2">
              {Object.entries(balances).map(([curr, balance]) => (
                <div key={curr} className="flex justify-between items-center">
                  <span className="font-medium">{curr}</span>
                  <Badge variant="secondary">
                    {curr === 'USD' ? '$' : ''}{balance.toFixed(curr === 'USD' ? 2 : 4)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'deposit' ? 'default' : 'outline'}
              onClick={() => setActiveTab('deposit')}
              className="flex-1"
            >
              Deposit
            </Button>
            <Button
              variant={activeTab === 'withdraw' ? 'default' : 'outline'}
              onClick={() => setActiveTab('withdraw')}
              className="flex-1"
            >
              Withdraw
            </Button>
          </div>

          {/* Transaction Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="USD">USD</option>
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
              </select>
            </div>

            {activeTab === 'deposit' && (
              <div className="space-y-2">
                <Button
                  onClick={handleTransaction}
                  className="w-full flex items-center justify-center"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Deposit with Card
                </Button>
                <Button
                  onClick={handleTransaction}
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <Bitcoin className="w-4 h-4 mr-2" />
                  Connect Crypto Wallet
                </Button>
              </div>
            )}

            {activeTab === 'withdraw' && (
              <Button
                onClick={handleTransaction}
                className="w-full"
                disabled={!amount}
              >
                Withdraw {amount} {currency}
              </Button>
            )}
          </div>

          <div className="text-xs text-gray-500 text-center">
            All transactions are secured with bank-level encryption
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;