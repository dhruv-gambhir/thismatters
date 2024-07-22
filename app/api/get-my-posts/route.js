"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    try {
        const myposts = await sql`
            SELECT id, username, title, text, images FROM posts
            WHERE username = ${username}
        `;
        return NextResponse.json({ success: true, myposts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "An error occurred while fetching the posts",
        });
    }
}
