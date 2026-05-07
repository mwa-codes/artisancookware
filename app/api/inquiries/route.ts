import { NextResponse } from "next/server";
import { getSupabaseClient, getSupabaseServiceClient, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const {
            name,
            email,
            message,
            productId,
            company,
            country,
            buyer_type,
            quantity_requested,
            productInterest
        } = payload ?? {};

        if (!name || !email || !message) {
            return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
        }

        if (!isSupabaseConfigured()) {
            console.info("Inquiry received (Supabase not configured)", payload);
            return NextResponse.json({ success: true, stored: false });
        }

        const hasServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
        const client = hasServiceKey ? getSupabaseServiceClient() : getSupabaseClient();

        const submittedAt = new Date().toISOString();

        const row: Record<string, unknown> = {
            customer_name: name,
            email,
            message,
            product_id: productId ?? null,
            created_at: submittedAt
        };

        if (company != null) row.company_name = company;
        if (country != null) row.country = country;
        if (buyer_type != null) row.buyer_type = buyer_type;
        if (quantity_requested != null) row.quantity_requested = quantity_requested;

        const enrichedMessage =
            typeof productInterest === "string" && productInterest.trim()
                ? `[Interest: ${productInterest.trim()}]\n\n${message}`
                : message;

        row.message = enrichedMessage;

        const { error } = await client.from("inquiries").insert(row);

        if (error) {
            console.error("Failed to store inquiry", error);
            const legacyRow = {
                customer_name: name,
                email,
                message: enrichedMessage,
                product_id: productId ?? null,
                created_at: submittedAt
            };
            const retry = await client.from("inquiries").insert(legacyRow);
            if (retry.error) {
                console.error("Legacy inquiry insert failed", retry.error);
                return NextResponse.json({ message: "Unable to submit inquiry at this time." }, { status: 500 });
            }
            return NextResponse.json({ success: true, stored: true, submittedAt }, { status: 201 });
        }

        return NextResponse.json({ success: true, stored: true, submittedAt }, { status: 201 });
    } catch (error) {
        console.error("Inquiry submission error", error);
        return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
    }
}
