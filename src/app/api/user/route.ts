"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const { name, schoolName, age, address, phone } = await req.json();

    // Create the user in the database
    const user = await prisma.user.create({
      data: { name, schoolName, age, address, phone },
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Success",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    // Return error response
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    try {
      const shape = await prisma.shape.findUnique({
        where: { id: Number(id) },
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
      console.error("Error retrieving shapes:", error);
      return NextResponse.json({
        message: "Internal server error",
        status: 500,
      });
    }
  }
};
