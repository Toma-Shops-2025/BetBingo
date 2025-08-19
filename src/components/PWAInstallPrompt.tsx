import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandaloneMode = (window.navigator as any).standalone === true;
    
    if (isInStandaloneMode || isIOSStandaloneMode) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 3 seconds to not be too intrusive
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
        >
          <div className="bg-gradient-to-r from-purple-800/95 via-blue-800/95 to-purple-800/95 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-2">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold">Install Bet Bingo Cash</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 text-purple-300 hover:text-white rounded-lg hover:bg-purple-600/30 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-purple-200 text-sm mb-4">
              Install our app for the best gaming experience! Play offline, get notifications, and enjoy faster loading.
            </p>

            <div className="flex space-x-3">
              <motion.button
                onClick={handleInstallClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Install App</span>
              </motion.button>
              
              <button
                onClick={handleDismiss}
                className="px-4 py-3 text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-xl transition-all font-medium"
              >
                Later
              </button>
            </div>

            {/* Benefits list */}
            <div className="mt-3 text-xs text-purple-300 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <span>✓ Works offline</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <span>✓ Faster loading</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <span>✓ Home screen access</span>
              </div>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 15}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt; 