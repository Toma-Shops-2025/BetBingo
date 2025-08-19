import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Custom Bingo Colors
        bingo: {
          b: 'hsl(var(--bingo-b))',
          i: 'hsl(var(--bingo-i))',
          n: 'hsl(var(--bingo-n))',
          g: 'hsl(var(--bingo-g))',
          o: 'hsl(var(--bingo-o))'
        },
        // Game UI Colors
        'coin-gold': 'hsl(var(--coin-gold))',
        'power-up-glow': 'hsl(var(--power-up-glow))',
        'win-celebration': 'hsl(var(--win-celebration))',
        'gradient-purple': 'hsl(var(--gradient-purple))',
        'gradient-pink': 'hsl(var(--gradient-pink))',
        'gradient-blue': 'hsl(var(--gradient-blue))',
        'gradient-cyan': 'hsl(var(--gradient-cyan))',
        // Enhanced Vibrant Colors
        'electric-blue': '#0066ff',
        'neon-green': '#00ff88',
        'neon-pink': '#ff0088',
        'electric-purple': '#8800ff',
        'golden-yellow': '#ffdd00',
        'fire-orange': '#ff6600'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'calc(var(--radius) + 2px)',
        md: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 30px rgba(139, 92, 246, 0.6)',
        'glow-xl': '0 0 40px rgba(139, 92, 246, 0.7)',
        'coin': '0 0 25px rgba(255, 221, 0, 0.5)',
        'neon': '0 0 20px currentColor',
        'neon-lg': '0 0 30px currentColor',
        'game': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)' 
          },
        },
        'number-appear': {
          '0%': { 
            transform: 'scale(0.5) rotate(-180deg)', 
            opacity: '0' 
          },
          '50%': { 
            transform: 'scale(1.2) rotate(-90deg)', 
            opacity: '0.8' 
          },
          '100%': { 
            transform: 'scale(1) rotate(0deg)', 
            opacity: '1' 
          },
        },
        'coin-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'power-up-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)' 
          },
          '100%': { 
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.9), 0 0 40px rgba(168, 85, 247, 0.5)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'bounce-in': 'bounce-in 0.5s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
        'number-appear': 'number-appear 0.5s ease-out',
        'coin-flip': 'coin-flip 1s ease-in-out',
        'power-up-glow': 'power-up-glow 2s infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
      backgroundImage: {
        'gradient-game': 'linear-gradient(135deg, hsl(240, 25%, 8%) 0%, hsl(260, 30%, 10%) 50%, hsl(280, 25%, 12%) 100%)',
        'gradient-purple-pink': 'linear-gradient(135deg, hsl(270, 95%, 65%) 0%, hsl(330, 85%, 70%) 100%)',
        'gradient-blue-cyan': 'linear-gradient(135deg, hsl(210, 95%, 65%) 0%, hsl(180, 95%, 65%) 100%)',
        'gradient-gold': 'linear-gradient(135deg, #ffdd00 0%, #ffaa00 100%)',
        'gradient-neon': 'linear-gradient(135deg, #ff0088 0%, #8800ff 50%, #0066ff 100%)',
      }
    }
  },
  plugins: [
    animate,
    typography,
  ],
} satisfies Config;
