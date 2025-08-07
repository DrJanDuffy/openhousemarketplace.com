# Git Helper Script for Windows PowerShell
# This script provides better feedback and error handling for git operations

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("commit", "push", "status", "add")]
    [string]$Action,
    
    [Parameter(Mandatory=$false)]
    [string]$Message = ""
)

Write-Host "=== Git Helper Script ===" -ForegroundColor Cyan
Write-Host "Action: $Action" -ForegroundColor Yellow

switch ($Action) {
    "status" {
        Write-Host "Checking git status..." -ForegroundColor Green
        git status
    }
    
    "add" {
        Write-Host "Adding all files..." -ForegroundColor Green
        git add .
        Write-Host "Files added successfully!" -ForegroundColor Green
    }
    
    "commit" {
        if ([string]::IsNullOrEmpty($Message)) {
            $Message = Read-Host "Enter commit message"
        }
        
        Write-Host "Committing with message: '$Message'" -ForegroundColor Green
        Write-Host "This may take a moment..." -ForegroundColor Yellow
        
        $result = git commit -m $Message 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Commit successful!" -ForegroundColor Green
            Write-Host $result -ForegroundColor White
        } else {
            Write-Host "Commit failed!" -ForegroundColor Red
            Write-Host $result -ForegroundColor Red
        }
    }
    
    "push" {
        Write-Host "Pushing to remote..." -ForegroundColor Green
        Write-Host "This may take a moment depending on file size and network..." -ForegroundColor Yellow
        
        $result = git push 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Push successful!" -ForegroundColor Green
            Write-Host $result -ForegroundColor White
        } else {
            Write-Host "Push failed!" -ForegroundColor Red
            Write-Host $result -ForegroundColor Red
        }
    }
}

Write-Host "=== Operation Complete ===" -ForegroundColor Cyan
