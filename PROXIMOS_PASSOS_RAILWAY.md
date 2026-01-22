# 🚂 Próximos Passos - Railway

Você já criou o projeto no Railway! Agora siga estes passos:

---

## ✅ Passo 1: Adicionar PostgreSQL

1. No projeto criado, clique em **"+ New"** (canto superior direito)
2. Selecione **"Database"**
3. Escolha **"Add PostgreSQL"**
4. ⏳ Aguarde a criação (2-3 minutos)

---

## 📋 Passo 2: Obter DATABASE_URL

1. Clique no serviço **PostgreSQL** criado
2. Vá na aba **"Variables"** (ou **"Data"** → **"Variables"**)
3. Procure por `DATABASE_URL` ou `POSTGRES_URL`
4. Clique no ícone de **👁️** (olho) para revelar o valor
5. Clique em **"Copy"** para copiar a URL completa
6. **📝 GUARDE ESSA URL!** Você precisará dela no Vercel

**Exemplo de DATABASE_URL:**
```
postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway
```

---

## 🔗 Passo 3: Conectar Railway CLI

Execute no PowerShell:

```powershell
cd c:\sul-brasileiro-motovelocidade
railway login
```

Isso abrirá o navegador para autenticar. Após autenticar, volte ao PowerShell e execute:

```powershell
railway link
```

Selecione o projeto que você criou.

---

## 📊 Passo 4: Executar Migrações

```powershell
railway run npx prisma migrate deploy
```

Isso criará todas as tabelas no banco de dados PostgreSQL.

**Saída esperada:**
```
Prisma Migrate applied the following migration(s):
  XXXXXXXXXXXXXX_init
```

Se aparecer **"All migrations have been successfully applied"**, está pronto! ✅

---

## ✅ Verificação

### Verificar Banco de Dados

1. No Railway, abra o serviço PostgreSQL
2. Clique em **"Query"** (ou **"Data"** → **"Query"**)
3. Execute:
   ```sql
   SELECT * FROM "User";
   ```
4. Se não der erro, o banco está funcionando! ✅

---

## 🔄 Próximos Passos

Após configurar o Railway:

1. **Copie o DATABASE_URL** do Railway
2. **Configure o Vercel** (veja `DEPLOY_PASSO_A_PASSO.md`)
3. **Adicione o DATABASE_URL** nas variáveis de ambiente do Vercel

---

## 📚 Guias Completos

- **`CONFIGURAR_RAILWAY_PASSO_A_PASSO.md`** - Guia completo detalhado
- **`DEPLOY_PASSO_A_PASSO.md`** - Guia completo de deploy

---

**Boa sorte! 🚂**
