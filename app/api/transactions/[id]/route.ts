import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Type it as a Promise
) {
  try {
    const { id } = await params; // 1. Unwrapping the Promise
    const body = await request.json();

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        amount: parseFloat(body.amount),
        type: body.type,
        category: body.category,
        date: new Date(body.date),
        description: body.description,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Type it as a Promise
) {
  try {
    const { id } = await params; // Unwrapping the Promise

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
