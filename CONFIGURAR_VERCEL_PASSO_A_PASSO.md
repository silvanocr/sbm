# 🌐 Configurar Vercel - Passo a Passo

Guia detalhado para fazer deploy da aplicação no Vercel.

---

## 📋 Pré-requisitos

- [x] Código no GitHub (✅ https://github.com/silvanocr/sbm)
- [x] Railway configurado com PostgreSQL (✅ Já feito)
- [ ] Conta no Vercel
- [ ] DATABASE_URL do Railway copiado

---

## 🚀 Passo 1: Criar Conta e Projeto no Vercel

### 1.1 Acessar Vercel

1. Abra seu navegador
2. Acesse: **https://vercel.com**
3. Clique em **"Sign Up"** ou **"Login"**

### 1.2 Fazer Login

1. Clique em **"Continue with GitHub"**
2. Autorize o Vercel a acessar seus repositórios
3. Você será redirecionado para o dashboard

### 1.3 Criar Novo Projeto

1. No dashboard, clique em **"Add New Project"** ou **"+ New Project"**
2. Você verá uma lista de repositórios do GitHub
3. Procure e selecione: **silvanocr/sbm**
4. Clique em **"Import"**

---

## ⚙️ Passo 2: Configurar o Projeto

### 2.1 Configurações do Projeto

O Vercel deve detectar automaticamente que é um projeto Next.js. Verifique:

- **Framework Preset:** Next.js (deve estar selecionado)
- **Root Directory:** `./` (raiz - deixe como está)
- **Build Command:** `prisma generate && next build` (já deve estar configurado)
- **Output Directory:** `.next` (já deve estar configurado)
- **Install Command:** `npm install` (padrão)

**Nota:** Se alguma configuração estiver diferente, ajuste conforme acima.

---

## 🔐 Passo 3: Configurar Variáveis de Ambiente

**⚠️ IMPORTANTE:** Configure ANTES de clicar em "Deploy"!

### 3.1 Adicionar Variáveis

1. Na tela de configuração do projeto, role para baixo até **"Environment Variables"**
2. Clique em **"Add"** para cada variável abaixo

### 3.2 Variáveis OBRIGATÓRIAS

#### 1. DATABASE_URL

- **Name:** `DATABASE_URL`
- **Value:** Cole a URL do Railway (que você copiou)
- **Environments:** Marque todas: ☑️ Production, ☑️ Preview, ☑️ Development
- Clique em **"Save"**

**Exemplo:**
```
postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway
```

#### 2. NEXTAUTH_URL

- **Name:** `NEXTAUTH_URL`
- **Value:** Por enquanto, use `https://seu-projeto.vercel.app` (você atualizará depois)
- **Environments:** Marque todas: ☑️ Production, ☑️ Preview, ☑️ Development
- Clique em **"Save"**

**Nota:** Você atualizará isso após o primeiro deploy com a URL real.

#### 3. NEXTAUTH_SECRET

- **Name:** `NEXTAUTH_SECRET`
- **Value:** Gere uma chave secreta (veja abaixo)
- **Environments:** Marque todas: ☑️ Production, ☑️ Preview, ☑️ Development
- Clique em **"Save"**

**Como gerar NEXTAUTH_SECRET:**

Execute no PowerShell:
```powershell
cd c:\sul-brasileiro-motovelocidade
npm run deploy:secret
```

Ou use o gerador online: **https://generate-secret.vercel.app/32**

---

## 🚀 Passo 4: Fazer o Deploy

### 4.1 Iniciar Deploy

1. Após configurar todas as variáveis, clique em **"Deploy"**
2. ⏳ Aguarde o build (2-5 minutos)
3. Você verá o progresso em tempo real

### 4.2 Aguardar Conclusão

O Vercel irá:
1. Instalar dependências (`npm install`)
2. Gerar Prisma Client (`prisma generate`)
3. Fazer build da aplicação (`next build`)
4. Fazer deploy

**Saída esperada:**
```
✓ Build completed
✓ Deploying...
✓ Deployment ready
```

---

## 🔄 Passo 5: Atualizar NEXTAUTH_URL

### 5.1 Obter URL do Projeto

Após o deploy concluir, você verá:
- **"Congratulations! Your project has been deployed"**
- Uma URL: `https://seu-projeto.vercel.app` (ou similar)

### 5.2 Atualizar Variável

1. No Vercel, vá em **"Settings"** → **"Environment Variables"**
2. Encontre `NEXTAUTH_URL`
3. Clique em **"Edit"** (ou os três pontos → **"Edit"**)
4. Cole a URL completa do seu projeto:
   ```
   https://seu-projeto.vercel.app
   ```
5. Clique em **"Save"**
6. O Vercel fará um redeploy automático

---

## ✅ Passo 6: Verificação

### 6.1 Testar o Site

1. Acesse a URL do Vercel: `https://seu-projeto.vercel.app`
2. Verifique se a página inicial carrega
3. Teste navegação entre páginas

### 6.2 Testar Funcionalidades

- [ ] Criar uma conta em `/cadastro`
- [ ] Fazer login em `/login`
- [ ] Acessar área do piloto em `/piloto`
- [ ] Ver produtos em `/produtos`
- [ ] Ver notícias em `/noticias`

### 6.3 Verificar Banco de Dados

1. No Railway, abra o PostgreSQL
2. Clique em **"Query"**
3. Execute:
   ```sql
   SELECT * FROM "User";
   ```
4. Se não der erro, o banco está conectado! ✅

---

## 🔧 Passo 7: Executar Migrações (se necessário)

Se você ainda não executou as migrações no Railway:

### 7.1 Criar Migração Local

```powershell
cd c:\sul-brasileiro-motovelocidade
npx prisma migrate dev --name init
```

### 7.2 Commit e Push

```powershell
git add prisma/migrations
git commit -m "Add Prisma migrations"
git push
```

### 7.3 Executar no Railway

```powershell
railway login
railway link
railway run npx prisma migrate deploy
```

---

## 🐛 Solução de Problemas

### Erro: "Prisma Client not generated"

**Solução:**
- Verifique se o build command está: `prisma generate && next build`
- Veja em: **Settings → General → Build & Development Settings**

### Erro: "Database connection failed"

**Solução:**
1. Verifique se `DATABASE_URL` está correta no Vercel
2. Verifique se o banco Railway está rodando (Status: "Active")
3. Teste a conexão: copie o `DATABASE_URL` e teste localmente

### Erro: "NEXTAUTH_SECRET is missing"

**Solução:**
- Adicione a variável `NEXTAUTH_SECRET` no Vercel
- Gere uma nova chave se necessário: `npm run deploy:secret`

### Build falha no Vercel

**Solução:**
1. Veja os logs no Vercel:
   - Vá em **"Deployments"**
   - Clique no deploy que falhou
   - Veja **"Build Logs"**
2. Teste localmente:
   ```powershell
   npm run build
   ```
3. Verifique se todas as dependências estão no `package.json`

### Erro: "Module not found"

**Solução:**
1. Verifique se todas as dependências estão no `package.json`
2. Execute localmente: `npm install`
3. Commit e push: `git add package.json package-lock.json && git commit -m "Update dependencies" && git push`

---

## 📊 Monitoramento

### Ver Logs

1. No Vercel, vá em **"Deployments"**
2. Clique em um deploy
3. Veja **"Build Logs"** ou **"Function Logs"**

### Ver Analytics

1. No Vercel, vá em **"Analytics"**
2. Veja estatísticas de acesso
3. Monitore performance

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

---

## 📚 Links Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## ✅ Checklist Final

- [ ] Conta criada no Vercel
- [ ] Projeto importado do GitHub
- [ ] Variáveis de ambiente configuradas:
  - [ ] `DATABASE_URL`
  - [ ] `NEXTAUTH_URL`
  - [ ] `NEXTAUTH_SECRET`
- [ ] Deploy realizado
- [ ] `NEXTAUTH_URL` atualizado com URL real
- [ ] Site testado e funcionando
- [ ] Banco de dados conectado

---

**Boa sorte com o deploy! 🚀**

Se tiver dúvidas, consulte `DEPLOY_PASSO_A_PASSO.md` para mais detalhes.
