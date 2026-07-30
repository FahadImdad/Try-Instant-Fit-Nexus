Add-Type -AssemblyName System.Drawing

$root = $PSScriptRoot
$frames = Join-Path $root "frames"
$masterPath = Join-Path $root "phone-master.png"
$uiRoot = Join-Path $root "..\complete-frame-flow-v4\private-phone-flow"
$logoPath = Join-Path $root "..\assets\live-site\logo.png"

# The phone in phone-master.png is straight-on. These coordinates are the
# display area inside its real black bezel.
$destination = New-Object System.Drawing.Rectangle(397, 632, 170, 352)

$steps = @(
    @{ Name = "03-real-product-screen.png"; Source = "flow-4.jpg"; Crop = @(178,245,214,492) },
    @{ Name = "04-real-add-photo-screen.png"; Source = "flow-5.jpg"; Crop = @(178,263,234,506) },
    @{ Name = "05-real-photo-ready-screen.png"; Source = "flow-7.jpg"; Crop = @(142,174,212,517) },
    @{ Name = "06-real-tap-try-on-screen.png"; Source = "flow-8.jpg"; Crop = @(142,174,212,517) },
    @{ Name = "07-real-processing-screen.png"; Source = "flow-9.jpg"; Crop = @(162,192,174,362) },
    @{ Name = "08-real-result-screen.png"; Source = "flow-10.jpg"; Crop = @(142,173,212,518) }
)

foreach ($step in $steps) {
    $master = New-Object System.Drawing.Bitmap($masterPath)
    $source = New-Object System.Drawing.Bitmap((Join-Path $uiRoot $step.Source))
    $graphics = [System.Drawing.Graphics]::FromImage($master)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $sourceRect = New-Object System.Drawing.Rectangle(
        $step.Crop[0],
        $step.Crop[1],
        $step.Crop[2],
        $step.Crop[3]
    )
    $graphics.DrawImage(
        $source,
        $destination,
        $sourceRect,
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $graphics.Dispose()
    $source.Dispose()
    $master.Save((Join-Path $frames $step.Name), [System.Drawing.Imaging.ImageFormat]::Png)
    $master.Dispose()
}

# Exact-logo CTA.
$cta = New-Object System.Drawing.Bitmap(1080, 1920)
$g = [System.Drawing.Graphics]::FromImage($cta)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$navy = [System.Drawing.Color]::FromArgb(7,20,50)
$cyan = [System.Drawing.Color]::FromArgb(0,211,255)
$white = [System.Drawing.Color]::FromArgb(248,246,240)
$muted = [System.Drawing.Color]::FromArgb(188,202,220)
$g.Clear($navy)

$cyanBrush = New-Object System.Drawing.SolidBrush($cyan)
$whiteBrush = New-Object System.Drawing.SolidBrush($white)
$mutedBrush = New-Object System.Drawing.SolidBrush($muted)
$g.FillRectangle($cyanBrush, 90, 190, 120, 8)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoW = 560
$logoH = [int]($logo.Height * ($logoW / $logo.Width))
$g.DrawImage($logo, 90, 290, $logoW, $logoH)
$logo.Dispose()

$headline = New-Object System.Drawing.Font("Arial", 54, [System.Drawing.FontStyle]::Bold)
$body = New-Object System.Drawing.Font("Arial", 30, [System.Drawing.FontStyle]::Regular)
$buttonFont = New-Object System.Drawing.Font("Arial", 29, [System.Drawing.FontStyle]::Bold)
$small = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Regular)

$g.DrawString("BRING VIRTUAL TRY-ON", $headline, $whiteBrush, 90, 700)
$g.DrawString("INSIDE YOUR STORE.", $headline, $whiteBrush, 90, 790)
$g.DrawString("One QR scan. A more confident customer.", $body, $mutedBrush, 94, 955)
$g.FillRectangle($cyanBrush, 90, 1110, 900, 105)
$buttonText = "FASHION STORES - DM DEMO"
$measure = $g.MeasureString($buttonText, $buttonFont)
$darkBrush = New-Object System.Drawing.SolidBrush($navy)
$g.DrawString($buttonText, $buttonFont, $darkBrush, 540 - ($measure.Width / 2), 1137)
$g.DrawString("tryinstantfit.com", $small, $mutedBrush, 90, 1325)

$cta.Save((Join-Path $frames "11-brand-cta.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$cta.Dispose()
$cyanBrush.Dispose()
$whiteBrush.Dispose()
$mutedBrush.Dispose()
$darkBrush.Dispose()
$headline.Dispose()
$body.Dispose()
$buttonFont.Dispose()
$small.Dispose()

# Contact sheet.
$paths = Get-ChildItem -LiteralPath $frames -Filter "*.png" | Sort-Object Name
$thumbW = 216
$thumbH = 384
$gap = 16
$cols = 4
$rows = 3
$sheet = New-Object System.Drawing.Bitmap((($thumbW + $gap) * $cols + $gap), (($thumbH + $gap) * $rows + $gap))
$sg = [System.Drawing.Graphics]::FromImage($sheet)
$sg.Clear($navy)
$sg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
for ($i = 0; $i -lt $paths.Count; $i++) {
    $image = [System.Drawing.Image]::FromFile($paths[$i].FullName)
    $x = $gap + (($i % $cols) * ($thumbW + $gap))
    $y = $gap + ([Math]::Floor($i / $cols) * ($thumbH + $gap))
    $sg.DrawImage($image, $x, $y, $thumbW, $thumbH)
    $image.Dispose()
}
$sg.Dispose()
$sheet.Save((Join-Path $root "contact-sheet.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$sheet.Dispose()

Get-ChildItem -LiteralPath $frames -Filter "*.png" | Sort-Object Name | Select-Object Name, Length
