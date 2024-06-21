"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        const addUser =
            await sql`INSERT INTO users (email,password) VALUES ('dhruv@vercel.com', 'vercel123')`;
        return NextResponse.json(addUser);
    } catch {
        return NextResponse.json("User exists elready");
    }
}
