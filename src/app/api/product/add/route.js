// app/api/product/add/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose.js';
import Product from '@/models/Product.js';
import { authenticate } from '@/lib/auth';

export async function POST(req) {
    try {
        const user = authenticate(req);
            if (!user) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        await connectDB();

        const { name, type, subCategory, quantity, calories, price, dietaryPreference, allergies } = await req.json();

        if (!name || !calories || !dietaryPreference) {
            return NextResponse.json(
                { message: "Missing required fields: name, calories, dietaryPreference." },
                { status: 400 }
            );
        }

        const existingProduct = await Product.findOne({
            name,
            subCategory: subCategory || null,
            dietaryPreference
        });

        if (existingProduct) {
            return NextResponse.json(
                { message: "Product with this name and subcategory already exists." },
                { status: 409 }
            );
        }

        const newProduct = new Product({
            name,
            type: type || undefined,
            subCategory: subCategory || undefined,
            quantity,
            calories,
            price,
            dietaryPreference,
            allergies: allergies || []
        });

        const savedProduct = await newProduct.save();

        return NextResponse.json(
            { message: "Product added successfully.", product: savedProduct },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
