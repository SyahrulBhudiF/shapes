"use server";

import {FormulaType, PrismaClient, ShapeName, ShapeType} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

// Dokumentasi API : Tambah shape baru
export const POST = async (req: Request) => {
    const {shapeName, type, formula, parameters, formulaType} = await req.json();

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

        return NextResponse.json(
            {
                message: "Success",
                data: shape,
            },
            {status: 201}
        );

    } catch (error) {
        console.error("Error creating user:", error);

        return NextResponse.json(
            {
                message: "Internal server error",
            },
            {status: 500}
        );
    }
}

// Dokumentasi API : Ambil shape berdasarkan ID
export const GET = async (req: Request) => {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
        try {
            const shape = await prisma.shape.findUnique({
                where: {id: Number(id)},
            });

            if (shape) {
                return NextResponse.json({
                    message: "Success",
                    status: 200,
                    data: shape,
                });
            } else {
                return NextResponse.json({
                    message: "Shape not found",
                    status: 404,
                });
            }
        } catch (error) {
            console.error("Error finding shape:", error);
            return NextResponse.json({
                message: "Internal server error",
                status: 500,
            });
        }
    } else {
        try {
            const shapes = await prisma.shape.findMany();

            return NextResponse.json({
                message: "Success",
                status: 200,
                data: shapes,
            });
        } catch (error) {
            console.error("Error retrieving shape:", error);
            return NextResponse.json({
                message: "Internal server error",
                status: 500,
            });
        }
    }
}