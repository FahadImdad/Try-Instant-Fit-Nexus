Add-Type -AssemblyName System.Drawing

$root = $PSScriptRoot
$frames = Join-Path $root "frames"
$masterPath = Join-Path $root "phone-master.png"
$uiRoot = Join-Path $root "..\complete-frame-flow-v4\private-phone-flow"
$logoPath = Join-Path $root "..\assets\live-site\logo_dark.png"
$beforePath = Join-Path $root "customer-before.png"
$productPath = Join-Path $root "sage-product.png"
$frontResultPath = Join-Path $root "front-facing-try-on-result.png"

# The usable display is slightly narrower than the outer glass. Keeping the
# composite inside this measured area prevents rectangular spill over the bezel.
$destination = New-Object System.Drawing.Rectangle(400, 636, 154, 338)

$steps = @(
    @{ Name = "03-real-product-screen.png"; Source = "flow-4.jpg"; Crop = @(178,245,214,492) },
    @{ Name = "04-real-add-photo-screen.png"; Source = "flow-5.jpg"; Crop = @(178,263,234,506) },
    @{ Name = "05-real-photo-ready-screen.png"; Source = "flow-7.jpg"; Crop = @(142,174,212,517) },
    @{ Name = "06-real-tap-try-on-screen.png"; Source = "flow-8.jpg"; Crop = @(142,174,212,517) },
    @{ Name = "07-real-processing-screen.png"; Source = "flow-9.jpg"; Crop = @(162,192,174,362) },
    @{ Name = "08-real-result-screen.png"; Source = "flow-10.jpg"; Crop = @(142,173,212,518) }
)

function Draw-CoverImage {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$Image,
        [System.Drawing.Rectangle]$Target
    )
    $sourceRatio = $Image.Width / $Image.Height
    $targetRatio = $Target.Width / $Target.Height
    if ($sourceRatio -gt $targetRatio) {
        $cropHeight = $Image.Height
        $cropWidth = [int]($cropHeight * $targetRatio)
        $cropX = [int](($Image.Width - $cropWidth) / 2)
        $cropY = 0
    } else {
        $cropWidth = $Image.Width
        $cropHeight = [int]($cropWidth / $targetRatio)
        $cropX = 0
        $cropY = [int](($Image.Height - $cropHeight) / 2)
    }
    $sourceRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)
    $Graphics.DrawImage($Image, $Target, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
}

function New-RoundedRectanglePath {
    param(
        [System.Drawing.Rectangle]$Rectangle,
        [int]$Radius
    )
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $Radius * 2
    $arc = New-Object System.Drawing.Rectangle($Rectangle.X, $Rectangle.Y, $diameter, $diameter)
    $path.AddArc($arc, 180, 90)
    $arc.X = $Rectangle.Right - $diameter
    $path.AddArc($arc, 270, 90)
    $arc.Y = $Rectangle.Bottom - $diameter
    $path.AddArc($arc, 0, 90)
    $arc.X = $Rectangle.X
    $path.AddArc($arc, 90, 90)
    $path.CloseFigure()
    return $path
}

