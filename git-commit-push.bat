@echo off
echo === Git Commit and Push Helper ===
echo.

echo Checking git status...
git status
echo.

echo Adding all files...
git add .
echo Files added successfully!
echo.

set /p commit_msg="Enter commit message: "

echo.
echo Committing with message: "%commit_msg%"
echo This may take a moment...
git commit -m "%commit_msg%"

if %errorlevel% equ 0 (
    echo.
    echo Commit successful! Now pushing...
    echo This may take a moment depending on file size and network...
    git push
    
    if %errorlevel% equ 0 (
        echo.
        echo ========================================
        echo SUCCESS: All operations completed!
        echo ========================================
    ) else (
        echo.
        echo ========================================
        echo ERROR: Push failed!
        echo ========================================
    )
) else (
    echo.
    echo ========================================
    echo ERROR: Commit failed!
    echo ========================================
)

echo.
pause
