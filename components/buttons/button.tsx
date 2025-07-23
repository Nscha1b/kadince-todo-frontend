'use client';
import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'surface' | 'accent' | 'secondary' | 'plain';
  children?: React.ReactNode;
  className?: string;
}

export function Button({ 
    className, 
    variant = 'primary',
    children,
    ...props 
}: ButtonProps) {
    const baseClasses = "px-4 py-2 rounded-lg text-lg font-semibold transition-colors focus:outline-none focus:ring-2 cursor-pointer focus:ring-primary-dark";
    const variantClasses = {
        primary: "bg-primary hover:brightness-95 text-white",
        surface: "bg-surface hover:brightness-95 text-gray-900",
        accent: "bg-accent hover:brightness-95 text-white",
        secondary: "bg-secondary hover:brightness-95 text-white",
        plain: "text-foreground hover:underline"
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
