"use server";

import {PrismaClient} from "@prisma/client";
import type {NextApiRequest, NextApiResponse} from "next";
import {unparse} from "papaparse";

const prisma = new PrismaClient();

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const calculations = await prisma.calculation.findMany({
            include: {
                user: true,
                shape: true,
            },
        });

        const dataToExport = calculations.map((calculation) => ({
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

        // Set header untuk download file CSV
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=calculations.csv');

        return res.status(200).send(csv);
    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
}