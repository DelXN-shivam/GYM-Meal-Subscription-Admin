// app/api/user/all/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose.js'; 
import User from '@/models/User.js'; 
import { authenticate } from '@/lib/auth.js';

export async function GET(req) {
    try {
        console.log("inside user/all");
        const user = authenticate(req);

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        await connectDB(); 

        // Get page and limit from query params
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 2;

        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit);

        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        return NextResponse.json({
            message: "User data fetched successfully",
            data: users,
            currentPage: page,
            totalPages: totalPages,
            totalUsers: totalUsers
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error while fetching Users", error: error.message },
            { status: 500 }
        );
    }
}
