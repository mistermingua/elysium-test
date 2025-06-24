@echo off
echo ===========================
echo Verificando entorno...
echo ===========================

if not exist "nodejs" (
    echo Error: Falta la carpeta "nodejs"
    pause
    exit /b 1
)

:: Verifica package.json
if not exist "package.json" (
    echo Falta el archivo "package.json"
    pause
    exit /b 1
)

:: Instala dependencias si no existen
if not exist "node_modules" (
    echo  Instalando dependencias (esto puede tardar un poco)...
    .\nodejs\npm.cmd install
    if errorlevel 1 (
        echo  Fallo al instalar dependencias
        pause
        exit /b 1
    )
) else (
    echo  Dependencias ya están instaladas
)

echo  Todo listo. Puedes ejecutar los tests cuando quieras con:
echo.
echo     .\nodejs\npx.cmd playwright test // Ejecuta todos los tests
echo o bien:
echo     .\nodejs\npx.cmd playwright test tests\ESS.spec.ts // Ejecuta un test específico
echo.
pause
