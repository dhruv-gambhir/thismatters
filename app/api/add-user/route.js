"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, username } = body;

        if (!email || !username) {
            return NextResponse.json(
                { success: false, error: "Email and username are required" },
                { status: 400 }
            );
        }

        const addUser = await sql`INSERT INTO users (email,username) VALUES (${email}, ${username})`;
        return NextResponse.json({ success: true, data: addUser });
    } catch (error) {
        console.error("Add user error:", error);
        return NextResponse.json(
            { success: false, error: "User already exists or database error" },
            { status: 400 }
        );
    }
}
