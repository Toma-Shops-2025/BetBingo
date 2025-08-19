import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Globe, Mail, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onBack?: () => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onBack }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          PRIVACY POLICY
        </h1>
        <p className="text-purple-300 text-lg">Your privacy is our priority</p>
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
        {/* Information We Collect */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Information We Collect</h2>
          </div>
          <div className="space-y-4 text-purple-200">
            <div>
              <h3 className="text-white font-semibold mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Name, email address, and date of birth</li>
                <li>Phone number and mailing address</li>
                <li>Government-issued ID for age verification</li>
                <li>Payment information (processed securely by third parties)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Gaming Information</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Game play history and statistics</li>
                <li>Deposit and withdrawal records</li>
                <li>Chat messages and communications</li>
                <li>Device information and IP addresses</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">How We Use Your Information</h2>
          </div>
          <div className="space-y-4 text-purple-200">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Account Management:</strong> Creating and maintaining your account</li>
              <li><strong>Game Operations:</strong> Processing bets, wins, and game history</li>
              <li><strong>Legal Compliance:</strong> Age verification and anti-money laundering</li>
              <li><strong>Customer Support:</strong> Responding to inquiries and issues</li>
              <li><strong>Security:</strong> Fraud prevention and account protection</li>
              <li><strong>Marketing:</strong> Promotional offers (with your consent)</li>
            </ul>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Data Security</h2>
          </div>
          <div className="space-y-4 text-purple-200">
            <p className="text-sm">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Encryption:</strong> All data is encrypted using AES-256 encryption</li>
              <li><strong>Secure Transmission:</strong> TLS 1.3 for all communications</li>
              <li><strong>Access Controls:</strong> Limited employee access on need-to-know basis</li>
              <li><strong>Regular Audits:</strong> Third-party security assessments</li>
              <li><strong>PCI Compliance:</strong> Payment data handled by certified processors</li>
            </ul>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Information Sharing</h2>
          </div>
          <div className="space-y-4 text-purple-200">
            <p className="text-sm">
              We do <strong className="text-white">NOT</strong> sell your personal information. We may share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Service Providers:</strong> Payment processors, identity verification services</li>
              <li><strong>Legal Authorities:</strong> When required by law or court order</li>
              <li><strong>Business Partners:</strong> Only aggregated, non-personal data for analytics</li>
              <li><strong>Regulatory Bodies:</strong> Gaming commissions and compliance organizations</li>
            </ul>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-bold text-white">Your Rights</h2>
          </div>
          <div className="space-y-4 text-purple-200">
            <p className="text-sm">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
            </ul>
            <div className="bg-blue-900/30 border border-blue-400/30 rounded-lg p-3 mt-4">
              <p className="text-blue-300 text-sm">
                <strong>To exercise your rights:</strong> Contact us at privacy@betbingo.live or use the contact form in our app.
              </p>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Data Retention</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>We retain your information for as long as necessary to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal and regulatory requirements (typically 7 years)</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>
          </div>
        </div>

        {/* International Transfers */}
        <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">International Transfers</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure adequate protection through:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Standard contractual clauses approved by regulatory authorities</li>
              <li>Adequacy decisions for data transfer to approved countries</li>
              <li>Your explicit consent for transfers where required</li>
            </ul>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-red-900/30 border border-red-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Children's Privacy</h2>
          <div className="space-y-4 text-red-200 text-sm">
            <p>
              <strong>Our service is strictly for adults 18 years and older.</strong> We do not knowingly collect 
              information from anyone under 18. If we discover that a minor has provided personal information, 
              we will delete it immediately and close the account.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <div className="space-y-4 text-purple-200 text-sm">
            <p>For privacy-related questions or concerns, contact us:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Email:</strong> privacy@betbingo.live</p>
                <p><strong>Phone:</strong> 1-800-PRIVACY</p>
              </div>
              <div>
                <p><strong>Mail:</strong> Bet Bingo Cash Privacy Team</p>
                <p>123 Gaming Street, Suite 100</p>
                <p>Las Vegas, NV 89101</p>
              </div>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-yellow-900/30 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-bold text-white mb-4">Policy Updates</h2>
          <div className="space-y-4 text-yellow-200 text-sm">
            <p>
              We may update this Privacy Policy from time to time. When we make changes:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>We'll update the "Last Updated" date at the top</li>
              <li>Material changes will be communicated via email or app notification</li>
              <li>Continued use of our service constitutes acceptance of the updated policy</li>
            </ul>
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

export default PrivacyPolicyScreen; 