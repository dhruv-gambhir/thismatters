"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        const addUser =
            await sql`INSERT INTO users (email,username) VALUES ('dhruv@vercel.com', 'dhhrooov')`;
        return NextResponse.json(addUser);
    } catch {
        return NextResponse.json("User exists elready");
    }
}
