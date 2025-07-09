"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default function AdminLogin() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                '/api/admin/login',
                { userId, password }, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true 
                }
            );

            if (res.status === 200) {
                router.push('/ui/dashboard');
            } else {
                setError(res.data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Server error');
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition"
                    >
                        Login
                    </button>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
