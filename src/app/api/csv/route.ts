"use server";

import {PrismaClient} from "@prisma/client";
import {unparse} from "papaparse";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

// Dokumentasi API : Export data perhitungan ke CSV
export const GET = async (req: Request) => {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    let calculations: any = [];

    try {
        if (id) {
            calculations = await prisma.calculation.findMany({
                where: {
                    userId: Number(id),
                },
                include: {
                    user: true,
                    shape: true,
                },
            });

        } else {
            calculations = await prisma.calculation.findMany({
                include: {
                    user: true,
                    shape: true,
                },
            });
        }

        const dataToExport = calculations.map((calculation: any) => ({
            calculationId: calculation.id,
            userName: calculation.user.name,
            userSchool: calculation.user.schoolName,
            userPhone: calculation.user.phone,
            shapeName: calculation.shape.shapeName,
            shapeType: calculation.shape.type,
            formulaUsed: calculation.shape.formula,
            parameters: JSON.stringify(calculation.parameters),
            result: calculation.result,
            createdAt: calculation.createdAt,
        }));

        // Menggunakan unparse untuk mengubah data ke CSV
        const csv = unparse(dataToExport);

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=calculations.csv',
            },
            status: 200,
        })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error",
            },
            {status: 500}
        );
    }
}