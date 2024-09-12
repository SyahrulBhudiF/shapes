"use server";

import {FormulaType, PrismaClient, ShapeName, ShapeType} from "@prisma/client";
import type {NextApiRequest, NextApiResponse} from "next";
import addData from "@/helper/response";

const prisma = new PrismaClient();

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
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

        return res.status(201).json(addData({message: "Success", data: shape}));

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
            const shape = await prisma.shape.findUnique({
                where: {id: Number(id)},
            });

            if (shape) {
                return res.status(200).json(
                    addData({message: "Success", data: shape})
                );
            } else {
                return res.status(404).json(
                    addData({message: "Shape not found"})
                );
            }
        } catch (error) {
            return res.status(500).json(
                addData({message: "Internal server error"})
            );
        }
    } else {
        try {
            const shapes = await prisma.shape.findMany();

            return res.status(200).json(
                addData({message: "Success", data: shapes})
            );
        } catch (error) {
            return res.status(500).json({error: "Internal server error"});
        }
    }
}