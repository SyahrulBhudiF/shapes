"use server";

import {PrismaClient} from "@prisma/client";
import type {NextApiRequest, NextApiResponse} from "next";
import addData from "@/helper/response";

const prisma = new PrismaClient();

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const {name, schoolName, age, address, phone} = req.body;

    try {
        const user = await prisma.user.create({
            data: {name, schoolName, age, address, phone},
        });

        return res.status(201).json(addData({message: "Success", data: user})
        );

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
                include: {
                    Calculation: true,
                }
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
            const shapes = await prisma.shape.findMany({
                include: {
                    Calculation: true,
                }
            });

            return res.status(200).json(
                addData({message: "Success", data: shapes})
            );
        } catch (error) {
            return res.status(500).json({error: "Internal server error"});
        }
    }
};
