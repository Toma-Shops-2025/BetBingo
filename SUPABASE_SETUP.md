# 🔗 Supabase Setup Guide for BetBingo

## 📋 Prerequisites

1. **Supabase Account** - Sign up at [supabase.com](https://supabase.com)
2. **BetBingo Project** - Your local project (already set up)
3. **GitHub Repository** - Your repo at [https://github.com/Toma-Shops-2025/BetBingo](https://github.com/Toma-Shops-2025/BetBingo)

## 🚀 Step 1: Get Your Supabase Credentials

### 1.1 Go to Your Supabase Dashboard
- Visit [supabase.com/dashboard](https://supabase.com/dashboard)
- Select your BetBingo project (or create a new one)

### 1.2 Get Your Project URL and Keys
- Go to **Settings** → **API**
- Copy your **Project URL** and **anon public key**
- These will look like:
  ```
  Project URL: https://xyzcompany.supabase.co
  anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

## 🔧 Step 2: Configure Environment Variables

### 2.1 Create Environment File
Create a `.env.local` file in your project root:

```bash
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2.2 Example Configuration
```bash
VITE_SUPABASE_URL=https://betbingo-2025.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldGJpbmdvLTIwMjUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczMzY5NjAwMCwiZXhwIjoyMDUwNTc2MDAwfQ.example
```

## 🗄️ Step 3: Database Schema Setup

### 3.1 Go to SQL Editor
- In your Supabase dashboard, go to **SQL Editor**
- We'll create the database tables for BetBingo

### 3.2 Run the Database Schema

Copy and paste this SQL into your Supabase SQL Editor:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    avatar_url TEXT,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0,
    total_games INTEGER DEFAULT 0,
    total_wins INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0,
    best_streak INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE public.matches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    player1_id UUID REFERENCES public.profiles(id),
    player2_id UUID REFERENCES public.profiles(id),
    bet_amount DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL CHECK (currency IN ('USD', 'ETH', 'USDC')),
    status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'completed')),
    winner_id UUID REFERENCES public.profiles(id),
    called_numbers INTEGER[] DEFAULT '{}',
    duration INTEGER, -- in seconds
    tournament_id UUID,
    is_ranked BOOLEAN DEFAULT false,
    elo_change INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bingo cards table
CREATE TABLE public.bingo_cards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
    player_id UUID REFERENCES public.profiles(id),
    numbers INTEGER[][] NOT NULL,
    marked BOOLEAN[][] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tournaments table
CREATE TABLE public.tournaments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    entry_fee DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL CHECK (currency IN ('USD', 'ETH', 'USDC')),
    prize_pool DECIMAL(10,2) NOT NULL,
    max_players INTEGER NOT NULL,
    current_players INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tournament participants
CREATE TABLE public.tournament_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE,
    player_id UUID REFERENCES public.profiles(id),
    score INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    rank INTEGER,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    reward_type TEXT NOT NULL CHECK (reward_type IN ('experience', 'currency', 'badge')),
    reward_amount INTEGER NOT NULL,
    reward_currency TEXT,
    max_progress INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User achievements
CREATE TABLE public.user_achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES public.achievements(id),
    progress INTEGER DEFAULT 0,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges table
CREATE TABLE public.badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    rarity TEXT NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges
CREATE TABLE public.user_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id),
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Friends table
CREATE TABLE public.friends (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, friend_id)
);

-- Chat messages
CREATE TABLE public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id),
    message TEXT NOT NULL,
    message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'system', 'emote')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallet transactions
