'use client';
import classNames from "classnames";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import rubyApiClient from "@/lib/rubyApiClient";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/types/auth";
import { Input } from "@/components/inputs/input";

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
            <button 
                type="submit"
                className="w-full px-4 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
                Log In
            </button>
        </form>
    );
}