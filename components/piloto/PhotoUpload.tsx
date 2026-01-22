'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function PhotoUpload({ userId, currentPhoto }: { userId: string; currentPhoto?: string | null }) {
  const [photo, setPhoto] = useState(currentPhoto)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('photo', file)
    formData.append('userId', userId)

    try {
      const response = await fetch('/api/piloto/upload-photo', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setPhoto(data.photoUrl)
        window.location.reload()
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="text-center">
      <label className="cursor-pointer inline-block">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
        <div className="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-semibold hover:bg-brand-yellow-dark transition flex items-center gap-2 justify-center">
          <Upload className="w-4 h-4" />
          {uploading ? 'Enviando...' : photo ? 'Alterar Foto' : 'Adicionar Foto'}
        </div>
      </label>
    </div>
  )
}
