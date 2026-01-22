import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo Text */}
      <div className="relative">
        {/* Yellow background bars */}
        <div className="absolute -top-1 -left-2 -right-2 h-8 bg-yellow-500 rounded-sm transform -skew-x-12 opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-6 -left-1 -right-1 h-12 bg-yellow-500 rounded-sm transform -skew-x-12 opacity-90 group-hover:opacity-100 transition-opacity" />
        
        {/* Text */}
        <div className="relative z-10">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-black uppercase tracking-tight">SUL BRASILEIRO</span>
            <span className="text-xs font-bold text-black uppercase">DE</span>
          </div>
          <div className="mt-0.5">
            <span className="text-2xl md:text-3xl font-black text-black uppercase italic transform -skew-x-12 tracking-tight">
              MOTOVELOCIDADE
            </span>
          </div>
        </div>
      </div>

      {/* Motorcyclist Icon - Simplified SVG */}
      <div className="hidden md:block relative -ml-2">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform group-hover:scale-105 transition-transform"
        >
          {/* Motorcycle */}
          <circle cx="20" cy="45" r="8" fill="#000000" />
          <circle cx="40" cy="45" r="8" fill="#000000" />
          <rect x="15" y="30" width="25" height="8" rx="2" fill="#FFFFFF" />
          <rect x="18" y="25" width="8" height="12" rx="2" fill="#FFFFFF" />
          
          {/* Rider */}
          <circle cx="25" cy="20" r="6" fill="#FFFFFF" />
          <rect x="22" y="20" width="6" height="15" rx="3" fill="#FFFFFF" />
          <rect x="20" y="25" width="10" height="8" rx="2" fill="#000000" />
          
          {/* Yellow number plate */}
          <rect x="28" y="22" width="8" height="6" rx="1" fill="#FFD700" />
          <text x="32" y="26" textAnchor="middle" fontSize="4" fill="#000000" fontWeight="bold">1</text>
        </svg>
      </div>
    </Link>
  )
}
