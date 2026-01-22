import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('photo') as File
  const userId = formData.get('userId') as string

  if (!file || userId !== session.user.id) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Em produção, você deve fazer upload para um serviço como AWS S3, Cloudinary, etc.
  // Por enquanto, vamos salvar apenas a URL (você precisará implementar o upload real)
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Simulação: em produção, faça upload para um serviço de armazenamento
  // Por exemplo: const photoUrl = await uploadToS3(buffer, file.name)
  // Por enquanto, vamos usar uma URL temporária
  const photoUrl = `/uploads/${userId}/${Date.now()}-${file.name}`

  await prisma.user.update({
    where: { id: userId },
    data: { photo: photoUrl },
  })

  return NextResponse.json({ photoUrl })
}
