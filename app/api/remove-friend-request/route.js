"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { sender, receiver } = await req.json();

        console.log(sender, receiver);

        const result = await sql`
            DELETE FROM friend_requests WHERE sender = ${receiver} AND receiver = ${sender} RETURNING *;

        `;
            
        console.log("deleted friend", result);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, error: "No matching friend request found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: result.rows },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
