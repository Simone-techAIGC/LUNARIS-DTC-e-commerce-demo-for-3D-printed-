"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "—"

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <CheckCircle className="w-20 h-20 text-green-400 mb-6" />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5]">
        Thank you for your order!
      </h1>
      <p className="mt-3 text-[#9ca3af] text-lg">Order ID: {orderId}</p>
      <p className="mt-1 text-[#9ca3af] text-sm">
        A confirmation email has been sent.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-block bg-[#c9a55c] hover:bg-[#dbb96e] text-black font-semibold px-8 py-3 rounded-full transition-all duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-[#9ca3af]">
          Loading...
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
