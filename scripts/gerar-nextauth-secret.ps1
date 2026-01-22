# Script para gerar NEXTAUTH_SECRET
# Execute este script para gerar uma chave secreta segura

Write-Host "🔐 Gerando NEXTAUTH_SECRET..." -ForegroundColor Cyan
Write-Host ""

try {
    $secret = node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
    Write-Host "✅ Chave gerada com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Copie e cole no seu .env e no Vercel:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "NEXTAUTH_SECRET=$secret" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Dica: Use Ctrl+C para copiar" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erro ao gerar chave!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternativa: Use o gerador online:" -ForegroundColor Yellow
    Write-Host "https://generate-secret.vercel.app/32" -ForegroundColor Cyan
}

Write-Host ""
