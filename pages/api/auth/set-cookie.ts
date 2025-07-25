import { NextApiRequest, NextApiResponse } from 'next';
import {serialize, SerializeOptions} from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { accessToken, client, uid, tokenType, expiry, user_id } = req.body;

    const options: SerializeOptions = {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        path: '/',
    };

    res.setHeader('Set-Cookie', [
        serialize('access-token', accessToken, options),
        serialize('client', client, options),
        serialize('uid', uid, options),
        serialize('token-type', tokenType, options),
        serialize('expiry', expiry, options),
        serialize('user_id', user_id, options)
    ]);

    res.status(200).json({ message: 'Cookies set' });
}
