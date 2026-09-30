import React from 'react';

interface UnoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const UnoLogo: React.FC<UnoLogoProps> = ({
  size = 'md',
  className = '',
  showTagline = false
}) => {
  const heightClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24',
    xl: 'h-28 sm:h-36'
  };

  return (
    <div className={`flex flex-col items-start select-none cursor-pointer group ${className}`}>
      <img
        src="/logo.png"
        alt="UNO TOURS & TRAVELS - Pick a Card. Explore the World."
        className={`${heightClasses[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm`}
      />
      {showTagline && (
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mt-1 pl-1">
          Pick a Card. Explore the World.
        </span>
      )}
    </div>
  );
};
