# 🚀 Executar Push para GitHub - Instruções

## ⚠️ Git não está instalado

O Git não foi encontrado no seu sistema. Siga estes passos:

---

## 📥 Passo 1: Instalar Git

### Opção A: Download Direto (Recomendado)

1. Acesse: **https://git-scm.com/download/win**
2. Baixe o instalador
3. Execute o instalador
4. **IMPORTANTE:** Durante a instalação, marque a opção **"Add to PATH"**
5. Reinicie o PowerShell após instalar

### Opção B: Via Winget (Windows 10/11)

```powershell
winget install Git.Git
```

---

## ✅ Passo 2: Verificar Instalação

Abra um **NOVO** PowerShell e execute:

```powershell
git --version
```

Deve mostrar algo como: `git version 2.x.x`

---

## 🚀 Passo 3: Executar Push para GitHub

Após instalar o Git, execute um destes comandos:

### Opção A: Script Automático (Recomendado)

```powershell
cd c:\sul-brasileiro-motovelocidade
npm run github:setup
```

### Opção B: Comandos Manuais

```powershell
cd c:\sul-brasileiro-motovelocidade

# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Sul Brasileiro de Motovelocidade"

# Adicionar remote do GitHub
git remote add origin https://github.com/silvanocr/sbm.git

# Renomear branch para main
git branch -M main

# Fazer push
git push -u origin main
```

---

## 🔐 Autenticação GitHub

Se pedir autenticação ao fazer push:

1. **NÃO use sua senha do GitHub**
2. Use um **Personal Access Token**

### Como criar Personal Access Token:

1. Acesse: **https://github.com/settings/tokens**
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Dê um nome: `SBM Project`
4. Selecione permissões: **`repo`** (acesso completo aos repositórios)
5. Clique em **"Generate token"**
6. **COPIE O TOKEN** (você não verá novamente!)
7. Use esse token como senha quando o Git pedir

---

## ✅ Verificação

Após o push, verifique em:

**https://github.com/silvanocr/sbm**

Você deve ver todos os arquivos do projeto!

---

## 📚 Próximos Passos

Após o código estar no GitHub:

1. Configure o Railway (veja `CONFIGURAR_GITHUB_RAILWAY.md`)
2. Configure o Vercel (veja `DEPLOY_PASSO_A_PASSO.md`)

---

**Boa sorte! 🚀**
