import { loadStripe } from '@stripe/stripe-js';

// Get your Stripe publishable key from environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Payments will not work.');
}

// Load Stripe with your publishable key
export const stripePromise = loadStripe(stripePublishableKey || '');

// Payment configuration
export const PAYMENT_CONFIG = {
  minDeposit: Number(import.meta.env.VITE_MIN_DEPOSIT) || 10,
  maxDeposit: Number(import.meta.env.VITE_MAX_DEPOSIT) || 25000,
  minWithdrawal: Number(import.meta.env.VITE_MIN_WITHDRAWAL) || 20,
  maxWithdrawal: Number(import.meta.env.VITE_MAX_WITHDRAWAL) || 10000,
  currency: 'USD',
  supportedMethods: ['card', 'paypal'] as const,
};

// Payment method types
export type PaymentMethodType = 'card' | 'paypal' | 'bank_account';

// Payment status types
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

// Withdrawal status types
export type WithdrawalStatus = 'pending' | 'approved' | 'processing' | 'completed' | 'rejected';

// Interface for payment method
export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  lastFour?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

// Interface for payment session
export interface PaymentSession {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethodId?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Interface for withdrawal request
export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: 'paypal' | 'bank_transfer' | 'crypto';
  destination: string;
  status: WithdrawalStatus;
  createdAt: Date;
  processedAt?: Date;
}

// Helper function to format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Helper function to validate payment amount
export const validatePaymentAmount = (amount: number): { isValid: boolean; error?: string } => {
  if (amount < PAYMENT_CONFIG.minDeposit) {
    return { 
      isValid: false, 
      error: `Minimum deposit is ${formatCurrency(PAYMENT_CONFIG.minDeposit)}` 
    };
  }
  
  if (amount > PAYMENT_CONFIG.maxDeposit) {
    return { 
      isValid: false, 
      error: `Maximum deposit is ${formatCurrency(PAYMENT_CONFIG.maxDeposit)}` 
    };
  }
  
  return { isValid: true };
};

// Helper function to validate withdrawal amount
export const validateWithdrawalAmount = (amount: number): { isValid: boolean; error?: string } => {
  if (amount < PAYMENT_CONFIG.minWithdrawal) {
    return { 
      isValid: false, 
      error: `Minimum withdrawal is ${formatCurrency(PAYMENT_CONFIG.minWithdrawal)}` 
    };
  }
  
  if (amount > PAYMENT_CONFIG.maxWithdrawal) {
    return { 
      isValid: false, 
      error: `Maximum withdrawal is ${formatCurrency(PAYMENT_CONFIG.maxWithdrawal)}` 
    };
  }
  
  return { isValid: true };
};

// Helper function to check if Stripe is available
export const isStripeAvailable = (): boolean => {
  return !!stripePublishableKey;
};

// Helper function to get card brand from card number
export const getCardBrand = (cardNumber: string): string => {
  const number = cardNumber.replace(/\s/g, '');
  
  if (number.startsWith('4')) return 'Visa';
  if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
  if (number.startsWith('3')) return 'American Express';
  if (number.startsWith('6')) return 'Discover';
  
  return 'Card';
};

// Helper function to mask card number
export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.length < 4) return cleaned;
  
  const lastFour = cleaned.slice(-4);
  const masked = '*'.repeat(cleaned.length - 4);
  
  return masked + lastFour;
}; 