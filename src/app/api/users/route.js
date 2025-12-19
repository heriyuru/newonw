// app/api/users/route.js

import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongoose";
import User from "../../../../models/User";

// POST: Add new user
export async function POST(request) {
  try {
    await connectionToDatabase();
    const { name, email } = await request.json();
    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json(newUser, { status: 200 });

  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

// GET: Check if user exists using query ?name=...&email=...
export async function GET(request) {
  try {
    await connectionToDatabase();

    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    if (name && email) {
      const user = await User.findOne({ name, email });

      if (user) {
        return NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });
      } else {
        return NextResponse.json({ success: false, message: "Login failed" }, { status: 404 });
      }
    }

    // If no query, return all users
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });

  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
