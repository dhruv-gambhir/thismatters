"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, title, text, images } = body;

        if (!username || (!title && !text && !images)) {
            return NextResponse.json(
                { success: false, error: "Username and content are required" },
                { status: 400 }
            );
        }

        // Insert the post into the database
        const addPost = await sql`
            INSERT INTO posts (username, title, text, images)
            VALUES (${username}, ${title || ""}, ${text || ""}, ${images || ""})
        `;

        return NextResponse.json({ success: true, data: addPost });
    } catch (error) {
        console.error("Add post error:", error);
        return NextResponse.json(
            { success: false, error: "An error occurred while adding the post" },
            { status: 500 }
        );
    }
}
