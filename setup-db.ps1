# Database Setup Script for Craftuary Themes
# Run this script to set up your MySQL database

Write-Host "🚀 Craftuary Database Setup" -ForegroundColor Cyan
Write-Host "==========================`n" -ForegroundColor Cyan

# Check if .env file exists
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please edit it with your MySQL credentials.`n" -ForegroundColor Green
    Write-Host "Edit the following values in .env:" -ForegroundColor Yellow
    Write-Host "  - MYSQL_HOST (default: localhost)" -ForegroundColor White
    Write-Host "  - MYSQL_USER (default: root)" -ForegroundColor White
    Write-Host "  - MYSQL_PASSWORD (your MySQL password)" -ForegroundColor White
    Write-Host "  - MYSQL_DATABASE (default: craftuary_db)`n" -ForegroundColor White
} else {
    Write-Host "✅ .env file already exists`n" -ForegroundColor Green
}

# Ask if user wants to run the SQL schema
Write-Host "Do you want to set up the database now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "Y" -or $response -eq "y") {
    Write-Host "`nPlease enter your MySQL root password:" -ForegroundColor Yellow
    $password = Read-Host -AsSecureString
    $passwordText = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
    )
    
    Write-Host "`nRunning DATABASE_SCHEMA.sql..." -ForegroundColor Cyan
    
    # Run the SQL file
    Get-Content "DATABASE_SCHEMA.sql" | mysql -u root -p"$passwordText"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database setup completed successfully!`n" -ForegroundColor Green
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "  1. Verify your .env file has correct MySQL credentials" -ForegroundColor White
        Write-Host "  2. Run: npm run dev" -ForegroundColor White
        Write-Host "  3. Visit: http://localhost:5173/themes`n" -ForegroundColor White
    } else {
        Write-Host "❌ Error setting up database. Please check your MySQL installation.`n" -ForegroundColor Red
        Write-Host "Manual setup:" -ForegroundColor Yellow
        Write-Host "  mysql -u root -p < DATABASE_SCHEMA.sql`n" -ForegroundColor White
    }
} else {
    Write-Host "`nManual setup instructions:" -ForegroundColor Yellow
    Write-Host "  1. Update your .env file with MySQL credentials" -ForegroundColor White
    Write-Host "  2. Run: mysql -u root -p < DATABASE_SCHEMA.sql" -ForegroundColor White
    Write-Host "  3. Start the app: npm run dev`n" -ForegroundColor White
}
