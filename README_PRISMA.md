# 🗄️ Guia Rápido - Prisma

## ⚡ Setup Rápido (3 passos)

### 1. Configure o .env

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/motovelocidade?schema=public"
```

### 2. Execute o script de setup

```powershell
.\SETUP_PRISMA.ps1
```

### 3. Pronto! 🎉

---

## 📋 Comandos Disponíveis

```powershell
npm run db:generate  # Gerar Prisma Client
npm run db:migrate   # Criar migração
npm run db:deploy    # Aplicar migrações (produção)
npm run db:studio    # Abrir Prisma Studio
npm run db:seed      # Popular banco com dados de exemplo
npm run db:reset     # Resetar banco (CUIDADO!)
npm run db:status    # Ver status das migrações
```

---

## 🎯 Para Desenvolvimento

1. **Fazer alterações no schema:**
   - Edite `prisma/schema.prisma`

2. **Criar migração:**
   ```powershell
   npm run db:migrate
   ```

3. **Visualizar dados:**
   ```powershell
   npm run db:studio
   ```

---

## ☁️ Para Produção (Railway)

```powershell
railway run npm run db:deploy
```

---

## 📚 Documentação Completa

Veja `CONFIGURAR_PRISMA.md` para guia detalhado.

---

## ❓ Problemas?

- **Erro de conexão?** → Verifique `DATABASE_URL` no `.env`
- **Prisma Client não gerado?** → Execute `npm run db:generate`
- **Erro de migração?** → Execute `npm run db:reset` (apaga tudo!)
