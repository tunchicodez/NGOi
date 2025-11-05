@echo off
echo Starting local development server...
echo.
echo The website will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Try different methods to start a local server
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Python HTTP server...
    python -m http.server 8000
) else (
    node --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo Using Node.js HTTP server...
        npx http-server -p 8000
    ) else (
        echo Error: Neither Python nor Node.js found
        echo Please install one of them to run a local server
        echo Python: https://python.org/
        echo Node.js: https://nodejs.org/
        pause
    )
)
