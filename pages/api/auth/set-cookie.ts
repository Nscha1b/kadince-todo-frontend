import { NextApiRequest, NextApiResponse } from 'next';
import {serialize, SerializeOptions} from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { accessToken, client, uid } = req.body;

    const options: SerializeOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        path: '/',
    };

    res.setHeader('Set-Cookie', [
        serialize('access-token', accessToken, options),
        serialize('client', client, options),
        serialize('uid', uid, options),
    ]);

    res.status(200).json({ message: 'Cookies set' });
}
