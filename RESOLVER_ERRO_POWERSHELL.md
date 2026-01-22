# 🔧 Resolver Erro de Política de Execução do PowerShell

## ❌ Erro Encontrado

```
O arquivo C:\Program Files\nodejs\npm.ps1 não pode ser carregado porque a execução de scripts foi desabilitada neste sistema.
```

---

## ✅ Solução 1: Executar com Bypass (Recomendado)

Execute os comandos usando `-ExecutionPolicy Bypass`:

### Para Railway Login:
```powershell
powershell -ExecutionPolicy Bypass -Command "railway login"
```

### Para Railway Link:
```powershell
powershell -ExecutionPolicy Bypass -Command "railway link"
```

### Para Executar Migrações:
```powershell
powershell -ExecutionPolicy Bypass -Command "railway run npx prisma migrate deploy"
```

### Para npm scripts:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run railway:deploy"
```

---

## ✅ Solução 2: Alterar Política de Execução (Permanente)

Execute no PowerShell **como Administrador**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**OU** para permitir todos os scripts (menos seguro):

```powershell
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
```

---

## ✅ Solução 3: Usar CMD em vez de PowerShell

Se preferir, use o **Prompt de Comando (CMD)** em vez do PowerShell:

```cmd
cd c:\sul-brasileiro-motovelocidade
railway login
railway link
railway run npx prisma migrate deploy
```

---

## 🚀 Comandos Completos (Com Bypass)

Execute estes comandos no PowerShell:

```powershell
cd c:\sul-brasileiro-motovelocidade

# 1. Login (abre navegador)
powershell -ExecutionPolicy Bypass -Command "railway login"

# 2. Conectar ao projeto
powershell -ExecutionPolicy Bypass -Command "railway link"

# 3. Executar migrações
powershell -ExecutionPolicy Bypass -Command "railway run npx prisma migrate deploy"
```

---

## 📝 Script Alternativo

Crie um arquivo `executar-railway.cmd` (CMD em vez de PowerShell):

```cmd
@echo off
cd /d c:\sul-brasileiro-motovelocidade
railway login
railway link
railway run npx prisma migrate deploy
```

Execute com:
```cmd
executar-railway.cmd
```

---

## ✅ Verificação

Após executar, verifique se funcionou:

```powershell
powershell -ExecutionPolicy Bypass -Command "railway whoami"
```

Se mostrar seu email, está logado! ✅

---

**Escolha a solução que preferir! 🚀**
