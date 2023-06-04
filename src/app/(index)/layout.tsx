import Link from 'next/link'
import '../globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'MailTrackJS - Open Source Email Tracking',
    description: 'Open source email read receipts and link tracking',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <NavBar />
                {children}
            </body>
        </html>
    )
}
