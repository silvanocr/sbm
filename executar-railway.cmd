@echo off
echo ===============================================
echo Executando Comandos Railway
echo ===============================================
echo.

cd /d c:\sul-brasileiro-motovelocidade

echo [1/3] Fazendo login no Railway...
railway login
if errorlevel 1 (
    echo Erro ao fazer login!
    pause
    exit /b 1
)

echo.
echo [2/3] Conectando ao projeto...
railway link
if errorlevel 1 (
    echo Erro ao conectar ao projeto!
    pause
    exit /b 1
)

echo.
echo [3/3] Executando migrações...
railway run npx prisma migrate deploy
if errorlevel 1 (
    echo Erro ao executar migrações!
    echo.
    echo Se o erro for "No migrations found", veja EXECUTAR_RAILWAY_AGORA.md
    pause
    exit /b 1
)

echo.
echo ===============================================
echo Migracoes executadas com sucesso!
echo ===============================================
echo.
echo Proximo passo: Configurar Vercel
echo Veja: PROXIMOS_PASSOS_EXECUTAR.md
echo.
pause
