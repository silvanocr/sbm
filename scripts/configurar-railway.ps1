# Script para configurar Railway
# Este script ajuda a configurar o Railway após você criar o projeto manualmente

Write-Host "🚂 Configurando Railway..." -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

# Verificar se Railway CLI está instalado
Write-Host "1. Verificando Railway CLI..." -ForegroundColor Yellow
try {
    $railwayVersion = railway --version
    Write-Host "   ✅ Railway CLI instalado: $railwayVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Railway CLI não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   💡 Instale com:" -ForegroundColor Yellow
    Write-Host "   npm i -g @railway/cli" -ForegroundColor Cyan
    exit 1
}

# Verificar se está logado
Write-Host "2. Verificando login..." -ForegroundColor Yellow
try {
    $status = railway status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Conectado ao Railway" -ForegroundColor Green
        Write-Host "   $status" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️  Não está conectado" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "   💡 Execute:" -ForegroundColor Yellow
        Write-Host "   railway login" -ForegroundColor Cyan
        Write-Host "   railway link" -ForegroundColor Cyan
        exit 1
    }
} catch {
    Write-Host "   ⚠️  Não está conectado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   💡 Execute:" -ForegroundColor Yellow
    Write-Host "   railway login" -ForegroundColor Cyan
    Write-Host "   railway link" -ForegroundColor Cyan
    exit 1
}

# Verificar variáveis
Write-Host "3. Verificando variáveis de ambiente..." -ForegroundColor Yellow
try {
    $variables = railway variables 2>&1
    if ($variables -match "DATABASE_URL") {
        Write-Host "   ✅ DATABASE_URL encontrado" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  DATABASE_URL não encontrado" -ForegroundColor Yellow
        Write-Host "   💡 Certifique-se de que o PostgreSQL foi adicionado no Railway" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠️  Não foi possível verificar variáveis" -ForegroundColor Yellow
}

# Verificar migrações
Write-Host "4. Verificando migrações..." -ForegroundColor Yellow
if (Test-Path "prisma\migrations") {
    $migrations = Get-ChildItem "prisma\migrations" -Directory
    if ($migrations.Count -gt 0) {
        Write-Host "   ✅ $($migrations.Count) migração(ões) encontrada(s)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Nenhuma migração encontrada" -ForegroundColor Yellow
        Write-Host "   💡 Crie uma migração:" -ForegroundColor Yellow
        Write-Host "   npx prisma migrate dev --name init" -ForegroundColor Cyan
    }
} else {
    Write-Host "   ⚠️  Pasta de migrações não encontrada" -ForegroundColor Yellow
    Write-Host "   💡 Crie uma migração:" -ForegroundColor Yellow
    Write-Host "   npx prisma migrate dev --name init" -ForegroundColor Cyan
}

# Perguntar se deseja executar migrações
Write-Host ""
Write-Host "5. Executar migrações no Railway?" -ForegroundColor Yellow
Write-Host "   ⚠️  Certifique-se de que:" -ForegroundColor Yellow
Write-Host "   - O PostgreSQL está criado no Railway" -ForegroundColor White
Write-Host "   - Você está conectado ao projeto correto" -ForegroundColor White
Write-Host ""
$resposta = Read-Host "   Executar migrações? (s/n)"
if ($resposta -eq "s" -or $resposta -eq "S") {
    Write-Host ""
    Write-Host "   ⏳ Executando migrações..." -ForegroundColor Cyan
    railway run npx prisma migrate deploy
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "   ✅ Migrações executadas com sucesso!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "   ❌ Erro ao executar migrações" -ForegroundColor Red
        Write-Host "   💡 Verifique os erros acima" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⏭️  Migrações não executadas" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Para executar manualmente:" -ForegroundColor Cyan
    Write-Host "   railway run npx prisma migrate deploy" -ForegroundColor White
}

# Resumo
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Verificação concluída!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Copie o DATABASE_URL do Railway" -ForegroundColor White
Write-Host "2. Configure o Vercel (veja DEPLOY_PASSO_A_PASSO.md)" -ForegroundColor White
Write-Host "3. Adicione o DATABASE_URL no Vercel" -ForegroundColor White
Write-Host ""
Write-Host "📖 Veja o guia completo: CONFIGURAR_RAILWAY_PASSO_A_PASSO.md" -ForegroundColor Yellow
Write-Host ""
