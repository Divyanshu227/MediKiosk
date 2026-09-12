import React from 'react';
import { LanguageCode } from '../../types';

interface LanguageFlagProps {
  code?: LanguageCode | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LanguageFlag: React.FC<LanguageFlagProps> = ({ 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-3.5',
    md: 'w-7 h-5',
    lg: 'w-8 h-5.5'
  };

  // Official Indian National Tricolor (Tiranga) SVG for all supported languages
  return (
    <div 
      className={`inline-flex rounded overflow-hidden shadow-2xs border border-slate-300/80 shrink-0 ${sizeClasses[size]} ${className}`}
      title="India (National / Official Language)"
    >
      <svg 
        viewBox="0 0 45 30" 
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top: Saffron / Kesari */}
        <rect width="45" height="10" fill="#FF9933" />
        
        {/* Middle: White */}
        <rect y="10" width="45" height="10" fill="#FFFFFF" />
        
        {/* Bottom: India Green */}
        <rect y="20" width="45" height="10" fill="#138808" />

        {/* Ashoka Chakra (Navy Blue 24-spoke wheel) */}
        <g transform="translate(22.5, 15)">
          {/* Outer circle */}
          <circle r="4.2" fill="none" stroke="#000080" strokeWidth="0.7" />
          {/* Center hub */}
          <circle r="0.9" fill="#000080" />
          
          {/* 24 Spokes */}
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2="0"
              y2="-4.2"
              stroke="#000080"
              strokeWidth="0.32"
              transform={`rotate(${i * 15})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
