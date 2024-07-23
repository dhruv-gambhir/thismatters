"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        const allposts = await sql`SELECT * FROM posts ORDER BY id DESC`;
        return NextResponse.json({ success: true, allposts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch posts",
        });
    }
}
