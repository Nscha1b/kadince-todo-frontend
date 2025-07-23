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
                <LoginForm />
            )}
            {formType === 'signup' && (
                <SignUpForm />
            )}
            {formType === 'forgot-password' && (
                <ResetForm />
            )}

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full h-14 md:!text-2xl text-shadow-lg mt-2"
                        // TODO: implement demo user login
                        >
                            RUN AS DEMO USER
                        </Button>
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
                                {/* TODO: implement sign up functionality */}
                                {formType === 'login' ? 'Sign Up' : 'Log In'}
                            </Button>
                                            <Button
                                type="button"
                                variant="plain"
                                className="!font-normal"
                                onClick={() => setFormType('forgot-password')}
                            >
                                {/* TODO: implement forgot password functionality */}
                                Forgot Password
                            </Button>
                        </div>
        </>

        
    );
}