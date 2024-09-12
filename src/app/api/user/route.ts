"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface response {
  message: string;
  status: number;
  data?: any;
}

function addData({ message, status, data }: response): response {
  return {
    message: message,
    status: status,
    data: data,
  };
}

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    try {
      const shape = await prisma.shape.findUnique({
        where: { id: Number(id) },
      });

      if (shape) {
        return Response.json(
          addData({ message: "Success", status: 200, data: shape })
        );
      } else {
        return Response.json(
          addData({ message: "Shape not found", status: 404 })
        );
      }
    } catch (error) {
      return Response.json(
        addData({ message: "Internal server error", status: 500 })
      );
    }
  } else {
    try {
      const shapes = await prisma.shape.findMany();

      return Response.json(
        addData({ message: "Success", status: 200, data: shapes })
      );
    } catch (error) {
      return Response.json({ error: "Internal server error" });
    }
  }
};
