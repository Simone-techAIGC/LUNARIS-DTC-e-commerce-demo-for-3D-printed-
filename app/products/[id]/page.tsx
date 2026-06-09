"use client"


import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Minus, Plus, ShoppingBag, Star, ChevronLeft, Check,
  Zap, Sun, Timer, Palette, Cpu, Ruler, Gift, Truck,
} from "lucide-react"
import ProductImage from "@/components/ProductImage"
import products from "../../../data/products.json"
import reviewsData from "../../../data/reviews.json"
import { useCart } from "@/context/CartContext"


// 导出 generateStaticParams 函数
export async function generateStaticParams() {
  // 返回所有产品的 id 列表
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductTheme {
  accent: string
  accentDim: string
  bg: string
  bgCard: string
  glow: string
  vibe: string
  emoji: string
  tagline: string
}

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  inStock: boolean
  badge: string
  rating: number
  reviewCount: number
  features: string[]
  specs: { label: string; value: string }[]
  theme: ProductTheme
}

interface Review {
  id: string
  productId: string
  author: string
  avatar: string
  rating: number
  title: string
  text: string
  date: string
}

const featureIcons = [Zap, Sun, Timer, Palette, Cpu, Gift]

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < rating ? "fill-[#c9a55c] text-[#c9a55c]" : "text-[#404040]"
        return <Star key={i} className={`${cls} ${fill}`} />
      })}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 hover:border-[#333] transition-colors duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center text-sm font-semibold text-[#c9a55c]">
          {review.avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-[#f5f5f5]">{review.author}</p>
          <p className="text-xs text-[#6b7280]">{review.date}</p>
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-2 text-sm font-medium text-[#f5f5f5]">{review.title}</p>
      <p className="mt-1 text-sm text-[#9ca3af] leading-relaxed">{review.text}</p>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-[#262626] last:border-0">
      <span className="text-sm text-[#9ca3af]">{label}</span>
      <span className="text-sm text-[#f5f5f5] font-medium">{value}</span>
    </div>
  )
}

function RelatedProduct({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex-shrink-0 w-56 bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden hover:border-[#333] transition-all duration-300"
    >
      <ProductImage productId={product.id} />
      <div className="p-3">
        <p className="text-sm font-medium text-[#f5f5f5] group-hover:text-[#c9a55c] transition-colors">
          {product.name}
        </p>
        <p className="text-sm text-[#c9a55c] font-semibold mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const product = (products as Product[]).find((p) => p.id === id)
  const reviews = (reviewsData as Review[]).filter((r) => r.productId === id)
  const related = (products as Product[]).filter((p) => p.id !== id).slice(0, 3)

  const t = product?.theme

  const handleAdd = () => {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    })
    setAdded(true)
    setTimeout(() => {
      router.push("/cart")
    }, 600)
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-[#9ca3af]">
        <div className="text-center">
          <p className="text-5xl mb-4">🔮</p>
          <p className="text-lg">Product not found</p>
          <Link href="/products" className="mt-4 inline-flex items-center gap-2 text-sm text-[#c9a55c] hover:underline">
            <ChevronLeft className="w-4 h-4" /> Back to collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      {/* Back navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-[#9ca3af] hover:text-[#c9a55c] transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to collection
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative" style={{ animation: "fadeIn 0.6s ease-out" }}>
            <div
              className="absolute inset-0 rounded-3xl opacity-30 blur-3xl"
              style={{
                background: t ? `radial-gradient(circle, ${t.glow}, transparent 70%)` : undefined,
              }}
            />
            <div
              className="relative rounded-3xl border overflow-hidden"
              style={{ borderColor: t ? `${t.accent}20` : "#262626" }}
            >
              <ProductImage productId={product.id} />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6" style={{ animation: "fadeIn 0.6s ease-out 0.2s both" }}>
            {t && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: `${t.accent}12`,
                  borderColor: `${t.accent}25`,
                  color: t.accent,
                }}
              >
                <span>{t.emoji}</span>
                <span>{t.vibe}</span>
                <span className="opacity-50">·</span>
                <span>{t.tagline}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f5] tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(product.rating)} size="md" />
              <span className="text-sm text-[#9ca3af]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#f5f5f5]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#6b7280] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="text-[#9ca3af] leading-relaxed text-base">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                  <span className="text-sm text-green-400">In Stock — Ready to ship</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-sm text-red-400">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-[#262626] rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3.5 hover:bg-[#262626] transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-[#f5f5f5]" />
                </button>
                <span className="w-14 text-center text-[#f5f5f5] font-medium tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3.5 hover:bg-[#262626] transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-[#f5f5f5]" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-base ${
                  added
                    ? "bg-green-500 text-white scale-95"
                    : "bg-[#c9a55c] hover:bg-[#dbb96e] text-black"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#6b7280]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Free shipping over $50
              </span>
              <span className="flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" /> 30-day returns
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> 1-year warranty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features + Specs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features */}
          <div className="section-enter">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#c9a55c]" />
              Key Features
            </h2>
            <ul className="space-y-3">
              {product.features.map((f, i) => {
                const Icon = featureIcons[i % featureIcons.length]
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#9ca3af]">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: t ? `${t.accent}15` : undefined,
                        color: t?.accent || "#c9a55c",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {f}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Specs */}
          <div className="section-enter" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#c9a55c]" />
              Specifications
            </h2>
            <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5">
              {product.specs.map((spec, i) => (
                <SpecRow key={i} label={spec.label} value={spec.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1a1a1a]">
        <div className="section-enter">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#f5f5f5] flex items-center gap-2">
                <Star className="w-5 h-5 text-[#c9a55c] fill-[#c9a55c]" />
                Customer Reviews
              </h2>
              <p className="text-sm text-[#9ca3af] mt-1">
                {reviews.length} verified reviews — average {product.rating} / 5
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2">
              <span className="text-2xl font-bold text-[#c9a55c]">{product.rating}</span>
              <div className="text-xs text-[#9ca3af]">
                <StarRating rating={Math.round(product.rating)} />
                <span className="mt-0.5 block">{product.reviewCount} reviews</span>
              </div>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#6b7280]">
              <p className="text-4xl mb-3">💬</p>
              <p>No reviews yet for this product.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1a1a1a]">
          <div className="section-enter">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6">
              You Might Also Like
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
              {related.map((p) => (
                <div key={p.id} className="snap-start">
                  <RelatedProduct product={p as Product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
