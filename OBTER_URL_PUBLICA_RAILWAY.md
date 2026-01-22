# 🔗 Obter URL Pública do Railway

## ⚠️ Problema

A URL que você forneceu é **interna** do Railway:
```
postgresql://postgres:...@postgres.railway.internal:5432/railway
```

Esta URL só funciona **dentro do ambiente Railway**, não localmente.

---

## ✅ Solução: Obter URL Pública

### Opção 1: Via Railway Dashboard (Recomendado)

1. Acesse: **https://railway.app**
2. Abra o projeto `abundant-sparkle`
3. Clique no serviço **PostgreSQL**
4. Vá em **"Connect"** ou **"Data"** → **"Connect"**
5. Procure por **"Public Network"** ou **"Connection String"**
6. Copie a URL que contém um domínio como:
   ```
   postgresql://postgres:...@containers-us-west-xxx.railway.app:5432/railway
   ```
   (Note: deve ter `.railway.app` no final, não `.railway.internal`)

### Opção 2: Via Railway CLI

Execute:
```powershell
railway variables --service Postgres
```

Procure por `DATABASE_URL` ou `POSTGRES_URL` que tenha `.railway.app` no final.

---

## 🚀 Após Obter URL Pública

### 1. Adicionar ao .env

```env
DATABASE_URL=postgresql://postgres:...@containers-us-west-xxx.railway.app:5432/railway
```

### 2. Criar Migrações

```powershell
powershell -ExecutionPolicy Bypass -Command "npx prisma migrate dev --name init"
```

### 3. Commit e Push

```powershell
git add prisma/migrations
git commit -m "Add Prisma migrations"
git push
```

### 4. Executar no Railway

```powershell
powershell -ExecutionPolicy Bypass -Command "railway run --service Postgres npx prisma migrate deploy"
```

---

## 🔄 Alternativa: Usar Railway Dashboard

Se não conseguir a URL pública, você pode executar as migrações diretamente no Railway:

1. No Railway Dashboard, vá em **PostgreSQL** → **"Query"**
2. Execute o SQL gerado pelo Prisma (veja abaixo)

---

## 📝 SQL para Criar Tabelas Manualmente

Se preferir, posso gerar o SQL baseado no schema. Me avise!

---

**Precisa da URL pública para continuar! 🔗**
