import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import ScrollToggle from '@/components/custom/ScrollToggle'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { NotificationsProvider } from '@/contexts/NotificationsContext'
import { ChatProvider } from '@/contexts/ChatContext'
import { headers } from 'next/headers'
import APP from '@/config'

import FloatingToolbar from '@/components/custom/FloatingToolbar'
import ChatBotAI from '@/components/custom/ChatBotAI'
import ChallengeTutorial from '@/components/challenges/ChallengeTutorial'
import ChallengeJoyride from '@/components/challenges/ChallengeJoyride'
import ChatToggle from '@/components/custom/ChatToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(APP.baseUrl),
  title: `${APP.shortName} - ${APP.fullName}`,
  description: APP.description,
  keywords: [
    'CTF',
    'Capture The Flag',
    'Cybersecurity',
    'Hacking Challenge',
    'CSCV',
    'InfoSec',
    'ctftime',
    'ctftime.org',
  ],
  authors: [{ name: 'ariafatah', url: APP.baseUrl }],
  creator: 'ariafatah',
  publisher: APP.fullName,
  applicationName: APP.fullName,
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: `${APP.shortName} - ${APP.fullName}`,
    description: APP.description,
    url: APP.baseUrl,
    siteName: APP.fullName,
    images: [
      {
        url: `${APP.baseUrl}/${APP.image_preview}`,
        width: 1200,
        height: 630,
        alt: `${APP.shortName} - ${APP.fullName}`,
        type: 'image/png',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP.shortName} - ${APP.fullName}`,
    description: APP.description,
    images: [`${APP.baseUrl}/${APP.image_icon}`],
  },
  alternates: {
    canonical: APP.baseUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // ❗ headers() TIDAK async → jangan pakai await
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isMaintenancePage = pathname === '/maintenance'

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {isMaintenancePage ? (
          children
        ) : (
          <ThemeProvider>
            <ChatProvider>
              <AuthProvider>
                <NotificationsProvider>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    <Navbar />
                    <div className="pt-14">{children}</div>

                    <Toaster position="top-right" reverseOrder={false} />

                    <ChallengeJoyride />

                    <FloatingToolbar>
                      {APP.ChallengeTutorial && <ChallengeTutorial />}
                      {APP.ChatBotAI && <ChatToggle />}
                    </FloatingToolbar>

                    {APP.ChatBotAI && <ChatBotAI />}

                    <ScrollToggle />
                  </div>
                </NotificationsProvider>
              </AuthProvider>
            </ChatProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  )
}
