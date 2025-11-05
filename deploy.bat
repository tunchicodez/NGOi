@echo off
echo Deploying Annor Yeboah Care Foundation Website...
echo.

REM Check if netlify CLI is installed
netlify --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Netlify CLI...
    npm install -g netlify-cli
    if %errorlevel% neq 0 (
        echo Error: Failed to install Netlify CLI
        echo Please install Node.js first: https://nodejs.org/
        pause
        exit /b 1
    )
)

echo Netlify CLI is ready!
echo.

REM Login to Netlify (if not already logged in)
echo Please login to Netlify when prompted...
netlify login

REM Deploy the site
echo Deploying website...
netlify deploy --prod --dir .

echo.
echo Deployment complete!
echo Your website should now be live on Netlify.
pause
