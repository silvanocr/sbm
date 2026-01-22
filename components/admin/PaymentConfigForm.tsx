'use client'

import { useState } from 'react'
import { CreditCard, CheckCircle } from 'lucide-react'

interface PaymentConfig {
  id?: string
  stripePublicKey?: string | null
  stripeSecretKey?: string | null
  pixEnabled?: boolean
  creditCardEnabled?: boolean
  maxInstallments?: number
  installmentsWithoutInterest?: number
  interestRate?: number
}

export default function PaymentConfigForm({ initialData }: { initialData: PaymentConfig | null }) {
  const [formData, setFormData] = useState({
    stripePublicKey: initialData?.stripePublicKey || '',
    stripeSecretKey: initialData?.stripeSecretKey || '',
    pixEnabled: initialData?.pixEnabled ?? true,
    creditCardEnabled: initialData?.creditCardEnabled ?? true,
    maxInstallments: initialData?.maxInstallments || 12,
    installmentsWithoutInterest: initialData?.installmentsWithoutInterest || 3,
    interestRate: initialData?.interestRate || 0.02,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    try {
      const response = await fetch('/api/admin/payment-config', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Erro ao salvar configuração:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stripe Public Key
        </label>
        <input
          type="text"
          value={formData.stripePublicKey}
          onChange={(e) => setFormData({ ...formData, stripePublicKey: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
          placeholder="pk_test_..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stripe Secret Key
        </label>
        <input
          type="password"
          value={formData.stripeSecretKey}
          onChange={(e) => setFormData({ ...formData, stripeSecretKey: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
          placeholder="sk_test_..."
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.pixEnabled}
            onChange={(e) => setFormData({ ...formData, pixEnabled: e.target.checked })}
            className="w-5 h-5 text-brand-yellow focus:ring-brand-yellow"
          />
          <span>PIX Habilitado</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.creditCardEnabled}
            onChange={(e) => setFormData({ ...formData, creditCardEnabled: e.target.checked })}
            className="w-5 h-5 text-brand-yellow focus:ring-brand-yellow"
          />
          <span>Cartão de Crédito Habilitado</span>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Máximo de Parcelas
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={formData.maxInstallments}
            onChange={(e) => setFormData({ ...formData, maxInstallments: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parcelas sem Juros
          </label>
          <input
            type="number"
            min="1"
            max={formData.maxInstallments}
            value={formData.installmentsWithoutInterest}
            onChange={(e) => setFormData({ ...formData, installmentsWithoutInterest: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taxa de Juros (%)
          </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={formData.interestRate}
            onChange={(e) => setFormData({ ...formData, interestRate: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-brand-yellow text-brand-black px-6 py-3 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center gap-2 disabled:opacity-50"
      >
        {saving ? (
          'Salvando...'
        ) : saved ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Salvo!
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Salvar Configuração
          </>
        )}
      </button>
    </form>
  )
}
