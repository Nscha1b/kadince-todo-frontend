'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import rubyApiClient from "@/lib/rubyApiClient";
import {AxiosResponse} from "axios";
import {LoginResponse} from "@/types/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res: AxiosResponse<LoginResponse> = await rubyApiClient.post('/auth/sign_in', {
                email,
                password
            }, {headers: {'Content-Type': 'application/json'}});
            const data = res.data;
            console.log('data', data);

            const accessToken = res.headers['access-token']
            const client = res.headers['client']
            const uid = res.headers['uid']

            await fetch('/api/auth/set-cookie', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({accessToken, client, uid}),
            });

            router.push('/dashboard');

            return data;
        } catch (error) {
            // TODO: need to setup some sort of flashing / notifications
            console.log(error);
        }

    };


    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                /><br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /><br/>
                <button type="submit">Login</button>
            </form>
        </main>
    );
}
