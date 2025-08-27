import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: "No files provided" },
                { status: 400 }
            );
        }

        const uploadResults = await Promise.all(
            files.map(async (file) => {
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const blob = await put(file.name, arrayBuffer, {
                        access: "public",
                        addRandomSuffix: true,
                        contentType: file.type || undefined,
                    });
                    return {
                        name: file.name,
                        status: "uploaded" as const,
                        url: blob.url,
                        pathname: blob.pathname,
                        size: file.size,
                        type: file.type,
                    };
                } catch (error: unknown) {
                    return {
                        name: file.name,
                        status: "error" as const,
                        error: (error as Error)?.message ?? "Upload failed",
                    };
                }
            })
        );

        return NextResponse.json({ results: uploadResults });
    } catch (error: unknown) {
        return NextResponse.json(
            { error: (error as Error)?.message ?? "Unexpected error" },
            { status: 500 }
        );
    }
}
