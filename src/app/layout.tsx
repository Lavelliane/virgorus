import type { Metadata } from 'next'
import {Providers} from "./providers";

import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css'

const inter = Inter({ subsets: ['latin'],
variable: '--font-inter', })

const efco = localFont({
  src: '../assets/fonts/EFCO_Brookshire_Regular.ttf',
  display: 'swap',
  variable: '--font-efco',
})

const playfairDisplay = Playfair_Display({ 
	subsets: ['latin'],
	variable: '--font-playfair',
});

const poppins = Poppins({ 
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['italic', 'normal']
});


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
      <body className={`${efco.variable} ${inter.className} ${playfairDisplay.variable} ${poppins.variable} bg-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}