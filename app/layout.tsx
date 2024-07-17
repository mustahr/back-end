import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import { ThemeProvider } from "@/providers/theme-provider"

import { ToasterProvider } from '@/providers/toast.provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Explore Morocco Dashboard',
  description: 'Build by Musta Hr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider
      appearance={{
        baseTheme: dark,
        /* The `elements: { footer: "hidden" }` configuration in the `ClerkProvider` component is customizing
        the appearance of the Clerk UI elements. In this case, it is specifically targeting the footer
        element and setting its visibility to "hidden". This means that the footer element within the
        ClerkProvider will not be displayed on the UI when this configuration is applied. */
        elements: {
          footer: "hidden",
          userButtonPopoverFooter: "hidden",
        },
      }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />
            {children}

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
