import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = parseInt(searchParams.get("month") || "");
  const year = parseInt(searchParams.get("year") || "");

  const budget = await prisma.budget.findUnique({
    where: { month_year: { month, year } },
  });
  return NextResponse.json(budget || { total: 0, categoryTargets: {} });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { month, year, total, categoryTargets } = body;

  const budget = await prisma.budget.upsert({
    where: { month_year: { month, year } },
    update: { total, categoryTargets },
    create: { month, year, total, categoryTargets },
  });

  return NextResponse.json(budget);
}
