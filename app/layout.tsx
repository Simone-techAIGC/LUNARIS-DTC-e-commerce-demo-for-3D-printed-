import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/CartContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Toast from "@/components/Toast"
import ScrollProgress from "@/components/ScrollProgress"

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
      </body>
    </html>
  )
}
