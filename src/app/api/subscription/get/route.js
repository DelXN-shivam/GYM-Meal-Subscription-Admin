// app/api/sampleSubscription/all/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import samplesub from '@/models/Subscription.js';
import { authenticate } from '@/lib/auth'; // Optional

export async function GET(req) {
  try {
    const user = authenticate(req); // Optional: if authentication is needed
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const subscriptions = await samplesub.find();

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json(
        { message: 'No subscriptions found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Subscriptions fetched successfully',
        data: subscriptions,
        total: subscriptions.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
