"use server";

import {PrismaClient} from "@prisma/client";
import {evaluate} from "mathjs";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

// Dokumentasi API : Hitung hasil perhitungan
export const POST = async (req: Request) => {
    const {id, shapeName, formulaType, parameters} = await req.json();

    try {
        const shape = await prisma.shape.findFirst({
            where: {shapeName, formulaType},
        });

        if (!shape) {
            return NextResponse.json(
                {
                    message: "Not Found",
                },
                {status: 404}
            );
        }

        // Hitung hasil
        const result = evaluate(shape.formula, parameters);

        // Simpan hasil perhitungan
        const calculation = await prisma.calculation.create({
            data: {
                shapeId: shape.id,
                parameters: parameters,
                result,
                userId: id,
            },
        });

        return NextResponse.json(
            {
                message: "Success",
                data: calculation,
            },
            {status: 201}
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error",
            },
            {status: 500}
        );
    }
}

// Dokumentasi API : Ambil data perhitungan
export const GET = async (req: Request) => {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

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
                return NextResponse.json({
                    message: "Success",
                    status: 200,
                    data: calculation,
                });
            } else {
                return NextResponse.json({
                    message: "Calculation not found",
                    status: 404,
                });
            }

        } catch (error) {
            console.error("Error finding calculation:", error);
            return NextResponse.json({
                message: "Internal server error",
                status: 500,
            });
        }
    } else {
        try {
            const calculations = await prisma.calculation.findMany({
                include: {
                    shape: true,
                    user: true
                }
            });

            return NextResponse.json({
                message: "Success",
                status: 200,
                data: calculations,
            });
        } catch (error) {
            console.error("Error retrieving calculation:", error);
            return NextResponse.json({
                message: "Internal server error",
                status: 500,
            });
        }
    }
}