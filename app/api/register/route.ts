import {NextResponse} from 'next/server'
import {PrismaClient} from "@prisma/client";
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const {username, email, password} = await request.json()

        const existingUser = await prisma.user.findUnique({
            where: {email},
        })

        if (existingUser) {
            NextResponse.json(
                {message: "Email already in use"},
                {status: 400,})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                hash: hashedPassword,
                username: `${username}`,
                createdAt: new Date(),
                language: "en",
            },
        })
        const { hash, ...safeUserData } = user;
        return NextResponse.json({ user: safeUserData }, { status: 201 });
    } catch (e) {
        return NextResponse.json({message: e.message}, {status: 500})
    }
}

