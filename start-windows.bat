@echo off
title Widget Consulting - local site
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is not installed on this computer.
  echo  Install the LTS version from https://nodejs.org then run this file again.
  echo.
  start "" "https://nodejs.org/en/download"
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo.
  echo  First run: installing packages. This takes 1 to 3 minutes...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  Package installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo.
echo  Starting the site on http://localhost:3000
echo  Keep this window open while you use the site. Close it to stop.
echo.
start "" cmd /c "timeout /t 6 >nul && start http://localhost:3000"
call npm run dev
pause
