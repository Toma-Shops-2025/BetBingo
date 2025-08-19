import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, Shield, Clock, ArrowLeft } from 'lucide-react';

interface TermsOfServiceScreenProps {
  onBack?: () => void;
}

const TermsOfServiceScreen: React.FC<TermsOfServiceScreenProps> = ({ onBack }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-full p-3">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
          TERMS OF SERVICE
        </h1>
        <p className="text-purple-300 text-lg">Legal agreement for using our platform</p>
        <p className="text-purple-400 text-sm mt-2">Last updated: January 2025</p>
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
        {/* Acceptance */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Scale className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Acceptance of Terms</h2>
          </div>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>
              By accessing and using Bet Bingo Cash ("the Service"), you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, you must not use our service.
            </p>
            <div className="bg-red-900/30 border border-red-400/30 rounded-lg p-3">
              <p className="text-red-300 font-semibold">
                🔞 AGE REQUIREMENT: You must be 18 years or older to use this service.
              </p>
            </div>
          </div>
        </div>

        {/* Account Requirements */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Account Requirements</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Age Verification:</strong> Must be 18+ with valid government ID</li>
              <li><strong>Single Account:</strong> One account per person/household/IP address</li>
              <li><strong>Accurate Information:</strong> All details must be truthful and current</li>
              <li><strong>Security:</strong> You're responsible for account security and password</li>
              <li><strong>Prohibited Persons:</strong> Cannot use if banned or self-excluded</li>
            </ul>
          </div>
        </div>

        {/* Gambling Terms */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Gambling Terms</h2>
          </div>
          <div className="space-y-4 text-purple-200 text-sm">
            <div>
              <h3 className="text-white font-semibold mb-2">Game Rules</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>All bets are final once placed</li>
                <li>Game outcomes are determined by random number generation</li>
                <li>House edge varies by game type (disclosed in game rules)</li>
                <li>Maximum win limits may apply to individual games</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Deposits & Withdrawals</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Minimum deposit: $10, Maximum: $25,000 per transaction</li>
                <li>Minimum withdrawal: $20, processed within 24-48 hours</li>
                <li>Identity verification required for withdrawals over $500</li>
                <li>Anti-money laundering checks may delay large transactions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Prohibited Activities */}
        <div className="bg-red-900/30 border border-red-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Prohibited Activities</h2>
          <div className="space-y-4 text-red-200 text-sm">
            <p>The following activities will result in immediate account termination:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Fraud:</strong> Using stolen cards, false identity, or fraudulent documents</li>
              <li><strong>Collusion:</strong> Working with other players to gain unfair advantage</li>
              <li><strong>Bot Usage:</strong> Automated play or third-party software</li>
              <li><strong>Multiple Accounts:</strong> Creating additional accounts to bypass limits</li>
              <li><strong>Money Laundering:</strong> Using the platform to clean illegal funds</li>
              <li><strong>Underage Gambling:</strong> Playing if under 18 years old</li>
              <li><strong>Bonus Abuse:</strong> Exploiting promotional offers against terms</li>
            </ul>
          </div>
        </div>

        {/* Responsible Gaming */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">Responsible Gaming</h2>
          </div>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>We are committed to promoting responsible gambling:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Deposit Limits:</strong> Set daily, weekly, or monthly limits</li>
              <li><strong>Session Limits:</strong> Control your playing time</li>
              <li><strong>Self-Exclusion:</strong> Temporarily or permanently ban yourself</li>
              <li><strong>Reality Checks:</strong> Regular reminders of time spent</li>
              <li><strong>Help Resources:</strong> Links to gambling addiction support</li>
            </ul>
            <div className="bg-green-900/30 border border-green-400/30 rounded-lg p-3 mt-4">
              <p className="text-green-300 font-semibold">
                🆘 Need Help? Call 1-800-GAMBLER or visit www.ncpgambling.org
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Intellectual Property</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>All content on our platform is protected by copyright and trademark laws:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Game software, graphics, and audio are proprietary</li>
              <li>You may not copy, modify, or distribute our content</li>
              <li>Trademarks and logos are owned by Bet Bingo Cash</li>
              <li>User-generated content (chat, etc.) grants us usage rights</li>
            </ul>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Limitation of Liability</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>To the maximum extent permitted by law:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount in your account</li>
              <li>We are not responsible for technical failures or internet outages</li>
              <li>External payment processor issues are beyond our control</li>
              <li>Game results cannot be reversed due to technical errors</li>
            </ul>
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Dispute Resolution</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <div>
              <h3 className="text-white font-semibold mb-2">Internal Process</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Contact customer support within 7 days of the issue</li>
                <li>Provide detailed description and supporting evidence</li>
                <li>We will investigate and respond within 48 hours</li>
                <li>Final decisions are made by management within 14 days</li>
              </ol>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">External Mediation</h3>
              <p>
                Unresolved disputes may be submitted to independent mediation services 
                or relevant gaming authorities in your jurisdiction.
              </p>
            </div>
          </div>
        </div>

        {/* Governing Law */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Governing Law</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>
              These terms are governed by the laws of Nevada, United States. Any legal 
              proceedings must be conducted in Nevada state courts. If any provision 
              is found invalid, the remaining terms continue in full effect.
            </p>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-yellow-900/30 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Changes to Terms</h2>
          </div>
          <div className="space-y-4 text-yellow-200 text-sm">
            <p>We reserve the right to modify these terms at any time:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Changes will be posted with an updated effective date</li>
              <li>Major changes will be communicated via email</li>
              <li>Continued use constitutes acceptance of new terms</li>
              <li>If you disagree with changes, you must stop using the service</li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>For questions about these terms, contact us:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Email:</strong> legal@betbingo.live</p>
                <p><strong>Phone:</strong> 1-800-BET-BINGO</p>
              </div>
              <div>
                <p><strong>Mail:</strong> Bet Bingo Cash Legal Department</p>
                <p>123 Gaming Street, Suite 200</p>
                <p>Las Vegas, NV 89101</p>
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
        <p className="text-purple-400 text-sm">
          © 2025 Bet Bingo Cash. All rights reserved. Licensed gaming operator.
        </p>
      </motion.div>
    </div>
  );
};

export default TermsOfServiceScreen; 