import rubyApiClient from "@/lib/rubyApiClient";
import { AxiosResponse, AxiosResponseHeaders, AxiosHeaders } from "axios";
import { LoginResponse, SignUpResponse } from "@/types/auth";

export const ROUTE_AFTER_LOGIN = '/todos';

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
        const respHeaders = getLoginHeaders(res.headers);
        await fetch('/api/auth/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(respHeaders),
        });

        return data;
    } catch (error) {
        console.log(error);
        throw error;
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
        console.log(error);
        throw error;
    }
};

export const handleDemoLogin = async (): Promise<LoginResponse | undefined> => {
    try {
        const res: AxiosResponse<LoginResponse> = await rubyApiClient.post('/demo_login', null, { headers: { 'Content-Type': 'application/json' } });
        const data = res.data;
        const respHeaders = getLoginHeaders(res.headers);
        await fetch('/api/auth/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(respHeaders),
        });

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getLoginHeaders = (headers: AxiosResponseHeaders | Partial<AxiosHeaders>) => {
        const accessToken = headers['access-token']
        const client = headers['client']
        const uid = headers['uid']
        const tokenType = headers['token-type'] || 'Bearer';
        const expiry = headers['expiry'] || '0';

    return { accessToken, client, uid, tokenType, expiry };
};

