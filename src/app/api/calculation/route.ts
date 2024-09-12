"use server";

import {PrismaClient} from "@prisma/client";
import type {NextApiRequest, NextApiResponse} from "next";
import addData from "@/helper/response";
import {evaluate} from "mathjs";

const prisma = new PrismaClient();

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const {userId, shapeName, formulaType, paramValues} = req.body;

    try {
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

        return res.status(201).json(addData({message: "Success", data: calculation}));

    } catch (error) {
        return res.status(500).json(
            addData({message: "Internal server error"})
        );
    }
}

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query;

    if (id) {
        try {
            const calculation = await prisma.calculation.findUnique({
                where: {id: Number(id)},
                include: {
                    shape: true,
                    user: true
                }
            });

            if (calculation) {
                return res.status(200).json(
                    addData({message: "Success", data: calculation})
                );
            } else {
                return res.status(404).json(
                    addData({message: "Calculation not found"})
                );
            }

        } catch (error) {
            return res.status(500).json(
                addData({message: "Internal server error"})
            );
        }
    } else {
        try {
            const calculations = await prisma.calculation.findMany({
                include: {
                    shape: true,
                    user: true
                }
            });

            return res.status(200).json(
                addData({message: "Success", data: calculations})
            );
        } catch (error) {
            return res.status(500).json(
                addData({message: "Internal server error"})
            );
        }
    }
}