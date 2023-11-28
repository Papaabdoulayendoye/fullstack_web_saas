import './globals.css'
import type { Metadata } from 'next'
import {cn} from '../lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
    title: 'Quill',
    description: 'Build an amazing SAAS web app with Josh',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cn('min-h-screen font-sans antialiased grainy')}> 
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
