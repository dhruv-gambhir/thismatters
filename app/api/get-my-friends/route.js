"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    try {
        const myfriends = await sql`
            SELECT sender, receiver FROM friends WHERE sender = ${username} OR receiver = ${username};
        `;
        return NextResponse.json({ success: true, myfriends });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "An error occurred while fetching the posts",
        });
    }
}
