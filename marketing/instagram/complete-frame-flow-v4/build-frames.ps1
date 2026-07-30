Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$WorkspaceRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
$InstagramRoot = Join-Path $WorkspaceRoot "marketing\instagram"
$AssetRoot = Join-Path $InstagramRoot "assets"
$OutputRoot = Join-Path $PSScriptRoot "frames"

New-Item -ItemType Directory -Path $OutputRoot -Force | Out-Null

$Width = 1080
$Height = 1920
$Navy = [System.Drawing.Color]::FromArgb(10, 20, 48)
$Indigo = [System.Drawing.Color]::FromArgb(76, 86, 220)
$Cyan = [System.Drawing.Color]::FromArgb(0, 200, 232)
$Ivory = [System.Drawing.Color]::FromArgb(248, 247, 244)
$Ink = [System.Drawing.Color]::FromArgb(22, 30, 48)
$Muted = [System.Drawing.Color]::FromArgb(92, 103, 124)

function New-Canvas {
    param([System.Drawing.Color]$Color)
    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.Clear($Color)
    return @($bitmap, $graphics)
}

function Add-TopAccent {
    param([System.Drawing.Graphics]$Graphics)
    $brush = New-Object System.Drawing.SolidBrush($Cyan)
    $Graphics.FillRectangle($brush, 72, 92, 92, 8)
    $brush.Dispose()
}

function Add-BrandLabel {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Color]$Color = $Indigo
    )
    $font = New-Object System.Drawing.Font("Segoe UI", 21, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush($Color)
    $Graphics.DrawString("TRY INSTANT FIT", $font, $brush, 72, 116)
    $font.Dispose()
    $brush.Dispose()
}

function Add-Headline {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [int]$Y,
        [System.Drawing.Color]$Color,
        [int]$Size = 66,
        [int]$MaxWidth = 930
    )
    $font = New-Object System.Drawing.Font("Segoe UI", $Size, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush($Color)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Near
    $format.LineAlignment = [System.Drawing.StringAlignment]::Near
    $rect = New-Object System.Drawing.RectangleF(72, $Y, $MaxWidth, 330)
    $Graphics.DrawString($Text, $font, $brush, $rect, $format)
    $font.Dispose()
    $brush.Dispose()
    $format.Dispose()
}

function Add-Subline {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [int]$Y,
        [System.Drawing.Color]$Color = $Muted,
        [int]$Size = 30
    )
    $font = New-Object System.Drawing.Font("Segoe UI", $Size, [System.Drawing.FontStyle]::Regular)
    $brush = New-Object System.Drawing.SolidBrush($Color)
    $rect = New-Object System.Drawing.RectangleF(72, $Y, 930, 180)
    $Graphics.DrawString($Text, $font, $brush, $rect)
    $font.Dispose()
    $brush.Dispose()
}

function Draw-ImageContain {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Path,
        [System.Drawing.RectangleF]$Bounds
    )
    $image = [System.Drawing.Image]::FromFile($Path)
    $scale = [Math]::Min($Bounds.Width / $image.Width, $Bounds.Height / $image.Height)
    $drawWidth = [single]($image.Width * $scale)
    $drawHeight = [single]($image.Height * $scale)
    $x = [single]($Bounds.X + (($Bounds.Width - $drawWidth) / 2))
    $y = [single]($Bounds.Y + (($Bounds.Height - $drawHeight) / 2))
    $Graphics.DrawImage($image, $x, $y, $drawWidth, $drawHeight)
    $image.Dispose()
}

