'use client'

import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react'
import { maskCPF, maskPhone, maskCEP } from '@/lib/masks'

interface InputMaskProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  mask: 'cpf' | 'phone' | 'cep'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('')

    useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(value)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let maskedValue = e.target.value
      
      switch (mask) {
        case 'cpf':
          maskedValue = maskCPF(maskedValue)
          break
        case 'phone':
          maskedValue = maskPhone(maskedValue)
          break
        case 'cep':
          maskedValue = maskCEP(maskedValue)
          break
      }
      
      setDisplayValue(maskedValue)
      
      // Cria um novo evento com o valor mascarado
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>
      
      onChange?.(syntheticEvent)
    }

    return (
      <input
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
      />
    )
  }
)

InputMask.displayName = 'InputMask'

export default InputMask
