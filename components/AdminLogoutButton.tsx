'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export default function AdminLogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition w-full text-left"
    >
      <LogOut className="w-5 h-5" />
      Sair
    </button>
  )
}
