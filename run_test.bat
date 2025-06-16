@echo off
echo ===========================
echo Verificando entorno...
echo ===========================

if not exist "nodejs" (
    echo ❌ Error: Falta la carpeta "nodejs"
    pause
    exit /b 1
)

if not exist ".env" (
    echo ⚠️ Aviso: No se encontró el archivo ".env"
) else (
    echo ✅ Archivo ".env" encontrado
)

if not exist "node_modules" (
    echo ❌ Error: Falta la carpeta "node_modules" con las dependencias instaladas
    pause
    exit /b 1
)

echo ✅ Todo listo. Puedes ejecutar los tests cuando quieras con:
echo.
echo     .\nodejs\node.exe .\node_modules\.bin\playwright test --> Para ejecutar todos los tests
echo     .\nodejs\node.exe .\node_modules\.bin\playwright test <nombre_del_test> --> Para ejecutar un test específico
echo.
pause
