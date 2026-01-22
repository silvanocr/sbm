# 🌐 Vercel - Deploy Rápido

## ⚡ Passos Rápidos

### 1️⃣ Criar Projeto

1. Acesse: **https://vercel.com**
2. Login com GitHub
3. **Add New Project**
4. Importe: **silvanocr/sbm**
5. Clique em **"Import"**

### 2️⃣ Configurar Variáveis

Antes de fazer deploy, adicione em **Environment Variables**:

```env
DATABASE_URL=cole-aqui-do-railway
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=gerar-com-npm-run-deploy-secret
```

**Como gerar NEXTAUTH_SECRET:**
```powershell
npm run deploy:secret
```

### 3️⃣ Deploy

1. Clique em **"Deploy"**
2. Aguarde (2-5 min)
3. Anote a URL: `https://seu-projeto.vercel.app`

### 4️⃣ Atualizar NEXTAUTH_URL

1. **Settings** → **Environment Variables**
2. Edite `NEXTAUTH_URL`
3. Cole a URL real do projeto
4. Salve (redeploy automático)

---

## ✅ Pronto!

Seu site estará em: `https://seu-projeto.vercel.app`

---

## 📚 Guias Completos

- **`CONFIGURAR_VERCEL_PASSO_A_PASSO.md`** - Guia completo detalhado
- **`DEPLOY_PASSO_A_PASSO.md`** - Guia completo de deploy

---

**Boa sorte! 🚀**
