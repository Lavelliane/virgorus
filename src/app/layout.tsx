import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local';
import {Providers} from "./providers";
import './globals.css'

const inter = Inter({ subsets: ['latin'],
variable: '--font-inter', })

const efco = localFont({
  src: '../assets/fonts/EFCO_Brookshire_Regular.ttf',
  display: 'swap',
  variable: '--font-efco',
})

export const metadata: Metadata = {
  title: 'Virgorus',
  description: 'EXPLORE | DISCOVER | WANDER',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${efco.variable} ${inter.className}`}>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  )
}