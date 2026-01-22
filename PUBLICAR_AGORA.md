# 🚀 Publicar Projeto - Guia Rápido

## ✅ Status Atual

- [x] Código no GitHub: https://github.com/silvanocr/sbm
- [x] Logo e cores atualizadas
- [x] Todas as alterações commitadas
- [ ] Migrações executadas no Railway
- [ ] Projeto criado no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy feito

---

## 🔴 Passos para Publicar

### 1️⃣ Executar Migrações no Railway (2 minutos)

**Se ainda não executou:**

1. Acesse: **https://railway.app**
2. Projeto: `abundant-sparkle`
3. Serviço: **PostgreSQL**
4. Aba: **"Query"** ou **"Data"** → **"Query"**
5. Abra: `executar-migracoes-railway.sql` (na raiz do projeto)
6. **Copie TODO o conteúdo**
7. **Cole no Query Editor**
8. **Execute**

---

### 2️⃣ Criar Projeto no Vercel (5 minutos)

1. **Acesse:** https://vercel.com
2. **Login** com GitHub
3. **Add New Project**
4. **Importe:** silvanocr/sbm
5. Clique em **"Import"**

---

### 3️⃣ Configurar Variáveis de Ambiente (ANTES de fazer deploy!)

Na tela de configuração, role até **"Environment Variables"** e adicione:

#### DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** URL pública do Railway (veja como obter abaixo)
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

#### NEXTAUTH_URL
- **Name:** `NEXTAUTH_URL`
- **Value:** `https://seu-projeto.vercel.app` (você atualizará depois)
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

#### NEXTAUTH_SECRET
- **Name:** `NEXTAUTH_SECRET`
- **Value:** `H0Xl13UEZ14U1PlPQSYyxZTbz389ZBrR62xINk01FfI=`
- **Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

### 4️⃣ Obter DATABASE_URL Pública do Railway

**No Railway Dashboard:**
1. PostgreSQL → **"Connect"**
2. Procure **"Public Network"** ou **"Connection String"**
3. Copie a URL que tenha `.railway.app` (não `.railway.internal`)

**Exemplo:**
```
postgresql://postgres:senha@containers-us-west-xxx.railway.app:5432/railway
```

---

### 5️⃣ Fazer Deploy

1. Após configurar todas as variáveis, clique em **"Deploy"**
2. Aguarde 2-5 minutos
3. Anote a URL gerada: `https://seu-projeto.vercel.app`

---

### 6️⃣ Atualizar NEXTAUTH_URL

1. No Vercel: **Settings** → **Environment Variables**
2. Edite `NEXTAUTH_URL`
3. Cole a URL real do projeto (ex: `https://seu-projeto.vercel.app`)
4. Salve (redeploy automático)

---

## ✅ Verificação Final

Após o deploy:

1. Acesse a URL do Vercel
2. Verifique se a logo aparece corretamente
3. Teste criar uma conta em `/cadastro`
4. Teste fazer login em `/login`
5. Verifique se tudo funciona!

---

## 📚 Guias Completos

- **`EXECUTAR_DEPLOY_VERCEL.md`** - Guia detalhado
- **`PROXIMOS_PASSOS_AGORA.md`** - Próximos passos
- **`ACAO_IMEDIATA.md`** - Ação imediata

---

**Pronto para publicar! Siga os passos acima! 🚀**
