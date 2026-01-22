# ⚡ Comandos Rápidos - Prisma

## 🚀 Setup Inicial (Execute na ordem)

```powershell
# 1. Ir para o projeto
cd C:\Users\silva\sul-brasileiro-motovelocidade

# 2. Instalar dependências
npm install

# 3. Gerar Prisma Client
npm run db:generate

# 4. Criar tabelas no banco
npm run db:migrate

# 5. Popular com dados de exemplo (opcional)
npm run db:seed
```

---

## 📋 Comandos Úteis

### Prisma

```powershell
npm run db:generate  # Gerar Prisma Client
npm run db:migrate   # Criar nova migração
npm run db:deploy    # Aplicar migrações (produção)
npm run db:studio   # Abrir Prisma Studio (visualizar dados)
npm run db:seed      # Popular banco
npm run db:reset     # Resetar banco (CUIDADO!)
npm run db:status    # Ver status das migrações
```

### Desenvolvimento

```powershell
npm run dev      # Executar em desenvolvimento
npm run build    # Compilar para produção
npm start        # Executar versão de produção
npm run lint     # Verificar erros de código
```

---

## 🔍 Verificações

```powershell
# Verificar versão do Node
node --version

# Verificar versão do npm
npm --version

# Verificar se Prisma está instalado
npx prisma --version

# Verificar conexão com banco
npx prisma db pull

# Ver status das migrações
npm run db:status
```

---

## 🐛 Solução Rápida de Problemas

### Erro: "npx não é reconhecido"
→ Instale Node.js: https://nodejs.org/

### Erro: "Cannot find module"
→ Execute: `npm install`

### Erro: "Prisma Client not generated"
→ Execute: `npm run db:generate`

### Erro: "Database connection failed"
→ Verifique `DATABASE_URL` no `.env`

---

## 📝 Exemplo de .env

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/motovelocidade?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=chave-temporaria-123
```

---

**Dica:** Salve este arquivo para referência rápida! 📌
