# 🗄️ Configurar Banco de Dados

## Opções Disponíveis

Você tem 3 opções para configurar o banco de dados:

### 1️⃣ Railway (Recomendado - Grátis e Fácil)

**Vantagens:**
- ✅ Grátis para começar
- ✅ Não precisa instalar nada localmente
- ✅ Fácil de configurar
- ✅ Pronto para produção

**Passos:**
1. Acesse: https://railway.app
2. Faça login com GitHub
3. Clique em **"New Project"** → **"Empty Project"**
4. Clique em **"+ New"** → **"Database"** → **"PostgreSQL"**
5. Aguarde a criação (alguns minutos)
6. Clique no serviço PostgreSQL
7. Vá na aba **"Variables"**
8. Copie o valor de `DATABASE_URL` ou `POSTGRES_URL`
9. Cole no arquivo `.env` do projeto

**Exemplo de DATABASE_URL do Railway:**
```
postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway
```

---

### 2️⃣ Supabase (Alternativa Grátis)

**Vantagens:**
- ✅ Grátis
- ✅ Interface web para gerenciar dados
- ✅ Fácil de usar

**Passos:**
1. Acesse: https://supabase.com
2. Crie uma conta
3. Crie um novo projeto
4. Vá em **Settings** → **Database**
5. Copie a **Connection String** (URI)
6. Cole no arquivo `.env`

---

### 3️⃣ PostgreSQL Local

**Vantagens:**
- ✅ Funciona offline
- ✅ Controle total

**Desvantagens:**
- ❌ Precisa instalar PostgreSQL
- ❌ Configuração mais complexa

**Passos:**
1. Instale PostgreSQL: https://www.postgresql.org/download/windows/
2. Durante a instalação, anote a senha do usuário `postgres`
3. Abra **pgAdmin** ou **psql**
4. Crie o banco:
   ```sql
   CREATE DATABASE motovelocidade;
   ```
5. Configure no `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/motovelocidade?schema=public"
   ```

---

## ⚙️ Após Configurar a DATABASE_URL

### 1. Atualizar o .env

Edite o arquivo `.env` e substitua a linha `DATABASE_URL` pela URL do seu banco.

### 2. Criar as Tabelas

```powershell
cd C:\Users\silva\sul-brasileiro-motovelocidade
npm run db:migrate
```

Quando perguntar o nome da migração, digite: `init`

### 3. Verificar se Funcionou

```powershell
npm run db:status
```

Deve mostrar: "Database schema is up to date!"

### 4. (Opcional) Popular com Dados de Exemplo

```powershell
npm run db:seed
```

### 5. Visualizar Dados

```powershell
npm run db:studio
```

Abre em: http://localhost:5555

---

## 🔧 Testar Conexão

```powershell
npx prisma db pull
```

Se não der erro, a conexão está OK!

---

## ❓ Problemas Comuns

### Erro: "Authentication failed"

**Solução:** Verifique se:
- A senha está correta
- O usuário existe
- O banco existe

### Erro: "Can't reach database server"

**Solução:**
- Verifique se o PostgreSQL está rodando (se for local)
- Verifique se a URL está correta
- Para nuvem: verifique se permite conexões externas

### Erro: "Database does not exist"

**Solução:**
- Crie o banco: `CREATE DATABASE motovelocidade;`
- Ou use um banco existente na URL

---

## 📝 Exemplo de .env Completo

```env
# Database (substitua pela sua URL)
DATABASE_URL="postgresql://postgres:senha@localhost:5432/motovelocidade?schema=public"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=chave-temporaria-123

# Stripe (opcional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# YouTube (opcional)
YOUTUBE_API_KEY=sua-api-key
YOUTUBE_CHANNEL_ID=id-do-canal

# Instagram (opcional)
INSTAGRAM_ACCESS_TOKEN=seu-token
```

---

**Recomendação:** Use Railway para começar rapidamente! 🚀
