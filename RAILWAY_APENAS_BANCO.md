# 🚂 Railway - Apenas Banco de Dados

## ⚠️ Importante

**Você NÃO precisa fazer deploy da aplicação no Railway!**

- **Railway** = Apenas PostgreSQL (banco de dados)
- **Vercel** = Aplicação Next.js

---

## ✅ O que fazer no Railway

### 1. Criar Projeto
- ✅ Feito

### 2. Adicionar PostgreSQL
- ✅ Adicione o PostgreSQL
- ✅ Copie o `DATABASE_URL`

### 3. Deletar Serviço da Aplicação (se existir)

Se o Railway criou um serviço tentando fazer deploy da aplicação:

1. No projeto Railway, você verá dois serviços:
   - **PostgreSQL** ← Mantenha este!
   - **sbm** ou similar ← Delete este!

2. Clique no serviço da aplicação (não o PostgreSQL)
3. Vá em **"Settings"** → **"Delete Service"**
4. Confirme

Agora você terá apenas o PostgreSQL! ✅

---

## 🚫 O que NÃO fazer no Railway

- ❌ Não precisa fazer deploy da aplicação
- ❌ Não precisa configurar build commands
- ❌ Não precisa do serviço da aplicação

---

## ✅ O que fazer no Vercel

1. Criar projeto
2. Conectar repositório: **silvanocr/sbm**
3. Adicionar variáveis:
   - `DATABASE_URL` (do Railway)
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
4. Fazer deploy

---

## 📋 Resumo

| Serviço | O que faz |
|---------|-----------|
| **Railway** | PostgreSQL (banco de dados) |
| **Vercel** | Next.js (aplicação) |
| **GitHub** | Código fonte |

---

**Lembre-se:** Railway = Banco | Vercel = App

**Boa sorte! 🚂**
