"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import redis from "@/lib/redis";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    try {
        const cacheKey = `friends:${username}`;

        const cachedFriends = await redis.get(cacheKey);
        if (cachedFriends) {
            return NextResponse.json({ success: true, friends: JSON.parse(cachedFriends) });
        }

        const friends = await sql`
            SELECT 
                CASE 
                    WHEN f.sender = ${username} THEN f.receiver 
                    ELSE f.sender 
                END AS friend
            FROM friends f
            WHERE f.sender = ${username} OR f.receiver = ${username};
        `;

        await redis.set(cacheKey, JSON.stringify(friends.rows), "EX", 300);

        return NextResponse.json({ success: true, friends: friends.rows });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "An error occurred while fetching friends",
        });
    }
}

