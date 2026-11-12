@echo off
chcp 65001 > nul
title 한국공학대학교 R&D 혁신 포털
echo ==============================================================
echo [한국공학대학교] R&D 혁신 성과 포털 로컬 서버를 실행합니다...
echo 브라우저가 자동으로 열립니다. (http://localhost:8080)
echo ==============================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
