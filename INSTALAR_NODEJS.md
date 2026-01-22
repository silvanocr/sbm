# 📦 Instalar Node.js e Configurar Projeto

## 🚨 Problema Detectado

O Node.js não está instalado ou não está no PATH do sistema.

---

## 📥 Passo 1: Instalar Node.js

### Opção A: Download Direto (Recomendado)

1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador
4. **IMPORTANTE:** Marque a opção "Add to PATH" durante a instalação
5. Reinicie o PowerShell/Terminal após instalar

### Opção B: Via Chocolatey (se tiver instalado)

```powershell
choco install nodejs-lts
```

### Opção C: Via Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

---

## ✅ Passo 2: Verificar Instalação

Abra um **NOVO** PowerShell e execute:

```powershell
node --version
npm --version
```

**Deve mostrar versões como:**
```
v20.x.x
10.x.x
```

Se ainda não funcionar:
1. Reinicie o computador
2. Ou adicione manualmente ao PATH

---

## 🔧 Passo 3: Configurar o Projeto

### 1. Navegar até o projeto

```powershell
cd C:\Users\silva\sul-brasileiro-motovelocidade
```

### 2. Verificar/Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/motovelocidade?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=chave-temporaria-123
```

**Para banco na nuvem (Railway/Supabase/Neon):**
- Cole a `DATABASE_URL` fornecida pelo serviço

### 3. Instalar dependências

```powershell
npm install
```

⏱️ Isso pode levar alguns minutos na primeira vez.

### 4. Gerar Prisma Client

```powershell
npm run db:generate
```

### 5. Criar migrações (criar tabelas no banco)

```powershell
npm run db:migrate
```

Quando perguntar o nome da migração, digite: `init`

### 6. (Opcional) Popular banco com dados de exemplo

```powershell
npm run db:seed
```

---

## ✅ Passo 4: Verificar se Funcionou

### Teste 1: Verificar Prisma Client

```powershell
npm run db:status
```

**Deve mostrar:** "Database schema is up to date!"

### Teste 2: Abrir Prisma Studio

```powershell
npm run db:studio
```

Abre em: http://localhost:5555

Você deve ver as tabelas criadas!

### Teste 3: Executar aplicação

```powershell
npm run dev
```

Acesse: http://localhost:3000

---

## 🎯 Resumo dos Comandos

```powershell
# 1. Instalar Node.js (se ainda não instalou)
# Baixe de: https://nodejs.org/

# 2. Verificar instalação
node --version
npm --version

# 3. Ir para o projeto
cd C:\Users\silva\sul-brasileiro-motovelocidade

# 4. Instalar dependências
npm install

# 5. Configurar Prisma
npm run db:generate
npm run db:migrate
npm run db:seed

# 6. Executar aplicação
npm run dev
```

---

## ❓ Ainda com Problemas?

### Node.js instalado mas não reconhecido

1. Reinicie o PowerShell
2. Verifique o PATH: `$env:PATH`
3. Reinstale o Node.js marcando "Add to PATH"

### Erro ao instalar dependências

```powershell
# Limpar cache
npm cache clean --force

# Tentar novamente
npm install
```

### Erro de conexão com banco

1. Verifique se o PostgreSQL está rodando
2. Verifique a `DATABASE_URL` no `.env`
3. Teste: `npx prisma db pull`

---

## 📚 Próximos Passos

Após tudo funcionar:

1. ✅ Teste criar um usuário em `/cadastro`
2. ✅ Teste fazer login em `/login`
3. ✅ Explore a área do piloto
4. ✅ Veja os produtos em `/produtos`

---

**Precisa de mais ajuda? Consulte:**
- `CONFIGURAR_PRISMA.md` - Configuração detalhada do Prisma
- `VERIFICAR_SETUP.md` - Checklist de verificação
