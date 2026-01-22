import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuário admin de teste
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@motovelocidade.com' },
    update: {},
    create: {
      email: 'admin@motovelocidade.com',
      password: hashedPassword,
      name: 'Administrador',
      cpf: '000.000.000-00',
      phone: '(00) 00000-0000',
    },
  })

  console.log('✅ Usuário admin criado:', admin.email)

  // Criar produtos de exemplo
  const produtos = [
    {
      name: 'Pneu Dianteiro Pirelli',
      description: 'Pneu de alta performance para pista',
      price: 450.00,
      category: 'pneus',
      stock: 10,
      active: true,
    },
    {
      name: 'Pneu Traseiro Pirelli',
      description: 'Pneu de alta performance para pista',
      price: 480.00,
      category: 'pneus',
      stock: 10,
      active: true,
    },
    {
      name: 'Capacete AGV',
      description: 'Capacete profissional de corrida',
      price: 1200.00,
      category: 'equipamentos',
      stock: 5,
      active: true,
    },
  ]

  for (const produto of produtos) {
    const existing = await prisma.product.findFirst({
      where: { name: produto.name },
    })
    
    if (!existing) {
      const created = await prisma.product.create({
        data: produto,
      })
      console.log('✅ Produto criado:', created.name)
    } else {
      console.log('⏭️ Produto já existe:', produto.name)
    }
  }

  // Criar notícia de exemplo
  const existingNews = await prisma.news.findUnique({
    where: { id: 'news-1' },
  })

  if (!existingNews) {
    const noticia = await prisma.news.create({
      data: {
        id: 'news-1',
        title: 'Bem-vindo ao Sul Brasileiro de Motovelocidade',
        content: `
          <h2>Bem-vindo ao nosso site!</h2>
          <p>Este é o site oficial do Sul Brasileiro de Motovelocidade.</p>
          <p>Aqui você pode:</p>
          <ul>
            <li>Inscrever-se em cursos, trackdays e etapas do campeonato</li>
            <li>Comprar produtos relacionados</li>
            <li>Acompanhar notícias e transmissões</li>
          </ul>
        `,
        author: 'Equipe Sul Brasileiro',
        published: true,
        publishedAt: new Date(),
      },
    })
    console.log('✅ Notícia criada:', noticia.title)
  } else {
    console.log('⏭️ Notícia já existe')
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
