"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { sender, reciever } = await req.json();

        const addrequest =
            await sql`INSERT INTO friendships (user1, user2) VALUES(${sender}, ${reciever})`;

        return NextResponse.json({ success: true, data: addrequest });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}
