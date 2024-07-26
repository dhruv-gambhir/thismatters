"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
    noStore();
    try {
        const allusers = await sql`SELECT * FROM users`;
        return NextResponse.json({ success: true, allusers });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "An error occurred while fetching the posts",
        });
    }
}
