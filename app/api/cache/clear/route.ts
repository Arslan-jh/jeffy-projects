import { invalidateCache } from "@/lib/notion";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  invalidateCache();
  return NextResponse.json({ success: true });
}

export async function GET() {
  invalidateCache();
  return NextResponse.json({ success: true });
}
