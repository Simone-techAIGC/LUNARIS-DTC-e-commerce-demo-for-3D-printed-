'use client'

import { useId } from 'react'

const GEM = [
  { cx: 40, cy: 50, r: 1.5, op: 0.7 },
  { cx: 120, cy: 35, r: 1, op: 0.4 },
  { cx: 310, cy: 45, r: 1.5, op: 0.55 },
  { cx: 360, cy: 130, r: 1, op: 0.35 },
  { cx: 50, cy: 300, r: 1.5, op: 0.5 },
  { cx: 290, cy: 360, r: 1, op: 0.4 },
  { cx: 345, cy: 340, r: 1.5, op: 0.6 },
  { cx: 75, cy: 190, r: 1, op: 0.3 },
  { cx: 160, cy: 340, r: 1, op: 0.5 },
  { cx: 350, cy: 240, r: 1, op: 0.45 },
]

const GEM_BRIGHT = [
  { cx: 55, cy: 80, r: 2, op: 0.8 },
  { cx: 330, cy: 70, r: 2.5, op: 0.7 },
  { cx: 85, cy: 320, r: 2, op: 0.6 },
  { cx: 320, cy: 310, r: 1.5, op: 0.65 },
  { cx: 260, cy: 50, r: 1, op: 0.5 },
]

type ProductId =
  | 'moon-lamp-15cm'
  | 'moon-lamp-20cm'
  | 'moon-lamp-25cm'
  | 'mars-lamp'
  | 'earth-lamp'
  | 'moon-saturn-set'

