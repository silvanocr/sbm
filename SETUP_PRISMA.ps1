# Script PowerShell para configurar Prisma
# Execute: .\SETUP_PRISMA.ps1

Write-Host "🗄️ Configurando Prisma..." -ForegroundColor Cyan

# Verificar se .env existe
if (-not (Test-Path ".env")) {
    Write-Host "⚠️ Arquivo .env não encontrado!" -ForegroundColor Yellow
    Write-Host "Criando .env.example..." -ForegroundColor Yellow
    
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Arquivo .env criado. Configure a DATABASE_URL!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Exemplo:" -ForegroundColor Yellow
    Write-Host 'DATABASE_URL="postgresql://usuario:senha@localhost:5432/motovelocidade?schema=public"' -ForegroundColor Gray
    Write-Host ""
    $continue = Read-Host "Pressione Enter após configurar o .env"
}

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Cyan
    npm install
}

# Gerar Prisma Client
Write-Host ""
Write-Host "🔧 Gerando Prisma Client..." -ForegroundColor Cyan
npx prisma generate

# Verificar conexão
Write-Host ""
Write-Host "🔌 Verificando conexão com banco de dados..." -ForegroundColor Cyan
try {
    npx prisma db pull --force
    Write-Host "✅ Conexão OK!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro na conexão. Verifique a DATABASE_URL no .env" -ForegroundColor Red
    exit 1
}

# Criar migrações
Write-Host ""
Write-Host "📝 Criando migrações..." -ForegroundColor Cyan
$migrate = Read-Host "Criar migrações? (S/N)"
if ($migrate -eq "S" -or $migrate -eq "s") {
    npx prisma migrate dev --name init
    Write-Host "✅ Migrações criadas!" -ForegroundColor Green
}

# Executar seed
Write-Host ""
Write-Host "🌱 Executar seed (dados de exemplo)? (S/N)" -ForegroundColor Cyan
$seed = Read-Host
if ($seed -eq "S" -or $seed -eq "s") {
    npx prisma db seed
    Write-Host "✅ Seed executado!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Configuração concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "Comandos úteis:" -ForegroundColor Cyan
Write-Host "  npm run db:studio    - Abrir Prisma Studio" -ForegroundColor Gray
Write-Host "  npm run db:migrate   - Criar nova migração" -ForegroundColor Gray
Write-Host "  npm run db:seed      - Executar seed" -ForegroundColor Gray
Write-Host ""
