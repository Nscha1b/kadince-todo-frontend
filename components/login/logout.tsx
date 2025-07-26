'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { handleLogout as logout, HOME_ROUTE } from "@/lib/auth";
import { Button } from "../buttons/button";
import { useToast } from '@/contexts/toast-context';

export function Logout() {
    const { addToast } = useToast();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            addToast('Logout successful! Cya Later!', 'success');
            router.push(HOME_ROUTE);
        } catch (error) {
            addToast('Logout failed.', 'error');
        }
    };

    return (
        <Button variant="plain" className="absolute right-1 top-2" onClick={handleLogout}>Logout</Button>
    );
}