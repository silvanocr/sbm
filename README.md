# Sul Brasileiro de Motovelocidade

Site completo para o campeonato Sul Brasileiro de Motovelocidade.

## 🚀 Deploy - Railway + Vercel

Este projeto está configurado para deploy usando:
- **Railway** - Banco de dados PostgreSQL
- **Vercel** - Hospedagem da aplicação Next.js

### 📖 Guias de Deploy

- **`DEPLOY_PASSO_A_PASSO.md`** ⭐ - Guia completo passo a passo (RECOMENDADO)
- **`DEPLOY.md`** - Guia completo e detalhado
- **`GUIA_RAPIDO_DEPLOY.md`** - Guia rápido (5 minutos)
- **`README_DEPLOY.md`** - Resumo rápido de deploy

## 💻 Desenvolvimento Local

### 1. Navegar até o diretório

```powershell
cd C:\Users\silva\sul-brasileiro-motovelocidade
```

### 2. Instalar dependências

```powershell
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=qualquer-chave-temporaria-para-teste
DATABASE_URL=postgresql://user:password@localhost:5432/motovelocidade
```

### 4. Executar o projeto

```powershell
npm run dev
```

### 5. Acessar no navegador

**http://localhost:3000**

## 📱 Páginas Disponíveis

- **Home:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Cadastro:** http://localhost:3000/cadastro
- **Área do Piloto:** http://localhost:3000/piloto
- **Produtos:** http://localhost:3000/produtos
- **Notícias:** http://localhost:3000/noticias
- **Transmissões:** http://localhost:3000/transmissoes

## 🗄️ Banco de Dados

### Configurar Prisma

```powershell
npx prisma generate
npx prisma migrate dev
```

### Visualizar dados (Prisma Studio)

```powershell
npx prisma studio
```

## ⚙️ Configuração Completa

Veja o arquivo `.env.example` para todas as variáveis de ambiente necessárias.

## 📚 Documentação

### Deploy
- **`DEPLOY_PASSO_A_PASSO.md`** ⭐ - Guia completo passo a passo (RECOMENDADO)
- **`DEPLOY.md`** - Guia completo e detalhado
- **`GUIA_RAPIDO_DEPLOY.md`** - Guia rápido (5 minutos)
- **`README_DEPLOY.md`** - Resumo rápido de deploy

### Desenvolvimento
- **`COMO_ACESSAR.md`** - Como acessar localmente
- **`CONFIGURAR_BANCO.md`** - Como configurar banco de dados
- **`CONFIGURAR_PRISMA.md`** - Como configurar Prisma
- **`CONFIGURAR_GITHUB_RAILWAY.md`** - Configurar GitHub e Railway
- **`CONFIGURAR_VERCEL_PASSO_A_PASSO.md`** - Configurar Vercel (deploy)
- **`.env.example`** - Exemplo de variáveis de ambiente

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para PostgreSQL
- **NextAuth.js** - Autenticação
- **Stripe** - Pagamentos
- **Tailwind CSS** - Estilização
- **Railway** - Banco de dados
- **Vercel** - Hospedagem

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev              # Desenvolvimento local
npm run build            # Build para produção
npm start                # Executar versão de produção
npm run lint             # Verificar erros de código
```

### Banco de Dados
```bash
npm run db:generate      # Gerar Prisma Client
npm run db:migrate       # Criar migração
npm run db:deploy        # Aplicar migrações (produção)
npm run db:studio        # Abrir Prisma Studio
npm run db:seed          # Popular banco com dados iniciais
npm run db:status        # Ver status das migrações
```

### Deploy
```bash
npm run deploy:check     # Verificar se está pronto para deploy
npm run deploy:prepare   # Preparar projeto para deploy
npm run deploy:secret    # Gerar NEXTAUTH_SECRET
npm run github:setup     # Configurar e fazer push para GitHub
npm run railway:check    # Verificar e configurar Railway
```

## 🔗 Links Úteis

- [GitHub Repo](https://github.com/silvanocr/sbm) - Repositório do projeto
- [Railway](https://railway.app) - Banco de dados
- [Vercel](https://vercel.com) - Hospedagem
- [Prisma Docs](https://www.prisma.io/docs) - Documentação Prisma
- [Next.js Docs](https://nextjs.org/docs) - Documentação Next.js
