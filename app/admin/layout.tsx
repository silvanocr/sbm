import { requireAdmin } from '@/lib/admin-auth'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Package, 
  Image, 
  FileText, 
  Settings,
  CreditCard,
  MessageSquare,
  LogOut
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import AdminLogoutButton from '@/components/AdminLogoutButton'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-black text-white min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-brand-yellow">Admin SBM</h1>
            <p className="text-sm text-gray-400 mt-1">Painel de Controle</p>
          </div>
          
          <nav className="mt-8">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            
            <Link 
              href="/admin/pilotos" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <Users className="w-5 h-5" />
              Pilotos
            </Link>
            
            <Link 
              href="/admin/eventos" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <Calendar className="w-5 h-5" />
              Eventos
            </Link>
            
            <Link 
              href="/admin/produtos" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <Package className="w-5 h-5" />
              Produtos
            </Link>
            
            <Link 
              href="/admin/banners" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <Image className="w-5 h-5" />
              Banners
            </Link>
            
            <Link 
              href="/admin/noticias" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <FileText className="w-5 h-5" />
              Notícias
            </Link>
            
            <Link 
              href="/admin/mensagens" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <MessageSquare className="w-5 h-5" />
              Mensagens
            </Link>
            
            <Link 
              href="/admin/pagamentos" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <CreditCard className="w-5 h-5" />
              Pagamentos
            </Link>
            
            <Link 
              href="/admin/configuracoes" 
              className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
            >
              <Settings className="w-5 h-5" />
              Configurações
            </Link>
          </nav>
          
          <div className="absolute bottom-0 w-64 p-6">
            <AdminLogoutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
