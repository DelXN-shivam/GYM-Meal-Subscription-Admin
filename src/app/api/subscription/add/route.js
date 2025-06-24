// app/api/sampleSubscription/add/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import sampleSub from '@/models/Subscription';
import { authenticate } from '@/lib/auth';

export async function POST(req) {
  try {
    const user = authenticate(req); // Optional: if authentication is needed
        if (!user) {
          return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    const body = await req.json();

    const {
      planDuration,
      mealsPerDay,
      price,
      mealTypes,
      numberOfDays,
      dietaryPreference,
    } = body;

    if (!planDuration || !mealsPerDay || !mealTypes || !numberOfDays || !dietaryPreference) {
      return NextResponse.json(
        { message: "Enter valid inputs" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await sampleSub.findOne({
      planDuration,
      mealsPerDay,
      mealTypes,
      numberOfDays,
      dietaryPreference,
    });

    if (existing) {
      return NextResponse.json(
        { message: "Subscription already exists" },
        { status: 409 }
      );
    }

    const newSub = new sampleSub({
      planDuration,
      mealsPerDay,
      price,
      mealTypes,
      numberOfDays,
      dietaryPreference,
    });

    const savedSub = await newSub.save();

    return NextResponse.json(
      { message: "Subscription added", subscription: savedSub },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while adding subscription", error);
    return NextResponse.json(
      { message: "Error in subscription", error: error.message },
      { status: 500 }
    );
  }
}
