'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Toast() {
  const { items } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (items.length > 0) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [items.length])

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-[#1a1a1a] border border-[#262626] rounded-xl px-5 py-3 shadow-2xl transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      <CheckCircle className="w-5 h-5 text-green-400" />
      <span className="text-sm text-[#f5f5f5] font-medium">Added to cart!</span>
    </div>
  )
}
