# ⚡ Guia Rápido - Deploy Railway + Vercel

## 🎯 Resumo Rápido

1. **Railway** = Banco de dados PostgreSQL
2. **Vercel** = Aplicação Next.js
3. **GitHub** = Código fonte

---

## 🚀 Passo a Passo (5 minutos)

### 1️⃣ Railway - Criar Banco de Dados

1. Acesse: https://railway.app
2. Login com GitHub
3. **New Project** → **Empty Project**
4. **+ New** → **Database** → **PostgreSQL**
5. Copie o `DATABASE_URL` (guarde!)

### 2️⃣ GitHub - Subir Código

```bash
cd C:\Users\silva\sul-brasileiro-motovelocidade
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/sul-brasileiro-motovelocidade.git
git push -u origin main
```

### 3️⃣ Vercel - Deploy Aplicação

1. Acesse: https://vercel.com
2. Login com GitHub
3. **Add New Project**
4. Importe o repositório
5. Configure variáveis:

```
DATABASE_URL=cole-aqui-do-railway
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=gerar-com-openssl-rand-base64-32
```

6. **Deploy** → Pronto! 🎉

### 4️⃣ Railway - Executar Migrações

```bash
npm i -g @railway/cli
railway login
railway link
railway run npx prisma migrate deploy
```

---

## ✅ Pronto!

Seu site estará em: `https://seu-projeto.vercel.app`

---

## 📝 Variáveis Importantes no Vercel

Adicione em **Settings → Environment Variables**:

| Variável | Onde Pegar |
|----------|-----------|
| `DATABASE_URL` | Railway → PostgreSQL → Variables |
| `NEXTAUTH_URL` | URL do seu projeto Vercel |
| `NEXTAUTH_SECRET` | Gerar: `openssl rand -base64 32` |

---

## 🔧 Build Command no Vercel

Certifique-se que está configurado:

```
prisma generate && next build
```

---

## ❓ Problemas?

- **Erro de build?** → Verifique logs no Vercel
- **Banco não conecta?** → Verifique `DATABASE_URL`
- **Erro de migração?** → Execute `railway run npx prisma migrate deploy`

---

**Veja `DEPLOY.md` para instruções detalhadas!**
