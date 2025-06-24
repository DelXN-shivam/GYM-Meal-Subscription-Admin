// app/api/product/all/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import { authenticate } from '@/lib/auth';

export async function GET(req) {
    try {
        const user = authenticate(req);

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        await connectDB(); // Connect to the database

        const products = await Product.find();

        if (!products || products.length === 0) {
            return NextResponse.json(
                { message: 'No products found' },
                { status: 411 }
            );
        }

        return NextResponse.json(
            { message: 'Products found', products: products },
            { status: 200 }
        );
    } catch (err) {
        console.error('Cannot get products', err);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
