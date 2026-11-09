import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ChatFAB } from "@/components/ChatFAB";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://charanselvam.dev';
const TITLE = 'Charanselvam S | AI Integration Engineer';
const DESCRIPTION =
  'AI Integration Engineer with 5+ years of enterprise Java and Spring Boot experience. Ships LLM-powered features to production. 4 OCI AI certifications. Chennai, India.';

export const metadata: Metadata = {
  title: { default: TITLE, template: '%s | Charanselvam S' },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Charanselvam S',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SmoothScroll>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <ChatFAB />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
