import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, DollarSign, Gift, Sparkles, CheckCircle } from 'lucide-react';

interface AnimatedCashOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const AnimatedCashOutModal: React.FC<AnimatedCashOutModalProps> = ({ 
  isOpen, 
  onClose, 
  amount 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const paymentMethods = [
    { id: 'visa', name: 'VISA', icon: '💳', color: 'from-blue-500 to-blue-600' },
    { id: 'amex', name: 'AM EX', icon: '💳', color: 'from-green-500 to-green-600' },
    { id: 'mastercard', name: 'Mastercard', icon: '💳', color: 'from-orange-500 to-red-500' }
  ];

  const handleCashOut = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onClose();
        setIsComplete(false);
        setSelectedMethod('');
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-500/90 via-purple-500/90 to-pink-500/90 border-white/20 backdrop-blur-md">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg blur-xl opacity-50"></div>

            {/* Floating confetti */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'][Math.floor(Math.random() * 5)]
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            <DialogHeader className="relative z-10 text-center">
              <motion.div
                className="flex items-center justify-center gap-2 mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <DialogTitle className="text-2xl font-bold text-white">BINGO</DialogTitle>
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
              
              <motion.div
                className="flex justify-center gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
                  <motion.div
                    key={letter}
                    className="w-8 h-8 rounded bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold"
                    style={{
                      backgroundColor: ['#FF6B6B', '#4ECDC4', '#8B5CF6', '#F59E0B', '#10B981'][index]
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </motion.div>
            </DialogHeader>

            <div className="relative z-10 space-y-4">
              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-white font-semibold mb-3">Select Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedMethod === method.id
                            ? 'bg-gradient-to-r ' + method.color + ' border-white/50 shadow-lg'
                            : 'bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30'
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{method.icon}</div>
                          <div className="text-white font-medium text-sm">{method.name}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Payment Confirmation */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30"
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">Payment received</div>
                      <div className="text-green-400 font-bold text-2xl">
                        ${amount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Money stacks */}
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-6 bg-green-500 rounded border border-green-600"
                        style={{ transform: `translateX(${i * 2}px)` }}
                        animate={{
                          y: [0, -3, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Money Stacks Illustration */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-1"
                      style={{ transform: `translateX(${i * 3}px)` }}
                    >
                      {[...Array(3)].map((_, j) => (
                        <motion.div
                          key={j}
                          className="w-10 h-6 bg-green-500 rounded border border-green-600"
                          animate={{
                            y: [0, -2, 0],
                            scale: [1, 1.02, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: (i + j) * 0.1
                          }}
                        />
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 shadow-lg hover:shadow-yellow-400/25 text-lg"
                  onClick={handleCashOut}
                  disabled={!selectedMethod || isProcessing}
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                    </motion.div>
                  ) : (
                    <DollarSign className="w-5 h-5 mr-2" />
                  )}
                  {isProcessing ? 'Processing...' : 'CASH OUT MONEY'}
                </Button>
              </motion.div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-2000"></div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AnimatedCashOutModal; 