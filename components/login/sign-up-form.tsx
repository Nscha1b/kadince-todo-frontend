'use client';
import React, { useState } from 'react';
import { handleSignUp as authSignup } from "@/lib/auth";
import { Input } from "@/components/inputs/input";
import { Button } from "../buttons/button";
import { useToast } from "@/contexts/toast-context";

export function SignUpForm({
    email,
    setEmail,
    password,
    setPassword,
    setFormType
}: {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    setFormType: (formType: 'login' | 'signup' | 'forgot-password') => void;

}) {
    const { addToast } = useToast();
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await authSignup(email, password, confirmPassword);
            if (resp?.status === 'success') {
                addToast('Account created successfully! Please check your email.', 'success');
                setFormType('login')
            } else {
                addToast('Failed to create account. Please try again.', 'error');
            }
        } catch (error) {
            addToast('An error occurred during sign up. Please try again.', 'error');
            console.log(error);
        }
    };


    return (
        <form onSubmit={handleSignUp} className="w-full max-w-md mx-auto space-y-4">
            <Input
                label={{ text: 'Email address', hideLabel: true }}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="surface-light"
            />
            <Input
                label={{ text: 'Password', hideLabel: true }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="surface-light"
            />
            <Input
                label={{ text: 'Confirm Password', hideLabel: true }}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                variant="surface-light"
            />
            <Button
                type="submit"
                variant="primary"
                className="w-full h-14 md:!text-2xl text-shadow-lg"
            >
                Sign Up
            </Button>
        </form>
    );
}
