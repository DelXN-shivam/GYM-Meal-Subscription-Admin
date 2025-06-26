// app/api/product/add/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose.js';
import Product from '@/models/Product.js';
import { authenticate } from '@/lib/auth';

const ALLOWED_DIETARY_PREFERENCES = ['veg', 'non-veg', 'vegan'];
const ALLOWED_MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

export async function POST(req) {
    try {
        const user = authenticate(req);
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const { name, type, subCategory, quantity, calories, price, dietaryPreference, allergies } = await req.json();

        if (!name || !calories) {
            return NextResponse.json(
                { message: "Missing required fields: name and calories." },
                { status: 400 }
            );
        }
        const validatedDietary = Array.isArray(dietaryPreference)
            ? dietaryPreference.filter(item => ALLOWED_DIETARY_PREFERENCES.includes(item))
            : [];

        if (validatedDietary.length === 0) {
            return NextResponse.json(
                { message: "At least one valid dietary preference is required." },
                { status: 400 }
            );
        }

        const validatedTypes = Array.isArray(type)
            ? type.filter(item => ALLOWED_MEAL_TYPES.includes(item))
            : [];

        const existingProduct = await Product.findOne({
            name,
            subCategory: subCategory || null
        });

        if (existingProduct) {
            return NextResponse.json(
                { 
                    message: "Product with this name and subcategory already exists.",
                    existingProduct
                },
                { status: 409 }
            );
        }

        const newProduct = new Product({
            name,
            type: validatedTypes.length > 0 ? validatedTypes : undefined,
            subCategory: subCategory || undefined,
            quantity: quantity || undefined,
            calories: Number(calories),
            price: price ? Number(price) : undefined,
            dietaryPreference: validatedDietary,
            allergies: Array.isArray(allergies) ? allergies : []
        });

        const savedProduct = await newProduct.save();

        return NextResponse.json(
            { 
                message: "Product added successfully.",
                product: savedProduct 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error adding product:", error);
        
        let errorMessage = "Internal server error.";
        if (error.name === 'ValidationError') {
            errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
        } else if (error.code === 11000) {
            errorMessage = "Product with these details already exists.";
        }

        return NextResponse.json(
            { 
                message: errorMessage,
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}