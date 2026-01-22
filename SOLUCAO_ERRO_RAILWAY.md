# 🐛 Solução de Erro no Deploy Railway

## ⚠️ Importante: Você não precisa fazer deploy da aplicação no Railway!

O Railway é usado **APENAS** para o banco de dados PostgreSQL. A aplicação Next.js será deployada no **Vercel**.

---

## ✅ Solução: Desabilitar Deploy da Aplicação no Railway

### Opção 1: Deletar o Serviço da Aplicação (Recomendado)

1. No Railway, você verá dois serviços:
   - **PostgreSQL** (este você precisa manter)
   - **sbm** ou similar (serviço da aplicação - pode deletar)

2. Clique no serviço da aplicação (não o PostgreSQL)
3. Vá em **"Settings"** → **"Delete Service"**
4. Confirme a exclusão

Agora você terá apenas o PostgreSQL, que é o que precisamos!

### Opção 2: Parar o Deploy Automático

1. No serviço da aplicação, vá em **"Settings"**
2. Desabilite o **"Auto Deploy"** ou **"Deploy on Push"**
3. Isso evitará que o Railway tente fazer deploy automaticamente

---

## 🔍 Erros Comuns e Soluções

### Erro: "Build failed" ou "Deploy failed"

**Causa:** Railway está tentando fazer deploy da aplicação Next.js.

**Solução:**
- Delete o serviço da aplicação (veja Opção 1 acima)
- Mantenha apenas o PostgreSQL
- A aplicação será deployada no Vercel

### Erro: "No migrations found"

**Causa:** Não existem migrações do Prisma no repositório.

**Solução:**
1. Crie uma migração local:
   ```powershell
   cd c:\sul-brasileiro-motovelocidade
   npx prisma migrate dev --name init
   ```

2. Commit e push:
   ```powershell
   git add prisma/migrations
   git commit -m "Add Prisma migrations"
   git push
   ```

3. Execute no Railway:
   ```powershell
   railway run npx prisma migrate deploy
   ```

### Erro: "Database connection failed"

**Causa:** O `DATABASE_URL` não está configurado ou está incorreto.

**Solução:**
1. No Railway, abra o serviço PostgreSQL
2. Vá em **"Variables"**
3. Copie o `DATABASE_URL`
4. Verifique se está completo e correto

### Erro: "Prisma Client not generated"

**Causa:** O Prisma Client não foi gerado antes do build.

**Solução:**
- Isso não é problema se você deletar o serviço da aplicação
- O Prisma Client será gerado no Vercel durante o build

---

## ✅ Configuração Correta

### No Railway (apenas banco de dados):

1. ✅ Projeto criado
2. ✅ PostgreSQL adicionado
3. ✅ `DATABASE_URL` copiado
4. ❌ **NÃO precisa** do serviço da aplicação

### No Vercel (aplicação Next.js):

1. Conectar repositório: **silvanocr/sbm**
2. Adicionar variáveis:
   - `DATABASE_URL` (do Railway)
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
3. Fazer deploy

---

## 📋 Checklist

- [ ] Railway: Projeto criado
- [ ] Railway: PostgreSQL adicionado
- [ ] Railway: `DATABASE_URL` copiado
- [ ] Railway: Serviço da aplicação deletado (se existir)
- [ ] Railway CLI: Login feito (`railway login`)
- [ ] Railway CLI: Projeto conectado (`railway link`)
- [ ] Railway CLI: Migrações executadas (`railway run npx prisma migrate deploy`)
- [ ] Vercel: Projeto criado
- [ ] Vercel: Variáveis configuradas
- [ ] Vercel: Deploy feito

---

## 🚀 Próximos Passos

Após resolver o erro:

1. **Certifique-se de que só tem PostgreSQL no Railway**
2. **Copie o DATABASE_URL**
3. **Configure o Vercel** (veja `DEPLOY_PASSO_A_PASSO.md`)
4. **Adicione o DATABASE_URL no Vercel**

---

## 📞 Precisa de Ajuda?

Se o erro persistir:

1. Veja os logs no Railway:
   - Clique no serviço
   - Vá em **"Deployments"** → **"View Logs"**

2. Verifique se há migrações:
   ```powershell
   railway run npx prisma migrate status
   ```

3. Teste a conexão:
   ```powershell
   railway run npx prisma db pull
   ```

---

**Lembre-se:** Railway = Banco de dados | Vercel = Aplicação

**Boa sorte! 🚂**
