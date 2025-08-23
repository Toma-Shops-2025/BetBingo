-- Payment System Database Setup for BetBingo
-- This script creates all the tables needed to handle real money deposits and withdrawals

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENHANCE EXISTING WALLET_TRANSACTIONS TABLE
-- Add new columns for real payment processing
ALTER TABLE wallet_transactions ADD COLUMN IF NOT EXISTS processor_reference_id TEXT;
ALTER TABLE wallet_transactions ADD COLUMN IF NOT EXISTS processor_fee DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE wallet_transactions ADD COLUMN IF NOT EXISTS net_amount DECIMAL(10,2);
ALTER TABLE wallet_transactions ADD COLUMN IF NOT EXISTS payment_method_details JSONB;
ALTER TABLE wallet_transactions ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')) DEFAULT 'pending';

-- 2. CREATE PAYMENT METHODS TABLE
-- Store user's saved payment methods (credit cards, etc.)
CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('card', 'paypal', 'bank_account')) NOT NULL,
    processor_id TEXT NOT NULL, -- Stripe payment method ID
    last_four TEXT, -- Last 4 digits of card
    brand TEXT, -- Visa, Mastercard, etc.
    expiry_month INTEGER,
    expiry_year INTEGER,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, processor_id)
);

-- 3. CREATE WITHDRAWAL REQUESTS TABLE
-- Track when users want to take money out
CREATE TABLE IF NOT EXISTS withdrawal_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    method TEXT CHECK (method IN ('paypal', 'bank_transfer', 'crypto')) NOT NULL,
    destination TEXT NOT NULL, -- PayPal email, bank account, crypto address
    status TEXT CHECK (status IN ('pending', 'approved', 'processing', 'completed', 'rejected')) DEFAULT 'pending',
    processor_reference_id TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- 4. CREATE KYC VERIFICATIONS TABLE
-- Know Your Customer - verify user identity for large transactions
CREATE TABLE IF NOT EXISTS kyc_verifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    document_type TEXT CHECK (document_type IN ('passport', 'drivers_license', 'national_id')) NOT NULL,
    document_number TEXT NOT NULL,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    verification_date TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CREATE DEPOSIT LIMITS TABLE
-- Help users control how much they spend
CREATE TABLE IF NOT EXISTS deposit_limits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    daily_limit DECIMAL(10,2) DEFAULT 1000.00,
    weekly_limit DECIMAL(10,2) DEFAULT 5000.00,
    monthly_limit DECIMAL(10,2) DEFAULT 20000.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 6. CREATE PAYMENT SESSIONS TABLE
-- Track payment attempts and their status
CREATE TABLE IF NOT EXISTS payment_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT CHECK (status IN ('created', 'processing', 'succeeded', 'failed', 'cancelled')) DEFAULT 'created',
    payment_method_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 7. CREATE COMPLIANCE LOGS TABLE
-- Keep track of all important actions for legal reasons
CREATE TABLE IF NOT EXISTS compliance_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'deposit', 'withdrawal', 'kyc_verification', etc.
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CREATE INDEXES FOR BETTER PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_user_id ON withdrawal_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_status ON withdrawal_requests(status);
CREATE INDEX IF NOT EXISTS idx_kyc_verifications_user_id ON kyc_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_sessions_user_id ON payment_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_sessions_stripe_id ON payment_sessions(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_compliance_logs_user_id ON compliance_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_compliance_logs_action ON compliance_logs(action);

-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposit_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_logs ENABLE ROW LEVEL SECURITY;

-- CREATE SECURITY POLICIES
-- Users can only see their own payment methods
CREATE POLICY "Users can view their own payment methods" ON payment_methods
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods" ON payment_methods
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods" ON payment_methods
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment methods" ON payment_methods
    FOR DELETE USING (auth.uid() = user_id);

-- Users can only see their own withdrawal requests
CREATE POLICY "Users can view their own withdrawal requests" ON withdrawal_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own withdrawal requests" ON withdrawal_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own KYC verifications
CREATE POLICY "Users can view their own KYC verifications" ON kyc_verifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own KYC verifications" ON kyc_verifications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own deposit limits
CREATE POLICY "Users can view their own deposit limits" ON deposit_limits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own deposit limits" ON deposit_limits
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own deposit limits" ON deposit_limits
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own payment sessions
CREATE POLICY "Users can view their own payment sessions" ON payment_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment sessions" ON payment_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only see their own compliance logs
CREATE POLICY "Users can view their own compliance logs" ON compliance_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own compliance logs" ON compliance_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- GRANT PERMISSIONS
GRANT ALL ON payment_methods TO anon, authenticated;
GRANT ALL ON withdrawal_requests TO anon, authenticated;
GRANT ALL ON kyc_verifications TO anon, authenticated;
GRANT ALL ON deposit_limits TO anon, authenticated;
GRANT ALL ON payment_sessions TO anon, authenticated;
GRANT ALL ON compliance_logs TO anon, authenticated;

-- CREATE FUNCTION TO UPDATE DEPOSIT LIMITS TIMESTAMP
CREATE OR REPLACE FUNCTION update_deposit_limits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- CREATE TRIGGER FOR DEPOSIT LIMITS
DROP TRIGGER IF EXISTS update_deposit_limits_updated_at ON deposit_limits;
CREATE TRIGGER update_deposit_limits_updated_at 
    BEFORE UPDATE ON deposit_limits
    FOR EACH ROW 
    EXECUTE FUNCTION update_deposit_limits_updated_at();

-- CREATE FUNCTION TO SET DEFAULT DEPOSIT LIMITS FOR NEW USERS
CREATE OR REPLACE FUNCTION create_default_deposit_limits()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO deposit_limits (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- CREATE TRIGGER FOR DEFAULT DEPOSIT LIMITS
DROP TRIGGER IF EXISTS create_default_deposit_limits_trigger ON profiles;
CREATE TRIGGER create_default_deposit_limits_trigger
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_default_deposit_limits();

-- SHOW SUCCESS MESSAGE
SELECT 'Payment system database setup completed successfully!' as status;
SELECT 'Created tables:' as info;
SELECT '✓ payment_methods' as table_name;
SELECT '✓ withdrawal_requests' as table_name;
SELECT '✓ kyc_verifications' as table_name;
SELECT '✓ deposit_limits' as table_name;
SELECT '✓ payment_sessions' as table_name;
SELECT '✓ compliance_logs' as table_name; 