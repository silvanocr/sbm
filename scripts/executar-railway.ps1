# Script para executar comandos Railway
# Execute este script após fazer login manualmente no Railway

Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚂 Executando Comandos Railway" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar se Railway CLI está instalado
if (-not (Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Railway CLI não encontrado!" -ForegroundColor Red
    Write-Host "Execute: npm install -g @railway/cli" -ForegroundColor Yellow
    exit 1
}

# Verificar se está logado
Write-Host "🔍 Verificando login..." -ForegroundColor Cyan
$whoami = railway whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Você precisa fazer login primeiro!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Execute manualmente:" -ForegroundColor Yellow
    Write-Host "  railway login" -ForegroundColor White
    Write-Host ""
    Write-Host "Isso abrirá seu navegador para autenticação." -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Logado como: $whoami" -ForegroundColor Green
Write-Host ""

# Conectar ao projeto
Write-Host "🔗 Conectando ao projeto Railway..." -ForegroundColor Cyan
railway link
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao conectar ao projeto!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Conectado ao projeto!" -ForegroundColor Green
Write-Host ""

# Executar migrações
Write-Host "📦 Executando migrações do Prisma..." -ForegroundColor Cyan
railway run npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao executar migrações!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Se o erro for 'No migrations found', você precisa criar migrações primeiro:" -ForegroundColor Yellow
    Write-Host "  1. Adicione DATABASE_URL ao arquivo .env" -ForegroundColor White
    Write-Host "  2. Execute: npx prisma migrate dev --name init" -ForegroundColor White
    Write-Host "  3. Execute: git add prisma/migrations && git commit -m 'Add migrations' && git push" -ForegroundColor White
    Write-Host "  4. Execute este script novamente" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "✅ Migrações executadas com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Próximo passo: Configurar Vercel" -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Veja: PROXIMOS_PASSOS_EXECUTAR.md" -ForegroundColor Cyan
