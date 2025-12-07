import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({
            count: users.length,
            users: users.map(u => ({
                ...u,
                passwordLength: u.password?.length,
                // SAFETY: Showing first/last char of password for debug
                passwordHint: u.password ? `${u.password[0]}...${u.password[u.password.length - 1]}` : null
            }))
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
