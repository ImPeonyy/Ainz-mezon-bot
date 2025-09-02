import { NextResponse } from "next/server";
import { cloudinary } from "@/configs";
import { CLOUDINARY_PETS_FOLDER } from "@/constants";

export const runtime = "nodejs";

export async function GET() {
    try {
        const folder =
            process.env.CLOUDINARY_ROOT_FOLDER + "/" + CLOUDINARY_PETS_FOLDER;

        // Sử dụng Search API và phân trang để lấy tất cả ảnh trong folder
        type SearchResource = {
            secure_url?: string;
            url?: string;
            public_id: string;
            bytes?: number;
            created_at?: string;
            format?: string;
            resource_type?: string;
        };

        const allResources: SearchResource[] = [];
        let nextCursor: string | undefined = undefined;

        do {
            const search = cloudinary.search
                .expression(`folder:"${folder}" AND resource_type:image`)
                .sort_by("created_at", "desc")
                .max_results(100);

            if (nextCursor) search.next_cursor(nextCursor);

            const page = await search.execute();
            if (Array.isArray(page.resources)) {
                allResources.push(...(page.resources as SearchResource[]));
            }
            nextCursor = (page as { next_cursor?: string }).next_cursor;
        } while (nextCursor);

        const blobs = allResources.map((r) => {
            const url: string = r.secure_url || r.url || "";
            const pathname: string = r.public_id;
            const size: number = r.bytes ?? 0;
            const uploadedAt: string | undefined = r.created_at;
            const format: string | undefined = r.format;
            const resourceType: string | undefined = r.resource_type;
            const contentType =
                resourceType === "image" && format
                    ? `image/${format}`
                    : undefined;
            return { url, pathname, size, uploadedAt, contentType };
        });
        console.log("blobs", blobs);
        return NextResponse.json({ blobs });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: (error as Error)?.message ?? "Unexpected error" },
            { status: 500 }
        );
    }
}
