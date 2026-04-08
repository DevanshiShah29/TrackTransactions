// app/api/transactions/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validation
    const { amount, type, category, date, description } = body;
    if (!amount || !type || !category || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Save to Database
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        category,
        date: new Date(date),
        description: description || "",
      },
    });

    return NextResponse.json({ success: true, data: transaction }, { status: 201 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ error: "Error creating transaction" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching transactions" }, { status: 500 });
  }
}
