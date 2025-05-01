@echo off
:: 1. 안내멘트
echo =============================
echo GIT 자동 커밋,푸시가 진행됩니다
echo =============================
echo 잠시만 기다려주세요...
timeout /t 2 >nul

:: 2. 커밋 진행 안내
echo.
echo GIT commit을 진행합니다.
pause

:: 커밋 메시지 입력
set /p commit_msg=커밋 메시지를 입력하세요: 

:: git add, commit, push 실행
echo.
echo [1] git add .
git add .

echo [2] git commit -m "%commit_msg%"
git commit -m "%commit_msg%"

echo [3] git push origin main
git push origin main

:: 종료
echo.
echo 모든 작업이 완료되었습니다.
pause
exit