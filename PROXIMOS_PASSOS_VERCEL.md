# 🌐 Próximos Passos - Vercel

Você já configurou o Railway! Agora vamos fazer deploy no Vercel.

---

## 📋 Checklist Antes de Começar

- [x] Railway: Projeto criado
- [x] Railway: PostgreSQL adicionado
- [ ] Railway: DATABASE_URL copiado (você precisa fazer isso)
- [ ] Vercel: Conta criada

---

## 🚀 Passo 1: Acessar Vercel

1. Abra seu navegador
2. Acesse: **https://vercel.com**
3. Clique em **"Sign Up"** ou **"Login"**
4. Escolha **"Continue with GitHub"**

---

## 📦 Passo 2: Importar Projeto

1. No dashboard, clique em **"Add New Project"**
2. Procure: **silvanocr/sbm**
3. Clique em **"Import"**

---

## 🔐 Passo 3: Gerar NEXTAUTH_SECRET

Execute no PowerShell:

```powershell
cd c:\sul-brasileiro-motovelocidade
npm run deploy:secret
```

**Copie a chave gerada!** Você precisará dela no próximo passo.

---

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

**⚠️ IMPORTANTE:** Configure ANTES de clicar em "Deploy"!

Na tela de configuração do projeto, role até **"Environment Variables"** e adicione:

### 1. DATABASE_URL

- **Name:** `DATABASE_URL`
- **Value:** Cole a URL do Railway (que você copiou)
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development
- **Save**

### 2. NEXTAUTH_URL

- **Name:** `NEXTAUTH_URL`
- **Value:** `https://seu-projeto.vercel.app` (você atualizará depois)
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development
- **Save**

### 3. NEXTAUTH_SECRET

- **Name:** `NEXTAUTH_SECRET`
- **Value:** Cole a chave que você gerou no Passo 3
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development
- **Save**

---

## 🚀 Passo 5: Fazer Deploy

1. Após configurar todas as variáveis, clique em **"Deploy"**
2. ⏳ Aguarde o build (2-5 minutos)
3. ✅ Quando concluir, anote a URL: `https://seu-projeto.vercel.app`

---

## 🔄 Passo 6: Atualizar NEXTAUTH_URL

1. No Vercel, vá em **"Settings"** → **"Environment Variables"**
2. Encontre `NEXTAUTH_URL`
3. Clique em **"Edit"**
4. Cole a URL real do seu projeto (que você anotou)
5. **Save** (fará redeploy automático)

---

## ✅ Passo 7: Testar

1. Acesse a URL do Vercel
2. Teste criar uma conta
3. Teste fazer login
4. Verifique se tudo funciona!

---

## 📚 Guias Completos

- **`CONFIGURAR_VERCEL_PASSO_A_PASSO.md`** - Guia completo detalhado
- **`VERCEL_RAPIDO.md`** - Resumo rápido
- **`DEPLOY_PASSO_A_PASSO.md`** - Guia completo de deploy

---

## 🐛 Problemas?

Se tiver erros:

1. Veja os logs no Vercel: **Deployments** → Clique no deploy → **Build Logs**
2. Verifique se todas as variáveis estão configuradas
3. Teste localmente: `npm run build`

---

**Boa sorte! 🚀**
