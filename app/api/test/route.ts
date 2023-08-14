import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            createdAt: true,
            avatar: true,
            email: true,
            language: true,
        },
    });
    return NextResponse.json(users)
}

