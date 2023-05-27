import "./globals.css";
import Head from "next/head";
import Link from "next/link";
import React, {ReactNode} from "react";
import NavBar from "@/components/NavBar";
import { Roboto_Slab } from "next/font/google";
import BaseProvider from "@/context/BaseProvider";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
    title: "Home | DevLab",
};

export default function RootLayout({
    children,
}: {
  children: ReactNode,
}) {
    return (
        <html lang="en">
            <body className={robotoSlab.className}>
                <div className="flex flex-col min-h-screen bg-background dark:bg-dark-background">
                    <Head>
                        <meta name="application-name" content="DevLab"/>
                        <meta name="theme-color" content="#404040"/>
                        <meta name="description" content="The fun and effective study game for software engineers"/>
                        <meta name="robots" content="index,follow"/>
                        <meta name="googlebot" content="index,follow"/>
                        <meta property="og:url" content="https://devlab.fullstackdan.com"/>
                        <meta property="og:type" content="website"/>
                        <meta property="og:title" content="DevLab"/>
                        <meta property="og:image" content="/og-image.png"/>
                        <meta property="og:image:alt" content="An icon of a bubbling potion or beaker"/>
                        <meta property="og:description"
                            content="The fun and effective study game for software engineers"/>
                        <meta property="og:site_name" content="DevLab"/>
                        <meta property="og:locale" content="en_US"/>
                        <meta property="article:author" content="Dan Groleau"/>
                        <link rel="icon" href="/favicon.ico" />
                        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                    </Head>
                    <BaseProvider>
                        <header className='flex h-[82px] bg-nav dark:bg-dark-nav'>
                            <NavBar/>
                        </header>
                        <main className="flex-1 w-full flex justify-center">
                            <section className='w-[95%]'>
                                {children}
                            </section>
                        </main>
                        <footer className="flex w-full justify-center bg-nav dark:bg-dark-nav">
                            <section className='w-[95%] flex justify-between py-2'>
                                <small className="text-secondary dark:text-dark-secondary">
                                ©{new Date().getFullYear()} DevLab
                                </small>
                                <small className="text-secondary dark:text-dark-secondary"><Link href={"/privacy"}>
                              Privacy and Terms of Use</Link>
                                </small>
                            </section>
                        </footer>
                    </BaseProvider>
                </div>
            </body>
        </html>
    );
}
