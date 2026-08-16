"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { steps, topics } from "@/lib/content/contact"
import { site } from "@/lib/content/site"

type Values = { topic: string; message: string; name: string; email: string }
type Errors = Partial<Record<keyof Values, string>>

const EASE = [0.22, 1, 0.36, 1] as const
const EMPTY: Values = { topic: "", message: "", name: "", email: "" }

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export default function ContactFlow() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [formError, setFormError] = useState<string | null>(null)
  /** Drives the slide direction so back doesn't animate like forward. */
  const [dir, setDir] = useState(1)

  const reduced = useReducedMotion()
  const firstField = useRef<HTMLElement>(null)
  const liveRegion = useRef<HTMLDivElement>(null)

  // Move focus to the new step's first control. Without this the flow is
  // unusable by keyboard — focus stays on a button that no longer exists.
  useEffect(() => {
    if (status === "sent") return
    const id = window.setTimeout(() => firstField.current?.focus(), reduced ? 0 : 320)
    return () => window.clearTimeout(id)
  }, [step, status, reduced])

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setFormError(null)
  }

  const validate = (index: number): boolean => {
    const next: Errors = {}
    if (index === 0 && !values.topic) next.topic = "Pick one to continue."
    if (index === 1 && values.message.trim().length < 20)
      next.message = "A sentence or two more, so I can reply usefully."
    if (index === 2) {
      if (!values.name.trim()) next.name = "Add your name."
      if (!values.email.trim()) next.email = "Add an email address."
      else if (!isEmail(values.email)) next.email = "That email doesn't look right."
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const advance = () => {
    if (!validate(step)) return
    setDir(1)
    if (step < steps.length - 1) setStep((s) => s + 1)
    else void submit()
  }

  const back = () => {
    setDir(-1)
    setFormError(null)
    setStep((s) => Math.max(0, s - 1))
  }

  const submit = async () => {
    setStatus("sending")
    setFormError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: "" }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors)
          setStep(data.fieldErrors.topic ? 0 : data.fieldErrors.message ? 1 : 2)
        }
        setFormError(data.error ?? "Couldn't send that. Try again.")
        setStatus("idle")
        return
      }
      setStatus("sent")
    } catch {
      setFormError("Network trouble. Try again, or email me directly.")
      setStatus("idle")
    }
  }

  // Enter advances everywhere; in the textarea it needs a modifier so plain
  // Enter still makes a new paragraph.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return
    const inTextarea = (e.target as HTMLElement).tagName === "TEXTAREA"
    if (inTextarea && !(e.metaKey || e.ctrlKey)) return
    e.preventDefault()
    advance()
  }

  const slide = {
    enter: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: dir > 0 ? 28 : -28 },
    center: { opacity: 1, x: 0 },
    exit: reduced
      ? { opacity: 0 }
      : { opacity: 0, x: dir > 0 ? -28 : 28 },
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex min-h-[22rem] flex-col justify-center"
        role="status"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cadet/30">
          <Check size={18} className="text-cadet" />
        </div>
        <h3 className="display-sm mt-7 text-cadet">Message sent.</h3>
        <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-cadet/70">
          Thanks {values.name.split(" ")[0]} — it&apos;s in my inbox. I&apos;ll
          reply to {values.email}, usually within a day.
        </p>
        <button
          onClick={() => {
            setValues(EMPTY)
            setStep(0)
            setStatus("idle")
          }}
          className="mt-8 self-start font-mono text-xs uppercase tracking-label text-cadet/60 underline underline-offset-4 transition-colors hover:text-cadet"
        >
          Send another
        </button>
      </motion.div>
    )
  }

  const current = steps[step]

  return (
    <div onKeyDown={onKeyDown} className="flex min-h-[20rem] flex-col">
      <div ref={liveRegion} aria-live="polite" className="sr-only">
        {`Step ${step + 1} of ${steps.length}. ${current.label}`}
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0.15 : 0.42, ease: EASE }}
          >
            <p className="text-sm text-cadet/70">{current.prompt}</p>

            <div className="mt-5">
              {current.id === "topic" && (
                <div role="radiogroup" aria-label={current.label} className="grid gap-2.5">
                  {topics.map((t, i) => {
                    const selected = values.topic === t.value
                    return (
                      <button
                        key={t.value}
                        ref={i === 0 ? (firstField as React.RefObject<HTMLButtonElement>) : undefined}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set("topic", t.value)}
                        className={`group flex items-start gap-3 border p-4 text-left transition-colors duration-500 ease-spine ${
                          selected
                            ? "border-cadet bg-cadet/[0.07]"
                            : "border-cadet/20 hover:border-cadet/50"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-1 h-2 w-2 shrink-0 rounded-full border transition-colors duration-300 ${
                            selected ? "border-cadet bg-cadet" : "border-cadet/40"
                          }`}
                        />
                        <span>
                          <span className="block font-mono text-sm text-cadet">
                            {t.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-cadet/55">
                            {t.hint}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {current.id === "brief" && (
                <div>
                  <label htmlFor="message" className="sr-only">
                    {current.label}
                  </label>
                  <textarea
                    id="message"
                    ref={firstField as React.RefObject<HTMLTextAreaElement>}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    rows={6}
                    placeholder="We're building a booking platform and the scheduling logic keeps breaking under load…"
                    aria-invalid={!!errors.message}
                    className="w-full resize-none border border-cadet/25 bg-transparent p-4 text-sm leading-relaxed text-cadet placeholder:text-cadet/35 focus:border-cadet focus:outline-none"
                  />
                  <p className="mt-2 text-right font-mono text-[11px] text-cadet/40">
                    {values.message.trim().length} characters
                  </p>
                </div>
              )}

              {current.id === "identity" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-mono text-[11px] uppercase tracking-label text-cadet/50"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      ref={firstField as React.RefObject<HTMLInputElement>}
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      className="mt-2 w-full border-b border-cadet/25 bg-transparent pb-2 text-sm text-cadet focus:border-cadet focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-2 font-mono text-[11px] text-cadet/70">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="font-mono text-[11px] uppercase tracking-label text-cadet/50"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      className="mt-2 w-full border-b border-cadet/25 bg-transparent pb-2 text-sm text-cadet focus:border-cadet focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-2 font-mono text-[11px] text-cadet/70">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {(errors.topic || errors.message) && (
              <p className="mt-3 font-mono text-[11px] text-cadet/70">
                {errors.topic ?? errors.message}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {formError && (
        <p className="mt-6 border border-cadet/30 bg-cadet/[0.06] p-3 font-mono text-[11px] leading-relaxed text-cadet">
          {formError}{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-2"
          >
            {site.email}
          </a>
        </p>
      )}

      <div className="mt-10 flex items-center gap-6">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-cadet/55 transition-colors hover:text-cadet"
          >
            <ArrowLeft size={13} /> Back
          </button>
        )}

        <button
          type="button"
          onClick={advance}
          disabled={status === "sending"}
          className="group relative inline-flex items-center gap-3 border border-cadet/30 px-7 py-3.5 font-mono text-xs uppercase tracking-label text-cadet transition-colors duration-500 ease-spine hover:border-cadet disabled:opacity-60"
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-cadet transition-transform duration-500 ease-spine group-hover:scale-x-100" />
          <span className="relative transition-colors duration-500 ease-spine group-hover:text-antique">
            {status === "sending"
              ? "Sending"
              : step === steps.length - 1
                ? "Send message"
                : "Next"}
          </span>
          {status === "sending" ? (
            <Loader2
              size={13}
              className="relative animate-spin transition-colors duration-500 ease-spine group-hover:text-antique"
            />
          ) : (
            <ArrowRight
              size={13}
              className="relative transition-colors duration-500 ease-spine group-hover:text-antique"
            />
          )}
        </button>
      </div>

      {/* Progress sits under the controls: it reports where you are, and
          that's a footnote to the question, not a preamble to it. */}
      <div className="mt-8 flex items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={`h-px w-10 transition-colors duration-500 ease-spine ${
                i <= step ? "bg-cadet" : "bg-cadet/25"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-label text-cadet/50">
          {String(step + 1).padStart(2, "0")} /{" "}
          {String(steps.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  )
}
