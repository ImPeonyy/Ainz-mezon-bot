"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type QueueItem = {
    id: string;
    file: File;
    status: "queued" | "uploading" | "uploaded" | "error";
    url?: string;
    error?: string;
};

type CloudinaryItem = {
    url: string;
    pathname: string;
    size: number;
    uploadedAt?: string;
    contentType?: string;
};

export default function Home() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [blobs, setBlobs] = useState<CloudinaryItem[]>([]);
    const [isListing, setIsListing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    const clearQueue = () => {
        setQueue([]);
    };

    const clearList = () => {
        setBlobs([]);
    };

    const onFilesSelected = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (files.length === 0) return;

        const items: QueueItem[] = files.map((file) => ({
            id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()
                .toString(36)
                .slice(2)}`,
            file,
            status: "queued",
        }));
        setQueue((prev) => [...items, ...prev]);

        // Bắt đầu upload ngay sau khi chọn
        await uploadFiles(items.map((i) => i.file));

        // Clear input value để chọn lại cùng file lần sau nếu cần
        if (inputRef.current) inputRef.current.value = "";
    };

    const uploadFiles = async (files: File[]) => {
        if (files.length === 0) return;
        setIsUploading(true);
        // Đánh dấu uploading
        setQueue((prev) =>
            prev.map((q) =>
                files.some(
                    (f) => f.name === q.file.name && f.size === q.file.size
                )
                    ? { ...q, status: "uploading" }
                    : q
            )
        );

        const form = new FormData();
        files.forEach((f) => form.append("files", f));

        try {
            const res = await fetch("/api/cloudinary/upload", {
                method: "POST",
                body: form,
            });
            const data: {
                results?: Array<{
                    name: string;
                    status: string;
                    url?: string;
                    error?: string;
                }>;
            } = await res.json();

            const results = data.results ?? [];

            setQueue((prev) =>
                prev.map((q) => {
                    const matched = results.find((r) => r.name === q.file.name);
                    if (!matched) return q;
                    if (matched.status === "uploaded") {
                        return { ...q, status: "uploaded", url: matched.url };
                    }
                    return {
                        ...q,
                        status: "error",
                        error: matched.error ?? "Upload failed",
                    };
                })
            );

            // Refresh list sau upload
            await fetchList();
        } catch (e: unknown) {
            setQueue((prev) =>
                prev.map((q) =>
                    files.some(
                        (f) => f.name === q.file.name && f.size === q.file.size
                    )
                        ? {
                              ...q,
                              status: "error",
                              error: (e as Error)?.message ?? "Upload error",
                          }
                        : q
                )
            );
        } finally {
            setIsUploading(false);
        }
    };

    const fetchList = async () => {
        setIsListing(true);
        try {
            const res = await fetch("/api/cloudinary/list");
            const data: { blobs?: CloudinaryItem[] } = await res.json();
            console.log(data);
            setBlobs(data.blobs ?? []);
        } catch {
            // noop
        } finally {
            setIsListing(false);
        }
    };

    useEffect(() => {
        // load list lần đầu
        fetchList();
    }, []);

    return (
        <div className=" flex items-start justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <div className="flex-1 max-w-xl w-full flex flex-col gap-[16px] items-stretch">
                <div className="flex gap-4 items-center">
                    <button
                        onClick={openFilePicker}
                        className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                    >
                        <Image
                            className="dark:invert"
                            src="/vercel.svg"
                            alt="Vercel logomark"
                            width={20}
                            height={20}
                        />
                        Upload pets
                    </button>
                    <button
                        onClick={fetchList}
                        disabled={isListing}
                        className="cursor-pointer rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
                    >
                        {isListing ? "Loading..." : "Get all pets"}
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={onFilesSelected}
                        className="hidden"
                    />
                </div>

                <div className="border rounded-md p-3 max-h-80 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">queue</div>
                        <button
                            onClick={clearQueue}
                            disabled={queue.length === 0 || isUploading}
                            className="cursor-pointer text-xs rounded-md border border-solid border-black/[.08] dark:border-white/[.145] px-2 py-1 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] disabled:opacity-50"
                        >
                            Clear
                        </button>
                    </div>
                    {queue.length === 0 ? (
                        <div className="text-sm text-neutral-500">
                            Chưa có file nào trong hàng đợi.
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {queue.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between gap-3 text-sm"
                                >
                                    <div className="truncate">
                                        {item.file.name}{" "}
                                        <span className="text-neutral-500">
                                            (
                                            {(item.file.size / 1024).toFixed(1)}{" "}
                                            KB)
                                        </span>
                                    </div>
                                    <div className="shrink-0">
                                        {item.status === "queued" && (
                                            <span className="text-yellow-600">
                                                Queued
                                            </span>
                                        )}
                                        {item.status === "uploading" && (
                                            <span className="text-blue-600">
                                                Uploading...
                                            </span>
                                        )}
                                        {item.status === "uploaded" && (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-green-600 underline"
                                            >
                                                Uploaded
                                            </a>
                                        )}
                                        {item.status === "error" && (
                                            <span className="text-red-600">
                                                Error
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {queue.some((q) => q.status === "queued") && (
                        <div className="mt-3">
                            <button
                                onClick={() =>
                                    uploadFiles(
                                        queue
                                            .filter(
                                                (q) => q.status === "queued"
                                            )
                                            .map((q) => q.file)
                                    )
                                }
                                disabled={isUploading}
                                className="rounded-md border border-solid border-black/[.08] dark:border-white/[.145] transition-colors px-3 py-2 text-sm hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                            >
                                {isUploading ? "Uploading..." : "Upload queued"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 max-w-[720px] w-full">
                <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">list</div>
                    <button
                        onClick={clearList}
                        disabled={blobs.length === 0 || isListing}
                        className="cursor-pointer text-xs rounded-md border border-solid border-black/[.08] dark:border-white/[.145] px-2 py-1 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] disabled:opacity-50"
                    >
                        Clear
                    </button>
                </div>
                <div className="h-screen overflow-y-auto border rounded-md p-3">
                    {blobs.length === 0 ? (
                        <div className="text-sm text-neutral-500">
                            Chưa có blob nào.
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {blobs.map((b) => (
                                <li
                                    key={b.pathname}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-20 h-20 rounded overflow-hidden border bg-white flex items-center justify-center">
                                        {/* Dùng img để tránh cần cấu hình domain cho next/image */}
                                        <img
                                            src={b.url}
                                            alt={b.pathname}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <a
                                            href={b.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="truncate block underline text-blue-600"
                                        >
                                            {b.url}
                                        </a>
                                        <div className="text-xs text-neutral-500 truncate">
                                            {b.pathname}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
