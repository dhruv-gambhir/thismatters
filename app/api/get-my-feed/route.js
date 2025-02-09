"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import redis from "@/app/lib/redis";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(req) {
    noStore();
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    try {
        const cacheKey = `feed:${username}`;

        const cachedFeed = await redis.get(cacheKey);
        if (cachedFeed) {
            return NextResponse.json({ success: true, myfeed: JSON.parse(cachedFeed) });
        }

        const myfeed = await sql`
            SELECT p.id, p.username, p.title, p.text, p.images
            FROM posts p
            JOIN friends f ON (f.sender = p.username OR f.receiver = p.username)
            WHERE (f.sender = ${username} OR f.receiver = ${username})
            AND p.username != ${username}
            ORDER BY p.id DESC;
        `;

        await redis.set(cacheKey, JSON.stringify(myfeed.rows), "EX", 300);

        return NextResponse.json({ success: true, myfeed: myfeed.rows });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "An error occurred while fetching the posts",
        });
    }
}

