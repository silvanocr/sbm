# 🚀 Deploy Passo a Passo - Railway + Vercel

Guia prático e simplificado para fazer o deploy do projeto.

---

## 📋 Checklist Pré-Deploy

Antes de começar, certifique-se de que:

- [ ] Código está no GitHub (https://github.com/silvanocr/sbm)
- [ ] Conta criada no Railway
- [ ] Conta criada no Vercel
- [ ] Node.js instalado localmente (para executar migrações)
- [ ] Railway CLI instalado (`npm i -g @railway/cli`)

---

## 📤 PARTE 0: Subir Código para o GitHub

**Se você ainda não fez push do código:**

### Opção A: Script Automático (Recomendado)

```powershell
npm run github:setup
```

Este script irá:
- Verificar se Git está instalado
- Inicializar repositório (se necessário)
- Adicionar remote do GitHub
- Fazer commit e push

### Opção B: Manual

1. Instale Git: https://git-scm.com/download/win
2. Execute os comandos:

```powershell
cd c:\sul-brasileiro-motovelocidade
git init
git add .
git commit -m "Initial commit - Sul Brasileiro de Motovelocidade"
git remote add origin https://github.com/silvanocr/sbm.git
git branch -M main
git push -u origin main
```

**Nota:** Se pedir autenticação, use um **Personal Access Token** (não sua senha):
- Crie em: https://github.com/settings/tokens
- Permissões: `repo`

**Veja o guia completo:** `CONFIGURAR_GITHUB_RAILWAY.md`

---

## 🗄️ PARTE 1: Configurar Banco de Dados no Railway

### Passo 1: Criar Projeto no Railway

1. Acesse: **https://railway.app**
2. Faça login com **GitHub**
3. Clique em **"New Project"**
4. Escolha **"Deploy from GitHub repo"**
5. Selecione o repositório: **silvanocr/sbm**
6. Clique em **"Deploy Now"**

### Passo 2: Adicionar PostgreSQL

1. No projeto criado, clique em **"+ New"**
2. Selecione **"Database"**
3. Escolha **"Add PostgreSQL"**
4. ⏳ Aguarde a criação (2-3 minutos)

### Passo 3: Obter DATABASE_URL

1. Clique no serviço **PostgreSQL** criado
2. Vá na aba **"Variables"** (ou **"Data"** → **"Variables"**)
3. Procure por `DATABASE_URL` ou `POSTGRES_URL`
4. Clique no ícone de **👁️** para revelar o valor
5. Clique em **"Copy"** para copiar
6. **📝 GUARDE ESSA URL!** Você precisará dela no Vercel

**Exemplo de DATABASE_URL:**
```
postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway
```

### Passo 4: Executar Migrações no Railway

**Opção A: Via Railway CLI (Recomendado)**

1. Instale o Railway CLI:
   ```powershell
   npm i -g @railway/cli
   ```

2. Faça login:
   ```powershell
   railway login
   ```
   (Isso abrirá o navegador para autenticar)

3. Conecte ao projeto:
   ```powershell
   railway link
   ```
   (Escolha o projeto que você criou)

4. Execute as migrações:
   ```powershell
   railway run npx prisma migrate deploy
   ```

5. ✅ Se aparecer "All migrations have been successfully applied", está pronto!

**Opção B: Via Railway Dashboard (Alternativa)**

1. No projeto Railway, clique em **"+ New"**
2. Escolha **"Empty Service"**
3. Configure:
   - **Source:** Deploy from GitHub repo (selecione seu repositório)
   - **Build Command:** `npx prisma generate`
   - **Start Command:** `npx prisma migrate deploy`
4. Adicione a variável `DATABASE_URL` (será herdada automaticamente)
5. Clique em **"Deploy"**

---

## 🌐 PARTE 2: Deploy da Aplicação no Vercel

### Passo 1: Preparar Código no GitHub

Se ainda não fez:

```powershell
cd c:\sul-brasileiro-motovelocidade
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/sul-brasileiro-motovelocidade.git
git push -u origin main
```

### Passo 2: Conectar no Vercel

1. Acesse: **https://vercel.com**
2. Faça login com **GitHub**
3. Clique em **"Add New Project"**
4. Importe o repositório: **silvanocr/sbm**
5. Configure:
   - **Framework Preset:** Next.js (deve detectar automaticamente)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `prisma generate && next build` (já deve estar configurado)
   - **Output Directory:** `.next` (já deve estar configurado)

### Passo 3: Configurar Variáveis de Ambiente

**⚠️ IMPORTANTE:** Configure ANTES de fazer o deploy!

1. No Vercel, antes de clicar em "Deploy", vá em **"Environment Variables"**
2. Adicione as seguintes variáveis:

#### Variáveis OBRIGATÓRIAS:

```env
# Database (cole a URL do Railway aqui)
DATABASE_URL=postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway

# NextAuth
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=cole-a-chave-gerada-aqui
```

**Como gerar NEXTAUTH_SECRET:**

No PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Ou use um gerador online: **https://generate-secret.vercel.app/32**

#### Variáveis OPCIONAIS (adicionar depois se necessário):

```env
# Stripe (para pagamentos)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# YouTube (para transmissões)
YOUTUBE_API_KEY=sua-api-key
YOUTUBE_CHANNEL_ID=id-do-canal

# Instagram (para feed)
INSTAGRAM_ACCESS_TOKEN=seu-token
```

3. Para cada variável:
   - Clique em **"Add"**
   - Cole o nome e valor
   - Marque os ambientes: **Production**, **Preview**, **Development**
   - Clique em **"Save"**

### Passo 4: Fazer o Deploy

1. Clique em **"Deploy"**
2. ⏳ Aguarde o build (2-5 minutos)
3. ✅ Quando concluir, você verá: **"Congratulations! Your project has been deployed"**
4. Anote a URL: `https://seu-projeto.vercel.app`

### Passo 5: Atualizar NEXTAUTH_URL

1. Após o deploy, copie a URL do Vercel
2. No Vercel, vá em **Settings → Environment Variables**
3. Edite `NEXTAUTH_URL` e cole a URL completa:
   ```
   https://seu-projeto.vercel.app
   ```
4. Salve
5. O Vercel fará um redeploy automático

---

## ✅ Verificação Pós-Deploy

### 1. Testar o Site

1. Acesse a URL do Vercel
2. Verifique se a página inicial carrega
3. Teste navegação entre páginas

### 2. Testar Funcionalidades

- [ ] Criar uma conta em `/cadastro`
- [ ] Fazer login em `/login`
- [ ] Acessar área do piloto em `/piloto`
- [ ] Ver produtos em `/produtos`
- [ ] Ver notícias em `/noticias`

### 3. Verificar Banco de Dados

1. No Railway, abra o PostgreSQL
2. Clique em **"Query"** (ou **"Data"** → **"Query"**)
3. Execute:
   ```sql
   SELECT * FROM "User";
   ```
4. Se não der erro, o banco está conectado! ✅

---

## 🔧 Configurar Webhook do Stripe (Opcional)

Se você usar pagamentos:

1. Acesse: **https://dashboard.stripe.com**
2. Vá em **Developers → Webhooks**
3. Clique em **"Add endpoint"**
4. URL: `https://seu-projeto.vercel.app/api/payments/webhook`
5. Selecione evento: `checkout.session.completed`
6. Copie o **Signing secret** (começa com `whsec_`)
7. Adicione no Vercel como `STRIPE_WEBHOOK_SECRET`

---

## 🔄 Atualizações Futuras

### Atualizar Código

1. Faça alterações localmente
2. Commit e push:
   ```powershell
   git add .
   git commit -m "Sua mensagem"
   git push
   ```
3. O Vercel fará deploy automático! 🚀

### Atualizar Banco de Dados

1. Altere o `prisma/schema.prisma`
2. Crie migração local:
   ```powershell
   npx prisma migrate dev --name nome-da-migracao
   ```
3. Execute no Railway:
   ```powershell
   railway run npx prisma migrate deploy
   ```

---

## 🐛 Solução de Problemas

### Erro: "Prisma Client not generated"

**Solução:** 
- Verifique se o build command no Vercel está: `prisma generate && next build`
- Veja em: **Settings → General → Build & Development Settings**

### Erro: "Database connection failed"

**Solução:**
1. Verifique se `DATABASE_URL` está correta no Vercel
2. Verifique se o banco Railway está rodando (Status: "Active")
3. Teste a conexão localmente primeiro

### Erro: "NEXTAUTH_SECRET is missing"

**Solução:**
- Adicione a variável `NEXTAUTH_SECRET` no Vercel
- Gere uma nova chave se necessário

### Build falha no Vercel

**Solução:**
1. Veja os logs no Vercel (aba "Deployments" → clique no deploy → "Build Logs")
2. Teste localmente: `npm run build`
3. Verifique se todas as dependências estão no `package.json`

### Migrações não executam no Railway

**Solução:**
1. Verifique se está conectado ao projeto certo: `railway status`
2. Tente novamente: `railway run npx prisma migrate deploy`
3. Verifique se o `DATABASE_URL` está disponível: `railway variables`

---

## 📊 Monitoramento

### Railway

- Acesse o dashboard para ver uso do banco
- Monitore conexões e queries
- Upgrade o plano se necessário (Free tier: 500h/mês, 1GB)

### Vercel

- Veja analytics de acesso
- Monitore performance
- Configure domínio customizado (opcional)

---

## 💰 Custos

### Railway (Free Tier)
- ✅ 500 horas de uso/mês
- ✅ 1GB de banco de dados
- ✅ Suficiente para começar!

### Vercel (Free Tier)
- ✅ Deploys ilimitados
- ✅ 100GB de bandwidth/mês
- ✅ Domínios customizados
- ✅ Perfeito para começar!

---

## 🎯 Próximos Passos

1. ✅ Configure domínio customizado no Vercel
2. ✅ Configure backups do banco no Railway
3. ✅ Configure monitoramento e alertas
4. ✅ Otimize performance

---

## 📞 Links Úteis

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Boa sorte com o deploy! 🚀**

Se tiver dúvidas, consulte o arquivo `DEPLOY.md` para mais detalhes.
