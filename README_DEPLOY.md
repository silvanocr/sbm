# 🚀 Guia Rápido de Deploy

## 📚 Documentação Disponível

Este projeto possui vários guias para ajudar no deploy:

1. **`DEPLOY_PASSO_A_PASSO.md`** ⭐ - Guia completo passo a passo (RECOMENDADO)
2. **`DEPLOY.md`** - Guia detalhado com todas as opções
3. **`GUIA_RAPIDO_DEPLOY.md`** - Resumo rápido (5 minutos)

## 🎯 Início Rápido

### 1. Verificar Preparação

```powershell
npm run deploy:check
```

Este comando verifica se tudo está pronto para o deploy.

### 2. Preparar Projeto

```powershell
npm run deploy:prepare
```

Este comando:
- Instala dependências
- Gera Prisma Client
- Testa o build
- Verifica configurações

### 3. Gerar NEXTAUTH_SECRET

```powershell
npm run deploy:secret
```

Gera uma chave secreta segura para o NextAuth.

## 📋 Checklist Rápido

### Railway (Banco de Dados)

- [ ] Criar projeto no Railway
- [ ] Adicionar PostgreSQL
- [ ] Copiar `DATABASE_URL`
- [ ] Executar migrações: `railway run npx prisma migrate deploy`

### Vercel (Aplicação)

- [ ] Conectar repositório GitHub
- [ ] Configurar variáveis de ambiente:
  - `DATABASE_URL` (do Railway)
  - `NEXTAUTH_URL` (URL do Vercel)
  - `NEXTAUTH_SECRET` (gerar com `npm run deploy:secret`)
- [ ] Fazer deploy

## 🔗 Links Importantes

- **Railway:** https://railway.app
- **Vercel:** https://vercel.com
- **GitHub:** https://github.com

## 📖 Próximos Passos

1. Leia o guia completo: **`DEPLOY_PASSO_A_PASSO.md`**
2. Siga os passos um a um
3. Em caso de dúvidas, consulte **`DEPLOY.md`**

---

**Boa sorte! 🚀**
