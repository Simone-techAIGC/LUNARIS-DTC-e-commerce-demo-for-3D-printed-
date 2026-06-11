import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Toast from "@/components/Toast"
import ScrollProgress from "@/components/ScrollProgress"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LUNARIS — 3D Printed Moon Lamps",
  description:
    "Handcrafted 3D printed moon lamps. Touch control, 16 colors, and a warm glow.",
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <ScrollProgress />
          <Navbar />
          <main className="min-h-screen pt-16 page-enter">{children}</main>
          <Footer />
          <Toast />
        </CartProvider>

        {/* 追踪脚本 — 所有页面自动加载 */}
        <Script id="tracker" strategy="afterInteractive">
          {`
            (function(){
              var site = 'lunaris';
              var img = new Image();
              img.src = 'https://analytics-tracker.daifayo7.workers.dev/collect?site=' + site + '&p=' + encodeURIComponent(location.pathname);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
