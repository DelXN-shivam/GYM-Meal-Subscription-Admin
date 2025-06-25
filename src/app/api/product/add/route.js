// app/api/product/add/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose.js';
import Product from '@/models/Product.js';
import { authenticate } from '@/lib/auth';

// Define allowed values for validation
const ALLOWED_DIETARY_PREFERENCES = ['veg', 'non-veg', 'vegan'];
const ALLOWED_MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

export async function POST(req) {
    try {
        // Authentication check
        const user = authenticate(req);
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Parse and validate input data
        const { name, type, subCategory, quantity, calories, price, dietaryPreference, allergies } = await req.json();

        // Required field validation
        if (!name || !calories) {
            return NextResponse.json(
                { message: "Missing required fields: name and calories." },
                { status: 400 }
            );
        }

        // Validate dietaryPreference is an array with allowed values
        const validatedDietary = Array.isArray(dietaryPreference)
            ? dietaryPreference.filter(item => ALLOWED_DIETARY_PREFERENCES.includes(item))
            : [];

        if (validatedDietary.length === 0) {
            return NextResponse.json(
                { message: "At least one valid dietary preference is required." },
                { status: 400 }
            );
        }

        // Validate meal types if provided
        const validatedTypes = Array.isArray(type)
            ? type.filter(item => ALLOWED_MEAL_TYPES.includes(item))
            : [];

        // Check for existing product
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

        // Create new product
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

        // Save product
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
        
        // More specific error messages
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