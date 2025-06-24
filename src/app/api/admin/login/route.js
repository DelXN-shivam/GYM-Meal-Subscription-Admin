// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongoose.js';
import Admin from '@/models/Admin.js';

const secret = process.env.JWT_SECRET;

export async function POST(req) {
    try {
        await connectDB(); // Ensure DB connection

        const { userId, password } = await req.json();

        if (!userId || !password) {
            return NextResponse.json({ message: 'userId and password are required' }, { status: 400 });
        }

        // Find the admin in the database
        const admin = await Admin.findOne({ userId });

        if (!admin) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (admin.password !== password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT
        const token = jwt.sign({ username: admin.username, id: admin._id }, secret, { expiresIn: '1d' });

        // Set HTTP-only cookie
        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
        response.headers.set('Set-Cookie', cookie);

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}


