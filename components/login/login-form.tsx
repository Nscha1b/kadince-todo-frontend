'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogin as authLogin } from "@/lib/auth";
import { Input } from "@/components/inputs/input";
import { Button } from "../buttons/button";
import { useToast } from "@/contexts/toast-context";

export function LoginForm({
    email,
    setEmail,
    password,
    setPassword
}: {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}) {
    const router = useRouter();
    const { addToast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authLogin(email, password);
            addToast('Login successful! Welcome back.', 'success');
            router.push('/dashboard');
        } catch (error) {
            addToast('Login failed. Please check your credentials.', 'error');
            console.log(error);
        }
    };


    return (
        <form onSubmit={handleLogin} className="w-full max-w-md mx-auto space-y-4">
            <Input
                label={{ text: 'Email address', hideLabel: true }}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="surface"
            />
            <Input
                label={{ text: 'Password', hideLabel: true }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="surface"
            />
            <Button
                type="submit"
                variant="primary"
                className="w-full h-14 md:!text-2xl text-shadow-lg"
            >
                Log In
            </Button>
        </form>
    );
}