function Stars({ bright = false }: { bright?: boolean }) {
  const list = bright ? GEM_BRIGHT : GEM
  return (
    <>
      {list.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fff" opacity={s.op}>
          {bright && (
            <animate
              attributeName="opacity"
              values={`${s.op};${s.op * 0.3};${s.op}`}
              dur={`${2 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
    </>
  )
}

function Shadow({ uid, r }: { uid: string; r: number }) {
  const id = `${uid}-shadow`
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="60%" stop-color="#000" stop-opacity="0" />
          <stop offset="90%" stop-color="#000" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#000" stop-opacity="0.35" />
        </radialGradient>
      </defs>
      <circle cx={200} cy={200} r={r} fill={`url(#${id})`} />
    </>
  )
}

function Moon15({ uid }: { uid: string }) {
  const bg = `${uid}-bg`
  const glow = `${uid}-glow`
  const surf = `${uid}-surf`
  const gf = `${uid}-gf`
  return (
    <>
      <defs>
        <radialGradient id={bg}>
          <stop offset="0%" stop-color="#0d0d1a" />
          <stop offset="100%" stop-color="#050510" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0%" stop-color="#c9a55c" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#c9a55c" stop-opacity="0" />
        </radialGradient>
        <radialGradient id={surf}>
          <stop offset="0%" stop-color="#f5efe0" />
          <stop offset="60%" stop-color="#e8dcc6" />
          <stop offset="100%" stop-color="#c4b08a" />
        </radialGradient>
        <filter id={gf}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${bg})`} />
      <Stars />
      <circle cx={200} cy={200} r={110} fill={`url(#${glow})`} />
      <circle cx={200} cy={200} r={62} fill={`url(#${surf})`} filter={`url(#${gf})`} />
      <circle cx={200} cy={200} r={62} fill={`url(#${surf})`} />
      <ellipse cx={180} cy={185} rx={11} ry={9} fill="#b8a48a" opacity="0.35" />
      <ellipse cx={218} cy={210} rx={7} ry={6} fill="#b8a48a" opacity="0.3" />
      <ellipse cx={192} cy={222} rx={5} ry={4} fill="#b8a48a" opacity="0.35" />
      <ellipse cx={175} cy={210} rx={3} ry={2.5} fill="#b8a48a" opacity="0.25" />
      <circle cx={200} cy={200} r={62} fill={`url(#${uid}-shadow)`} opacity="0.12" />
      <Shadow uid={uid} r={62} />
    </>
  )
}

function Moon20({ uid }: { uid: string }) {
  const bg = `${uid}-bg`
  const glow = `${uid}-glow`
  const surf = `${uid}-surf`
  const gf = `${uid}-gf`
  return (
    <>
      <defs>
        <radialGradient id={bg}>
          <stop offset="0%" stop-color="#0f0f20" />
          <stop offset="100%" stop-color="#060612" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0%" stop-color="#c9a55c" stop-opacity="0.3" />
          <stop offset="60%" stop-color="#c9a55c" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#c9a55c" stop-opacity="0" />
        </radialGradient>
        <radialGradient id={surf}>
          <stop offset="0%" stop-color="#f8f2e6" />
          <stop offset="50%" stop-color="#ece0c8" />
          <stop offset="100%" stop-color="#c9b590" />
        </radialGradient>
        <filter id={gf}>
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${bg})`} />
      <Stars bright />
      <circle cx={200} cy={200} r={140} fill={`url(#${glow})`} />
      <circle cx={200} cy={200} r={85} fill={`url(#${surf})`} filter={`url(#${gf})`} />
      <circle cx={200} cy={200} r={85} fill={`url(#${surf})`} />
      <ellipse cx={178} cy={180} rx={14} ry={11} fill="#b8a48a" opacity="0.3" />
      <ellipse cx={230} cy={195} rx={10} ry={8} fill="#b8a48a" opacity="0.25" />
      <ellipse cx={190} cy={220} rx={8} ry={7} fill="#b8a48a" opacity="0.3" />
      <ellipse cx={165} cy={215} rx={5} ry={4} fill="#b8a48a" opacity="0.2" />
      <ellipse cx={215} cy={235} rx={6} ry={5} fill="#b8a48a" opacity="0.25" />
      <ellipse cx={210} cy={170} rx={4} ry={3} fill="#b8a48a" opacity="0.2" />
      <Shadow uid={uid} r={85} />
    </>
  )
}

function Moon25({ uid }: { uid: string }) {
  const bg = `${uid}-bg`
  const glow = `${uid}-glow`
  const surf = `${uid}-surf`
  const gf = `${uid}-gf`
  const rf = `${uid}-rf`
  return (
    <>
      <defs>
        <radialGradient id={bg}>
          <stop offset="0%" stop-color="#111122" />
          <stop offset="100%" stop-color="#070714" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0%" stop-color="#dbb96e" stop-opacity="0.35" />
          <stop offset="50%" stop-color="#c9a55c" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#c9a55c" stop-opacity="0" />
        </radialGradient>
        <radialGradient id={surf}>
          <stop offset="0%" stop-color="#faf5ed" />
          <stop offset="40%" stop-color="#efe5d0" />
          <stop offset="100%" stop-color="#d0be9c" />
        </radialGradient>
        <filter id={gf}>
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <radialGradient id={rf}>
          <stop offset="40%" stop-color="#faf5ed" stop-opacity="0" />
          <stop offset="72%" stop-color="#d0be9c" stop-opacity="0.1" />
          <stop offset="88%" stop-color="#c9a55c" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#c9a55c" stop-opacity="0.2" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${bg})`} />
      <Stars bright />
      <circle cx={200} cy={200} r={160} fill={`url(#${glow})`} />
      <circle cx={200} cy={200} r={110} fill={`url(#${surf})`} filter={`url(#${gf})`} />
      <circle cx={200} cy={200} r={110} fill={`url(#${surf})`} />
      <circle cx={200} cy={200} r={110} fill={`url(#${rf})`} />
      <ellipse cx={170} cy={170} rx={18} ry={14} fill="#b8a48a" opacity="0.25" />
      <ellipse cx={240} cy={185} rx={14} ry={11} fill="#b8a48a" opacity="0.2" />
      <ellipse cx={185} cy={220} rx={12} ry={10} fill="#b8a48a" opacity="0.25" />
      <ellipse cx={155} cy={210} rx={7} ry={5} fill="#b8a48a" opacity="0.2" />
      <ellipse cx={225} cy={235} rx={9} ry={7} fill="#b8a48a" opacity="0.2" />
      <ellipse cx={215} cy={160} rx={6} ry={5} fill="#b8a48a" opacity="0.15" />
      <ellipse cx={195} cy={250} rx={8} ry={6} fill="#b8a48a" opacity="0.2" />
      <ellipse cx={250} cy={215} rx={5} ry={4} fill="#b8a48a" opacity="0.15" />
      <Shadow uid={uid} r={110} />
    </>
  )
}

function Mars({ uid }: { uid: string }) {
  const bg = `${uid}-bg`
  const glow = `${uid}-glow`
  const surf = `${uid}-surf`
  const atm = `${uid}-atm`
  const gf = `${uid}-gf`
  return (
    <>
      <defs>
        <radialGradient id={bg}>
          <stop offset="0%" stop-color="#1a0d0a" />
          <stop offset="100%" stop-color="#0a0505" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0%" stop-color="#d4643a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#d4643a" stop-opacity="0" />
        </radialGradient>
        <radialGradient id={surf}>
          <stop offset="0%" stop-color="#e8845a" />
          <stop offset="40%" stop-color="#d4643a" />
          <stop offset="70%" stop-color="#b84a2e" />
          <stop offset="100%" stop-color="#8b3a2a" />
        </radialGradient>
        <radialGradient id={atm}>
          <stop offset="80%" stop-color="#d4643a" stop-opacity="0" />
          <stop offset="95%" stop-color="#d4643a" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#d4643a" stop-opacity="0.06" />
        </radialGradient>
        <filter id={gf}>
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${bg})`} />
      <Stars bright />
      <circle cx={200} cy={200} r={140} fill={`url(#${glow})`} />
      <circle cx={200} cy={200} r={88} fill={`url(#${surf})`} filter={`url(#${gf})`} />
      <circle cx={200} cy={200} r={88} fill={`url(#${surf})`} />
      <ellipse cx={175} cy={175} rx={20} ry={16} fill="#7a3020" opacity="0.2" />
      <ellipse cx={235} cy={195} rx={15} ry={12} fill="#7a3020" opacity="0.15" />
      <ellipse cx={190} cy={230} rx={12} ry={10} fill="#7a3020" opacity="0.18" />
      <ellipse cx={160} cy={215} rx={8} ry={6} fill="#7a3020" opacity="0.12" />
      <ellipse cx={220} cy={245} rx={10} ry={7} fill="#7a3020" opacity="0.15" />
      <circle cx={200} cy={200} r={88} fill={`url(#${atm})`} />
      <Shadow uid={uid} r={88} />
    </>
  )
}

function Earth({ uid }: { uid: string }) {
  const bg = `${uid}-bg`
  const glow = `${uid}-glow`
  const wat = `${uid}-wat`
  const gf = `${uid}-gf`
  return (
    <>
      <defs>
        <radialGradient id={bg}>
          <stop offset="0%" stop-color="#0a0a2a" />
          <stop offset="100%" stop-color="#050518" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0%" stop-color="#4a90d9" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#4a90d9" stop-opacity="0" />
        </radialGradient>
        <radialGradient id={wat}>
          <stop offset="0%" stop-color="#5aaff0" />
          <stop offset="50%" stop-color="#4a90d9" />
          <stop offset="100%" stop-color="#2a5a9a" />
        </radialGradient>
        <filter id={gf}>
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${bg})`} />
      <Stars />
      <circle cx={200} cy={200} r={140} fill={`url(#${glow})`} />
      <circle cx={200} cy={200} r={90} fill={`url(#${wat})`} filter={`url(#${gf})`} />
      <circle cx={200} cy={200} r={90} fill={`url(#${wat})`} />
      <path d="M130 170 Q150 160 170 175 Q185 185 200 170 Q220 155 240 175 Q255 190 270 185 L275 200 Q255 210 235 200 Q215 190 200 205 Q180 220 160 210 Q145 205 130 215 Z" fill="#4a9a5a" opacity="0.45" />
      <path d="M145 230 Q165 220 180 235 Q195 250 210 240 Q230 230 245 245 Q255 255 265 250 L260 265 Q245 270 230 258 Q210 248 195 260 Q175 272 155 265 Z" fill="#4a9a5a" opacity="0.35" />
      <path d="M150 150 Q160 145 170 155 Q165 165 155 160 Z" fill="#4a9a5a" opacity="0.4" />
      <path d="M270 150 Q280 155 275 168 Q265 165 268 155 Z" fill="#4a9a5a" opacity="0.3" />
      <ellipse cx={160} cy={185} rx={30} ry={8} fill="#fff" opacity="0.06" />
      <ellipse cx={240} cy={215} rx={25} ry={6} fill="#fff" opacity="0.04" />
      <Shadow uid={uid} r={90} />
    </>
  )
}

function SaturnSet({ uid }: { uid: string }) {
  const bg = `${uid}-bg`
  const mg = `${uid}-mg`
  const sg = `${uid}-sg`
  const rg = `${uid}-rg`
  const gf = `${uid}-gf`
  return (
    <>
      <defs>
        <radialGradient id={bg}>
          <stop offset="0%" stop-color="#0d0d1e" />
          <stop offset="100%" stop-color="#050510" />
        </radialGradient>
        <radialGradient id={mg}>
          <stop offset="0%" stop-color="#f5efe0" />
          <stop offset="60%" stop-color="#e0d5bc" />
          <stop offset="100%" stop-color="#c4b08a" />
        </radialGradient>
        <radialGradient id={sg}>
          <stop offset="0%" stop-color="#f0e6c8" />
          <stop offset="50%" stop-color="#d4c4a0" />
          <stop offset="100%" stop-color="#b8a880" />
        </radialGradient>
        <radialGradient id={rg}>
          <stop offset="0%" stop-color="#e8d8b0" stop-opacity="0.1" />
          <stop offset="30%" stop-color="#e8d8b0" stop-opacity="0.4" />
          <stop offset="50%" stop-color="#d4c4a0" stop-opacity="0.6" />
          <stop offset="70%" stop-color="#c0b090" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#c0b090" stop-opacity="0.1" />
        </radialGradient>
        <filter id={gf}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${bg})`} />
      <Stars bright />
      <circle cx={140} cy={200} r={110} fill="#c9a55c" opacity="0.08" />
      <circle cx={260} cy={200} r={120} fill="#e8d8b0" opacity="0.06" />
      <circle cx={140} cy={200} r={55} fill={`url(#${mg})`} filter={`url(#${gf})`} />
      <circle cx={140} cy={200} r={55} fill={`url(#${mg})`} />
      <ellipse cx={130} cy={185} rx={9} ry={7} fill="#b8a48a" opacity="0.3" />
      <ellipse cx={150} cy={210} rx={6} ry={5} fill="#b8a48a" opacity="0.25" />
      <ellipse cx={135} cy={215} rx={4} ry={3} fill="#b8a48a" opacity="0.2" />
      <circle cx={260} cy={200} r={50} fill={`url(#${sg})`} filter={`url(#${gf})`} />
      <circle cx={260} cy={200} r={50} fill={`url(#${sg})`} />
      <ellipse cx={260} cy={200} rx={76} ry={14} fill="none" stroke={`url(#${rg})`} stroke-width="10" opacity="0.6" />
      <ellipse cx={260} cy={200} rx={76} ry={14} fill="none" stroke="#d4c4a0" stroke-width="2" opacity="0.15" />
      <text x="200" y="320" text-anchor="middle" fill="#9ca3af" font-size="14" font-weight="300" letter-spacing="4" opacity="0.6">
        GIFT SET
      </text>
    </>
  )
}

function DefaultSVG({ uid }: { uid: string }) {
  const bg = `${uid}-bg`
  return (
    <>
      <defs>
        <radialGradient id={bg}>
          <stop offset="0%" stop-color="#1a1a2a" />
          <stop offset="100%" stop-color="#0f0f1a" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${bg})`} />
      <Stars />
      <circle cx={200} cy={200} r={60} fill="#c9a55c" opacity="0.15" />
      <circle cx={200} cy={200} r={10} fill="#c9a55c" opacity="0.3" />
    </>
  )
}

export default function ProductImage({
  productId,
  className = '',
}: {
  productId: string
  className?: string
}) {
  const rawId = useId()
  const uid = rawId.replace(/[:.]/g, '-')

  const render = () => {
    switch (productId as ProductId) {
      case 'moon-lamp-15cm':
        return <Moon15 uid={uid} />
      case 'moon-lamp-20cm':
        return <Moon20 uid={uid} />
      case 'moon-lamp-25cm':
        return <Moon25 uid={uid} />
      case 'mars-lamp':
        return <Mars uid={uid} />
      case 'earth-lamp':
        return <Earth uid={uid} />
      case 'moon-saturn-set':
        return <SaturnSet uid={uid} />
      default:
        return <DefaultSVG uid={uid} />
    }
  }

  return (
    <div className={`aspect-square overflow-hidden rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {render()}
      </svg>
    </div>
  )
}