function Draw-Phone {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$ScreenPath,
        [int]$X = 125,
        [int]$Y = 455,
        [int]$PhoneWidth = 830,
        [int]$PhoneHeight = 830
    )
    $outer = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(17, 23, 38))
    $inner = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $Graphics.FillRectangle($outer, $X, $Y, $PhoneWidth, $PhoneHeight)
    $Graphics.FillRectangle($inner, $X + 24, $Y + 24, $PhoneWidth - 48, $PhoneHeight - 48)
    $screenBounds = New-Object System.Drawing.RectangleF(
        ($X + 24),
        ($Y + 24),
        ($PhoneWidth - 48),
        ($PhoneHeight - 48)
    )
    Draw-ImageContain -Graphics $Graphics -Path $ScreenPath -Bounds $screenBounds
    $outer.Dispose()
    $inner.Dispose()
}

function Save-Frame {
    param(
        [System.Drawing.Bitmap]$Bitmap,
        [System.Drawing.Graphics]$Graphics,
        [string]$Name
    )
    $Graphics.Dispose()
    $path = Join-Path $OutputRoot $Name
    $Bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $Bitmap.Dispose()
}

function Build-ModelFrame {
    param(
        [string]$Name,
        [string]$ImagePath,
        [string]$Headline,
        [string]$Subline,
        [bool]$Dark = $false
    )
    $background = if ($Dark) { $Navy } else { $Ivory }
    $textColor = if ($Dark) { [System.Drawing.Color]::White } else { $Ink }
    $canvas = New-Canvas -Color $background
    $bitmap = $canvas[0]
    $graphics = $canvas[1]
    Add-TopAccent -Graphics $graphics
    Add-BrandLabel -Graphics $graphics -Color $(if ($Dark) { $Cyan } else { $Indigo })
    Add-Headline -Graphics $graphics -Text $Headline -Y 170 -Color $textColor -Size 62
    Add-Subline -Graphics $graphics -Text $Subline -Y 405 -Color $(if ($Dark) { [System.Drawing.Color]::FromArgb(205, 214, 230) } else { $Muted })
    $imageBounds = New-Object System.Drawing.RectangleF(80, 545, 920, 1275)
    Draw-ImageContain -Graphics $graphics -Path $ImagePath -Bounds $imageBounds
    Save-Frame -Bitmap $bitmap -Graphics $graphics -Name $Name
}

function Build-PhoneFrame {
    param(
        [string]$Name,
        [string]$ScreenPath,
        [string]$Step,
        [string]$Headline
    )
    $canvas = New-Canvas -Color $Navy
    $bitmap = $canvas[0]
    $graphics = $canvas[1]
    Add-TopAccent -Graphics $graphics
    Add-BrandLabel -Graphics $graphics -Color $Cyan
    $stepFont = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Bold)
    $stepBrush = New-Object System.Drawing.SolidBrush($Cyan)
    $graphics.DrawString($Step, $stepFont, $stepBrush, 72, 178)
    $stepFont.Dispose()
    $stepBrush.Dispose()
    Add-Headline -Graphics $graphics -Text $Headline -Y 212 -Color ([System.Drawing.Color]::White) -Size 54
    Draw-Phone -Graphics $graphics -ScreenPath $ScreenPath -X 125 -Y 520 -PhoneWidth 830 -PhoneHeight 830
    Add-Subline -Graphics $graphics -Text "Real Try Instant Fit screen" -Y 1440 -Color ([System.Drawing.Color]::FromArgb(205, 214, 230)) -Size 28
    Save-Frame -Bitmap $bitmap -Graphics $graphics -Name $Name
}

$models = Join-Path $AssetRoot "models-white"
$results = Join-Path $AssetRoot "try-on-results"
$live = Join-Path $AssetRoot "live-site"
$privateLive = Join-Path $PSScriptRoot "private-phone-flow"

Build-ModelFrame `
    -Name "01-hook.png" `
    -ImagePath (Join-Path $models "P1.png") `
    -Headline "WILL IT LOOK`nRIGHT ON ME?" `
    -Subline "The question every fashion customer asks."

Build-ModelFrame `
    -Name "02-formal-result.png" `
    -ImagePath (Join-Path $results "Y1.jpg") `
    -Headline "SEE THE LOOK.`nTHEN DECIDE." `
    -Subline "A real Try Instant Fit result."

