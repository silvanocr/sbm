# 🚂 Configurar Railway - Passo a Passo

Guia detalhado para configurar o Railway com seu projeto.

---

## 📋 Pré-requisitos

- [x] Código no GitHub (✅ Já feito: https://github.com/silvanocr/sbm)
- [ ] Conta no Railway
- [x] Railway CLI instalado (✅ Já instalado: versão 4.26.0)

---

## 🚀 Passo 1: Criar Conta e Projeto no Railway

### 1.1 Acessar Railway

1. Abra seu navegador
2. Acesse: **https://railway.app**
3. Clique em **"Start a New Project"** ou **"Login"**

### 1.2 Fazer Login

1. Clique em **"Login with GitHub"**
2. Autorize o Railway a acessar seus repositórios
3. Você será redirecionado para o dashboard

### 1.3 Criar Novo Projeto

1. No dashboard, clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione o repositório: **silvanocr/sbm**
4. Clique em **"Deploy Now"**

**Nota:** O Railway vai tentar fazer deploy da aplicação, mas isso é normal. Vamos configurar apenas o banco de dados primeiro.

---

## 🗄️ Passo 2: Adicionar PostgreSQL

### 2.1 Adicionar Banco de Dados

1. No projeto criado, clique em **"+ New"** (canto superior direito)
2. Selecione **"Database"**
3. Escolha **"Add PostgreSQL"**
4. ⏳ Aguarde a criação (2-3 minutos)

### 2.2 Obter DATABASE_URL

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

## 🔗 Passo 3: Conectar Railway CLI ao Projeto

### 3.1 Fazer Login no CLI

Abra o PowerShell e execute:

```powershell
cd c:\sul-brasileiro-motovelocidade
railway login
```

Isso abrirá o navegador para autenticar. Após autenticar, volte ao PowerShell.

### 3.2 Conectar ao Projeto

```powershell
railway link
```

Você verá uma lista de projetos. Selecione o projeto que você criou (deve aparecer como "sbm" ou similar).

**Nota:** Se não aparecer nenhum projeto, certifique-se de que:
- Você fez login corretamente
- O projeto foi criado no Railway
- Você tem acesso ao projeto

### 3.3 Verificar Conexão

```powershell
railway status
```

Deve mostrar informações sobre o projeto conectado.

---

## 📊 Passo 4: Executar Migrações

### 4.1 Verificar Variáveis

```powershell
railway variables
```

Deve mostrar o `DATABASE_URL` disponível.

### 4.2 Executar Migrações

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

## 🐛 Solução de Problemas

### Erro: "Cannot login in non-interactive mode"

**Solução:** Execute `railway login` em um terminal interativo (não via script).

### Erro: "No projects found"

**Solução:**
1. Verifique se você fez login corretamente
2. Certifique-se de que o projeto foi criado no Railway
3. Tente criar o projeto novamente

### Erro: "Database connection failed"

**Solução:**
1. Verifique se o PostgreSQL está rodando (Status: "Active")
2. Verifique se o `DATABASE_URL` está correto
3. Teste a conexão: `railway run npx prisma db pull`

### Erro: "No migrations found"

**Solução:**
1. Verifique se existe a pasta `prisma/migrations`
2. Se não existir, crie uma migração local:
   ```powershell
   npx prisma migrate dev --name init
   ```
3. Commit e push:
   ```powershell
   git add prisma/migrations
   git commit -m "Add Prisma migrations"
   git push
   ```
4. Execute novamente: `railway run npx prisma migrate deploy`

---

## 📚 Comandos Úteis do Railway CLI

```powershell
# Ver status do projeto
railway status

# Ver variáveis de ambiente
railway variables

# Ver logs
railway logs

# Executar comando no ambiente Railway
railway run <comando>

# Abrir dashboard no navegador
railway open
```

---

## 📞 Links Úteis

- **Railway Dashboard:** https://railway.app
- **Railway Docs:** https://docs.railway.app
- **Prisma Docs:** https://www.prisma.io/docs

---

**Boa sorte! 🚂**

Após configurar, continue com o Vercel (veja `DEPLOY_PASSO_A_PASSO.md`).
