import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    const data = await req.json();
    const {categoryId, newName} = data;

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {id: categoryId}
        });

        console.log(existingCategory)

        if (!existingCategory) {
            return NextResponse.json({error: "Category does not exist"}, {status: 400});
        }

        // Выполняем обновление категории
        if (newName) {
            const updatedCategory = await prisma.category.update({
                where: {id: categoryId},
                data: {
                    name: newName
                }
            });
            return NextResponse.json({updatedCategory});
        }



    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
