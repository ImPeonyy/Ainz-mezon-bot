import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const runtime = "edge";

export async function GET() {
    try {
        const { blobs } = await list();
        return NextResponse.json({ blobs });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: (error as Error)?.message ?? "Unexpected error" },
            { status: 500 }
        );
    }
}