Build-PhoneFrame -Name "03-open-link.png" -ScreenPath (Join-Path $privateLive "flow-1.jpg") -Step "STEP 01" -Headline "OPEN THE LINK"
Build-PhoneFrame -Name "04-see-product.png" -ScreenPath (Join-Path $privateLive "flow-4.jpg") -Step "STEP 02" -Headline "SEE THE OUTFIT"
Build-PhoneFrame -Name "05-add-photo.png" -ScreenPath (Join-Path $privateLive "flow-5.jpg") -Step "STEP 03" -Headline "ADD A PHOTO"
Build-PhoneFrame -Name "06-photo-ready.png" -ScreenPath (Join-Path $privateLive "flow-7.jpg") -Step "STEP 04" -Headline "PHOTO READY"
Build-PhoneFrame -Name "07-tap-try-on.png" -ScreenPath (Join-Path $privateLive "flow-8.jpg") -Step "STEP 05" -Headline "TAP TRY IT ON"
Build-PhoneFrame -Name "08-processing.png" -ScreenPath (Join-Path $privateLive "flow-9.jpg") -Step "STEP 06" -Headline "AI PREPARES THE LOOK"
Build-PhoneFrame -Name "09-result.png" -ScreenPath (Join-Path $privateLive "flow-10.jpg") -Step "STEP 07" -Headline "SEE IT ON YOU"

Build-ModelFrame `
    -Name "10-wedding-before.png" `
    -ImagePath (Join-Path $models "P12.png") `
    -Headline "NOT JUST`nEVERYDAY WEAR." `
    -Subline "The same experience works for formal and wedding collections."

Build-ModelFrame `
    -Name "11-wedding-result.png" `
    -ImagePath (Join-Path $results "B3.jpg") `
    -Headline "EVEN THE`nBIG MOMENTS." `
    -Subline "A genuine wedding-wear try-on result."

$canvas = New-Canvas -Color $Navy
$bitmap = $canvas[0]
$graphics = $canvas[1]
$logoPath = Join-Path $live "logo.png"
Draw-ImageContain -Graphics $graphics -Path $logoPath -Bounds (New-Object System.Drawing.RectangleF(170, 270, 740, 250))
Add-Headline -Graphics $graphics -Text "TURN BROWSING`nINTO CONFIDENCE." -Y 650 -Color ([System.Drawing.Color]::White) -Size 66
Add-Subline -Graphics $graphics -Text "Virtual try-on for fashion sellers." -Y 960 -Color ([System.Drawing.Color]::FromArgb(205, 214, 230)) -Size 34
$ctaBrush = New-Object System.Drawing.SolidBrush($Indigo)
$graphics.FillRectangle($ctaBrush, 72, 1210, 936, 150)
$ctaBrush.Dispose()
$ctaFont = New-Object System.Drawing.Font("Segoe UI", 37, [System.Drawing.FontStyle]::Bold)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$ctaFormat = New-Object System.Drawing.StringFormat
$ctaFormat.Alignment = [System.Drawing.StringAlignment]::Center
$ctaFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
$graphics.DrawString("FASHION BRANDS - DM 'DEMO'", $ctaFont, $whiteBrush, (New-Object System.Drawing.RectangleF(72, 1210, 936, 150)), $ctaFormat)
$ctaFont.Dispose()
$whiteBrush.Dispose()
$ctaFormat.Dispose()
Add-Subline -Graphics $graphics -Text "No app needed. Works on their phone." -Y 1435 -Color ([System.Drawing.Color]::FromArgb(205, 214, 230)) -Size 30
Save-Frame -Bitmap $bitmap -Graphics $graphics -Name "12-cta.png"

Get-ChildItem -LiteralPath $OutputRoot -Filter "*.png" |
    Sort-Object Name |
    Select-Object Name, Length
