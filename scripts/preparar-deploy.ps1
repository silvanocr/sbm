# Script para preparar o projeto para deploy
# Verifica e prepara tudo necessário antes do deploy

Write-Host "🚀 Preparando projeto para deploy..." -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

# 1. Verificar dependências
Write-Host "1. Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "   ⏳ Instalando dependências..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   ❌ Erro ao instalar dependências!" -ForegroundColor Red
        exit 1
    }
    Write-Host "   ✅ Dependências instaladas" -ForegroundColor Green
} else {
    Write-Host "   ✅ Dependências já instaladas" -ForegroundColor Green
}

# 2. Gerar Prisma Client
Write-Host "2. Gerando Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Erro ao gerar Prisma Client!" -ForegroundColor Red
    exit 1
}
Write-Host "   ✅ Prisma Client gerado" -ForegroundColor Green

# 3. Verificar build
Write-Host "3. Testando build..." -ForegroundColor Yellow
Write-Host "   ⏳ Isso pode levar alguns minutos..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Erro no build!" -ForegroundColor Red
    Write-Host "   💡 Corrija os erros antes de fazer deploy" -ForegroundColor Yellow
    exit 1
}
Write-Host "   ✅ Build bem-sucedido!" -ForegroundColor Green

# 4. Verificar Git
Write-Host "4. Verificando Git..." -ForegroundColor Yellow
$isGitRepo = git rev-parse --git-dir 2>$null
if (-not $isGitRepo) {
    Write-Host "   ⚠️  Repositório Git não inicializado" -ForegroundColor Yellow
    Write-Host "   💡 Execute: git init" -ForegroundColor Yellow
} else {
    Write-Host "   ✅ Repositório Git inicializado" -ForegroundColor Green
    
    # Verificar se há mudanças não commitadas
    $status = git status --porcelain
    if ($status) {
        Write-Host "   ⚠️  Há mudanças não commitadas" -ForegroundColor Yellow
        Write-Host "   💡 Considere fazer commit antes do deploy" -ForegroundColor Yellow
    } else {
        Write-Host "   ✅ Nenhuma mudança pendente" -ForegroundColor Green
    }
}

# 5. Verificar .env.example
Write-Host "5. Verificando .env.example..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Write-Host "   ✅ .env.example encontrado" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .env.example não encontrado" -ForegroundColor Yellow
}

# Resumo
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Preparação concluída!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure o banco no Railway" -ForegroundColor White
Write-Host "2. Configure as variáveis no Vercel" -ForegroundColor White
Write-Host "3. Faça o deploy!" -ForegroundColor White
Write-Host ""
Write-Host "📖 Veja o guia completo: DEPLOY_PASSO_A_PASSO.md" -ForegroundColor Yellow
Write-Host ""
