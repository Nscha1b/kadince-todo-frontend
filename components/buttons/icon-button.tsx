'use client';
import React from 'react';
import classNames from 'classnames';
import { Button } from './button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconName?: string;
  variant?: 'primary' | 'surface' | 'accent' | 'secondary' | 'plain';
    iconClasses?: string;
}

export function IconButton({
    iconClasses,
    className,
    iconName,
    variant = 'plain',
    ...props
}: ButtonProps) {
    return (
        <Button
            variant={variant}
            className={classNames(
                "!px-1 !py-1",
                className,
            )}
            {...props}
        >
            <span className={classNames("material-icons", iconClasses)}>{iconName}</span>
        </Button>
    );
}
