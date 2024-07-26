"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { sender, reciever } = await req.json();

        const removerequest =
            await sql`DELETE FROM friend_requests WHERE user1 = ${reciever} AND user2 = ${sender}`;

        return NextResponse.json({ success: true, data: removerequest });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}
