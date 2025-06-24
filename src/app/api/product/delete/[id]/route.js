// app/api/product/delete/[id]/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import { authenticate } from '@/lib/auth';

export async function DELETE(req, { params }) {
    try {
        const user = authenticate(req);
        
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        await connectDB(); // Connect to the database

        const { id } = params;

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        const deleteResult = await Product.deleteOne({ _id: id });

        if (deleteResult.deletedCount === 0) {
            return NextResponse.json({ message: 'Product deletion not successful' }, { status: 411 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Server Error', error: err.message }, { status: 500 });
    }
}
