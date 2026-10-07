# PowerShell Script to Push Patient Management Repository to GitHub (Bhuvanesh84x)

$gitExe = (Get-Command git.exe -ErrorAction SilentlyContinue).Source
if (-not $gitExe) {
    if (Test-Path "C:\Program Files\Git\cmd\git.exe") {
        $gitExe = "C:\Program Files\Git\cmd\git.exe"
    } else {
        $gitExe = "git"
    }
}

Write-Host "Initializing Git Repository..." -ForegroundColor Yellow
& $gitExe init

Write-Host "Configuring Git User..." -ForegroundColor Yellow
& $gitExe config user.name "Bhuvanesh84x"
& $gitExe config user.email "pbhuvanesh684-max@users.noreply.github.com"

Write-Host "Adding files..." -ForegroundColor Yellow
& $gitExe add .

Write-Host "Creating initial commit..." -ForegroundColor Yellow
& $gitExe commit -m "Initial commit: Patient Management Web App with yellowish-white theme and automated WhatsApp delivery"

& $gitExe branch -M main

Write-Host "Setting remote origin..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/Bhuvanesh84x/patient-management.git"
& $gitExe remote remove origin 2>$null
& $gitExe remote add origin $remoteUrl

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  Repository Prepared for Bhuvanesh84x/patient-management  " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
