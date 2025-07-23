'use client';
import classNames from "classnames";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import rubyApiClient from "@/lib/rubyApiClient";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/types/auth";
import { Input } from "@/components/inputs/input";
import { Button } from "../buttons/button";
import Link from "next/link";

export function LoginForm({
}: {
    }) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res: AxiosResponse<LoginResponse> = await rubyApiClient.post('/auth/sign_in', {
                email,
                password
            }, { headers: { 'Content-Type': 'application/json' } });
            const data = res.data;
            console.log('data', data);

            const accessToken = res.headers['access-token']
            const client = res.headers['client']
            const uid = res.headers['uid']

            await fetch('/api/auth/set-cookie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken, client, uid }),
            });

            router.push('/dashboard');

            return data;
        } catch (error) {
            // TODO: need to setup some sort of flashing / notifications
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
            <Button
                type="button"
                variant="secondary"
                className="w-full h-14 md:!text-2xl text-shadow-lg"
            // TODO: implement demo user login
            >
                RUN AS DEMO USER
            </Button>

            <div className="flex justify-between items-center">
                <Link
                    href="/auth/sign-up"
                    className="text-xl text-foreground hover:underline font-semibold"
                // TODO: implement forgot password functionality
                >

                    Sign Up
                </Link>
                <Link
                    href="/auth/forgot-password"
                    className="text-xl text-foreground hover:underline"
                // TODO: implement forgot password functionality
                >

                    Forgot password?
                </Link>
            </div>
        </form>
    );
}