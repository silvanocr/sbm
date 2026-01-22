# 🚀 Configurar GitHub e Railway

Guia para fazer push do código para o GitHub e configurar no Railway.

---

## 📋 Parte 1: Subir Código para o GitHub

### Passo 1: Verificar se Git está Instalado

Abra o PowerShell e execute:

```powershell
git --version
```

Se não estiver instalado:

1. Baixe em: https://git-scm.com/download/win
2. Instale com as opções padrão
3. **IMPORTANTE:** Reinicie o PowerShell após instalar

### Passo 2: Navegar até o Projeto

```powershell
cd c:\sul-brasileiro-motovelocidade
```

### Passo 3: Inicializar Git (se ainda não foi feito)

```powershell
git init
```

### Passo 4: Adicionar Todos os Arquivos

```powershell
git add .
```

### Passo 5: Fazer o Primeiro Commit

```powershell
git commit -m "Initial commit - Sul Brasileiro de Motovelocidade"
```

### Passo 6: Adicionar Remote do GitHub

```powershell
git remote add origin https://github.com/silvanocr/sbm.git
```

### Passo 7: Verificar Remote

```powershell
git remote -v
```

Deve mostrar:
```
origin  https://github.com/silvanocr/sbm.git (fetch)
origin  https://github.com/silvanocr/sbm.git (push)
```

### Passo 8: Fazer Push para o GitHub

```powershell
git branch -M main
git push -u origin main
```

**Nota:** Se pedir autenticação:
- Use um **Personal Access Token** (não sua senha)
- Crie em: https://github.com/settings/tokens
- Permissões necessárias: `repo` (acesso completo aos repositórios)

---

## 🗄️ Parte 2: Configurar Railway

### Passo 1: Criar Projeto no Railway

1. Acesse: **https://railway.app**
2. Faça login com GitHub
3. Clique em **"New Project"**
4. Escolha **"Deploy from GitHub repo"**
5. Selecione o repositório: **silvanocr/sbm**
6. Clique em **"Deploy Now"**

### Passo 2: Adicionar PostgreSQL

1. No projeto criado, clique em **"+ New"**
2. Selecione **"Database"**
3. Escolha **"Add PostgreSQL"**
4. ⏳ Aguarde a criação (2-3 minutos)

### Passo 3: Obter DATABASE_URL

1. Clique no serviço **PostgreSQL** criado
2. Vá na aba **"Variables"** (ou **"Data"** → **"Variables"**)
3. Procure por `DATABASE_URL` ou `POSTGRES_URL`
4. Clique no ícone de **👁️** para revelar o valor
5. Clique em **"Copy"** para copiar
6. **📝 GUARDE ESSA URL!** Você precisará dela no Vercel

### Passo 4: Executar Migrações

**Opção A: Via Railway CLI (Recomendado)**

1. Faça login no Railway CLI:
   ```powershell
   railway login
   ```

2. Conecte ao projeto:
   ```powershell
   railway link
   ```
   (Escolha o projeto que você criou)

3. Execute as migrações:
   ```powershell
   railway run npx prisma migrate deploy
   ```

**Opção B: Via Railway Dashboard**

1. No projeto Railway, clique no serviço da aplicação (não o PostgreSQL)
2. Vá em **"Settings"** → **"Deploy"**
3. Configure:
   - **Build Command:** `npx prisma generate`
   - **Start Command:** `npx prisma migrate deploy && npm start`
4. O Railway executará automaticamente

---

## 🌐 Parte 3: Configurar Vercel

### Passo 1: Conectar Repositório no Vercel

1. Acesse: **https://vercel.com**
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Importe o repositório: **silvanocr/sbm**
5. Configure:
   - **Framework Preset:** Next.js (deve detectar automaticamente)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `prisma generate && next build` (já configurado)

### Passo 2: Configurar Variáveis de Ambiente

No Vercel, vá em **Settings → Environment Variables** e adicione:

#### Variáveis OBRIGATÓRIAS:

```env
# Database (cole a URL do Railway aqui)
DATABASE_URL=postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway

# NextAuth
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=cole-a-chave-gerada-aqui
```

**Como gerar NEXTAUTH_SECRET:**

```powershell
npm run deploy:secret
```

Ou use: https://generate-secret.vercel.app/32

### Passo 3: Fazer Deploy

1. Clique em **"Deploy"**
2. ⏳ Aguarde o build (2-5 minutos)
3. ✅ Quando concluir, anote a URL: `https://seu-projeto.vercel.app`

### Passo 4: Atualizar NEXTAUTH_URL

1. Após o deploy, copie a URL do Vercel
2. No Vercel, vá em **Settings → Environment Variables**
3. Edite `NEXTAUTH_URL` e cole a URL completa
4. Salve (fará redeploy automático)

---

## ✅ Verificação Final

### 1. Testar o Site

1. Acesse a URL do Vercel
2. Verifique se a página inicial carrega
3. Teste criar uma conta e fazer login

### 2. Verificar Banco de Dados

1. No Railway, abra o PostgreSQL
2. Clique em **"Query"**
3. Execute:
   ```sql
   SELECT * FROM "User";
   ```
4. Se não der erro, está funcionando! ✅

---

## 🔄 Atualizações Futuras

### Atualizar Código

1. Faça alterações localmente
2. Commit e push:
   ```powershell
   git add .
   git commit -m "Sua mensagem"
   git push
   ```
3. O Vercel fará deploy automático! 🚀

### Atualizar Banco de Dados

1. Altere o `prisma/schema.prisma`
2. Crie migração local:
   ```powershell
   npx prisma migrate dev --name nome-da-migracao
   ```
3. Commit e push:
   ```powershell
   git add prisma/migrations
   git commit -m "Adicionar migração"
   git push
   ```
4. Execute no Railway:
   ```powershell
   railway run npx prisma migrate deploy
   ```

---

## 🐛 Solução de Problemas

### Erro: "Git não reconhecido"

**Solução:**
1. Instale Git: https://git-scm.com/download/win
2. Reinicie o PowerShell
3. Verifique: `git --version`

### Erro: "Authentication failed" no push

**Solução:**
1. Use Personal Access Token (não senha)
2. Crie em: https://github.com/settings/tokens
3. Permissões: `repo`

### Erro: "Repository not found"

**Solução:**
1. Verifique se o repositório existe: https://github.com/silvanocr/sbm
2. Verifique se você tem permissão de escrita
3. Verifique o remote: `git remote -v`

### Railway não conecta ao GitHub

**Solução:**
1. Vá em Railway → Settings → Integrations
2. Reconecte o GitHub
3. Autorize o acesso ao repositório

---

## 📚 Links Úteis

- **GitHub Repo:** https://github.com/silvanocr/sbm
- **Railway:** https://railway.app
- **Vercel:** https://vercel.com
- **Git Docs:** https://git-scm.com/doc

---

**Boa sorte! 🚀**
