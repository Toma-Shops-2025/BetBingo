import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  DollarSign, 
  Gamepad2, 
  Shield, 
  CreditCard, 
  Trophy, 
  Users, 
  Clock, 
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Search,
  BookOpen,
  Zap,
  Star
} from 'lucide-react';

interface FAQScreenProps {
  onBack: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'payments' | 'gaming' | 'security' | 'technical' | 'legal';
  tags: string[];
}

const FAQScreen: React.FC<FAQScreenProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqData: FAQItem[] = [
    // General Questions
    {
      id: 'what-is-betbingo',
      question: 'What is BetBingo?',
      answer: 'BetBingo is a real-money online bingo platform where players can compete for cash prizes. We offer various game rooms with different entry fees, jackpots, and player counts. Our platform combines the excitement of traditional bingo with modern gaming technology and secure payment processing.',
      category: 'general',
      tags: ['platform', 'bingo', 'real-money']
    },
    {
      id: 'how-to-play',
      question: 'How do I play BetBingo?',
      answer: 'Playing is simple! Choose a game room from the lobby, pay the entry fee, and wait for the game to start. Numbers will be called automatically, and you mark them on your digital bingo card. The first player to complete a winning pattern (line, diagonal, or full card) wins the jackpot!',
      category: 'gaming',
      tags: ['how-to', 'rules', 'gameplay']
    },
    {
      id: 'age-requirement',
      question: 'What is the minimum age to play?',
      answer: 'You must be 18 years or older to play BetBingo. This is a legal requirement for real-money gambling in most jurisdictions. We verify player age during the registration process and may request identification documents.',
      category: 'legal',
      tags: ['age', 'verification', 'legal']
    },

    // Payment Questions
    {
      id: 'deposit-methods',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, PayPal, bank transfers, and cryptocurrency (Bitcoin, Ethereum). All payments are processed securely through Stripe, and deposits are typically instant. Minimum deposit is $0.50, and maximum varies by payment method.',
      category: 'payments',
      tags: ['deposits', 'payment-methods', 'stripe']
    },
    {
      id: 'withdrawal-process',
      question: 'How do I withdraw my winnings?',
      answer: 'To withdraw, go to the Cashier section and select "Withdraw". Choose your preferred method (PayPal, bank transfer, or crypto), enter the amount (minimum $20), and submit. Withdrawals are processed within 24-48 hours, and larger amounts may require additional verification.',
      category: 'payments',
      tags: ['withdrawals', 'winnings', 'verification']
    },
    {
      id: 'entry-fees',
      question: 'How much do games cost to play?',
      answer: 'Game entry fees vary by room: Penny Bingo ($0.50), Quick Cash ($1.00), High Roller ($5.00), and Jackpot rooms ($10+). Tournament entry fees range from $10 to $100. All fees are clearly displayed before you join a game.',
      category: 'gaming',
      tags: ['costs', 'entry-fees', 'pricing']
    },

    // Gaming Questions
    {
      id: 'winning-patterns',
      question: 'What are the winning patterns?',
      answer: 'Standard winning patterns include: Horizontal lines (5 numbers in a row), Vertical lines (5 numbers in a column), Diagonal lines (5 numbers diagonally), and Full Card (all 25 numbers). Some special games may have unique patterns. The first player to complete any winning pattern wins!',
      category: 'gaming',
      tags: ['patterns', 'winning', 'rules']
    },
    {
      id: 'jackpot-amounts',
      question: 'How much can I win?',
      answer: 'Jackpot amounts depend on the game room and number of players. Penny Bingo typically has $50-200 jackpots, Quick Cash $100-500, High Roller $500-2000, and Jackpot rooms can reach $10,000+. Tournament prizes can be even higher, with some offering $50,000+ prize pools!',
      category: 'gaming',
      tags: ['jackpots', 'prizes', 'winnings']
    },
    {
      id: 'game-duration',
      question: 'How long do games last?',
      answer: 'Most regular games last 3-5 minutes, with numbers called every 3-5 seconds. Tournament games can last 10-20 minutes with multiple rounds. Game duration is displayed before you join, and you can see a countdown timer during gameplay.',
      category: 'gaming',
      tags: ['duration', 'timing', 'gameplay']
    },

    // Security Questions
    {
      id: 'account-security',
      question: 'Is my account secure?',
      answer: 'Yes! We use bank-level security including SSL encryption, two-factor authentication, and secure payment processing. Your personal information is protected, and we never share your data with third parties. We also offer responsible gaming tools to help you stay in control.',
      category: 'security',
      tags: ['security', 'privacy', 'encryption']
    },
    {
      id: 'fair-play',
      question: 'How do you ensure fair play?',
      answer: 'We use certified random number generators (RNG) that are regularly audited by independent testing laboratories. All games are monitored for suspicious activity, and we have strict anti-cheating measures in place. Our platform is licensed and regulated by gaming authorities.',
      category: 'security',
      tags: ['fair-play', 'RNG', 'auditing']
    },
    {
      id: 'responsible-gaming',
      question: 'What responsible gaming tools do you offer?',
      answer: 'We provide deposit limits, session time limits, self-exclusion options, and reality checks. You can set daily, weekly, and monthly spending limits, and we offer links to gambling addiction resources. If you need help, call 1-800-GAMBLER for confidential support.',
      category: 'legal',
      tags: ['responsible-gaming', 'limits', 'help']
    },

    // Technical Questions
    {
      id: 'device-compatibility',
      question: 'What devices can I play on?',
      answer: 'BetBingo works on all devices! We support desktop computers, laptops, tablets, and smartphones. Our responsive design automatically adapts to your screen size. You can also install our PWA (Progressive Web App) for a native app-like experience on mobile devices.',
      category: 'technical',
      tags: ['devices', 'mobile', 'compatibility']
    },
    {
      id: 'internet-requirements',
      question: 'What internet speed do I need?',
      answer: 'We recommend a minimum of 2 Mbps for smooth gameplay. Higher speeds (5+ Mbps) provide the best experience. Our games are optimized for various connection speeds, and we use adaptive streaming to ensure smooth gameplay even on slower connections.',
      category: 'technical',
      tags: ['internet', 'speed', 'requirements']
    },
    {
      id: 'pwa-installation',
      question: 'How do I install the BetBingo app?',
      answer: 'On mobile devices, look for the "Install" button in your browser. On desktop, you\'ll see an install prompt in your browser\'s address bar. The PWA gives you a native app experience with offline capabilities, push notifications, and faster loading times.',
      category: 'technical',
      tags: ['PWA', 'installation', 'mobile-app']
    },

    // Legal Questions
    {
      id: 'licensing',
      question: 'Is BetBingo licensed and regulated?',
      answer: 'Yes, BetBingo operates under a valid gaming license and is regulated by gaming authorities. We comply with all applicable laws and regulations, including anti-money laundering (AML) and know-your-customer (KYC) requirements. Our platform is regularly audited for compliance.',
      category: 'legal',
      tags: ['licensing', 'regulation', 'compliance']
    },
    {
      id: 'tax-implications',
      question: 'Do I need to pay taxes on my winnings?',
      answer: 'Tax laws vary by jurisdiction. In many countries, gambling winnings are considered taxable income. We recommend consulting with a tax professional in your area to understand your specific tax obligations. We provide transaction history for tax reporting purposes.',
      category: 'legal',
      tags: ['taxes', 'winnings', 'legal-obligations']
    },
    {
      id: 'dispute-resolution',
      question: 'What if I have a dispute or complaint?',
      answer: 'If you have an issue, first contact our support team through the Contact Us page. We aim to resolve all disputes within 48 hours. If we can\'t resolve it, you can escalate to our independent dispute resolution service. We\'re committed to fair and transparent resolution of all issues.',
      category: 'legal',
      tags: ['disputes', 'complaints', 'support']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: BookOpen, count: faqData.length },
    { id: 'general', label: 'General', icon: HelpCircle, count: faqData.filter(f => f.category === 'general').length },
    { id: 'payments', label: 'Payments', icon: DollarSign, count: faqData.filter(f => f.category === 'payments').length },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, count: faqData.filter(f => f.category === 'gaming').length },
    { id: 'security', label: 'Security', icon: Shield, count: faqData.filter(f => f.category === 'security').length },
    { id: 'technical', label: 'Technical', icon: Zap, count: faqData.filter(f => f.category === 'technical').length },
    { id: 'legal', label: 'Legal', icon: Star, count: faqData.filter(f => f.category === 'legal').length }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: 'from-blue-500 to-cyan-500',
      payments: 'from-green-500 to-emerald-500',
      gaming: 'from-purple-500 to-pink-500',
      security: 'from-red-500 to-pink-500',
      technical: 'from-orange-500 to-red-500',
      legal: 'from-indigo-500 to-purple-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="mr-4 text-purple-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </div>
        <p className="text-purple-300 text-lg">Find answers to common questions about BetBingo</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-md mx-auto"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-purple-300 focus:outline-none focus:border-purple-400"
        />
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-400'
                  : 'bg-white/10 border-white/20 text-purple-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </button>
          );
        })}
      </motion.div>

      {/* FAQ Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {filteredFAQs.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">No questions found</h3>
              <p className="text-purple-300">
                Try adjusting your search terms or category filter
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredFAQs.map((faq, index) => {
            const isExpanded = expandedItems.has(faq.id);
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-400/50 transition-all">
                  <CardHeader 
                    className="cursor-pointer pb-3"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-left hover:text-purple-300 transition-colors">
                          {faq.question}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            className={`bg-gradient-to-r ${getCategoryColor(faq.category)} text-white border-0`}
                          >
                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                          </Badge>
                          <div className="flex gap-1">
                            {faq.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-purple-400">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pt-0">
                          <div className="border-t border-white/20 pt-4">
                            <p className="text-purple-200 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-6 text-center"
      >
        <h3 className="text-white text-xl font-semibold mb-3">Still need help?</h3>
        <p className="text-purple-300 mb-4">
          Can't find the answer you're looking for? Our support team is here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => onBack()}
            variant="outline"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-800/30"
          >
            <Users className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button
            onClick={() => onBack()}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Back to Lobby
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQScreen; 