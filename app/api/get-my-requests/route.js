"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    try {
        console.log(username);
        const requests =
            await sql`SELECT sender, receiver FROM friend_requests WHERE receiver = ${username}`;

        return NextResponse.json({ success: true, data: requests });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}
