# Benefit Magazine Website Setup Script
# Run this from PowerShell: .\setup.ps1

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "`n=== Benefit Magazine Website Setup ===`n" -ForegroundColor Yellow

# Check for ffprobe
if (-not (Get-Command ffprobe -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: ffprobe not found. Install FFmpeg from https://ffmpeg.org/download.html" -ForegroundColor Red
    exit 1
}

# Analyze video
$VideoPath = Join-Path $ProjectRoot "assets\Benefit Magazine animation.mp4"
Write-Host "Analyzing video..." -ForegroundColor Cyan

$Duration = & ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VideoPath" 2>$null
$Duration = [double]$Duration
Write-Host "  Duration: $Duration seconds"

$DesktopFps = [Math]::Round(150 / $Duration, 4)
$MobileFps = [Math]::Round(80 / $Duration, 4)
Write-Host "  Desktop FPS: $DesktopFps (target 150 frames)"
Write-Host "  Mobile FPS:  $MobileFps (target 80 frames)"

# Create output directories
$FramesDir = Join-Path $ProjectRoot "public\frames"
$MobileFramesDir = Join-Path $ProjectRoot "public\frames\mobile"
New-Item -ItemType Directory -Force -Path $FramesDir | Out-Null
New-Item -ItemType Directory -Force -Path $MobileFramesDir | Out-Null

# Extract desktop frames
Write-Host "`nExtracting desktop frames..." -ForegroundColor Cyan
& ffmpeg -i "$VideoPath" -vf "fps=$DesktopFps,scale=1920:-1" -c:v libwebp -quality 80 -compression_level 6 -preset picture -an "$FramesDir\frame-%03d.webp" -y 2>&1 | Out-Null
$DesktopCount = (Get-ChildItem "$FramesDir\*.webp" | Measure-Object).Count
Write-Host "  Extracted: $DesktopCount frames"

# Extract mobile frames
Write-Host "Extracting mobile frames..." -ForegroundColor Cyan
& ffmpeg -i "$VideoPath" -vf "fps=$MobileFps,scale=1080:-1" -c:v libwebp -quality 75 -compression_level 6 -preset picture -an "$MobileFramesDir\frame-%03d.webp" -y 2>&1 | Out-Null
$MobileCount = (Get-ChildItem "$MobileFramesDir\*.webp" | Measure-Object).Count
Write-Host "  Extracted: $MobileCount frames"

# Copy first frame to public
$FirstFrameSrc = Join-Path $ProjectRoot "assets\frame 1.png"
$FirstFrameDst = Join-Path $ProjectRoot "public\first-frame.png"
Copy-Item -Path $FirstFrameSrc -Destination $FirstFrameDst -Force
Write-Host "  Copied first-frame.png to public/"

# Update frame count in page.tsx if different from 150
if ($DesktopCount -ne 150) {
    Write-Host "`nUpdating FRAME_COUNT to $DesktopCount in page.tsx..." -ForegroundColor Cyan
    $PagePath = Join-Path $ProjectRoot "src\app\page.tsx"
    $Content = Get-Content $PagePath -Raw
    $Content = $Content -replace "const FRAME_COUNT = \d+;", "const FRAME_COUNT = $DesktopCount;"
    Set-Content $PagePath $Content
}

# Install npm dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Cyan
Set-Location $ProjectRoot
& npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "  Dependencies installed."

# Done
Write-Host "`n=== Setup Complete ===" -ForegroundColor Green
Write-Host "Desktop frames: $DesktopCount" -ForegroundColor White
Write-Host "Mobile frames:  $MobileCount" -ForegroundColor White
Write-Host "`nRun: npm run dev" -ForegroundColor Yellow
Write-Host "Open: http://localhost:3000`n" -ForegroundColor Yellow
