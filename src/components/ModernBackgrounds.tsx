import React from 'react';

// Option 1: Pitch Black (Ultimate Premium Look)
export const PitchBlackBackground: React.FC = () => (
  <div className="fixed inset-0 bg-black" />
);

// Option 2: Deep Space Gradient (Netflix/Gaming Style)
export const DeepSpaceBackground: React.FC = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
);

// Option 3: Minimal Dark Grid (Modern Tech)
export const MinimalGridBackground: React.FC = () => (
  <div className="fixed inset-0 bg-black">
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}
    />
  </div>
);

// Option 4: Subtle Carbon Fiber (Gaming/Sports Betting)
export const CarbonFiberBackground: React.FC = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )
        `
      }}
    />
  </div>
);

// Option 5: Dark Purple Luxury (Gambling VIP)
export const LuxuryDarkBackground: React.FC = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-black to-indigo-950" />
);

// Option 6: Minimalist Casino (Las Vegas Style)
export const CasinoMinimalBackground: React.FC = () => (
  <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900" />
); 