# 🚂 Executar Comandos Railway - Guia Rápido

## ⚠️ Importante

O comando `railway login` **precisa ser executado manualmente** porque abre o navegador para autenticação.

---

## 📋 Passo a Passo

### 1️⃣ Fazer Login no Railway (MANUAL)

Abra o PowerShell e execute:

```powershell
cd c:\sul-brasileiro-motovelocidade
railway login
```

**O que vai acontecer:**
- O comando abrirá seu navegador
- Você fará login no Railway
- Após login, volte ao PowerShell

---

### 2️⃣ Executar Script Automático

Após fazer login, execute:

```powershell
npm run railway:deploy
```

**OU execute manualmente:**

```powershell
railway link
railway run npx prisma migrate deploy
```

---

## 🔄 Alternativa: Executar Comandos Manualmente

Se preferir executar um por um:

```powershell
# 1. Login (abre navegador)
railway login

# 2. Conectar ao projeto
railway link

# 3. Executar migrações
railway run npx prisma migrate deploy
```

---

## ❌ Se der erro "No migrations found"

Você precisa criar as migrações primeiro:

1. **Obter DATABASE_URL do Railway:**
   - Acesse: https://railway.app
   - Abra o projeto → PostgreSQL → Variables
   - Copie o `DATABASE_URL`

2. **Adicionar ao .env:**
   ```env
   DATABASE_URL=cole-aqui-a-url-do-railway
   ```

3. **Criar migração:**
   ```powershell
   npx prisma migrate dev --name init
   ```

4. **Commit e push:**
   ```powershell
   git add prisma/migrations
   git commit -m "Add Prisma migrations"
   git push
   ```

5. **Executar no Railway:**
   ```powershell
   railway run npx prisma migrate deploy
   ```

---

## ✅ Verificação

Após executar as migrações, você verá:

```
✅ Applied migration: 2024_xx_xx_xxxxx_init
```

---

## 🚀 Próximo Passo

Após executar as migrações no Railway:

1. **Copie o DATABASE_URL** do Railway
2. **Configure o Vercel** (veja `PROXIMOS_PASSOS_EXECUTAR.md`)

---

**Boa sorte! 🚂**
