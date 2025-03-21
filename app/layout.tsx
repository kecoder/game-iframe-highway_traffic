import type React from "react"
import "@/app/globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils"
import { GoogleAnalytics } from "@next/third-parties/google"
import { GA_TRACKING_ID } from "@/lib/analytics"
import AnalyticsProvider from "@/components/analytics-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata = {
  title: "Highway Traffic - Driving Avoidance Game",
  description:
    "Test your reflexes in this high-speed highway traffic avoidance game. Dodge vehicles and survive as long as possible!",
  keywords: "highway traffic, driving game, avoidance game, html5 game, browser game",
  manifest: "/manifest.json",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0F0F13" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="frame-src 'self' https://www.onlinegames.io https://*.onlinegames.io https://universal.wgplayer.com https://*.wgplayer.com;"
        />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, spaceGrotesk.variable)}>
        <AnalyticsProvider />
        {children}
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
      </body>
    </html>
  )
}



import './globals.css'