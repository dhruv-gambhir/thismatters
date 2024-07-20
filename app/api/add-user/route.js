"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { email, username } = await req.json();

        const addUser =
            await sql`INSERT INTO users (email,username) VALUES (${email}, ${username})`;
        return NextResponse.json(addUser);
    } catch {
        return NextResponse.json("User exists elready");
    }
}
