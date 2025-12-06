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

        const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

        // Ensure directory exists
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Read existing users
        let users = [];
        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            try {
                users = JSON.parse(fileContents);
            } catch (e) {
                users = [];
            }
        }

        // Check availability
        if (users.find((u: any) => u.email === email)) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // Storing plain text for this demo/file-db only
            image: null,
            planType: "FREE"
        };

        users.push(newUser);

        // Save
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
