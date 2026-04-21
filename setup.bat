@echo off
setlocal
cd /d "%~dp0"

echo.
echo === Benefit Magazine Website Setup ===
echo.

:: Check for ffprobe
where ffprobe >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: ffprobe not found.
    echo Install FFmpeg from https://ffmpeg.org/download.html and add to PATH.
    pause
    exit /b 1
)

:: Get video duration
echo Analyzing video...
for /f "tokens=*" %%a in ('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "assets\Benefit Magazine animation.mp4" 2^>nul') do set DURATION=%%a
echo   Duration: %DURATION% seconds

:: Create frame directories
if not exist "public\frames" mkdir "public\frames"
if not exist "public\frames\mobile" mkdir "public\frames\mobile"

:: Extract desktop frames (target ~150)
echo.
echo Extracting desktop frames...
for /f "tokens=*" %%f in ('powershell -command "[Math]::Round(150/%DURATION%,4)"') do set DFPS=%%f
ffmpeg -i "assets\Benefit Magazine animation.mp4" -vf "fps=%DFPS%,scale=1920:-1" -c:v libwebp -quality 80 -compression_level 6 -preset picture -an "public\frames\frame-%%03d.webp" -y 2>nul
for /f "tokens=*" %%c in ('powershell -command "(Get-ChildItem public\frames\*.webp | Measure-Object).Count"') do set DCOUNT=%%c
echo   Extracted: %DCOUNT% desktop frames

:: Extract mobile frames (target ~80)
echo Extracting mobile frames...
for /f "tokens=*" %%f in ('powershell -command "[Math]::Round(80/%DURATION%,4)"') do set MFPS=%%f
ffmpeg -i "assets\Benefit Magazine animation.mp4" -vf "fps=%MFPS%,scale=1080:-1" -c:v libwebp -quality 75 -compression_level 6 -preset picture -an "public\frames\mobile\frame-%%03d.webp" -y 2>nul
for /f "tokens=*" %%c in ('powershell -command "(Get-ChildItem public\frames\mobile\*.webp | Measure-Object).Count"') do set MCOUNT=%%c
echo   Extracted: %MCOUNT% mobile frames

:: Copy first frame to public/
echo Copying first-frame.png...
copy "assets\frame 1.png" "public\first-frame.png" >nul

:: Install npm dependencies
echo.
echo Installing npm dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed. Make sure Node.js 18+ is installed.
    pause
    exit /b 1
)

echo.
echo === Setup Complete! ===
echo Desktop frames: %DCOUNT%
echo Mobile frames:  %MCOUNT%
echo.
echo Run: npm run dev
echo Open: http://localhost:3000
echo.
pause
