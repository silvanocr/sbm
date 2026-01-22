import { requireAdmin } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'
import { CreditCard, Settings } from 'lucide-react'
import PaymentConfigForm from '@/components/admin/PaymentConfigForm'

export default async function AdminPagamentosPage() {
  await requireAdmin()

  const config = await prisma.paymentConfig.findFirst()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Configuração de Pagamentos</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Gateway de Pagamento
        </h2>
        <PaymentConfigForm initialData={config} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Configurações de Parcelamento
        </h2>
        <p className="text-gray-600 mb-4">
          Configure as opções de parcelamento para pagamentos com cartão de crédito.
        </p>
        {config && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parcelas sem juros
              </label>
              <p className="text-lg font-semibold">{config.installmentsWithoutInterest}x</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Máximo de parcelas
              </label>
              <p className="text-lg font-semibold">{config.maxInstallments}x</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxa de juros por parcela
              </label>
              <p className="text-lg font-semibold">{(config.interestRate * 100).toFixed(2)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
