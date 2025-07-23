'use client';
import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'surface' | 'accent' | 'secondary';
  children?: React.ReactNode;
  className?: string;
}

export function Button({ 
    className, 
    variant = 'primary',
    children,
    ...props 
}: ButtonProps) {
    const baseClasses = "px-4 py-2 rounded-lg text-lg font-semibold transition-colors focus:outline-none focus:ring-2 cursor-pointer";
    const variantClasses = {
        primary: "bg-primary hover:brightness-95 text-white focus:ring-primary-dark ",
        surface: "bg-surface-light hover:brightness-95 text-gray-900 focus:ring-surface-dark",
        accent: "bg-accent hover:brightness-95 text-white focus:ring-accent-dark",
        secondary: "bg-secondary hover:brightness-95 text-white focus:ring-secondary-dark"
    };
    return (
        <button
            className={classNames(
                baseClasses,
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
