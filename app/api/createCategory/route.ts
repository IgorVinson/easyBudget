import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const data = await req.json();
    const { name, plannedAmount, budgetId } = data;

    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                plannedAmount,
                budgetId,
            }
        });

        return NextResponse.json({ newCategory });
    } catch (error) {
        console.error("Error while creating category:", error);
        return NextResponse.json({ error: "An error occurred while creating the category" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
