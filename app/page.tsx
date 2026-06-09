import Link from "next/link"
import { Truck, Star, Shield } from "lucide-react"

export default function Home() {
  return (
    <div>
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a55c]/15 via-[#0f0f0f] to-[#0f0f0f]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
          <span className="text-[20vw] font-bold text-[#c9a55c] tracking-[0.3em]">
            LUNARIS
          </span>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#f5f5f5] tracking-tight leading-tight">
            Illuminate Your Space
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
            Handcrafted 3D printed moon lamps. Touch control, 16 colors, and a warm glow.
          </p>
          <Link
            href="/products"
            className="mt-10 inline-block bg-[#c9a55c] hover:bg-[#dbb96e] text-black font-semibold px-10 py-4 rounded-full transition-all duration-300 text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {[
          { icon: Truck, title: "Free Shipping", desc: "On all orders over $50" },
          { icon: Star, title: "5-Star Quality", desc: "Loved by thousands" },
          { icon: Shield, title: "1-Year Warranty", desc: "Hassle-free replacement" },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-8 text-center hover:border-[#c9a55c]/40 transition-all duration-300"
          >
            <f.icon className="w-8 h-8 text-[#c9a55c] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#f5f5f5]">{f.title}</h3>
            <p className="mt-1 text-sm text-[#9ca3af]">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
