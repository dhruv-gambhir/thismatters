"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { sender, receiver } = await req.json();

        const addrequest =
            await sql`INSERT INTO friends (sender, receiver) VALUES(${sender}, ${receiver})`;

        return NextResponse.json({ success: true, data: addrequest });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}
