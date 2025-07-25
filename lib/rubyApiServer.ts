import axios from 'axios';
import { IncomingMessage } from 'http';
import cookie from 'cookie';

export default function createRubyApiServer(req: IncomingMessage) {
    const cookies = cookie.parse(req.headers.cookie || '');
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        withCredentials: true,
        headers: {
            'access-token': cookies['access-token'] ?? '',
            client: cookies['client'] ?? '',
            uid: cookies['uid'] ?? '',
            'token-type': cookies['token-type'] ?? '',
            expiry: cookies['expiry'] ?? '',
        },
    });
}
