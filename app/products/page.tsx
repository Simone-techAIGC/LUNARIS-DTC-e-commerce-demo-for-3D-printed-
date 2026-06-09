import Link from "next/link"
import { Star } from "lucide-react"
import ProductImage from "@/components/ProductImage"
import products from "../../data/products.json"

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

const badgeStyles: Record<string, string> = {
  SALE: "bg-red-500/20 text-red-300 border-red-500/30",
  BESTSELLER: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  PREMIUM: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  NEW: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "BEST VALUE": "bg-blue-500/20 text-blue-300 border-blue-500/30",
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <Star key={i} className="w-3 h-3 fill-[#c9a55c] text-[#c9a55c]" />
        if (i === full && half) return <Star key={i} className="w-3 h-3 fill-[#c9a55c]/50 text-[#c9a55c]/50" />
        return <Star key={i} className="w-3 h-3 text-[#404040]" />
      })}
    </div>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const t = product.theme
  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className="group relative bg-[#1a1a1a] border border-[#262626] rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 card-enter"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${t.glow}, transparent 70%)`,
        }}
      />

      <div className="relative">
        <ProductImage productId={product.id} />
        <div
          className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm"
          style={{
            backgroundColor: `${t.accent}15`,
            borderColor: `${t.accent}30`,
            color: t.accent,
          }}
        >
          <span className="text-sm">{t.emoji}</span>
          <span>{t.vibe}</span>
        </div>

        <div
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            badgeStyles[product.badge] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
          }`}
        >
          {product.badge}
        </div>

        {product.originalPrice && (
          <div className="absolute bottom-20 left-3">
            <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      <div className="relative p-5 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-[#9ca3af]">{t.emoji}</span>
          <span className="text-[10px] uppercase tracking-widest text-[#9ca3af]">{t.vibe}</span>
        </div>

        <h2
          className="text-lg font-semibold group-hover:brightness-110 transition-all duration-300"
          style={{ color: t.accent }}
        >
          {product.name}
        </h2>

        <p className="mt-1 text-sm text-[#9ca3af] leading-relaxed line-clamp-2">
          {t.tagline}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-bold text-[#f5f5f5]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#6b7280] line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-[#6b7280]">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ProductsPage() {
  const typedProducts = products as Product[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 page-enter">
      <div className="text-center mb-12">
        <span className="text-4xl mb-4 block">✨</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f5] mb-3 tracking-tight">
          Our Collection
        </h1>
        <p className="text-[#9ca3af] text-lg max-w-xl mx-auto">
          Each lamp is 3D printed, hand-finished, and designed to bring a piece of the cosmos into your home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {typedProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  )
}
