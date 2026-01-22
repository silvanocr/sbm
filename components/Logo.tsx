import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <Image
        src="/logo.png"
        alt="Sul Brasileiro de Motovelocidade"
        width={180}
        height={60}
        className="h-12 w-auto object-contain hover:opacity-90 transition-opacity"
        priority
      />
    </Link>
  )
}
