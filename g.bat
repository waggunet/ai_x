@echo off
:: 1. �ȳ���Ʈ
echo =============================
echo GIT �ڵ� Ŀ��,Ǫ�ð� ����˴ϴ�
echo =============================
echo ��ø� ��ٷ��ּ���...
timeout /t 2 >nul

:: 2. Ŀ�� ���� �ȳ�
echo.
echo GIT commit�� �����մϴ�.
pause

:: Ŀ�� �޽��� �Է�
set /p commit_msg=Ŀ�� �޽����� �Է��ϼ���: 

:: git add, commit, push ����
echo.
echo [1] git add .
git add .

echo [2] git commit -m "%commit_msg%"
git commit -m "%commit_msg%"

echo [3] git push origin main
git push origin main

:: ����
echo.
echo ��� �۾��� �Ϸ�Ǿ����ϴ�.
pause
exit