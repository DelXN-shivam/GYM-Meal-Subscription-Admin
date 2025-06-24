// pages/api/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
    res.setHeader('Set-Cookie', serialize('auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/',
    }));

    res.status(200).json({ message: 'Logout successful' });
}