CREATE TABLE public.wallet_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'bet', 'win', 'tournament_entry', 'tournament_prize')),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL CHECK (currency IN ('USD', 'ETH', 'USDC')),
    reference_id UUID, -- match_id, tournament_id, etc.
    reference_type TEXT, -- 'match', 'tournament', etc.
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_matches_player1_id ON public.matches(player1_id);
CREATE INDEX idx_matches_player2_id ON public.matches(player2_id);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_matches_created_at ON public.matches(created_at);
CREATE INDEX idx_tournament_participants_tournament_id ON public.tournament_participants(tournament_id);
CREATE INDEX idx_tournament_participants_player_id ON public.tournament_participants(player_id);
CREATE INDEX idx_friends_user_id ON public.friends(user_id);
CREATE INDEX idx_friends_status ON public.friends(status);
CREATE INDEX idx_chat_messages_match_id ON public.chat_messages(match_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bingo_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can read all profiles, update their own
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Matches: Users can view matches they're part of
CREATE POLICY "Users can view their matches" ON public.matches FOR SELECT USING (
    auth.uid() = player1_id OR auth.uid() = player2_id
);
CREATE POLICY "Users can create matches" ON public.matches FOR INSERT WITH CHECK (
    auth.uid() = player1_id OR auth.uid() = player2_id
);
CREATE POLICY "Users can update their matches" ON public.matches FOR UPDATE USING (
    auth.uid() = player1_id OR auth.uid() = player2_id
);

-- Tournaments: Public read access, authenticated users can join
CREATE POLICY "Anyone can view tournaments" ON public.tournaments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can join tournaments" ON public.tournament_participants FOR INSERT WITH CHECK (auth.uid() = player_id);

-- Friends: Users can manage their own friend relationships
CREATE POLICY "Users can manage their friends" ON public.friends FOR ALL USING (
    auth.uid() = user_id OR auth.uid() = friend_id
);

-- Chat messages: Users can view messages from their matches
CREATE POLICY "Users can view match messages" ON public.chat_messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.matches 
        WHERE id = chat_messages.match_id 
        AND (player1_id = auth.uid() OR player2_id = auth.uid())
    )
);
CREATE POLICY "Users can send messages to their matches" ON public.chat_messages FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.matches 
        WHERE id = chat_messages.match_id 
        AND (player1_id = auth.uid() OR player2_id = auth.uid())
    )
);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some default achievements
INSERT INTO public.achievements (name, description, icon, reward_type, reward_amount, max_progress) VALUES
('First Victory', 'Win your first game', '🏆', 'experience', 100, 1),
('Bingo Master', 'Win 10 games', '👑', 'currency', 500, 10),
('Streak Champion', 'Win 5 games in a row', '🔥', 'experience', 250, 5),
('High Roller', 'Win a game with $100+ bet', '💰', 'experience', 250, 1),
('Tournament Champion', 'Win a tournament', '🏅', 'currency', 1000, 1),
('Social Butterfly', 'Add 10 friends', '🦋', 'experience', 150, 10);

-- Insert some default badges
INSERT INTO public.badges (name, description, icon, rarity) VALUES
('Rookie Player', 'Complete your first game', '🎯', 'common'),
('Bingo Legend', 'Win 50 games', '👑', 'legendary'),
('Lucky Streak', 'Win 10 games in a row', '🔥', 'epic'),
('Tournament Master', 'Win 5 tournaments', '🏆', 'legendary');
```

## 🔐 Step 4: Set Up Authentication

### 4.1 Configure Auth Settings
- Go to **Authentication** → **Settings**
- Enable **Email confirmations** (optional)
- Configure **Site URL** to your domain
- Add **Redirect URLs** for your app

### 4.2 Enable Social Providers (Optional)
- Go to **Authentication** → **Providers**
- Enable **Google** and/or **GitHub** if desired
- Configure OAuth settings

## 🚀 Step 5: Test the Connection

### 5.1 Update Your Local Environment
Make sure your `.env.local` file has the correct credentials.

### 5.2 Test the Connection
Run your development server:
```bash
npm run dev
```

The app should now connect to Supabase successfully!

## 📊 Step 6: Monitor Your Database

### 6.1 View Tables
- Go to **Table Editor** in your Supabase dashboard
- You should see all the tables we created

### 6.2 Monitor Logs
- Go to **Logs** to see API requests and errors
- This helps debug any issues

## 🔧 Step 7: Real-time Features

### 7.1 Enable Real-time
- Go to **Database** → **Replication**
- Enable real-time for the tables you want to sync:
  - `matches`
  - `chat_messages`
  - `tournament_participants`

## 🎯 Next Steps

1. **Test Authentication** - Try signing up/signing in
2. **Test Game Features** - Create matches and play games
3. **Monitor Performance** - Check the logs for any issues
4. **Deploy** - Deploy to Vercel, Netlify, or your preferred platform

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid API key"** - Check your `.env.local` file
2. **"Table doesn't exist"** - Make sure you ran the SQL schema
3. **"RLS policy violation"** - Check the Row Level Security policies
4. **"Real-time not working"** - Enable real-time in Database settings

### Get Help:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check the logs in your Supabase dashboard

Your BetBingo game is now fully connected to Supabase! 🎉 