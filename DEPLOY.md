# 🚀 Deploy - Railway + Vercel

Este guia mostra como fazer o deploy do projeto usando **Railway** para o banco de dados PostgreSQL e **Vercel** para a aplicação Next.js.

## 📋 Pré-requisitos

1. Conta no [Railway](https://railway.app) (gratuita)
2. Conta no [Vercel](https://vercel.com) (gratuita)
3. Conta no [GitHub](https://github.com) (para conectar os serviços)
4. Código do projeto em um repositório GitHub

---

## 🗄️ Parte 1: Configurar Banco de Dados no Railway

### Passo 1: Criar Projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em **"New Project"**
4. Escolha **"Deploy from GitHub repo"** (se já tiver o código no GitHub)
   - OU escolha **"Empty Project"** para criar manualmente

### Passo 2: Adicionar PostgreSQL

1. No projeto criado, clique em **"+ New"**
2. Selecione **"Database"**
3. Escolha **"Add PostgreSQL"**
4. Aguarde a criação do banco (pode levar alguns minutos)

### Passo 3: Obter String de Conexão

1. Clique no serviço PostgreSQL criado
2. Vá na aba **"Variables"**
3. Copie o valor de `DATABASE_URL` (ou `POSTGRES_URL`)
4. **IMPORTANTE:** Guarde essa URL, você precisará dela no Vercel!

### Passo 4: Executar Migrações

**Opção A: Via Railway CLI (Recomendado)**

1. Instale o Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

2. Faça login:
   ```bash
   railway login
   ```

3. Conecte ao projeto:
   ```bash
   railway link
   ```

4. Execute as migrações:
   ```bash
   railway run npx prisma migrate deploy
   ```

**Opção B: Via Railway Dashboard**

1. No projeto Railway, clique em **"+ New"**
2. Escolha **"Empty Service"**
3. Configure:
   - **Build Command:** `npx prisma generate`
   - **Start Command:** `npx prisma migrate deploy`
4. Adicione a variável `DATABASE_URL` nas variáveis de ambiente
5. Deploy

---

## 🌐 Parte 2: Deploy da Aplicação no Vercel

### Passo 1: Preparar o Código no GitHub

1. Crie um repositório no GitHub
2. Faça push do código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/sul-brasileiro-motovelocidade.git
   git push -u origin main
   ```

### Passo 2: Conectar no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Importe o repositório do GitHub
5. Configure o projeto:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `prisma generate && next build`
   - **Output Directory:** `.next`

### Passo 3: Configurar Variáveis de Ambiente

No Vercel, vá em **Settings → Environment Variables** e adicione:

#### Variáveis Obrigatórias:

```env
# Database (do Railway)
DATABASE_URL=postgresql://postgres:senha@host:porta/railway

# NextAuth
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=gerar-chave-secreta-aqui

# Stripe (opcional - para pagamentos)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# YouTube (opcional)
YOUTUBE_API_KEY=sua-api-key
YOUTUBE_CHANNEL_ID=id-do-canal

# Instagram (opcional)
INSTAGRAM_ACCESS_TOKEN=seu-token
```

#### Como Gerar NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

Ou use um gerador online: https://generate-secret.vercel.app/32

### Passo 4: Configurar Build Settings

No Vercel, em **Settings → General → Build & Development Settings**:

- **Build Command:** `prisma generate && next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Passo 5: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (pode levar 2-5 minutos)
3. Quando concluir, você receberá uma URL: `https://seu-projeto.vercel.app`

---

## 🔗 Parte 3: Configurar Webhook do Stripe

Se você estiver usando pagamentos:

1. Acesse o [Dashboard do Stripe](https://dashboard.stripe.com)
2. Vá em **Developers → Webhooks**
3. Clique em **"Add endpoint"**
4. URL: `https://seu-projeto.vercel.app/api/payments/webhook`
5. Selecione o evento: `checkout.session.completed`
6. Copie o **Signing secret** (começa com `whsec_`)
7. Adicione no Vercel como `STRIPE_WEBHOOK_SECRET`

---

## ✅ Verificação Pós-Deploy

### 1. Testar o Site

Acesse a URL do Vercel e verifique:
- ✅ Home carrega
- ✅ Páginas funcionam
- ✅ Login/Cadastro funcionam

### 2. Verificar Banco de Dados

1. No Railway, abra o PostgreSQL
2. Clique em **"Query"**
3. Execute: `SELECT * FROM "User";`
4. Se não der erro, o banco está conectado!

### 3. Testar Funcionalidades

- Criar uma conta
- Fazer login
- Acessar área do piloto
- Ver produtos
- Ver notícias

---

## 🔄 Atualizações Futuras

### Atualizar Código

1. Faça alterações no código local
2. Commit e push para GitHub:
   ```bash
   git add .
   git commit -m "Sua mensagem"
   git push
   ```
3. O Vercel fará deploy automático!

### Atualizar Banco de Dados

1. Faça alterações no `prisma/schema.prisma`
2. Crie nova migração:
   ```bash
   npx prisma migrate dev --name nome-da-migracao
   ```
3. Execute no Railway:
   ```bash
   railway run npx prisma migrate deploy
   ```

---

## 🐛 Solução de Problemas

### Erro: "Prisma Client not generated"

**Solução:** Adicione no build command do Vercel:
```
prisma generate && next build
```

### Erro: "Database connection failed"

**Solução:** 
1. Verifique se `DATABASE_URL` está correta no Vercel
2. Verifique se o banco Railway está rodando
3. Teste a conexão localmente primeiro

### Erro: "NEXTAUTH_SECRET is missing"

**Solução:** Adicione a variável `NEXTAUTH_SECRET` no Vercel

### Build falha no Vercel

**Solução:**
1. Verifique os logs no Vercel
2. Teste localmente: `npm run build`
3. Verifique se todas as dependências estão no `package.json`

---

## 📊 Monitoramento

### Railway

- Acesse o dashboard para ver uso do banco
- Monitore conexões e queries
- Upgrade o plano se necessário

### Vercel

- Veja analytics de acesso
- Monitore performance
- Configure domínio customizado (opcional)

---

## 🎯 Próximos Passos

1. ✅ Configure domínio customizado no Vercel
2. ✅ Configure SSL (automático no Vercel)
3. ✅ Configure backups do banco no Railway
4. ✅ Configure monitoramento e alertas
5. ✅ Otimize performance

---

## 📞 Suporte

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs

---

## 💰 Custos

### Railway (Free Tier)
- 500 horas de uso/mês
- 1GB de banco de dados
- Suficiente para começar!

### Vercel (Free Tier)
- Deploys ilimitados
- 100GB de bandwidth/mês
- Domínios customizados
- Perfeito para começar!

---

**Boa sorte com o deploy! 🚀**
