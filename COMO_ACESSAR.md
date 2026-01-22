# 🚀 Como Acessar o Site

## Passos Rápidos

### 1️⃣ Abrir o PowerShell

Pressione `Win + X` e escolha "Windows PowerShell" ou "Terminal"

### 2️⃣ Navegar até o projeto

```powershell
cd C:\Users\silva\sul-brasileiro-motovelocidade
```

### 3️⃣ Instalar dependências (primeira vez)

```powershell
npm install
```

⏱️ Isso pode levar alguns minutos na primeira vez.

### 4️⃣ Criar arquivo .env

Crie um arquivo chamado `.env` na pasta do projeto com:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=chave-secreta-temporaria-123
DATABASE_URL=postgresql://user:password@localhost:5432/motovelocidade
```

**Nota:** Se você ainda não tem banco de dados configurado, pode usar apenas as duas primeiras linhas por enquanto.

### 5️⃣ Executar o servidor

```powershell
npm run dev
```

### 6️⃣ Acessar no navegador

Abra seu navegador e acesse:

**👉 http://localhost:3000**

## ✅ Pronto!

O site está rodando! Você pode:

- Ver a página inicial
- Criar uma conta em `/cadastro`
- Fazer login em `/login`
- Explorar todas as funcionalidades

## 🔧 Problemas Comuns

### Erro: "Cannot find module"
**Solução:** Execute `npm install` novamente

### Erro: "Port 3000 already in use"
**Solução:** Use outra porta:
```powershell
npm run dev -- -p 3001
```
E acesse: http://localhost:3001

### Erro de banco de dados
**Solução:** Configure o `DATABASE_URL` no `.env` ou pule essa parte inicialmente (algumas funcionalidades não funcionarão sem o banco)

## 📝 Próximos Passos

1. Configure o banco de dados PostgreSQL
2. Execute as migrações: `npx prisma migrate dev`
3. Configure Stripe para pagamentos
4. Configure YouTube e Instagram para integrações

Veja o arquivo `README.md` para mais detalhes!