function New-CleanUiScreen {
    param([string]$State)
    $ui = New-Object System.Drawing.Bitmap(360, 790)
    $g = [System.Drawing.Graphics]::FromImage($ui)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $navyUi = [System.Drawing.Color]::FromArgb(7,20,50)
    $g.Clear($navyUi)
    $whiteUi = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $darkUi = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(16,24,40))
    $mutedUi = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(71,84,103))
    $cyanUi = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(16,200,239))
    $brandFont = New-Object System.Drawing.Font("Arial", 20, [System.Drawing.FontStyle]::Bold)
    $titleFont = New-Object System.Drawing.Font("Times New Roman", 14, [System.Drawing.FontStyle]::Bold)
    $headingFont = New-Object System.Drawing.Font("Times New Roman", 18, [System.Drawing.FontStyle]::Bold)
    $bodyFont = New-Object System.Drawing.Font("Times New Roman", 11, [System.Drawing.FontStyle]::Regular)
    $smallFont = New-Object System.Drawing.Font("Times New Roman", 9, [System.Drawing.FontStyle]::Bold)
    $priceFont = New-Object System.Drawing.Font("Times New Roman", 13, [System.Drawing.FontStyle]::Bold)
    $icon = [System.Drawing.Image]::FromFile((Join-Path $root "..\assets\live-site\website-icon.png"))
    $g.DrawImage($icon, 66, 55, 38, 38)
    $g.DrawString("Try Instant", $brandFont, $whiteUi, 112, 61)
    $g.DrawString("Fit", $brandFont, $cyanUi, 258, 61)
    $icon.Dispose()

    if ($State -eq "processing") {
        $penTrack = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70,255,255,255), 8)
        $penSpin = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(16,200,239), 8)
        $g.DrawEllipse($penTrack, 141, 285, 78, 78)
        $g.DrawArc($penSpin, 141, 285, 78, 78, -90, 115)
        $g.DrawString("Generating your try-on...", $headingFont, $whiteUi, 68, 400)
        $g.DrawString("This usually takes 5-15 seconds.", $bodyFont, $whiteUi, 87, 445)
        $penTrack.Dispose(); $penSpin.Dispose()
    } else {
        $cardRect = New-Object System.Drawing.Rectangle(18, 125, 324, 590)
        $cardPath = New-RoundedRectanglePath -Rectangle $cardRect -Radius 24
        $g.FillPath($whiteUi, $cardPath)
        $product = [System.Drawing.Image]::FromFile($productPath)
        Draw-CoverImage -Graphics $g -Image $product -Target (New-Object System.Drawing.Rectangle(38, 148, 78, 92))
        $product.Dispose()
        $g.DrawString("Sage Green Embroidered", $titleFont, $darkUi, 122, 145)
        $g.DrawString("Formal Suit", $titleFont, $darkUi, 122, 166)
        $g.DrawString("Pakistani formalwear", $bodyFont, $darkUi, 122, 190)
        $g.DrawString("Rs 8,000", $priceFont, $darkUi, 122, 211)
        $g.DrawString("2 TRIES LEFT ON YOUR CODE", $smallFont, $mutedUi, 112, 255)

        if ($State -eq "upload") {
            $g.DrawString("Add Your Photo", $headingFont, $darkUi, 111, 315)
            $help = "Stand against a plain background, full body,`nfacing forward - best results."
            $g.DrawString($help, $bodyFont, $darkUi, 58, 354)
            $choicePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(208,213,221), 2)
            $g.DrawRectangle($choicePen, 43, 440, 125, 125)
            $g.DrawRectangle($choicePen, 192, 440, 125, 125)
            $g.DrawEllipse($choicePen, 88, 464, 34, 28)
            $g.FillRectangle($cyanUi, 238, 460, 34, 34)
            $g.DrawString("Take Photo", $smallFont, $darkUi, 72, 510)
            $g.DrawString("Use camera", $bodyFont, $mutedUi, 75, 535)
            $g.DrawString("Upload", $smallFont, $darkUi, 235, 510)
            $g.DrawString("From gallery", $bodyFont, $mutedUi, 221, 535)
            $choicePen.Dispose()
        } else {
            $label = if ($State -eq "result") { "Your Result" } else { "Your Photo" }
            $g.DrawString($label, $titleFont, $darkUi, 38, 288)
            $photo = if ($State -eq "result") { [System.Drawing.Image]::FromFile($frontResultPath) } else { [System.Drawing.Image]::FromFile($beforePath) }
            $g.DrawImage($photo, 90, 320, 180, 320)
            $photo.Dispose()
            if ($State -eq "ready") {
                $gradient = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
                    (New-Object System.Drawing.Rectangle(38, 652, 284, 45)),
                    [System.Drawing.Color]::FromArgb(76,92,246),
                    [System.Drawing.Color]::FromArgb(16,200,239),
                    [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
                )
                $g.FillRectangle($gradient, 38, 652, 284, 45)
                $g.DrawString("Try It On ->", $bodyFont, $whiteUi, 143, 667)
                $gradient.Dispose()
            }
        }
        $cardPath.Dispose()
    }
    $g.Dispose()
    $whiteUi.Dispose(); $darkUi.Dispose(); $mutedUi.Dispose(); $cyanUi.Dispose()
    $brandFont.Dispose(); $titleFont.Dispose(); $headingFont.Dispose(); $bodyFont.Dispose(); $smallFont.Dispose(); $priceFont.Dispose()
    return $ui
}

