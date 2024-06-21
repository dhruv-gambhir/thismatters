"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        const createTable =
            await sql`CREATE TABLE users (user_id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, username VARCHAR(255) NOT NULL);`;
        return NextResponse.json(createTable);
    } catch {
        return NextResponse.json("Table exists already");
    }
}
