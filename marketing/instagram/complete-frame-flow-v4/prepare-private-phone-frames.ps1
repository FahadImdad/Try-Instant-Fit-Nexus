Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$WorkspaceRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
$SourceRoot = Join-Path $WorkspaceRoot "marketing\instagram\assets\live-site"
$OutputRoot = Join-Path $PSScriptRoot "private-phone-flow"

New-Item -ItemType Directory -Path $OutputRoot -Force | Out-Null

function Pixelate-Region {
    param(
        [System.Drawing.Bitmap]$Bitmap,
        [System.Drawing.Rectangle]$Region,
        [int]$PixelSize = 18
    )

    $safeX = [Math]::Max(0, $Region.X)
    $safeY = [Math]::Max(0, $Region.Y)
    $safeW = [Math]::Min($Region.Width, $Bitmap.Width - $safeX)
    $safeH = [Math]::Min($Region.Height, $Bitmap.Height - $safeY)
    if ($safeW -le 0 -or $safeH -le 0) { return }

    $smallW = [Math]::Max(4, [int]($safeW / $PixelSize))
    $smallH = [Math]::Max(4, [int]($safeH / $PixelSize))
    $small = New-Object System.Drawing.Bitmap($smallW, $smallH)
    $smallGraphics = [System.Drawing.Graphics]::FromImage($small)
    $smallGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::Low
    $smallGraphics.DrawImage(
        $Bitmap,
        (New-Object System.Drawing.Rectangle(0, 0, $smallW, $smallH)),
        (New-Object System.Drawing.Rectangle($safeX, $safeY, $safeW, $safeH)),
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $smallGraphics.Dispose()

    $graphics = [System.Drawing.Graphics]::FromImage($Bitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
    $graphics.DrawImage(
        $small,
        (New-Object System.Drawing.Rectangle($safeX, $safeY, $safeW, $safeH)),
        (New-Object System.Drawing.Rectangle(0, 0, $smallW, $smallH)),
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $graphics.Dispose()
    $small.Dispose()
}

# Regions are intentionally generous. Each entry includes the visible person and any
# face repeated inside the phone result/preview.
$regions = @{
    1  = @((New-Object System.Drawing.Rectangle(285, 0, 330, 290)))
    2  = @((New-Object System.Drawing.Rectangle(430, 0, 340, 295)))
    3  = @((New-Object System.Drawing.Rectangle(430, 0, 340, 295)))
    4  = @((New-Object System.Drawing.Rectangle(450, 0, 350, 300)))
    5  = @((New-Object System.Drawing.Rectangle(430, 0, 350, 300)))
    6  = @((New-Object System.Drawing.Rectangle(390, 115, 250, 250)))
    7  = @(
        (New-Object System.Drawing.Rectangle(455, 0, 350, 300)),
        (New-Object System.Drawing.Rectangle(275, 330, 150, 150))
    )
    8  = @(
        (New-Object System.Drawing.Rectangle(455, 0, 350, 300)),
        (New-Object System.Drawing.Rectangle(275, 330, 150, 150))
    )
    9  = @((New-Object System.Drawing.Rectangle(385, 0, 340, 300)))
    10 = @(
        (New-Object System.Drawing.Rectangle(455, 0, 350, 300)),
        (New-Object System.Drawing.Rectangle(190, 350, 135, 135))
    )
    11 = @(
        (New-Object System.Drawing.Rectangle(440, 0, 350, 300)),
        (New-Object System.Drawing.Rectangle(190, 350, 135, 135))
    )
}

1..11 | ForEach-Object {
    $source = Join-Path $SourceRoot "flow-$_.jpg"
    $destination = Join-Path $OutputRoot "flow-$_.jpg"
    $bitmap = New-Object System.Drawing.Bitmap($source)
    foreach ($region in $regions[$_]) {
        Pixelate-Region -Bitmap $bitmap -Region $region
    }
    $bitmap.Save($destination, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bitmap.Dispose()
}

Get-ChildItem -LiteralPath $OutputRoot -Filter "*.jpg" |
    Sort-Object Name |
    Select-Object Name, Length
