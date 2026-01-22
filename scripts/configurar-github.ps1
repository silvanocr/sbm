# Script para configurar e fazer push para o GitHub
# Execute este script na raiz do projeto

Write-Host "🚀 Configurando GitHub..." -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script na raiz do projeto!" -ForegroundColor Red
    exit 1
}

# Verificar se Git está instalado
Write-Host "1. Verificando Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "   ✅ Git instalado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Git não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   💡 Instale o Git:" -ForegroundColor Yellow
    Write-Host "   https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   Após instalar, reinicie o PowerShell e execute este script novamente." -ForegroundColor Yellow
    exit 1
}

# Verificar se já é um repositório Git
Write-Host "2. Verificando repositório Git..." -ForegroundColor Yellow
$isGitRepo = git rev-parse --git-dir 2>$null
if (-not $isGitRepo) {
    Write-Host "   ⏳ Inicializando repositório Git..." -ForegroundColor Cyan
    git init
    Write-Host "   ✅ Repositório inicializado" -ForegroundColor Green
} else {
    Write-Host "   ✅ Repositório Git já inicializado" -ForegroundColor Green
}

# Verificar remote
Write-Host "3. Verificando remote do GitHub..." -ForegroundColor Yellow
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "   ⚠️  Remote já configurado: $remote" -ForegroundColor Yellow
    $resposta = Read-Host "   Deseja alterar para https://github.com/silvanocr/sbm.git? (s/n)"
    if ($resposta -eq "s" -or $resposta -eq "S") {
        git remote set-url origin https://github.com/silvanocr/sbm.git
        Write-Host "   ✅ Remote atualizado" -ForegroundColor Green
    }
} else {
    Write-Host "   ⏳ Adicionando remote..." -ForegroundColor Cyan
    git remote add origin https://github.com/silvanocr/sbm.git
    Write-Host "   ✅ Remote adicionado" -ForegroundColor Green
}

# Verificar se há mudanças
Write-Host "4. Verificando mudanças..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "   ⏳ Adicionando arquivos..." -ForegroundColor Cyan
    git add .
    Write-Host "   ✅ Arquivos adicionados" -ForegroundColor Green
    
    Write-Host "5. Fazendo commit..." -ForegroundColor Yellow
    $mensagem = Read-Host "   Digite a mensagem do commit (ou pressione Enter para usar padrão)"
    if ([string]::IsNullOrWhiteSpace($mensagem)) {
        $mensagem = "Initial commit - Sul Brasileiro de Motovelocidade"
    }
    git commit -m $mensagem
    Write-Host "   ✅ Commit realizado" -ForegroundColor Green
} else {
    Write-Host "   ✅ Nenhuma mudança pendente" -ForegroundColor Green
}

# Verificar branch
Write-Host "6. Verificando branch..." -ForegroundColor Yellow
$branch = git branch --show-current
if ($branch -ne "main") {
    Write-Host "   ⏳ Renomeando branch para 'main'..." -ForegroundColor Cyan
    git branch -M main
    Write-Host "   ✅ Branch renomeado para 'main'" -ForegroundColor Green
} else {
    Write-Host "   ✅ Branch 'main' já está configurada" -ForegroundColor Green
}

# Fazer push
Write-Host ""
Write-Host "7. Fazendo push para o GitHub..." -ForegroundColor Yellow
Write-Host "   ⚠️  Se pedir autenticação:" -ForegroundColor Yellow
Write-Host "   - Use um Personal Access Token (não sua senha)" -ForegroundColor Yellow
Write-Host "   - Crie em: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "   - Permissões necessárias: repo" -ForegroundColor Yellow
Write-Host ""
$resposta = Read-Host "   Continuar com o push? (s/n)"
if ($resposta -eq "s" -or $resposta -eq "S") {
    try {
        git push -u origin main
        Write-Host ""
        Write-Host "   ✅ Push realizado com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host ""
        Write-Host "   ❌ Erro ao fazer push!" -ForegroundColor Red
        Write-Host "   💡 Verifique sua autenticação do GitHub" -ForegroundColor Yellow
        Write-Host "   💡 Use um Personal Access Token em vez de senha" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⏭️  Push cancelado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Para fazer push manualmente, execute:" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor White
}

# Resumo
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Configuração do GitHub concluída!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure o Railway (veja CONFIGURAR_GITHUB_RAILWAY.md)" -ForegroundColor White
Write-Host "2. Configure o Vercel" -ForegroundColor White
Write-Host ""
Write-Host "📖 Veja o guia completo: CONFIGURAR_GITHUB_RAILWAY.md" -ForegroundColor Yellow
Write-Host ""
