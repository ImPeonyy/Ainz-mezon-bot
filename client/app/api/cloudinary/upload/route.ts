import { NextResponse } from "next/server";
import { cloudinary } from "@/configs";
import { CLOUDINARY_PETS_FOLDER } from "@/constants";

export const runtime = "nodejs";

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

        const folder =
            process.env.CLOUDINARY_ROOT_FOLDER + "/" + CLOUDINARY_PETS_FOLDER;

        const uploadResults = await Promise.all(
            files.map(async (file) => {
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const uploadResponse = await new Promise<any>(
                        (resolve, reject) => {
                            const stream = cloudinary.uploader.upload_stream(
                                { folder, resource_type: "image" },
                                (error, result) => {
                                    if (error) return reject(error);
                                    resolve(result);
                                }
                            );
                            stream.end(buffer);
                        }
                    );

                    return {
                        name: file.name,
                        status: "uploaded" as const,
                        url: uploadResponse.secure_url || uploadResponse.url,
                        pathname: uploadResponse.public_id,
                        size: uploadResponse.bytes ?? file.size,
                        type:
                            uploadResponse.resource_type === "image" &&
                            uploadResponse.format
                                ? `image/${uploadResponse.format}`
                                : file.type,
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
