// api/calculation.ts

'use server'

import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {evaluate} from 'mathjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Jika http method POST
    if (req.method === 'POST') {
        const {userId, shapeName, formulaType, paramValues} = req.body;

        try {
            // Ambil shape data
            const shape = await prisma.shape.findFirst({
                where: {shapeName, formulaType},
            });

            if (!shape) {
                return res.status(404).json({error: 'Shape not found'});
            }

            // Hitung hasil
            const result = evaluate(shape.formula, paramValues);

            // Simpan hasil perhitungan
            const calculation = await prisma.calculation.create({
                data: {
                    userId,
                    shapeId: shape.id,
                    parameters: paramValues,
                    result,
                    user: userId,
                },
            });

            res.status(201).json(calculation);
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }

        // Jika http method GET
    } else if (req.method === 'GET') {
        const {id} = req.query;

        try {
            if (id) {
                const shape = await prisma.calculation.findUnique({
                    where: {id: Number(id)},
                });

                if (shape) {
                    res.status(200).json(shape);

                } else {
                    res.status(404).json({error: 'Shape not found'});
                }

            } else {
                const shapes = await prisma.calculation.findMany();
                res.status(200).json(shapes);
            }

        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
