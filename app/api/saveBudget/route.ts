import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: Request) {

    const data = await req.json();

    const { plannedMonth, userId, categories } = data;

    try {

        const existingBudget = await prisma.budget.findFirst({
            where: {
                AND: [
                    { plannedMonth },
                    { userId }
                ]
            }
        });

        if (existingBudget) {
            return NextResponse.json({ error: "Budget for this month already exists" }, { status: 400 });
        }

        // Сначала создаем бюджет
        const newBudget = await prisma.budget.create({
            data: {
                plannedMonth,
                userId,
                // ...other fields
            }
        });

        // Теперь создаем категории, связанные с этим бюджетом
        const newCategories = await Promise.all(
            categories.map(async category => {

                // Проверка на существующую категорию
                const existingCategory = await prisma.category.findFirst({
                    where: {
                        AND: [
                            { name: category.categoryName },
                            { budgetId: newBudget.id }
                        ]
                    }
                });

                if (!existingCategory) {
                    return prisma.category.create({
                        data: {
                            name: category.categoryName,
                            plannedAmount: parseInt(category.plannedAmount, 10),
                            budgetId: newBudget.id,
                        }
                    });
                }
            })
        );

        return NextResponse.json({ newBudget, newCategories });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}