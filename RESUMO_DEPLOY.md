# 🚀 Resumo Rápido - Deploy GitHub + Railway + Vercel

## 📋 Passos Rápidos

### 1️⃣ Subir Código para GitHub

```powershell
npm run github:setup
```

Ou manualmente:
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/silvanocr/sbm.git
git branch -M main
git push -u origin main
```

**Repositório:** https://github.com/silvanocr/sbm

---

### 2️⃣ Configurar Railway

1. Acesse: https://railway.app
2. Login com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecione: **silvanocr/sbm**
5. **+ New** → **Database** → **PostgreSQL**
6. Copie o `DATABASE_URL`

---

### 3️⃣ Executar Migrações no Railway

```powershell
railway login
railway link
railway run npx prisma migrate deploy
```

---

### 4️⃣ Configurar Vercel

1. Acesse: https://vercel.com
2. Login com GitHub
3. **Add New Project**
4. Importe: **silvanocr/sbm**
5. Configure variáveis:
   - `DATABASE_URL` (do Railway)
   - `NEXTAUTH_URL` (URL do Vercel)
   - `NEXTAUTH_SECRET` (gerar com `npm run deploy:secret`)
6. **Deploy**

---

## ✅ Pronto!

Seu site estará em: `https://seu-projeto.vercel.app`

---

## 📚 Guias Completos

- **`CONFIGURAR_GITHUB_RAILWAY.md`** - Guia completo GitHub + Railway
- **`DEPLOY_PASSO_A_PASSO.md`** - Guia completo passo a passo
- **`DEPLOY.md`** - Guia detalhado

---

**Boa sorte! 🚀**
