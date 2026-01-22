# 🚀 Próximos Passos para Executar

## ✅ O que já está pronto

- [x] Código no GitHub
- [x] Railway: Projeto criado
- [x] Railway: PostgreSQL adicionado
- [x] Correções de código feitas
- [x] NEXTAUTH_SECRET gerado

---

## 🔴 Passos que você precisa fazer AGORA

### 1️⃣ Obter DATABASE_URL do Railway (2 minutos)

1. Acesse: **https://railway.app**
2. Abra seu projeto
3. Clique no serviço **PostgreSQL**
4. Vá em **"Variables"** (ou **"Data"** → **"Variables"**)
5. Clique no ícone **👁️** para revelar
6. Copie o `DATABASE_URL`
7. **📝 GUARDE ESSA URL!**

---

### 2️⃣ Conectar Railway CLI e Executar Migrações (5 minutos)

Execute estes comandos no PowerShell:

```powershell
cd c:\sul-brasileiro-motovelocidade

# Login no Railway (abrirá navegador)
railway login

# Conectar ao projeto
railway link

# Executar migrações
railway run npx prisma migrate deploy
```

**Nota:** Se não houver migrações ainda, você precisará criar uma primeiro (veja passo 2.1 abaixo).

#### 2.1 Criar Migração (se necessário)

Se o comando acima der erro "No migrations found", execute:

```powershell
# Criar migração local (precisa de DATABASE_URL no .env)
npx prisma migrate dev --name init

# Commit e push
git add prisma/migrations
git commit -m "Add Prisma migrations"
git push

# Depois execute no Railway
railway run npx prisma migrate deploy
```

---

### 3️⃣ Configurar e Fazer Deploy no Vercel (10 minutos)

#### 3.1 Criar Projeto

1. Acesse: **https://vercel.com**
2. Login com GitHub
3. **Add New Project**
4. Importe: **silvanocr/sbm**
5. Clique em **"Import"**

#### 3.2 Configurar Variáveis (ANTES de fazer deploy!)

Na tela de configuração, role até **"Environment Variables"** e adicione:

**1. DATABASE_URL**
- Name: `DATABASE_URL`
- Value: Cole a URL que você copiou do Railway
- Environments: ☑️ Production, ☑️ Preview, ☑️ Development

**2. NEXTAUTH_URL**
- Name: `NEXTAUTH_URL`
- Value: `https://seu-projeto.vercel.app` (você atualizará depois)
- Environments: ☑️ Production, ☑️ Preview, ☑️ Development

**3. NEXTAUTH_SECRET**
- Name: `NEXTAUTH_SECRET`
- Value: `H0Xl13UEZ14U1PlPQSYyxZTbz389ZBrR62xINk01FfI=`
- Environments: ☑️ Production, ☑️ Preview, ☑️ Development

#### 3.3 Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde 2-5 minutos
3. Anote a URL gerada: `https://seu-projeto.vercel.app`

#### 3.4 Atualizar NEXTAUTH_URL

1. No Vercel: **Settings** → **Environment Variables**
2. Edite `NEXTAUTH_URL`
3. Cole a URL real do projeto
4. Salve (redeploy automático)

---

## ✅ Verificação Final

Após tudo configurado:

1. Acesse a URL do Vercel
2. Teste criar uma conta em `/cadastro`
3. Teste fazer login em `/login`
4. Verifique se tudo funciona!

---

## 📚 Guias de Referência

- **`EXECUTAR_DEPLOY_VERCEL.md`** - Guia detalhado Vercel
- **`CONFIGURAR_VERCEL_PASSO_A_PASSO.md`** - Guia completo
- **`PROXIMOS_PASSOS_RAILWAY.md`** - Guia Railway
- **`CHECKLIST_DEPLOY.md`** - Checklist completo

---

## 🆘 Precisa de Ajuda?

Se tiver problemas:

1. Veja os logs no Vercel: **Deployments** → Clique no deploy → **Build Logs**
2. Verifique se todas as variáveis estão configuradas
3. Teste localmente: `npm run build`

---

**Boa sorte! 🚀**
