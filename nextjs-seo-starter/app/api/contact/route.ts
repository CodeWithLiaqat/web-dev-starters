import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`contact:${ip}`).ok) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again soon." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 }); }

  // Honeypot: real users never fill this hidden field.
  if (clean(body.company, 100)) return NextResponse.json({ ok: true });

  // Time trap: bots submit instantly.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return NextResponse.json({ ok: false, error: "Please try again." }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const message = clean(body.message, 2000);
  if (!name || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json({ ok: false, error: "Please fill in all fields correctly." }, { status: 422 });
  }

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, ip, at: new Date().toISOString() }),
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: "Could not deliver message." }, { status: 502 });
  } else {
    console.log("[contact]", { name, email, message });
  }
  return NextResponse.json({ ok: true });
}
