'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { maskCPF, maskPhone, maskCEP, unmask } from '@/lib/masks'
import { fetchCEP } from '@/lib/cep'

// Handlers para máscaras
const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
  const masked = maskCPF(e.target.value)
  e.target.value = masked
  onChange(masked)
}

const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
  const masked = maskPhone(e.target.value)
  e.target.value = masked
  onChange(masked)
}

const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
  const masked = maskCEP(e.target.value)
  e.target.value = masked
  onChange(masked)
}

const registerSchema = z.object({
  // Dados básicos
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  licenseNumber: z.string().optional(),
  
  // Endereço
  cep: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  
  // Informações médicas
  healthInsurance: z.string().optional(),
  bloodType: z.string().optional(),
  
  // Contato de emergência
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function CadastroPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingCEP, setLoadingCEP] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const cepValue = watch('cep')

  const handleCEPBlur = async () => {
    const cep = unmask(cepValue || '')
    if (cep.length === 8) {
      setLoadingCEP(true)
      try {
        const data = await fetchCEP(cep)
        if (data) {
          setValue('address', `${data.logradouro}${data.complemento ? ', ' + data.complemento : ''}`)
          setValue('city', data.localidade)
          setValue('state', data.uf)
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      } finally {
        setLoadingCEP(false)
      }
    }
  }

  const onSubmit = async (data: RegisterForm) => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          cpf: data.cpf ? unmask(data.cpf) : undefined,
          phone: data.phone ? unmask(data.phone) : undefined,
          licenseNumber: data.licenseNumber || undefined,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
          cep: data.cep ? unmask(data.cep) : undefined,
          address: data.address || undefined,
          city: data.city || undefined,
          state: data.state || undefined,
          healthInsurance: data.healthInsurance || undefined,
          emergencyContact: data.emergencyContact || undefined,
          emergencyPhone: data.emergencyPhone ? unmask(data.emergencyPhone) : undefined,
          bloodType: data.bloodType || undefined,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Erro ao criar conta')
      } else {
        router.push('/login?registered=true')
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Cadastro - Área do Piloto
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-brand-yellow hover:text-brand-yellow-dark">
              Faça login
            </Link>
          </p>
        </div>

        <form className="bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Seção 1: Dados Básicos */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              1. Dados Básicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                  CPF
                </label>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="000.000.000-00"
                      maxLength={14}
                      onChange={(e) => handleCPFChange(e, field.onChange)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                    />
                  )}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      onChange={(e) => handlePhoneChange(e, field.onChange)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                    />
                  )}
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento
                </label>
                <input
                  {...register('dateOfBirth')}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Número da Licença
                </label>
                <input
                  {...register('licenseNumber')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha *
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Senha *
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Seção 2: Endereço */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              2. Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
                  CEP
                </label>
                <Controller
                  name="cep"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <input
                        {...field}
                        type="text"
                        placeholder="00000-000"
                        maxLength={9}
                        onChange={(e) => handleCEPChange(e, field.onChange)}
                        onBlur={handleCEPBlur}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                      />
                      {loadingCEP && (
                        <div className="absolute right-3 top-2.5">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-yellow"></div>
                        </div>
                      )}
                    </div>
                  )}
                />
                <p className="mt-1 text-xs text-gray-500">Digite o CEP para preencher automaticamente</p>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço Completo
                </label>
                <input
                  {...register('address')}
                  type="text"
                  placeholder="Rua, número, complemento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  {...register('city')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <input
                  {...register('state')}
                  type="text"
                  maxLength={2}
                  placeholder="UF"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow uppercase"
                />
              </div>
            </div>
          </div>

          {/* Seção 3: Informações Médicas */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              3. Informações Médicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="healthInsurance" className="block text-sm font-medium text-gray-700 mb-1">
                  Plano de Saúde
                </label>
                <input
                  {...register('healthInsurance')}
                  type="text"
                  placeholder="Nome do plano de saúde"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Sanguíneo
                </label>
                <select
                  {...register('bloodType')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                >
                  <option value="">Selecione...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seção 4: Contato de Emergência */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              4. Contato de Emergência
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Contato
                </label>
                <input
                  {...register('emergencyContact')}
                  type="text"
                  placeholder="Nome completo do contato"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone do Contato
                </label>
                <Controller
                  name="emergencyPhone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      onChange={(e) => handlePhoneChange(e, field.onChange)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow text-gray-900"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-yellow text-brand-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-yellow-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
