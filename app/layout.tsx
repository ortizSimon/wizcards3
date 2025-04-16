import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wizcards',
  description: 'Academia de Wizards',
  generator: 'simon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
