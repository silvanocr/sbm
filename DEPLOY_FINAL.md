# 🚀 Deploy Final - Sistema Admin

## ✅ Status Atual

- ✅ Código commitado e enviado para GitHub
- ✅ Vercel fará deploy automático em 2-5 minutos
- ⚠️ **IMPORTANTE:** Migração do banco de dados precisa ser aplicada

## 📋 Passos para Completar o Deploy

### 1. **Aplicar Migração do Banco de Dados (Railway)**

**Opção A: Via SQL direto (Recomendado)**
1. Acesse: https://railway.app
2. Abra seu projeto PostgreSQL
3. Vá em **"Data"** → **"Query"**
4. Copie e cole o conteúdo de `migracao-admin.sql`
5. Execute o SQL
6. ✅ Pronto!

**Opção B: Via Prisma Migrate (se tiver acesso CLI)**
```bash
npx prisma migrate deploy
```

### 2. **Criar Usuário Admin**

Após aplicar a migração, crie o primeiro usuário admin:

**Via Prisma Studio:**
```bash
npx prisma studio
```
- Abra a tabela `User`
- Crie um novo usuário com:
  - `email`: seu-email@admin.com
  - `password`: (hash bcrypt da senha)
  - `name`: Administrador
  - `role`: `admin`

**Ou via script Node.js:**
```javascript
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('sua_senha_segura', 10)
  await prisma.user.create({
    data: {
      email: 'admin@sbm.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
    },
  })
  console.log('Admin criado!')
}

createAdmin()
```

### 3. **Verificar Variáveis de Ambiente no Vercel**

Acesse: https://vercel.com → Seu Projeto → Settings → Environment Variables

Verifique se estão configuradas:
- ✅ `DATABASE_URL` (do Railway)
- ✅ `NEXTAUTH_SECRET`
- ✅ `NEXTAUTH_URL` (URL do Vercel)
- ✅ `STRIPE_SECRET_KEY`
- ✅ `STRIPE_PUBLIC_KEY`
- ✅ `STRIPE_WEBHOOK_SECRET`

**Opcional (para emails):**
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

### 4. **Verificar Deploy no Vercel**

1. Acesse: https://vercel.com
2. Abra seu projeto
3. Vá em **"Deployments"**
4. Verifique se o último deploy está **"Ready"** (verde)
5. Se houver erro, clique no deploy para ver os logs

### 5. **Testar o Sistema**

**Testar Admin:**
1. Acesse: `https://seu-site.vercel.app/admin`
2. Faça login com o usuário admin criado
3. Verifique se o dashboard carrega

**Testar Área do Piloto:**
1. Acesse: `https://seu-site.vercel.app/login`
2. Faça login com um usuário normal (role: pilot)
3. Acesse `/piloto` e verifique o perfil

**Testar Novas Páginas:**
- `/copa-cb`
- `/campeonato-gaucho`
- `/contato`

## 🔧 Problemas Comuns

### Erro: "Table does not exist"
**Solução:** A migração do banco não foi aplicada. Execute o SQL em `migracao-admin.sql` no Railway.

### Erro: "Unauthorized" ao acessar `/admin`
**Solução:** O usuário não tem `role: 'admin'`. Crie um usuário admin ou atualize um existente.

### Erro no Build do Vercel
**Solução:** 
1. Verifique os logs do build no Vercel
2. Verifique se todas as variáveis de ambiente estão configuradas
3. Verifique se o Prisma está gerando o client corretamente

### Páginas de criação/edição não existem
**Solução:** Essas páginas ainda precisam ser criadas. Por enquanto, use o Prisma Studio para criar/editar registros diretamente no banco.

## 📝 Próximos Passos (Opcional)

1. **Criar páginas de formulário:**
   - `/admin/eventos/novo`
   - `/admin/produtos/novo`
   - `/admin/banners/novo`
   - `/admin/noticias/nova`

2. **Implementar upload de fotos:**
   - Integrar com Cloudinary ou AWS S3
   - Atualizar `app/api/piloto/upload-photo/route.ts`

3. **Implementar PIX:**
   - Integrar com Mercado Pago ou PagSeguro
   - Atualizar `app/api/events/register/route.ts`

4. **Configurar emails:**
   - Configurar SMTP ou usar serviço como SendGrid/Resend
   - Atualizar `lib/email.ts`

## ✅ Checklist Final

- [ ] Migração do banco aplicada no Railway
- [ ] Usuário admin criado
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Deploy do Vercel concluído com sucesso
- [ ] Admin acessível em `/admin`
- [ ] Área do piloto funcionando
- [ ] Novas páginas (Copa CB, Campeonato Gaúcho, Contato) funcionando

## 🎉 Pronto!

Após completar todos os passos, o sistema estará totalmente funcional!
