"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const body = await req.json();
        const { sender, receiver } = body;

        if (!sender || !receiver) {
            return NextResponse.json(
                { success: false, error: "Sender and receiver are required" },
                { status: 400 }
            );
        }

        const addrequest =
            await sql`INSERT INTO friends (sender, receiver) VALUES(${sender}, ${receiver})`;

        return NextResponse.json({ success: true, data: addrequest });
    } catch (error) {
        console.error("Add friend error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred while adding the friend" },
            { status: 500 }
        );
    }
}
