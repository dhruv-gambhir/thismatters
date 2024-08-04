"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(req) {
    noStore();
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    try {
        const myfeed = await sql`
            SELECT p.id, p.username, p.title, p.text, p.images
            FROM posts p
            JOIN friends f ON (f.sender = p.username OR f.receiver = p.username)
            WHERE (f.sender = ${username} OR f.receiver = ${username})
            AND p.username != ${username}
            ORDER BY p.id DESC;
        `;
        return NextResponse.json({ success: true, myfeed });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "An error occurred while fetching the posts",
        });
    }
}
