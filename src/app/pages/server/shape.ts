// file path src/app/pages/api/shape.ts
'use server'

import type {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient, ShapeName, ShapeType, FormulaType} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {shapeName, type, formula, parameters, formulaType} = req.body;

        try {
            const shape = await prisma.shape.create({
                data: {
                    shapeName: shapeName as ShapeName,
                    type: type as ShapeType,
                    formula,
                    parameters,
                    formulaType: formulaType as FormulaType,
                },
            });
            res.status(201).json(shape);
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }

    } else if (req.method === 'GET') {
        const {id} = req.query;

        try {
            if (id) {
                const shape = await prisma.shape.findUnique({
                    where: {id: Number(id)},
                });

                if (shape) {
                    res.status(200).json(shape);

                } else {
                    res.status(404).json({error: 'Shape not found'});
                }

            } else {
                const shapes = await prisma.shape.findMany();
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
