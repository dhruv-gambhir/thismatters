"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { email } = await req.json();

        const result =
            await sql`SELECT username FROM users WHERE email = ${email}`;
        const username = result.rows[0]?.username;

        if (username) {
            return NextResponse.json({ username });
        } else {
            return NextResponse.json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" });
    }
}
