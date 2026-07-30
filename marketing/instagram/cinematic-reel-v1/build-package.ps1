Add-Type -AssemblyName System.Drawing

$root = $PSScriptRoot
$frames = Join-Path $root "frames"
$logoPath = Join-Path $root "..\assets\live-site\logo.png"
$ctaPath = Join-Path $frames "18-brand-cta.png"

$canvas = New-Object System.Drawing.Bitmap(1080, 1920)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(7, 20, 50))

$cyan = [System.Drawing.Color]::FromArgb(0, 211, 255)
$white = [System.Drawing.Color]::FromArgb(248, 246, 240)
$muted = [System.Drawing.Color]::FromArgb(191, 204, 221)
$accentBrush = New-Object System.Drawing.SolidBrush($cyan)
$whiteBrush = New-Object System.Drawing.SolidBrush($white)
$mutedBrush = New-Object System.Drawing.SolidBrush($muted)

$graphics.FillRectangle($accentBrush, 90, 190, 115, 8)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$logoWidth = 540
$logoHeight = [int]($logo.Height * ($logoWidth / $logo.Width))
$graphics.DrawImage($logo, 90, 280, $logoWidth, $logoHeight)
$logo.Dispose()

$fontFamily = "Arial"
$headline = New-Object System.Drawing.Font($fontFamily, 70, [System.Drawing.FontStyle]::Bold)
$subhead = New-Object System.Drawing.Font($fontFamily, 30, [System.Drawing.FontStyle]::Regular)
$buttonFont = New-Object System.Drawing.Font($fontFamily, 30, [System.Drawing.FontStyle]::Bold)
$small = New-Object System.Drawing.Font($fontFamily, 24, [System.Drawing.FontStyle]::Regular)

$graphics.DrawString("TRY IT HERE.", $headline, $whiteBrush, 90, 690)
$graphics.DrawString("TRY IT ANYWHERE.", $headline, $whiteBrush, 90, 785)
$graphics.DrawString("In-store QR + online links for fashion sellers.", $subhead, $mutedBrush, 94, 950)

$buttonRect = New-Object System.Drawing.RectangleF(90, 1110, 900, 105)
$buttonPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$radius = 28
$buttonPath.AddArc($buttonRect.X, $buttonRect.Y, $radius, $radius, 180, 90)
$buttonPath.AddArc($buttonRect.Right - $radius, $buttonRect.Y, $radius, $radius, 270, 90)
$buttonPath.AddArc($buttonRect.Right - $radius, $buttonRect.Bottom - $radius, $radius, $radius, 0, 90)
$buttonPath.AddArc($buttonRect.X, $buttonRect.Bottom - $radius, $radius, $radius, 90, 90)
$buttonPath.CloseFigure()
$graphics.FillPath($accentBrush, $buttonPath)
$buttonText = "FASHION BRANDS - DM DEMO"
$measure = $graphics.MeasureString($buttonText, $buttonFont)
$graphics.DrawString($buttonText, $buttonFont, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(7,20,50))), 540 - ($measure.Width / 2), 1137)

$graphics.DrawString("tryinstantfit.com", $small, $mutedBrush, 90, 1325)
$graphics.DrawString("No app needed. Works on the customer's phone.", $small, $mutedBrush, 90, 1380)

$canvas.Save($ctaPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$canvas.Dispose()
$headline.Dispose()
$subhead.Dispose()
$buttonFont.Dispose()
$small.Dispose()
$accentBrush.Dispose()
$whiteBrush.Dispose()
$mutedBrush.Dispose()
$buttonPath.Dispose()

# Contact sheet
$paths = Get-ChildItem -LiteralPath $frames -Filter "*.png" | Sort-Object Name
$thumbW = 180
$thumbH = 320
$gap = 14
$cols = 6
$rows = 3
$sheet = New-Object System.Drawing.Bitmap((($thumbW + $gap) * $cols + $gap), (($thumbH + $gap) * $rows + $gap))
$sg = [System.Drawing.Graphics]::FromImage($sheet)
$sg.Clear([System.Drawing.Color]::FromArgb(7, 20, 50))
$sg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
for ($i = 0; $i -lt $paths.Count; $i++) {
    $img = [System.Drawing.Image]::FromFile($paths[$i].FullName)
    $x = $gap + (($i % $cols) * ($thumbW + $gap))
    $y = $gap + ([Math]::Floor($i / $cols) * ($thumbH + $gap))
    $sg.DrawImage($img, $x, $y, $thumbW, $thumbH)
    $img.Dispose()
}
$sg.Dispose()
$sheet.Save((Join-Path $root "contact-sheet.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$sheet.Dispose()

Get-ChildItem -LiteralPath $frames -Filter "*.png" | Sort-Object Name | Select-Object Name, Length
