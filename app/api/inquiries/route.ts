import { NextResponse } from "next/server";
import { getSupabaseClient, getSupabaseServiceClient, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const { name, email, message, productId } = payload ?? {};

        if (!name || !email || !message) {
            return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
        }

        if (!isSupabaseConfigured()) {
            console.info("Inquiry received (Supabase not configured)", { name, email, message, productId });
            return NextResponse.json({ success: true, stored: false });
        }

        const hasServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
        const client = hasServiceKey ? getSupabaseServiceClient() : getSupabaseClient();

        const submittedAt = new Date().toISOString();

        const { error } = await client.from("inquiries").insert({
            customer_name: name,
            email,
            message,
            product_id: productId ?? null,
            created_at: submittedAt
        });

        if (error) {
            console.error("Failed to store inquiry", error);
            return NextResponse.json({ message: "Unable to submit inquiry at this time." }, { status: 500 });
        }

        return NextResponse.json({ success: true, stored: true, submittedAt }, { status: 201 });
    } catch (error) {
        console.error("Inquiry submission error", error);
        return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
    }
}
