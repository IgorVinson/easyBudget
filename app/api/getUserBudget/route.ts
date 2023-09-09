import { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    try {
        const budgets = await prisma.budget.findMany({
            where: {
                userId: userId
            },
            include: {
                categories: true
            }
        });

        if (!budgets || budgets.length === 0) {
            return new Response(JSON.stringify({ error: "Budgets not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(budgets), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
