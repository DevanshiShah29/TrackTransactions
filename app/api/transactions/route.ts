import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all transactions
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

// POST a new transaction
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, type, category, date, description } = body;

    if (!amount || !type || !category || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        category,
        date: new Date(date),
        description: description || "",
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating transaction" }, { status: 500 });
  }
}
