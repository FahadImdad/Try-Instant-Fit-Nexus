Add-Type -AssemblyName System.Drawing

$root = $PSScriptRoot
$framePaths = Get-ChildItem -LiteralPath (Join-Path $root "frames") -Filter "*.png" |
    Sort-Object Name |
    Select-Object -ExpandProperty FullName

$thumbWidth = 270
$thumbHeight = 480
$gap = 20
$columns = 4
$rows = 3
$canvasWidth = ($columns * $thumbWidth) + (($columns + 1) * $gap)
$canvasHeight = ($rows * $thumbHeight) + (($rows + 1) * $gap)

$canvas = New-Object System.Drawing.Bitmap($canvasWidth, $canvasHeight)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.Clear([System.Drawing.Color]::FromArgb(7, 20, 50))
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

for ($index = 0; $index -lt $framePaths.Count; $index++) {
    $image = [System.Drawing.Image]::FromFile($framePaths[$index])
    $column = $index % $columns
    $row = [Math]::Floor($index / $columns)
    $x = $gap + ($column * ($thumbWidth + $gap))
    $y = $gap + ($row * ($thumbHeight + $gap))
    $graphics.DrawImage($image, $x, $y, $thumbWidth, $thumbHeight)
    $image.Dispose()
}

$graphics.Dispose()
$output = Join-Path $root "complete-flow-contact-sheet.jpg"
$canvas.Save($output, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$canvas.Dispose()

Get-Item -LiteralPath $output | Select-Object FullName, Length
