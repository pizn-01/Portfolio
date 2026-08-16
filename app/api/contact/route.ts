import { NextResponse } from "next/server"
import { topics } from "@/lib/content/contact"

/**
 * Contact submissions.
 *
 * Sends through Resend's REST API directly — no SDK, because one fetch call
 * doesn't justify a dependency. Requires RESEND_API_KEY; without it the route
 * says so plainly instead of pretending the message went somewhere.
 *
 *   RESEND_API_KEY=re_xxx          required
 *   CONTACT_TO=you@example.com     defaults to the site owner's address
 *   CONTACT_FROM=...               must be a Resend-verified sender
 */

export const runtime = "nodejs"

const MAX = { name: 120, email: 200, message: 4000 }

/** Crude per-IP throttle. Resets on redeploy, which is fine at this scale. */
const hits = new Map<string, number[]>()
const WINDOW_MS = 60 * 60 * 1000
const LIMIT = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > LIMIT
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 })
  }

  // Honeypot. Real people never fill this; bots usually do.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  const name = String(body.name ?? "").trim()
  const email = String(body.email ?? "").trim()
  const message = String(body.message ?? "").trim()
  const topic = String(body.topic ?? "").trim()

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = "Add your name."
  if (!email) fieldErrors.email = "Add an email address."
  else if (!isEmail(email)) fieldErrors.email = "That email doesn't look right."
  if (message.length < 20)
    fieldErrors.message = "A sentence or two more, so I can reply usefully."
  if (!topics.some((t) => t.value === topic))
    fieldErrors.topic = "Pick one of the options."

  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "That's too long to send." }, { status: 413 })
  }

  if (Object.keys(fieldErrors).length) {
    return NextResponse.json({ fieldErrors }, { status: 422 })
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "That's a few messages in a row — try again later." },
      { status: 429 },
    )
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set; message not sent.")
    return NextResponse.json(
      {
        error:
          "Sending isn't configured yet. Email airafadil619@gmail.com directly.",
      },
      { status: 503 },
    )
  }

  const label = topics.find((t) => t.value === topic)?.label ?? topic

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? "airafadil619@gmail.com"],
      reply_to: email,
      subject: `${label} — ${name}`,
      text: `${label}\n\nFrom: ${name} <${email}>\n\n${message}`,
    }),
  })

  if (!res.ok) {
    console.error("[contact] Resend responded", res.status, await res.text())
    return NextResponse.json(
      { error: "Couldn't send that. Try again, or email me directly." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
