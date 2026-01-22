# Script para configurar banco de dados
# Execute: .\configurar-banco.ps1

Write-Host "🗄️ Configuração do Banco de Dados" -ForegroundColor Cyan
Write-Host ""

# Verificar .env
if (-not (Test-Path ".env")) {
    Write-Host "❌ Arquivo .env não encontrado!" -ForegroundColor Red
    Write-Host "Criando .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue
    if (-not (Test-Path ".env")) {
        @"
DATABASE_URL="postgresql://usuario:senha@localhost:5432/motovelocidade?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=chave-temporaria-123
"@ | Out-File -FilePath ".env" -Encoding utf8
    }
}

Write-Host "📋 Opções de Banco de Dados:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Railway (Recomendado - Grátis)" -ForegroundColor Green
Write-Host "   - Acesse: https://railway.app"
Write-Host "   - Crie projeto → Adicione PostgreSQL"
Write-Host "   - Copie a DATABASE_URL"
Write-Host ""
Write-Host "2. Supabase (Grátis)" -ForegroundColor Green
Write-Host "   - Acesse: https://supabase.com"
Write-Host "   - Crie projeto → Copie Connection String"
Write-Host ""
Write-Host "3. PostgreSQL Local" -ForegroundColor Green
Write-Host "   - Instale PostgreSQL"
Write-Host "   - Crie banco: CREATE DATABASE motovelocidade;"
Write-Host ""

$opcao = Read-Host "Escolha uma opção (1/2/3) ou pressione Enter para pular"

if ($opcao -eq "1") {
    Write-Host ""
    Write-Host "📝 Configure o Railway:" -ForegroundColor Cyan
    Write-Host "1. Acesse: https://railway.app" -ForegroundColor Yellow
    Write-Host "2. Crie projeto → Adicione PostgreSQL" -ForegroundColor Yellow
    Write-Host "3. Copie a DATABASE_URL" -ForegroundColor Yellow
    Write-Host ""
    $dbUrl = Read-Host "Cole a DATABASE_URL do Railway aqui"
    
    if ($dbUrl) {
        $envContent = Get-Content ".env" -Raw
        $envContent = $envContent -replace 'DATABASE_URL=".*"', "DATABASE_URL=`"$dbUrl`""
        $envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
        Write-Host "✅ DATABASE_URL atualizada!" -ForegroundColor Green
    }
} elseif ($opcao -eq "2") {
    Write-Host ""
    Write-Host "📝 Configure o Supabase:" -ForegroundColor Cyan
    Write-Host "1. Acesse: https://supabase.com" -ForegroundColor Yellow
    Write-Host "2. Crie projeto → Settings → Database" -ForegroundColor Yellow
    Write-Host "3. Copie a Connection String (URI)" -ForegroundColor Yellow
    Write-Host ""
    $dbUrl = Read-Host "Cole a Connection String do Supabase aqui"
    
    if ($dbUrl) {
        $envContent = Get-Content ".env" -Raw
        $envContent = $envContent -replace 'DATABASE_URL=".*"', "DATABASE_URL=`"$dbUrl`""
        $envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
        Write-Host "✅ DATABASE_URL atualizada!" -ForegroundColor Green
    }
} elseif ($opcao -eq "3") {
    Write-Host ""
    Write-Host "📝 Configure PostgreSQL Local:" -ForegroundColor Cyan
    $usuario = Read-Host "Usuário (padrão: postgres)"
    if (-not $usuario) { $usuario = "postgres" }
    $senha = Read-Host "Senha" -AsSecureString
    $senhaPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($senha))
    $banco = Read-Host "Nome do banco (padrão: motovelocidade)"
    if (-not $banco) { $banco = "motovelocidade" }
    
    $dbUrl = "postgresql://${usuario}:${senhaPlain}@localhost:5432/${banco}?schema=public"
    $envContent = Get-Content ".env" -Raw
    $envContent = $envContent -replace 'DATABASE_URL=".*"', "DATABASE_URL=`"$dbUrl`""
    $envContent | Out-File -FilePath ".env" -Encoding utf8 -NoNewline
    Write-Host "✅ DATABASE_URL atualizada!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔌 Testando conexão..." -ForegroundColor Cyan
try {
    npx prisma db pull --force 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Conexão OK!" -ForegroundColor Green
    } else {
        Write-Host "❌ Erro na conexão. Verifique a DATABASE_URL no .env" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erro ao testar conexão" -ForegroundColor Red
    Write-Host "Verifique a DATABASE_URL no arquivo .env" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 Criando migrações..." -ForegroundColor Cyan
$criar = Read-Host "Criar migrações? (S/N)"
if ($criar -eq "S" -or $criar -eq "s") {
    npx prisma migrate dev --name init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Migrações criadas!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🌱 Popular banco com dados de exemplo?" -ForegroundColor Cyan
$seed = Read-Host "Executar seed? (S/N)"
if ($seed -eq "S" -or $seed -eq "s") {
    npm run db:seed
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Seed executado!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🎉 Configuração concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "Comandos úteis:" -ForegroundColor Cyan
Write-Host "  npm run db:studio  - Visualizar dados" -ForegroundColor Gray
Write-Host "  npm run db:status  - Ver status das migrações" -ForegroundColor Gray
Write-Host "  npm run dev        - Executar aplicação" -ForegroundColor Gray
Write-Host ""
