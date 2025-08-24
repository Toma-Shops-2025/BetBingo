import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, MessageSquare, Clock, MapPin, CheckCircle, AlertCircle, Send, ArrowLeft } from 'lucide-react';

interface ContactScreenProps {
  onBack: () => void;
}

const ContactScreen: React.FC<ContactScreenProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: '',
    priority: 'normal'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: '',
        priority: 'normal'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@betbingo.live',
      action: 'Send Email',
      href: 'mailto:support@betbingo.live'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '1-800-BET-BINGO',
      action: 'Call Now',
      href: 'tel:18002382446'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Available 24/7',
      action: 'Start Chat',
      href: '#'
    }
  ];

  const categories = [
    'General Inquiry',
    'Technical Support',
    'Account Issues',
    'Payment Problems',
    'Game Rules',
    'Responsible Gaming',
    'Partnership',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-green-400' },
    { value: 'normal', label: 'Normal Priority', color: 'text-yellow-400' },
    { value: 'high', label: 'High Priority', color: 'text-orange-400' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-400' }
  ];

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
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
            CONTACT US
          </h1>
        </div>
        <p className="text-purple-300 text-lg">We're here to help! Get in touch with our support team.</p>
      </motion.div>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <Alert className="bg-green-900/50 border-green-500/50">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <Alert className="bg-red-900/50 border-red-500/50">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:border-purple-400/50 transition-all">
              <CardContent className="p-4 text-center">
                <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">{method.title}</h3>
                <p className="text-purple-300 text-sm mb-3">{method.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-800/30"
                  onClick={() => method.href !== '#' && window.open(method.href, '_blank')}
                >
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority" className="text-white">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value} className="text-white">
                          <span className={priority.color}>{priority.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-white">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 min-h-[120px]"
                  placeholder="Please provide detailed information about your inquiry..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-400" />
              Support Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-purple-300">
            <p><strong>Monday - Friday:</strong> 9:00 AM - 8:00 PM EST</p>
            <p><strong>Saturday:</strong> 10:00 AM - 6:00 PM EST</p>
            <p><strong>Sunday:</strong> 12:00 PM - 6:00 PM EST</p>
            <p className="text-green-400 font-semibold">24/7 Emergency Support Available</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-400" />
              Company Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-purple-300">
            <p><strong>BetBingo Cash</strong></p>
            <p>Licensed Gaming Operator</p>
            <p>Regulated by Gaming Commission</p>
            <p className="text-yellow-400 font-semibold">Member of Responsible Gaming Association</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Responsible Gaming Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-center"
      >
        <h3 className="text-red-300 font-semibold mb-2">Need Help with Gambling?</h3>
        <p className="text-red-200 text-sm mb-3">
          If you or someone you know has a gambling problem, help is available 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <a
            href="tel:18004264653"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            1-800-GAMBLER
          </a>
          <a
            href="https://www.ncpgambling.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            National Council
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactScreen; 