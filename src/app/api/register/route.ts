import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const { prisma } = await import("@/lib/prisma");

        // Check availability
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password, // Storing plain text to match existing auth logic
                planType: "FREE",
                resumesGeneratedCount: 0
            }
        });

        return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
