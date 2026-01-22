# Script de Verificação Pré-Deploy
# Verifica se tudo está pronto para o deploy

Write-Host "🔍 Verificando configurações para deploy..." -ForegroundColor Cyan
Write-Host ""

$erros = 0
$avisos = 0

# 1. Verificar Node.js
Write-Host "1. Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "   💡 Instale em: https://nodejs.org" -ForegroundColor Yellow
    $erros++
}

# 2. Verificar npm
Write-Host "2. Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "   ✅ npm instalado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ npm não encontrado!" -ForegroundColor Red
    $erros++
}

# 3. Verificar dependências
Write-Host "3. Verificando dependências..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✅ node_modules encontrado" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  node_modules não encontrado" -ForegroundColor Yellow
    Write-Host "   💡 Execute: npm install" -ForegroundColor Yellow
    $avisos++
}

# 4. Verificar Prisma
Write-Host "4. Verificando Prisma..." -ForegroundColor Yellow
if (Test-Path "prisma\schema.prisma") {
    Write-Host "   ✅ schema.prisma encontrado" -ForegroundColor Green
} else {
    Write-Host "   ❌ schema.prisma não encontrado!" -ForegroundColor Red
    $erros++
}

# 5. Verificar arquivos de configuração
Write-Host "5. Verificando arquivos de configuração..." -ForegroundColor Yellow

$arquivos = @(
    "package.json",
    "next.config.js",
    "vercel.json",
    "railway.json",
    ".env.example"
)

foreach ($arquivo in $arquivos) {
    if (Test-Path $arquivo) {
        Write-Host "   ✅ $arquivo encontrado" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  $arquivo não encontrado" -ForegroundColor Yellow
        $avisos++
    }
}

# 6. Verificar .env (não deve estar no git)
Write-Host "6. Verificando .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   ✅ .env encontrado (local)" -ForegroundColor Green
    
    # Verificar se está no .gitignore
    if (Test-Path ".gitignore") {
        $gitignore = Get-Content ".gitignore" -Raw
        if ($gitignore -match "\.env") {
            Write-Host "   ✅ .env está no .gitignore" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  .env não está no .gitignore!" -ForegroundColor Yellow
            $avisos++
        }
    }
} else {
    Write-Host "   ⚠️  .env não encontrado (normal se ainda não configurado)" -ForegroundColor Yellow
    $avisos++
}

# 7. Verificar Git
Write-Host "7. Verificando Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "   ✅ Git instalado: $gitVersion" -ForegroundColor Green
    
    # Verificar se é um repositório git
    $isGitRepo = git rev-parse --git-dir 2>$null
    if ($isGitRepo) {
        Write-Host "   ✅ Repositório Git inicializado" -ForegroundColor Green
        
        # Verificar remote
        $remote = git remote get-url origin 2>$null
        if ($remote) {
            Write-Host "   ✅ Remote origin configurado: $remote" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  Remote origin não configurado" -ForegroundColor Yellow
            Write-Host "   💡 Execute: git remote add origin <url>" -ForegroundColor Yellow
            $avisos++
        }
    } else {
        Write-Host "   ⚠️  Não é um repositório Git" -ForegroundColor Yellow
        Write-Host "   💡 Execute: git init" -ForegroundColor Yellow
        $avisos++
    }
} catch {
    Write-Host "   ⚠️  Git não encontrado (opcional, mas recomendado)" -ForegroundColor Yellow
    $avisos++
}

# 8. Verificar build
Write-Host "8. Verificando se o projeto compila..." -ForegroundColor Yellow
Write-Host "   ⏳ Testando build (isso pode levar alguns minutos)..." -ForegroundColor Cyan
try {
    $buildOutput = npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Build bem-sucedido!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Build falhou!" -ForegroundColor Red
        Write-Host "   💡 Verifique os erros acima" -ForegroundColor Yellow
        $erros++
    }
} catch {
    Write-Host "   ⚠️  Não foi possível testar o build" -ForegroundColor Yellow
    $avisos++
}

# Resumo
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RESUMO" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

if ($erros -eq 0 -and $avisos -eq 0) {
    Write-Host "✅ Tudo pronto para deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Cyan
    Write-Host "1. Configure o banco no Railway" -ForegroundColor White
    Write-Host "2. Configure as variáveis no Vercel" -ForegroundColor White
    Write-Host "3. Faça o deploy!" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Veja o guia: DEPLOY_PASSO_A_PASSO.md" -ForegroundColor Yellow
} elseif ($erros -eq 0) {
    Write-Host "⚠️  Pronto, mas com $avisos aviso(s)" -ForegroundColor Yellow
    Write-Host "💡 Revise os avisos acima antes de fazer deploy" -ForegroundColor Yellow
} else {
    Write-Host "❌ Encontrados $erros erro(s) e $avisos aviso(s)" -ForegroundColor Red
    Write-Host "💡 Corrija os erros antes de fazer deploy" -ForegroundColor Yellow
}

Write-Host ""
