'use client';
import React, { useState, useRef } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

export function Tooltip({
  content,
  position = 'top',
  delay = 300,
  className = '',
  children
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
      setShowTooltip(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    setShowTooltip(false);
  };

  const getTooltipClasses = () => {
    const baseClasses = `
      absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg
      transition-opacity duration-200 pointer-events-none whitespace-nowrap
      ${showTooltip && isVisible ? 'opacity-100' : 'opacity-0'}
    `;

    const positionClasses = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };

    return `${baseClasses} ${positionClasses[position]} ${className}`;
  };

  const getArrowClasses = () => {
    const baseArrowClasses = 'absolute w-0 h-0';
    
    const arrowClasses = {
      top: 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900',
      bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900',
      left: 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900',
      right: 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900'
    };

    return `${baseArrowClasses} ${arrowClasses[position]}`;
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={getTooltipClasses()}>
        {content}
        <div className={getArrowClasses()} />
      </div>
    </div>
  );
}
