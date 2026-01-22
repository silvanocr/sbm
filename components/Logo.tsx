import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <Image
        src="/logo.png"
        alt="Sul Brasileiro de Motovelocidade"
        width={360}
        height={120}
        className="h-24 w-auto object-contain hover:opacity-90 transition-opacity"
        priority
      />
    </Link>
  )
}
