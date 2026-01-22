# 🚀 Executar Migrações no Railway

## ✅ Migrações Criadas

As migrações foram criadas e commitadas no repositório! ✅

---

## 🔴 Problema com Railway CLI

O Railway CLI está tentando usar a URL interna que não funciona localmente. 

**Solução:** Execute as migrações diretamente no Railway Dashboard.

---

## 📋 Passo a Passo

### Opção 1: Via Railway Dashboard (Recomendado)

1. **Acesse o Railway Dashboard:**
   - https://railway.app
   - Abra o projeto `abundant-sparkle`
   - Clique no serviço **PostgreSQL**

2. **Abra o Query Editor:**
   - Clique em **"Query"** ou **"Data"** → **"Query"**

3. **Execute o SQL:**
   - Abra o arquivo `executar-migracoes-railway.sql` neste projeto
   - Copie TODO o conteúdo
   - Cole no Query Editor do Railway
   - Clique em **"Run"** ou **"Execute"**

4. **Verifique:**
   - Você deve ver mensagens de sucesso
   - As tabelas foram criadas!

---

### Opção 2: Via Railway CLI (Tentar Novamente)

Se quiser tentar via CLI, execute:

```powershell
cd c:\sul-brasileiro-motovelocidade
Remove-Item .env -ErrorAction SilentlyContinue
powershell -ExecutionPolicy Bypass -Command "railway run --service Postgres npx prisma migrate deploy"
```

**Nota:** Isso pode não funcionar se o Railway CLI não conseguir acessar o banco.

---

## ✅ Verificação

Após executar as migrações, verifique se as tabelas foram criadas:

1. No Railway Dashboard → PostgreSQL → Query
2. Execute:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
3. Você deve ver:
   - User
   - Enrollment
   - Product
   - Order
   - OrderItem
   - News
   - InstagramPost

---

## 🚀 Próximo Passo

Após executar as migrações:

1. ✅ Banco de dados configurado
2. ⏭️ **Configurar Vercel** (veja `PROXIMOS_PASSOS_EXECUTAR.md`)

---

**Migrações prontas! Execute no Railway Dashboard! 🚂**
