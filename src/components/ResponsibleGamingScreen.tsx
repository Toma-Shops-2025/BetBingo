import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Phone, AlertTriangle, Clock, Shield, ExternalLink, ArrowLeft, Timer, DollarSign } from 'lucide-react';

interface ResponsibleGamingScreenProps {
  onBack?: () => void;
}

const ResponsibleGamingScreen: React.FC<ResponsibleGamingScreenProps> = ({ onBack }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full p-3">
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
          RESPONSIBLE GAMING
        </h1>
        <p className="text-purple-300 text-lg">Play safely and responsibly</p>
        <p className="text-red-400 font-semibold mt-2">When the fun stops, stop.</p>
      </motion.div>

      {/* Emergency Help - Most Important */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-red-600/40 to-red-700/40 border-2 border-red-400 rounded-xl p-6 backdrop-blur-md"
      >
        <div className="text-center">
          <Phone className="w-12 h-12 text-red-300 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">NEED IMMEDIATE HELP?</h2>
          <div className="space-y-3">
            <a 
              href="tel:18004264653" 
              className="block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              📞 1-800-GAMBLER
            </a>
            <p className="text-red-200 text-sm">
              24/7 Free, confidential gambling addiction help
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <a 
                href="https://www.ncpgambling.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-red-600/30 border border-red-400/50 rounded-lg p-3 text-red-200 hover:bg-red-600/50 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>National Council on Problem Gambling</span>
              </a>
              <a 
                href="https://www.gamblersanonymous.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-red-600/30 border border-red-400/50 rounded-lg p-3 text-red-200 hover:bg-red-600/50 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Gamblers Anonymous</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back Button */}
      {onBack && (
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 text-purple-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Warning Signs */}
        <div className="bg-yellow-900/30 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Warning Signs of Problem Gambling</h2>
          </div>
          <div className="space-y-4 text-yellow-200 text-sm">
            <p className="font-semibold">If you answer "yes" to any of these, you may have a gambling problem:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ul className="list-disc list-inside space-y-2">
                <li>Spending more money than you can afford</li>
                <li>Gambling longer than you planned</li>
                <li>Feeling guilty or anxious about gambling</li>
                <li>Lying to others about your gambling</li>
                <li>Borrowing money to gamble</li>
                <li>Neglecting work, family, or responsibilities</li>
              </ul>
              <ul className="list-disc list-inside space-y-2">
                <li>Chasing losses with bigger bets</li>
                <li>Unable to stop or control gambling</li>
                <li>Gambling to escape problems or stress</li>
                <li>Feeling restless when not gambling</li>
                <li>Making unsuccessful attempts to stop</li>
                <li>Gambling despite negative consequences</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Self-Assessment Quiz */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Quick Self-Assessment</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p className="font-semibold">Rate each statement (Never / Sometimes / Often):</p>
            <div className="space-y-3">
              <div className="bg-purple-800/30 rounded-lg p-3">
                <p>1. I spend more time or money gambling than I can afford</p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-3">
                <p>2. I feel the need to bet more money to get the same excitement</p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-3">
                <p>3. I feel restless or irritable when trying to cut down gambling</p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-3">
                <p>4. I gamble to escape problems or when feeling depressed</p>
              </div>
            </div>
            <div className="bg-red-900/30 border border-red-400/30 rounded-lg p-3 mt-4">
              <p className="text-red-300 font-semibold">
                If you answered "Often" to any question, consider seeking help immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Available Controls */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Available Controls</h2>
          </div>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>We provide these tools to help you stay in control:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Deposit Limits</h3>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Daily limit: $50 - $5,000</li>
                  <li>Weekly limit: $200 - $25,000</li>
                  <li>Monthly limit: $500 - $100,000</li>
                  <li>Decreases take effect immediately</li>
                  <li>Increases have 24-48 hour delay</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Timer className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">Time Limits</h3>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Session duration: 30 min - 8 hours</li>
                  <li>Daily playing time: 1 - 12 hours</li>
                  <li>Reality check reminders: 15-60 min</li>
                  <li>Auto-logout when limit reached</li>
                  <li>Cool-down periods between sessions</li>
                </ul>
              </div>
              <div className="bg-orange-900/20 border border-orange-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <h3 className="font-semibold text-white">Take a Break</h3>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>24 hours cooling off</li>
                  <li>1 week timeout</li>
                  <li>1 month timeout</li>
                  <li>3 month timeout</li>
                  <li>Cannot be reversed early</li>
                </ul>
              </div>
              <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-white">Self-Exclusion</h3>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>6 months minimum</li>
                  <li>1, 2, or 5 years</li>
                  <li>Permanent exclusion available</li>
                  <li>Cannot be reversed</li>
                  <li>Includes all sister sites</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Setting Limits */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">How to Set Limits</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-white font-bold">1</div>
                <p className="font-semibold">Go to Settings</p>
                <p className="text-xs">Find "Responsible Gaming" section</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-white font-bold">2</div>
                <p className="font-semibold">Choose Your Limits</p>
                <p className="text-xs">Set deposit, time, or loss limits</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-white font-bold">3</div>
                <p className="font-semibold">Confirm Changes</p>
                <p className="text-xs">Limits take effect immediately</p>
              </div>
            </div>
            <div className="bg-yellow-900/30 border border-yellow-400/30 rounded-lg p-3 mt-4">
              <p className="text-yellow-300 text-xs">
                <strong>Important:</strong> Limit decreases take effect immediately. 
                Limit increases have a 24-48 hour cooling-off period to prevent impulsive decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Help Resources */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Professional Help Resources</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-white font-semibold mb-2">United States</h3>
                <div className="space-y-2">
                  <a href="tel:18004264653" className="flex items-center space-x-2 text-red-300 hover:text-red-200">
                    <Phone className="w-4 h-4" />
                    <span>1-800-GAMBLER (National)</span>
                  </a>
                  <a href="tel:18005228960" className="flex items-center space-x-2 text-red-300 hover:text-red-200">
                    <Phone className="w-4 h-4" />
                    <span>1-800-522-4700 (Crisis Hotline)</span>
                  </a>
                  <a href="https://www.ncpgambling.org" target="_blank" className="flex items-center space-x-2 text-blue-300 hover:text-blue-200">
                    <ExternalLink className="w-4 h-4" />
                    <span>ncpgambling.org</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">International</h3>
                <div className="space-y-2">
                  <div className="text-green-300">🇬🇧 UK: 0808 8020 133 (GamCare)</div>
                  <div className="text-green-300">🇨🇦 Canada: 1-888-391-1111</div>
                  <div className="text-green-300">🇦🇺 Australia: 1800 858 858</div>
                  <div className="text-green-300">🇪🇺 EU: www.begambleaware.org</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips for Healthy Gaming */}
        <div className="bg-green-900/30 border border-green-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Tips for Healthy Gaming</h2>
          <div className="space-y-4 text-green-200 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-white font-semibold mb-2">✅ DO:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Set a budget before you start</li>
                  <li>Use money you can afford to lose</li>
                  <li>Take regular breaks</li>
                  <li>Keep track of time and money spent</li>
                  <li>Play for entertainment, not profit</li>
                  <li>Seek help if you feel out of control</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">❌ DON'T:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chase your losses</li>
                  <li>Borrow money to gamble</li>
                  <li>Gamble when upset or depressed</li>
                  <li>Use gambling to solve financial problems</li>
                  <li>Lie about your gambling activities</li>
                  <li>Neglect family, work, or other responsibilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Age Verification */}
        <div className="bg-red-900/30 border border-red-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Age Verification & Protection</h2>
          <div className="space-y-4 text-red-200 text-sm">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 rounded-full p-2">
                <span className="text-white font-bold text-lg">18+</span>
              </div>
              <div>
                <p className="font-semibold">This platform is strictly for adults 18 years and older.</p>
                <p>We use advanced age verification to protect minors from accessing gambling services.</p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Government ID verification required</li>
              <li>Regular compliance audits</li>
              <li>Immediate account closure for underage users</li>
              <li>Parental controls and monitoring available</li>
            </ul>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Need Support?</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>Our customer support team is trained to help with responsible gaming concerns:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>24/7 Live Chat:</strong> Available in-app</p>
                <p><strong>Email:</strong> support@betbingo.live</p>
                <p><strong>Phone:</strong> 1-800-BET-HELP</p>
              </div>
              <div>
                <p><strong>Responsible Gaming Team:</strong></p>
                <p>Email: responsible@betbingo.live</p>
                <p>Dedicated specialists available</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center py-8"
      >
        <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4 mb-4">
          <p className="text-red-300 font-bold text-lg">Remember: When the fun stops, stop.</p>
          <p className="text-red-400 text-sm mt-1">
            Gambling should be entertaining, not a way to make money or solve problems.
          </p>
        </div>
        <p className="text-purple-400 text-sm">
          © 2025 Bet Bingo Cash. Committed to responsible gaming. Licensed operator.
        </p>
      </motion.div>
    </div>
  );
};

export default ResponsibleGamingScreen; 