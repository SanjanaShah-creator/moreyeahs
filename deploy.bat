@echo off
echo.
echo  Deploying MoreYeahs Website...
echo  ================================
echo.

git add .

set /p msg="Enter commit message (or press Enter for 'Update'): "
if "%msg%"=="" set msg=Update

git commit -m "%msg%"
git push

echo.
echo  Done! Vercel will deploy in ~1-2 minutes.
echo  Check: https://vercel.com/dashboard
echo.
pause
