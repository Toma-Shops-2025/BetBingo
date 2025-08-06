# BetBingo - 1-on-1 Bingo Betting Game

A modern, real-time bingo game where players can bet against each other in 1-on-1 matches. Built with React, TypeScript, and Supabase.

## Features

- 🎯 **1-on-1 Bingo Matches** - Play against real opponents with real bets
- 💰 **Multiple Currencies** - Support for USD, ETH, and USDC
- 🏆 **Leaderboard System** - Track your wins and earnings
- 👤 **User Profiles** - View your game statistics and history
- 🎮 **Practice Mode** - Play against AI without betting
- 🔐 **Authentication** - Secure login with email or social providers
- 💳 **Wallet Integration** - Manage your deposits and withdrawals
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn/ui, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Real-time)
- **State Management**: React Context + useReducer
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BetBingo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Game Rules

1. **Match Setup**: Choose your bet amount and currency
2. **Card Generation**: Each player gets a unique 5x5 bingo card
3. **Number Calling**: Numbers are called automatically every 3 seconds
4. **Marking**: Click on called numbers on your card to mark them
5. **Winning**: First player to get 5 in a row (horizontal, vertical, or diagonal) wins
6. **Payout**: Winner takes the pot (both players' bets)

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── AppLayout.tsx   # Main app layout
│   ├── BingoCard.tsx   # Bingo card component
│   ├── GameScreen.tsx  # Game interface
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   ├── GameContext.tsx # Game state management
│   └── AppContext.tsx  # App-wide state
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── lib/                # Third-party library configs
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This is a gambling application. Please ensure you comply with local laws and regulations regarding online gambling. Play responsibly.
