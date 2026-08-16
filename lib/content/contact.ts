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
  /** Shown large, in the display face. This is the actual question. */
  question: string
  /** One line under it. Sets expectations; never repeats the question. */
  help: string
}

export const steps: Step[] = [
  {
    id: "topic",
    question: "What are you building?",
    help: "Pick the closest one. It only sets the starting point.",
  },
  {
    id: "brief",
    question: "Tell me about it.",
    help: "What it does, who it's for, and what's in the way right now.",
  },
  {
    id: "identity",
    question: "Where do I reply?",
    help: "I answer every genuine enquiry, usually within a day.",
  },
]
