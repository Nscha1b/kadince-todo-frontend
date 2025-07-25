import axios from "axios";
import Cookies from 'js-cookie';

const rubyApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    withCredentials: true
});

rubyApiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') { // this should only run client side
        config.headers['access-token'] = Cookies.get('access-token') ?? '';
        config.headers['client'] = Cookies.get('client') ?? '';
        config.headers['uid'] = Cookies.get('uid') ?? '';
        config.headers['token-type'] = Cookies.get('token-type') ?? '';
        config.headers['expiry'] = Cookies.get('expiry') ?? '';
    }

    return config;
});

export default rubyApiClient;