foreach ($step in $steps) {
    $master = New-Object System.Drawing.Bitmap($masterPath)
    $uiState = if ($step.Name -in @("03-real-product-screen.png", "04-real-add-photo-screen.png")) { "upload" } elseif ($step.Name -in @("05-real-photo-ready-screen.png", "06-real-tap-try-on-screen.png")) { "ready" } elseif ($step.Name -eq "07-real-processing-screen.png") { "processing" } else { "result" }
    # Start from the genuine UI pixels in the approved phone-flow screenshots.
    $sourceUi = New-Object System.Drawing.Bitmap((Join-Path $uiRoot $step.Source))
    $cleanUi = New-Object System.Drawing.Bitmap(360, 790)
    $uiGraphics = [System.Drawing.Graphics]::FromImage($cleanUi)
    $uiGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $sourceRect = New-Object System.Drawing.Rectangle($step.Crop[0], $step.Crop[1], $step.Crop[2], $step.Crop[3])
    $uiGraphics.DrawImage($sourceUi, (New-Object System.Drawing.Rectangle(0, 0, 360, 790)), $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
    $sourceUi.Dispose()

    # Replace only the product data block; all surrounding UI remains genuine.
    if ($uiState -ne "processing") {
        $patchBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(16,24,40))
        $mutedBrushUi = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(71,84,103))
        $uiGraphics.FillRectangle($patchBrush, 34, 132, 292, 150)
        $productUi = [System.Drawing.Image]::FromFile($productPath)
        $uiGraphics.DrawImage($productUi, 42, 143, 76, 105)
        $productUi.Dispose()
        $nameUiFont = New-Object System.Drawing.Font("Times New Roman", 14, [System.Drawing.FontStyle]::Bold)
        $metaUiFont = New-Object System.Drawing.Font("Times New Roman", 11, [System.Drawing.FontStyle]::Regular)
        $priceUiFont = New-Object System.Drawing.Font("Times New Roman", 13, [System.Drawing.FontStyle]::Bold)
        $triesUiFont = New-Object System.Drawing.Font("Times New Roman", 9, [System.Drawing.FontStyle]::Bold)
        $uiGraphics.DrawString("Sage Green Embroidered", $nameUiFont, $textBrush, 126, 143)
        $uiGraphics.DrawString("Formal Suit", $nameUiFont, $textBrush, 126, 165)
        $uiGraphics.DrawString("Pakistani formalwear", $metaUiFont, $textBrush, 126, 190)
        $uiGraphics.DrawString("Rs 8,000", $priceUiFont, $textBrush, 126, 213)
        $uiGraphics.DrawString("2 TRIES LEFT ON YOUR CODE", $triesUiFont, $mutedBrushUi, 112, 258)
        $patchBrush.Dispose(); $textBrush.Dispose(); $mutedBrushUi.Dispose()
        $nameUiFont.Dispose(); $metaUiFont.Dispose(); $priceUiFont.Dispose(); $triesUiFont.Dispose()
    }
    if ($uiState -in @("ready", "result")) {
        $photoPatch = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $photoLabelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(16,24,40))
        $photoLabelFont = New-Object System.Drawing.Font("Times New Roman", 14, [System.Drawing.FontStyle]::Bold)
        $uiGraphics.FillRectangle($photoPatch, 34, 286, 292, 360)
        $photoLabel = if ($uiState -eq "result") { "Your Result" } else { "Your Photo" }
        $uiGraphics.DrawString($photoLabel, $photoLabelFont, $photoLabelBrush, 38, 290)
        $photoUi = if ($uiState -eq "result") { [System.Drawing.Image]::FromFile($frontResultPath) } else { [System.Drawing.Image]::FromFile($beforePath) }
        $uiGraphics.DrawImage($photoUi, 90, 322, 180, 320)
        $photoUi.Dispose()
        $photoPatch.Dispose(); $photoLabelBrush.Dispose(); $photoLabelFont.Dispose()
    }
    $uiGraphics.Dispose()
    # Reject the provisional shared-coordinate extraction above: the authentic
    # source screenshots use different UI offsets per state. Keep the verified
    # clean render until each state has its own measured extraction geometry.
    $cleanUi.Dispose()
    $cleanUi = New-CleanUiScreen -State $uiState

    # Phone interaction frames use a genuine optical close-up so the authentic
    # UI is large enough to verify in a vertical Reel.
    $final = New-Object System.Drawing.Bitmap(1080, 1920)
    $finalGraphics = [System.Drawing.Graphics]::FromImage($final)
    $finalGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $phoneCloseUp = New-Object System.Drawing.Rectangle(235, 430, 470, 836)
    $finalGraphics.DrawImage(
        $master,
        (New-Object System.Drawing.Rectangle(0, 0, 1080, 1920)),
        $phoneCloseUp,
        [System.Drawing.GraphicsUnit]::Pixel
    )

    # Composite the clean UI only once at final delivery resolution. This avoids
    # the old downscale-then-upscale cycle that damaged letters and icons.
    $finalScreen = New-Object System.Drawing.Rectangle(379, 473, 354, 776)
    $finalMask = New-RoundedRectanglePath -Rectangle $finalScreen -Radius 39
    $finalGraphics.SetClip($finalMask)
    $finalGraphics.DrawImage($cleanUi, $finalScreen)
    $finalGraphics.ResetClip()
    $finalMask.Dispose()
    $cleanUi.Dispose()
    $finalGraphics.Dispose()
    $final.Save((Join-Path $frames $step.Name), [System.Drawing.Imaging.ImageFormat]::Png)
    $final.Dispose()
    $master.Dispose()
}

