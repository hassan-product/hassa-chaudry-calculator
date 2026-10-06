@echo off
rem Double-click to run the calculator on Windows.
rem It checks for Node, installs this project's dependencies on the first run, then starts the
rem app and opens it in your browser. It signs in to nothing and sends nothing anywhere.

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed. Install Node 20.19 or later from https://nodejs.org, then double-click start.bat again.
  echo.
  pause
  exit /b 1
)

rem The same range as "engines" in package.json: 20.19 or later in 20, or 22.12 and up.
node -e "const [a, b] = process.versions.node.split('.').map(Number); process.exit((a === 20 && b >= 19) || (a === 22 && b >= 12) || a > 22 ? 0 : 1)"
if errorlevel 1 (
  echo.
  echo This needs Node 20.19 or later, or 22.12 or later. Install a newer one from https://nodejs.org, then try again.
  node --version
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo First run: installing dependencies. This takes a minute and only happens once.
  call npm install
  if errorlevel 1 (
    echo.
    echo Installing dependencies failed. Check the messages above.
    pause
    exit /b 1
  )
)

echo Starting the calculator. It opens in your browser; close this window to stop it.
call npm run dev -- --open
