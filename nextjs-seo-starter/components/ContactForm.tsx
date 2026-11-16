"use client";
import { useRef, useState } from "react";

export function ContactForm() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(fd), startedAt: startedAt.current }),
    });
    const json = await res.json().catch(() => ({ ok: false, error: "Unexpected error" }));
    if (json.ok) { setStatus("done"); e.currentTarget.reset(); }
    else { setStatus("error"); setError(json.error ?? "Something went wrong."); }
  }

  if (status === "done") return <p role="status">Thanks! We will get back to you shortly.</p>;

  return (
    <form onSubmit={onSubmit} className="form">
      <label>Name<input name="name" required maxLength={100} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      <label>Message<textarea name="message" required minLength={5} maxLength={2000} rows={4} /></label>
      {/* Honeypot */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <button disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message"}</button>
      {status === "error" && <p role="alert">{error}</p>}
    </form>
  );
}
