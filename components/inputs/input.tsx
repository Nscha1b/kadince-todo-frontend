'use client';
import React from 'react';
import classNames from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'surface' | 'surface-light';
  error?: boolean;
  helperText?: string;
  label?: {
    text: string;
    hideLabel?: boolean;
  };
}

export function Input({ 
    className, 
    variant = 'default', 
    error = false, 
    helperText,
    label = { text: '', hideLabel: false },
    ...props 
}: InputProps) {
    const baseClasses = "w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 transition-colors text-lg";
    
    const variantClasses = {
        default: "bg-white",
        surface: "bg-surface",
        "surface-light": "bg-surface-light"
    };
    
    const stateClasses = error 
        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 focus:ring-primary-dark focus:border-primary-dark";

    const inputId = React.useId();

    return (
        <div className="w-full">
            <label
                htmlFor={inputId}
                className={classNames(
                "block mb-1 text-sm font-medium text-gray-700",
                label.hideLabel ? "sr-only" : ""
                )}
            >
                {label.text}
            </label>

            <input
            id={inputId}
            className={classNames(
                baseClasses,
                variantClasses[variant],
                stateClasses,
                className
            )}
            {...props}
            />

            {helperText && (
            <p className={classNames(
                "mt-1 text-sm",
                error ? "text-red-600" : "text-gray-500"
            )}>
                {helperText}
            </p>
            )}
        </div>
    );
}
