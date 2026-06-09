'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { itemCount } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-lg border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-widest text-[#c9a55c]">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.82 0 3.53-.5 5-1.35-2.99-1.73-5-4.95-5-8.65s2.01-6.92 5-8.65C15.53 2.5 13.82 2 12 2z" />
          </svg>
          LUNARIS
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm text-[#9ca3af] hover:text-[#f5f5f5] transition-colors duration-300"
          >
            Products
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 text-[#9ca3af] hover:text-[#f5f5f5] transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c9a55c] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
