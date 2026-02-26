import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'M.Airaf Adil — Full-Stack Developer',
  description: 'Full-Stack Developer crafting innovative digital experiences with cutting-edge technologies. Specializing in React, Next.js, and enterprise solutions.',
  keywords: ['Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Developer', 'Portfolio'],
  authors: [{ name: 'M.Airaf Adil' }],
  openGraph: {
    title: 'M.Airaf Adil — Full-Stack Developer',
    description: 'Crafting innovative digital experiences with cutting-edge technologies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
