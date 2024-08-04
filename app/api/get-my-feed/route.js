"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
    noStore();
    try {
        const allposts = await sql`
            SELECT id, username, title, text, images FROM posts
            ORDER BY id desc
        `;
        return NextResponse.json({ success: true, allposts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "An error occurred while fetching the posts",
        });
    }
}
