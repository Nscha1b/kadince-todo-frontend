'use client';
import classNames from "classnames";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogin as authLogin } from "@/lib/auth";
import { Input } from "@/components/inputs/input";
import { Button } from "../buttons/button";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./sign-up-form";
import { ResetForm } from "./reset-form";
import { DemoLogin } from "./demo-login";

export function AuthForm({
}: {
    }) {
    const router = useRouter();
    const [formType, setFormType] = useState<'login' | 'signup' | 'forgot-password'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            {formType === 'login' && (
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
            )}
            {formType === 'signup' && (
                <SignUpForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    setFormType={setFormType}
                />
            )}
            {formType === 'forgot-password' && (
                <ResetForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
            )}

            <DemoLogin />
            <div className="flex justify-center text-center pt-4">
                <span>Switch to...</span>
            </div>

            <div className="flex justify-between items-center pt-2">
                <Button
                    type="button"
                    variant="plain"
                    className=""
                    onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')}
                >
                    {formType === 'login' ? 'Sign Up' : 'Log In'}
                </Button>
                {/* TODO: Leaving out forgot password for now, not sure if ill have time */}
                {/* <Button
                    type="button"
                    variant="plain"
                    className="!font-normal"
                    onClick={() => setFormType('forgot-password')}
                >
                    Forgot Password
                </Button> */}
            </div>
        </>


    );
}