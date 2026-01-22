# 🚀 Executar Deploy no Vercel - Passo a Passo

## ⚠️ Importante: Alguns passos precisam ser feitos manualmente no navegador

---

## 📋 O que já está pronto

- ✅ Código no GitHub: https://github.com/silvanocr/sbm
- ✅ Railway configurado (apenas PostgreSQL)
- ✅ Dependências instaladas
- ✅ Prisma Client gerado
- ✅ NEXTAUTH_SECRET gerado: `H0Xl13UEZ14U1PlPQSYyxZTbz389ZBrR62xINk01FfI=`

---

## 🔴 Passos que precisam ser feitos MANUALMENTE no navegador

### 1. Acessar Vercel

1. Abra: **https://vercel.com**
2. Login com GitHub
3. Clique em **"Add New Project"**
4. Importe: **silvanocr/sbm**

### 2. Configurar Variáveis de Ambiente

**ANTES de clicar em "Deploy"**, adicione em **Environment Variables**:

#### DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** Cole a URL do Railway (copie da aba Variables do PostgreSQL)
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

#### NEXTAUTH_URL
- **Name:** `NEXTAUTH_URL`
- **Value:** `https://seu-projeto.vercel.app` (você atualizará depois)
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

#### NEXTAUTH_SECRET
- **Name:** `NEXTAUTH_SECRET`
- **Value:** `H0Xl13UEZ14U1PlPQSYyxZTbz389ZBrR62xINk01FfI=`
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

### 3. Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde 2-5 minutos
3. Anote a URL gerada

### 4. Atualizar NEXTAUTH_URL

1. **Settings** → **Environment Variables**
2. Edite `NEXTAUTH_URL`
3. Cole a URL real do projeto
4. Salve

---

## ✅ Passos que posso executar automaticamente

Após você fazer o deploy no Vercel, posso ajudar com:

1. Criar migrações do Prisma (quando tiver DATABASE_URL)
2. Executar migrações no Railway
3. Verificar se tudo está funcionando

---

## 📝 Para obter DATABASE_URL do Railway

1. No Railway, abra o serviço PostgreSQL
2. Vá em **"Variables"**
3. Copie o `DATABASE_URL`
4. Use no Vercel

---

## 🚀 Após o Deploy

Quando o Vercel terminar o deploy:

1. **Teste o site** na URL gerada
2. **Crie uma conta** em `/cadastro`
3. **Faça login** em `/login`
4. **Verifique se funciona!**

---

## 📚 Guias Completos

- **`CONFIGURAR_VERCEL_PASSO_A_PASSO.md`** - Guia completo detalhado
- **`VERCEL_RAPIDO.md`** - Resumo rápido
- **`DEPLOY_PASSO_A_PASSO.md`** - Guia completo de deploy

---

**Boa sorte! 🚀**
