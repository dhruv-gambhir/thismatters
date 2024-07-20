"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { username, title, text, images } = await req.json();

        // Insert the post into the database
        const addPost = await sql`
            INSERT INTO posts (username, title, text, images)
            VALUES (${username}, ${title}, ${text}, ${sql.array(images)})
        `;

        return NextResponse.json({ success: true, data: addPost });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "An error occurred while adding the post",
        });
    }
}
