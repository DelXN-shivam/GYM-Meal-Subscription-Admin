// lib/auth.js
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function authenticate(req) {
    try {
        // Safely parse cookies
        const cookies = parse(req.headers?.get('cookie') || '');

        const token = cookies.auth_token;

        if (!token) return null;

        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.error('Authentication error:', err.message);
        return null;
    }
}