# The full-screen reveal must match the verified front-facing phone result.
$frontReveal = New-Object System.Drawing.Bitmap($frontResultPath)
$frontRevealFrame = New-Object System.Drawing.Bitmap(1080, 1920)
$frontRevealGraphics = [System.Drawing.Graphics]::FromImage($frontRevealFrame)
$frontRevealGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$frontRevealGraphics.DrawImage($frontReveal, 0, 0, 1080, 1920)
$frontRevealGraphics.Dispose()
$frontReveal.Dispose()
$frontRevealFrame.Save((Join-Path $frames "09-virtual-result-full.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$frontRevealFrame.Dispose()

# Normalize the non-phone cinematic frames to the exact Reel delivery size.
foreach ($sceneName in @(
    "01-discover-outfit.png",
    "02-scan-qr.png",
    "09-virtual-result-full.png",
    "10-confident-checkout.png"
)) {
    $scenePath = Join-Path $frames $sceneName
    $scene = New-Object System.Drawing.Bitmap($scenePath)
    if ($scene.Width -ne 1080 -or $scene.Height -ne 1920) {
        $normalized = New-Object System.Drawing.Bitmap(1080, 1920)
        $ng = [System.Drawing.Graphics]::FromImage($normalized)
        $ng.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $ng.DrawImage($scene, 0, 0, 1080, 1920)
        $ng.Dispose()
        $scene.Dispose()
        $normalized.Save($scenePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $normalized.Dispose()
    } else {
        $scene.Dispose()
    }
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

# High-resolution labeled approval board for visual verification.
$approvalLabels = @(
    "01  DISCOVER OUTFIT",
    "02  SCAN IN-STORE QR",
    "03  REAL PRODUCT SCREEN",
    "04  REAL ADD PHOTO SCREEN",
    "05  REAL PHOTO READY",
    "06  REAL TRY IT ON ACTION",
    "07  REAL PROCESSING SCREEN",
    "08  REAL FRONT-FACING RESULT",
    "09  FULL OUTFIT REVEAL",
    "10  CONFIDENT CHECKOUT",
    "11  BRAND CTA"
)
$approvalW = 1440
$approvalH = 3560
$cardW = 420
$imageH = 747
$labelH = 64
$approvalGap = 30
$approvalTop = 170
$approval = New-Object System.Drawing.Bitmap($approvalW, $approvalH)
$ag = [System.Drawing.Graphics]::FromImage($approval)
$ag.Clear($navy)
$ag.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$ag.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$approvalCyanBrush = New-Object System.Drawing.SolidBrush($cyan)
$approvalWhiteBrush = New-Object System.Drawing.SolidBrush($white)
$approvalMutedBrush = New-Object System.Drawing.SolidBrush($muted)
$approvalTitleFont = New-Object System.Drawing.Font("Arial", 38, [System.Drawing.FontStyle]::Bold)
$approvalSubFont = New-Object System.Drawing.Font("Arial", 20, [System.Drawing.FontStyle]::Regular)
$approvalLabelFont = New-Object System.Drawing.Font("Arial", 17, [System.Drawing.FontStyle]::Bold)
$ag.DrawString("VIDEO 1 - IN-STORE QR", $approvalTitleFont, $approvalWhiteBrush, 60, 38)
$ag.DrawString("11-frame approval board | Real Try Instant Fit UI preserved", $approvalSubFont, $approvalMutedBrush, 62, 100)

for ($i = 0; $i -lt $paths.Count; $i++) {
    $col = $i % 3
    $row = [Math]::Floor($i / 3)
    $x = 60 + ($col * ($cardW + $approvalGap))
    $y = $approvalTop + ($row * ($imageH + $labelH + $approvalGap))
    $image = [System.Drawing.Image]::FromFile($paths[$i].FullName)
    $ag.DrawImage($image, $x, $y, $cardW, $imageH)
    $image.Dispose()
    $ag.FillRectangle($approvalCyanBrush, $x, $y + $imageH, $cardW, 5)
    $ag.DrawString($approvalLabels[$i], $approvalLabelFont, $approvalWhiteBrush, $x + 8, $y + $imageH + 15)
}

$ag.Dispose()
$approval.Save((Join-Path $root "approval-contact-sheet.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$approval.Dispose()
$approvalTitleFont.Dispose()
$approvalSubFont.Dispose()
$approvalLabelFont.Dispose()
$approvalCyanBrush.Dispose()
$approvalWhiteBrush.Dispose()
$approvalMutedBrush.Dispose()

Get-ChildItem -LiteralPath $frames -Filter "*.png" | Sort-Object Name | Select-Object Name, Length
