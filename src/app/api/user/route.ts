"use server";

import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    try {
        const {name, schoolName, age, address, phone} = await req.json();

        const user = await prisma.user.create({
            data: {name, schoolName, age, address, phone},
        });

        return NextResponse.json(
            {
                message: "Success",
                data: user,
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
};

export const GET = async (req: Request) => {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
        try {
            const user = await prisma.user.findUnique({
                where: {id: Number(id)},
                include: {
                    calculations: true,
                },
            });

            if (user) {
                return NextResponse.json({
                    message: "Success",
                    status: 200,
                    data: user,
                });
            } else {
                return NextResponse.json({
                    message: "User not found",
                    status: 404,
                });
            }
        } catch (error) {
            console.error("Error finding user:", error);
            return NextResponse.json({
                message: "Internal server error",
                status: 500,
            });
        }
    } else {
        try {
            const users = await prisma.user.findMany({
                include: {
                    calculations: true,
                },
            });

            return NextResponse.json({
                message: "Success",
                status: 200,
                data: users,
            });
        } catch (error) {
            console.error("Error retrieving user:", error);
            return NextResponse.json({
                message: "Internal server error",
                status: 500,
            });
        }
    }
};
