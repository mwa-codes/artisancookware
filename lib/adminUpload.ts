import { randomUUID } from "crypto";
import { Buffer } from "node:buffer";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseServiceClient } from "@/lib/supabase";

export async function ensureStorageBucket(supabase: SupabaseClient, bucket: string) {
    const { data, error } = await supabase.storage.getBucket(bucket);

    if (data) {
        return { success: true as const };
    }

    if (error && !error.message?.toLowerCase?.().includes("not found")) {
        return { success: false as const, error: error.message };
    }

    const { error: createError } = await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: "10MB",
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"]
    });

    if (createError) {
        return { success: false as const, error: createError.message };
    }

    return { success: true as const };
}

export async function uploadImage(file: File | null, bucket: string) {
    if (!file || file.size === 0) return { publicUrl: null as string | null, path: null as string | null };

    const supabase = getSupabaseServiceClient();
    const ensureBucket = await ensureStorageBucket(supabase, bucket);
    if (!ensureBucket.success) {
        console.error("ensureStorageBucket", ensureBucket.error);
        return {
            publicUrl: null,
            path: null,
            error: ensureBucket.error ?? "Storage bucket unavailable."
        };
    }

    const extension = file.name.split(".").pop();
    const fileName = `${randomUUID()}${extension ? `.${extension}` : ""}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, Buffer.from(arrayBuffer), {
        upsert: true,
        contentType: file.type
    });

    if (uploadError) {
        console.error("uploadImage", uploadError);
        const message = uploadError.message ?? "Unable to upload image.";
        return { publicUrl: null, path: null, error: `Unable to upload image: ${message}` };
    }

    const {
        data: { publicUrl }
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return { publicUrl, path: fileName };
}
