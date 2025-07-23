'use client';
import classNames from "classnames";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignUp as authSignup } from "@/lib/auth";
import { Input } from "@/components/inputs/input";
import { Button } from "../buttons/button";

export function SignUpForm({
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
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await authSignup(email, password, confirmPassword);
            if (resp?.status === 'success') {
                // need a way to switch form back?
            } else {
                // TODO: handle error case
            }
        } catch (error) {
            // TODO: need to setup some sort of flashing / notifications
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
            <Input
                label={{ text: 'Confirm Password', hideLabel: true }}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                variant="surface"
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
