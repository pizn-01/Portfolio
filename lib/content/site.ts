/**
 * Identity and the stack-layer taxonomy that structures the whole page.
 *
 * The layers are not decoration: they replace the old 01/02/03 eyebrows,
 * which encoded nothing. A full-stack engineer's work genuinely descends
 * from client to data, and the Spine traces that descent.
 */

export const site = {
  name: "M. Airaf Adil",
  shortName: "Airaf",
  role: "Lead Full Stack Engineer",
  location: "Karachi, Pakistan",
  since: 2019,
  email: "airafadil619@gmail.com",
  phone: "+92 334 3365685",
  links: {
    github: "https://github.com/pizn-01",
    linkedin: "https://www.linkedin.com/in/muhammad-airaf-adil-b12b33322",
    twitter: "https://twitter.com/pizn_01",
    instagram: "https://www.instagram.com/pizn_01",
    upwork:
      "https://www.upwork.com/freelancers/~0159c66e59525f8826?s=1110580755107926016",
  },
} as const

export const yearsOfExperience = new Date().getFullYear() - site.since

export type Layer = {
  id: string
  label: string
  index: number
}

/** Ordered top to bottom — the Spine follows this sequence. */
export const layers: Layer[] = [
  { id: "about", label: "Client", index: 0 },
  { id: "skills", label: "Interface", index: 1 },
  { id: "experience", label: "Service", index: 2 },
  { id: "projects", label: "Delivery", index: 3 },
  { id: "contact", label: "Data", index: 4 },
]

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
]
