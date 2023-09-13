import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest ){

    const budgetId = req.nextUrl.searchParams.get("budgetId");

    try {

        await prisma.category.deleteMany({
            where: { budgetId: budgetId }
        });

        const deletedBudget = await prisma.budget.delete({
            where: { id: budgetId }
        });

        return NextResponse.json({ deletedBudget });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }


}
