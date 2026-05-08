import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseClient, getSupabaseServiceClient, isSupabaseConfigured } from "@/lib/supabase";

type InquiryNotification = {
    idempotencyKey: string;
    name: string;
    email: string;
    message: string;
    company?: string | null;
    country?: string | null;
    buyerType?: string | null;
    quantityRequested?: string | null;
    productInterest?: string | null;
    submittedAt: string;
};

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatField(label: string, value?: string | null) {
    return value ? `${label}: ${value}` : `${label}: -`;
}

function cleanEnvValue(value: string) {
    return value.trim().replace(/^["']|["']$/g, "");
}

async function sendInquiryNotification(inquiry: InquiryNotification) {
    const apiKey = process.env.RESEND_API_KEY;
    const notifyTo = cleanEnvValue(process.env.INQUIRY_NOTIFY_TO ?? "info@artisancookware.co");
    const notifyFrom = cleanEnvValue(process.env.INQUIRY_NOTIFY_FROM ?? "Artisan Cookware <no-reply@artisancookware.co>");

    if (!apiKey) {
        console.info("Skipping inquiry email notification: RESEND_API_KEY is not configured.");
        return;
    }

    const resend = new Resend(apiKey);
    const subject = `New inquiry from ${inquiry.name}`;
    const details = [
        formatField("Name", inquiry.name),
        formatField("Email", inquiry.email),
        formatField("Company", inquiry.company),
        formatField("Country", inquiry.country),
        formatField("Buyer type", inquiry.buyerType),
        formatField("Quantity", inquiry.quantityRequested),
        formatField("Product interest", inquiry.productInterest),
        formatField("Submitted at", inquiry.submittedAt)
    ];

    const { data, error } = await resend.emails.send({
        from: notifyFrom,
        to: notifyTo,
        replyTo: inquiry.email,
        subject,
        text: `${details.join("\n")}\n\nMessage:\n${inquiry.message}`,
        html: `
            <h2>New wholesale inquiry</h2>
            <ul>
                ${details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}
            </ul>
            <h3>Message</h3>
            <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br />")}</p>
        `
    }, {
        idempotencyKey: inquiry.idempotencyKey
    });

    if (error) {
        console.error("Resend inquiry email failed", error);
        return;
    }

    console.info("Resend inquiry email sent", data);
}

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
        const inquiryRequestId = crypto.randomUUID();

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

        const notification: InquiryNotification = {
            idempotencyKey: `inquiry-notification/${inquiryRequestId}`,
            name,
            email,
            message,
            company,
            country,
            buyerType: buyer_type,
            quantityRequested: quantity_requested,
            productInterest,
            submittedAt
        };

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
            await sendInquiryNotification(notification).catch((emailError) => {
                console.error("Failed to send inquiry email notification", emailError);
            });
            return NextResponse.json({ success: true, stored: true, submittedAt }, { status: 201 });
        }

        await sendInquiryNotification(notification).catch((emailError) => {
            console.error("Failed to send inquiry email notification", emailError);
        });

        return NextResponse.json({ success: true, stored: true, submittedAt }, { status: 201 });
    } catch (error) {
        console.error("Inquiry submission error", error);
        return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
    }
}
