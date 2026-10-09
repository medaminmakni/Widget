@echo off
title Push Widget to GitHub
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo Git is not installed. Install it from https://git-scm.com/download/win then run this file again.
  start "" "https://git-scm.com/download/win"
  pause
  exit /b 1
)

if not exist ".git" (
  git init
  git branch -M main
  git remote add origin https://github.com/medaminmakni/Widget.git
)

git add -A
git commit -m "Widget Consulting website (Next.js) and brand kit" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01TrujDM27aJU3ux5EA8wvgG"
git push -u origin main

echo.
echo Done. Check https://github.com/medaminmakni/Widget
pause
