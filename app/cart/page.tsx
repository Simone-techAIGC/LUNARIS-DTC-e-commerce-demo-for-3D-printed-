"use client"

import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import ProductImage from "@/components/ProductImage"
import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
        <ShoppingBag className="w-16 h-16 text-[#262626]" />
        <p className="text-xl text-[#9ca3af]">Your cart is empty</p>
        <Link
          href="/products"
          className="bg-[#c9a55c] hover:bg-[#dbb96e] text-black font-semibold px-8 py-3 rounded-full transition-all duration-300"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#f5f5f5] mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-[#1a1a1a] border border-[#262626] rounded-2xl p-4"
            >
              <ProductImage
                productId={item.id}
                className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl"
              />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#f5f5f5] truncate">
                  {item.name}
                </p>
                <p className="text-[#c9a55c] text-sm mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center border border-[#262626] rounded-full overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-[#262626] transition-colors duration-200"
                >
                  <Minus className="w-3.5 h-3.5 text-[#f5f5f5]" />
                </button>
                <span className="w-10 text-center text-sm text-[#f5f5f5] font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-[#262626] transition-colors duration-200"
                >
                  <Plus className="w-3.5 h-3.5 text-[#f5f5f5]" />
                </button>
              </div>

              <p className="text-[#f5f5f5] font-semibold w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 h-fit sticky top-24">
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
          <Link
            href="/checkout"
            className="mt-6 block w-full text-center bg-[#c9a55c] hover:bg-[#dbb96e] text-black font-semibold py-3.5 rounded-full transition-all duration-300"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
