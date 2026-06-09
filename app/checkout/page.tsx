"use client"

import { useEffect, useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  })

  useEffect(() => {
    if (items.length === 0) router.replace("/products")
  }, [items, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2000))

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          customer: {
            email: form.email,
            name: form.name,
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
          total,
        }),
      })

      const data = await res.json()

      if (data.success) {
        clearCart()
        router.push(`/order-confirmation?orderId=${data.orderId}`)
      } else {
        alert("Something went wrong. Please try again.")
        setLoading(false)
      }
    } catch {
      alert("Network error. Please try again.")
      setLoading(false)
    }
  }

  if (items.length === 0) return null

  const inputClass =
    "w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-3 text-[#f5f5f5] placeholder-[#6b7280] focus:outline-none focus:border-[#c9a55c] transition-colors duration-300"

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#f5f5f5] mb-10">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-5 gap-10"
      >
        {/* Billing form */}
        <div className="lg:col-span-3 space-y-5">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            name="name"
            required
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            name="address"
            required
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className={inputClass}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="city"
              required
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="postalCode"
              required
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <input
            name="country"
            required
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-[#f5f5f5] mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm text-[#9ca3af]">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#262626] flex justify-between text-lg font-bold text-[#f5f5f5]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-[#c9a55c] hover:bg-[#dbb96e] disabled:opacity-70 text-black font-semibold py-3.5 rounded-full transition-all duration-300"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
