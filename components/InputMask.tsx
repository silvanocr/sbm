'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { maskCPF, maskPhone, maskCEP } from '@/lib/masks'

interface InputMaskProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask: 'cpf' | 'phone' | 'cep'
  onChange?: (value: string) => void
}

const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value
      
      switch (mask) {
        case 'cpf':
          value = maskCPF(value)
          break
        case 'phone':
          value = maskPhone(value)
          break
        case 'cep':
          value = maskCEP(value)
          break
      }
      
      e.target.value = value
      onChange?.(value)
    }

    return (
      <input
        {...props}
        ref={ref}
        onChange={handleChange}
      />
    )
  }
)

InputMask.displayName = 'InputMask'

export default InputMask
