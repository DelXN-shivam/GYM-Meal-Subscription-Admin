"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
            <h1 className="text-2xl mb-4">Home</h1>

        </div>
    );
}
