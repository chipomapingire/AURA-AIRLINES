
import React from 'react';

const Logo: React.FC<{ className?: string, theme?: 'light' | 'dark' }> = ({ className = "h-8", theme = 'light' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-lg">
        <defs>
          <linearGradient id="aura-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path 
          d="M20,70 C20,30 80,30 80,70 L50,90 Z" 
          fill="url(#aura-grad)" 
          className="animate-pulse"
        />
        <path 
          d="M30,50 L50,20 L70,50" 
          stroke="white" 
          strokeWidth="6" 
          fill="none" 
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="10" fill="white" fillOpacity="0.3" />
      </svg>
      <span className={`font-extrabold text-2xl tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
        AURA<span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-light`}>AIRLINES</span>
      </span>
    </div>
  );
};

export default Logo;
