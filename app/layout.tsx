import './globals.css'
import type { Metadata } from 'next'
import {cn} from '../lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

import { Toaster } from '@/components/ui/toaster'
import 'react-loading-skeleton/dist/skeleton.css'
import 'simplebar-react/dist/simplebar.min.css'

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
        <html lang="en" className='light'>
            <Providers>
                <body className={`!bg-gray-50 ${cn('min-h-screen font-sans antialiased grainy')}`}> 
                        <Toaster />
                        <Navbar />
                        {children}
                </body>
            </Providers>
        </html>
    )
}
