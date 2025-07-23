import rubyApiClient from "@/lib/rubyApiClient";
import { AxiosResponse } from "axios";
import { LoginResponse, SignUpResponse } from "@/types/auth";

export const handleLogin = async (
    email: string, 
    password: string
): Promise<LoginResponse | undefined> => {
    try {
        const res: AxiosResponse<LoginResponse> = await rubyApiClient.post('/auth/sign_in', {
            email,
            password
        }, { headers: { 'Content-Type': 'application/json' } });
        
        const data = res.data;

        const accessToken = res.headers['access-token']
        const client = res.headers['client']
        const uid = res.headers['uid']

        await fetch('/api/auth/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, client, uid }),
        });

        return data;
    } catch (error) {
        // TODO: need to setup some sort of flashing / notifications
        console.log(error);
        throw error; // Re-throw so the component can handle it
    }
};

export const handleSignUp = async (
    email: string,
    password: string,
    confirmPassword: string
): Promise<SignUpResponse | undefined> => {
    try {
        const res: AxiosResponse<SignUpResponse> = await rubyApiClient.post('/auth', {
            email,
            password,
            password_confirmation: confirmPassword
        }, { headers: { 'Content-Type': 'application/json' } });
        
        const data = res.data;

        return data;
    } catch (error) {
        // TODO: need to setup some sort of flashing / notifications
        console.log(error);
        throw error; // Re-throw so the component can handle it
    }
};