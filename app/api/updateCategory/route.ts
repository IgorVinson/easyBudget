import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const data = await req.json();
    const {categoryId, typeValue, newValue} = data;

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {id: categoryId}
        });

        if (!existingCategory) {
            return NextResponse.json({error: "Category does not exist"}, {status: 400});
        }

        let updateData = {};

        // Выбор поля для обновления
        switch (typeValue) {
            case 'plannedAmount':
                updateData = { plannedAmount: parseInt(newValue, 10) };
                break;
            case 'actualAmount':
                updateData = { actualAmount: parseInt(newValue, 10) };
                break;
            case 'categoryName':
                updateData = { name: newValue };
                break;
            default:
                return NextResponse.json({error: "Invalid typeValue"}, {status: 400});
        }

        const updatedCategory = await prisma.category.update({
            where: {id: categoryId},
            data: updateData
        });

        return NextResponse.json({updatedCategory});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
