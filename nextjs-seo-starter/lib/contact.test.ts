import { describe, expect, it } from "vitest";
import { POST } from "../app/api/contact/route";

const req = (body: unknown, ip = "9.9.9.9") =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
const ok = { name: "Ann", email: "ann@example.com", message: "Hello there", startedAt: Date.now() - 5000 };

describe("POST /api/contact", () => {
  it("accepts a valid submission", async () => {
    const res = await POST(req(ok, "1.1.1.1"));
    expect(res.status).toBe(200);
  });
  it("rejects instant (bot) submissions", async () => {
    const res = await POST(req({ ...ok, startedAt: Date.now() }, "1.1.1.2"));
    expect(res.status).toBe(400);
  });
  it("silently drops honeypot hits", async () => {
    const res = await POST(req({ ...ok, company: "Spam Inc" }, "1.1.1.3"));
    expect(await res.json()).toEqual({ ok: true });
  });
  it("validates email", async () => {
    const res = await POST(req({ ...ok, email: "nope" }, "1.1.1.4"));
    expect(res.status).toBe(422);
  });
  it("rate limits repeated calls", async () => {
    const codes: number[] = [];
    for (let i = 0; i < 7; i++) codes.push((await POST(req(ok, "2.2.2.2"))).status);
    expect(codes.at(-1)).toBe(429);
  });
});
