# ✅ Verificação de Setup - Prisma

## 🔍 Checklist de Verificação

Execute estes comandos para verificar se tudo está configurado:

### 1. Verificar Node.js e npm

```powershell
node --version
npm --version
```

**Se não funcionar:** Instale o Node.js: https://nodejs.org/

### 2. Verificar se está no diretório correto

```powershell
cd C:\Users\silva\sul-brasileiro-motovelocidade
pwd
```

### 3. Verificar arquivo .env

```powershell
Test-Path .env
```

**Se retornar False:** Crie o arquivo `.env` com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/motovelocidade?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=chave-temporaria-123
```

### 4. Instalar dependências (se ainda não instalou)

```powershell
npm install
```

### 5. Gerar Prisma Client

```powershell
npm run db:generate
```

**Ou:**
```powershell
npx prisma generate
```

### 6. Verificar conexão com banco

```powershell
npx prisma db pull
```

**Se der erro:** Verifique a `DATABASE_URL` no `.env`

### 7. Criar migrações

```powershell
npm run db:migrate
```

**Ou:**
```powershell
npx prisma migrate dev --name init
```

### 8. Verificar status das migrações

```powershell
npm run db:status
```

**Ou:**
```powershell
npx prisma migrate status
```

### 9. (Opcional) Popular banco com dados de exemplo

```powershell
npm run db:seed
```

### 10. Abrir Prisma Studio (visualizar dados)

```powershell
npm run db:studio
```

Abre em: http://localhost:5555

---

## ✅ Tudo Funcionando?

Se todos os comandos acima funcionaram sem erros, você está pronto!

### Próximo Passo: Testar a Aplicação

```powershell
npm run dev
```

Acesse: http://localhost:3000

---

## ❌ Problemas Comuns

### Erro: "npx não é reconhecido"

**Solução:** 
1. Instale Node.js: https://nodejs.org/
2. Reinicie o PowerShell
3. Verifique: `npm --version`

### Erro: "Cannot find module '@prisma/client'"

**Solução:**
```powershell
npm install
npm run db:generate
```

### Erro: "Can't reach database server"

**Solução:**
1. Verifique se o PostgreSQL está rodando
2. Verifique a `DATABASE_URL` no `.env`
3. Teste a conexão: `npx prisma db pull`

### Erro: "P1003: Database does not exist"

**Solução:**
1. Crie o banco: `CREATE DATABASE motovelocidade;`
2. Ou use um banco existente na `DATABASE_URL`

---

## 📝 Comandos Rápidos

```powershell
# Setup completo
npm install
npm run db:generate
npm run db:migrate
npm run db:seed

# Desenvolvimento
npm run dev

# Visualizar dados
npm run db:studio
```

---

## 🎯 Status Esperado

Após executar tudo, você deve ter:

- ✅ `node_modules/` - Dependências instaladas
- ✅ `.env` - Variáveis de ambiente configuradas
- ✅ `prisma/migrations/` - Migrações criadas
- ✅ `node_modules/.prisma/` - Prisma Client gerado
- ✅ Banco de dados com tabelas criadas

---

**Precisa de ajuda? Consulte `CONFIGURAR_PRISMA.md` para mais detalhes!**
