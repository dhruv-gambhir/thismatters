"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    const getUsers = await sql`SELECT * FROM users`;
    return NextResponse.json(getUsers);
}
