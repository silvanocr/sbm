# 🗄️ Configuração do Prisma - Banco de Dados

Guia completo para configurar o Prisma com PostgreSQL.

## 📋 Pré-requisitos

1. PostgreSQL instalado localmente OU
2. Conta no Railway/Supabase/Neon (banco na nuvem)

---

## 🚀 Configuração Rápida

### 1️⃣ Instalar Dependências

```powershell
cd C:\Users\silva\sul-brasileiro-motovelocidade
npm install
```

### 2️⃣ Configurar Variável de Ambiente

Crie um arquivo `.env` na raiz do projeto:

**Para banco local:**
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/motovelocidade?schema=public"
```

**Para Railway:**
```env
DATABASE_URL="postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway"
```

**Para Supabase:**
```env
DATABASE_URL="postgresql://postgres.xxxxx:senha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
```

**Para Neon:**
```env
DATABASE_URL="postgresql://usuario:senha@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### 3️⃣ Gerar Prisma Client

```powershell
npx prisma generate
```

### 4️⃣ Criar Migrações

```powershell
npx prisma migrate dev --name init
```

Isso vai:
- Criar a pasta `prisma/migrations`
- Criar todas as tabelas no banco
- Gerar o Prisma Client

### 5️⃣ Verificar se Funcionou

```powershell
npx prisma studio
```

Isso abre uma interface visual no navegador (http://localhost:5555) para ver e editar os dados.

---

## 📊 Estrutura do Banco de Dados

O schema já está configurado com as seguintes tabelas:

### Tabelas Criadas:

1. **User** - Usuários/Pilotos
   - id, email, password, name, cpf, phone, licenseNumber

2. **Enrollment** - Inscrições
   - id, userId, type, eventName, price, status, paymentId, receiptUrl

3. **Product** - Produtos
   - id, name, description, price, image, category, stock, active

4. **Order** - Pedidos
   - id, userId, total, status, paymentId, receiptUrl

5. **OrderItem** - Itens do Pedido
   - id, orderId, productId, quantity, price

6. **News** - Notícias
   - id, title, content, image, author, published, publishedAt

7. **InstagramPost** - Posts do Instagram
   - id, postId, caption, imageUrl, permalink, timestamp

---

## 🔧 Comandos Úteis do Prisma

### Gerar Prisma Client
```powershell
npx prisma generate
```

### Criar Nova Migração
```powershell
npx prisma migrate dev --name nome-da-migracao
```

### Aplicar Migrações (produção)
```powershell
npx prisma migrate deploy
```

### Visualizar Dados (Prisma Studio)
```powershell
npx prisma studio
```

### Resetar Banco (CUIDADO - apaga tudo!)
```powershell
npx prisma migrate reset
```

### Ver Status das Migrações
```powershell
npx prisma migrate status
```

### Formatar Schema
```powershell
npx prisma format
```

---

## 🗄️ Configurar Banco Local (PostgreSQL)

### Windows - Instalar PostgreSQL

1. Baixe: https://www.postgresql.org/download/windows/
2. Instale seguindo o assistente
3. Anote a senha do usuário `postgres`
4. Configure a porta (padrão: 5432)

### Criar Banco de Dados

1. Abra **pgAdmin** ou **psql**
2. Execute:
```sql
CREATE DATABASE motovelocidade;
```

3. Configure no `.env`:
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/motovelocidade?schema=public"
```

---

## ☁️ Configurar Banco na Nuvem

### Railway (Recomendado)

1. Acesse https://railway.app
2. Crie projeto → Adicione PostgreSQL
3. Copie a `DATABASE_URL` das variáveis
4. Cole no `.env`

### Supabase

1. Acesse https://supabase.com
2. Crie projeto
3. Vá em Settings → Database
4. Copie a Connection String
5. Cole no `.env`

### Neon

1. Acesse https://neon.tech
2. Crie projeto
3. Copie a Connection String
4. Cole no `.env`

---

## ✅ Verificar Configuração

### Teste 1: Verificar Conexão

```powershell
npx prisma db pull
```

Se não der erro, a conexão está OK!

### Teste 2: Verificar Tabelas

```powershell
npx prisma studio
```

Abra http://localhost:5555 e veja as tabelas.

### Teste 3: Criar Dados de Teste

Crie um arquivo `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário de teste
  const user = await prisma.user.create({
    data: {
      email: 'teste@example.com',
      password: 'senha123',
      name: 'Usuário Teste',
    },
  })

  console.log('Usuário criado:', user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Execute:
```powershell
npx ts-node prisma/seed.ts
```

---

## 🐛 Solução de Problemas

### Erro: "Can't reach database server"

**Solução:**
- Verifique se o PostgreSQL está rodando
- Verifique a `DATABASE_URL` no `.env`
- Teste a conexão: `npx prisma db pull`

### Erro: "P1001: Can't reach database server"

**Solução:**
- Verifique firewall/antivírus
- Verifique se a porta 5432 está aberta
- Para nuvem: verifique se permite conexões externas

### Erro: "P1003: Database does not exist"

**Solução:**
- Crie o banco: `CREATE DATABASE motovelocidade;`
- Ou use um banco existente na `DATABASE_URL`

### Erro: "Prisma Client not generated"

**Solução:**
```powershell
npx prisma generate
```

### Erro de Migração

**Solução:**
```powershell
npx prisma migrate reset
npx prisma migrate dev --name init
```

---

## 📝 Exemplos de Uso

### Criar Usuário

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const user = await prisma.user.create({
  data: {
    email: 'piloto@example.com',
    password: 'senha123',
    name: 'João Silva',
    cpf: '123.456.789-00',
  },
})
```

### Buscar Usuário

```typescript
const user = await prisma.user.findUnique({
  where: { email: 'piloto@example.com' },
})
```

### Criar Inscrição

```typescript
const enrollment = await prisma.enrollment.create({
  data: {
    userId: user.id,
    type: 'championship',
    eventName: 'Etapa 1 - Interlagos',
    price: 1200.00,
    status: 'pending',
  },
})
```

### Buscar com Relações

```typescript
const user = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: {
    enrollments: true,
    orders: true,
  },
})
```

---

## 🔄 Workflow de Desenvolvimento

1. **Fazer alterações no schema:**
   ```powershell
   # Edite prisma/schema.prisma
   ```

2. **Criar migração:**
   ```powershell
   npx prisma migrate dev --name descricao-da-mudanca
   ```

3. **Gerar Prisma Client:**
   ```powershell
   npx prisma generate
   ```

4. **Testar:**
   ```powershell
   npx prisma studio
   ```

---

## 🚀 Para Produção (Railway/Vercel)

### No Railway:

```powershell
railway run npx prisma migrate deploy
```

### No Vercel:

O build já está configurado para gerar o Prisma Client automaticamente.

---

## 📚 Recursos

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Studio](https://www.prisma.io/studio)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Pronto! Seu Prisma está configurado! 🎉**
