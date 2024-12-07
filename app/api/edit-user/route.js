"use server";

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { oldUsername, newUsername } = await req.json();

        const updateUser = await sql`
            UPDATE users 
            SET username = ${newUsername} 
            WHERE username = ${oldUsername}
        `;

        return NextResponse.json({ 
            success: true, 
            message: "Username updated successfully", 
            data: updateUser 
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to update username", 
            error: error.message 
        });
    }
}
