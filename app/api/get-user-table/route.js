"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        const getUsers = await sql`SELECT * FROM users`;
        return NextResponse.json(getUsers);
    } catch {
        return NextResponse.json("Error fetching data");
    }
}
