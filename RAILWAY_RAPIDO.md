# 🚂 Railway - Configuração Rápida

## ⚡ Passos Rápidos

### 1️⃣ Criar Projeto no Railway (Manual)

1. Acesse: **https://railway.app**
2. Login com GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecione: **silvanocr/sbm**
5. **Deploy Now**

### 2️⃣ Adicionar PostgreSQL

1. No projeto, clique **"+ New"**
2. **Database** → **PostgreSQL**
3. Aguarde criação (2-3 min)
4. Copie o `DATABASE_URL`

### 3️⃣ Conectar Railway CLI

```powershell
railway login
railway link
```

### 4️⃣ Executar Migrações

```powershell
railway run npx prisma migrate deploy
```

### 5️⃣ Verificar

```powershell
npm run railway:check
```

---

## 📚 Guias Completos

- **`CONFIGURAR_RAILWAY_PASSO_A_PASSO.md`** - Guia completo detalhado
- **`DEPLOY_PASSO_A_PASSO.md`** - Guia completo de deploy

---

**Boa sorte! 🚂**
