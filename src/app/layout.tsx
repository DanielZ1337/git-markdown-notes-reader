import './globals.css'
import {Inter} from 'next/font/google'
import {Toaster} from '@/components/toaster'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import links from '@/lib/links.json' assert {type: 'json'}
import Providers from '@/components/providers'
import {cn} from '@/lib/utils'
import NavigationEvents from "@/components/navigation-progressbar";
import {Suspense} from "react";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    metadataBase: new URL('https://fun-project-tau.vercel.app/'),
    title: {
        template: '%s | GitHub Repository Browser',
        default: 'GitHub Repository Browser',
    },
    description: 'Browse GitHub repositories with ease',
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: 'white'},
        {media: '(prefers-color-scheme: dark)', color: 'black'},
    ],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://fun-project-tau.vercel.app/',
        siteName: 'GitHub Repository Browser',
        title: 'GitHub Repository Browser',
        description: 'Browse GitHub repositories with ease',
        images: [
            {
                url: 'GitHub Repository Browser.png',
                width: 1200,
                height: 630,
                alt: 'GitHub Repository Browser',
            },
        ],
    },
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang='en'>
        <body
            className={cn(
                'min-h-screen bg-white dark:bg-black subpixel-antialiased py-12 px-4 flex flex-col',
                inter.className
            )}
        >
        <Suspense fallback={null}>
            <NavigationEvents/>
        </Suspense>
        <Providers>
            <div
                className={
                    'rounded-2xl container bg-neutral-50 dark:bg-neutral-950 flex flex-col flex-1 drop-shadow-[0px_0px_95px_rgba(59,41,92,0.45)]'
                }
            >
                <div className={'m-8 flex flex-col'}>
                    <Navbar/>
                    {children}
                </div>
            </div>
            <footer className={'text-center -mb-8 mt-3 text-neutral-500'}>
                Built with ❤️ by{' '}
                <Link
                    href={links.TWITTER}
                    className={'underline focus:outline-purple-500 outline-none rounded-md'}
                >
                    Daniel Bermann Schmidt
                </Link>
            </footer>
            <div className={'absolute left-0 top-0'}>
                <Toaster/>
            </div>
        </Providers>
        </body>
        </html>
    )
}
