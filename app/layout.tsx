import './globals.css';
import Head from "next/head";
import Link from "next/link";
import React from "react";
import NavBar from "@/components/NavBar";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export const metadata = {
  title: 'Home | DevLab',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={robotoSlab.className}>
        <div className={`app-container`}>
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
            <meta property="og:description" content="The fun and effective study game for software engineers"/>
            <meta property="og:site_name" content="DevLab"/>
            <meta property="og:locale" content="en_US"/>
            <meta property="article:author" content="Dan Groleau"/>
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
          </Head>
          <header className='nav-container'>
            <NavBar/>
          </header>
          <main>
            <section className='inner-container'>
              {children}
            </section>
          </main>
          <footer>
            <section className='inner-container'>
              <small>©{new Date().getFullYear()} DevLab</small>
              <small><Link href={"/privacy"}>Privacy and Terms of Use</Link></small>
            </section>
          </footer>
        </div>
      </body>
    </html>
  );
}
