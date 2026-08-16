/**
 * The contact flow asks three questions, one screen at a time.
 *
 * A single form with six fields reads as paperwork. Asking one thing at a
 * time makes the exchange feel like the start of a conversation, which is
 * what the section is actually for — and it means each answer gets the whole
 * screen and a real question rather than a shrunken label.
 */

export type Topic = {
  value: string
  label: string
  hint: string
}

export const topics: Topic[] = [
  {
    value: "new-product",
    label: "A new product",
    hint: "Nothing built yet — architecture through launch",
  },
  {
    value: "existing",
    label: "Something already running",
    hint: "New features, a rebuild, or taking it the rest of the way",
  },
  {
    value: "platform",
    label: "Platform & architecture",
    hint: "Schema design, APIs, auth, scaling decisions",
  },
  {
    value: "other",
    label: "Something else",
    hint: "Tell me and we'll work out whether I'm the right fit",
  },
]

export type Step = {
  id: "topic" | "brief" | "identity"
  /**
   * The prompt. Kept to one quiet line rather than a display-size heading —
   * the section already says "Let's build something", and a second large
   * question above the controls just pushed the form down the page.
   */
  prompt: string
  /** Used for the screen-reader announcement and the field's accessible name. */
  label: string
}

export const steps: Step[] = [
  {
    id: "topic",
    prompt: "Pick the closest starting point.",
    label: "What are you building?",
  },
  {
    id: "brief",
    prompt: "What it does, who it's for, and what's in the way right now.",
    label: "Tell me about the project",
  },
  {
    id: "identity",
    prompt: "Where should I reply? I answer within a day.",
    label: "Your name and email",
  },
]
