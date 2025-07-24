import { NextApiRequest, NextApiResponse } from 'next';
import {serialize, SerializeOptions} from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { accessToken, client, uid, tokenType, expiry } = req.body;

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
        serialize('expiry', expiry, options)
    ]);

    res.status(200).json({ message: 'Cookies set' });
}
