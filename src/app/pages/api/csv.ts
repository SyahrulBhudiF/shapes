// server/csv.ts
'use server'

import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {unparse} from 'papaparse';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method Not Allowed'});
    }

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

        // Kirim file CSV
        return res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}