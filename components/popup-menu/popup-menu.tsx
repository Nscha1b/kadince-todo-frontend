'use client';
import { useState, useRef, useEffect, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface PopupMenuItem {
    id: string;
    label: string;
    value: string;
    onClick: (item: PopupMenuItem) => void;
}

interface PopupMenuProps {
    trigger: ReactNode;
    items: PopupMenuItem[];
}

export function PopupMenu({
    trigger,
    items,
}: PopupMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const menuClick = menuRef.current?.contains(event.target as Node);
        const triggerClick = triggerRef.current?.contains(event.target as Node);
        if (menuClick || triggerClick) return;
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleItemClick = (item: PopupMenuItem) => {
        item.onClick(item);
        setIsOpen(false);
    };

    return (
        <div className=''>
            <div
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
            >
                {trigger}
            </div>

            {isOpen && (
                <div
                    ref={menuRef}
                    className='absolute z-50 min-w-48 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 py-1'
                >
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            className={twMerge(
                                'w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors',
                                'hover:bg-gray-50 focus:bg-gray-50 focus:outline-none cursor-pointer',
                            )}
                        >
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
