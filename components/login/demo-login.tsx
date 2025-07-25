'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleDemoLogin as demoLogin, ROUTE_AFTER_LOGIN } from "@/lib/auth";
import { Button } from "../buttons/button";
import { useToast } from "@/contexts/toast-context";

export function DemoLogin({ }: {}) {
    const router = useRouter();
    const { addToast } = useToast();

    const handleDemoLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await demoLogin();
            addToast('Login successful! Welcome back.', 'success');
            router.push(ROUTE_AFTER_LOGIN);
        } catch (error) {
            addToast('Demo Login failed. Please try again.', 'error');
            console.log(error);
        }
    };


    return (
        <Button
            type="button"
            variant="secondary"
            className="w-full h-14 md:!text-2xl text-shadow-lg mt-2"
            onClick={handleDemoLogin}
        >
            RUN AS DEMO USER
        </Button>
    );
}
