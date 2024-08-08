'use strict'

// Initialize the canvas and event listeners
function createCanvas() {
  let memeData = getMemeData()
  memeData.elCanvas = document.querySelector('.canvas')
  memeData.canvas = memeData.elCanvas.getContext('2d')
  drawTextOnCanvas()
  addEventListeners()
}

// Update the base image on the canvas
function updateBaseImage(baseImage, imgSize = null, imgID) {
  let memeData = getMemeData()

  toggleCanvas()

  memeData.baseImage = baseImage
  memeData.imgDataUrl = baseImage.src

  if (imgSize.width === undefined) {
    memeData.imageSize = { width: baseImage.width, height: baseImage.height }
    memeData.imgID = generateUniqueId()
  } else {
    memeData.imageSize = imgSize
    memeData.imgID = imgID
  }

  memeData.imgSource = memeData.elCanvas.toDataURL()
  setImageOnCanvas()
}

// Set the image on the canvas with proper scaling
function setImageOnCanvas() {
  let memeData = getMemeData()

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const imgWidth = memeData.imageSize.width
  const imgHeight = memeData.imageSize.height

  const imageRatio = imgWidth / imgHeight

  const maxCanvasWidth = screenWidth
  const maxCanvasHeight = screenHeight

  let newWidth, newHeight

  if (imgWidth > imgHeight) {
    newWidth = Math.min(maxCanvasWidth, imgWidth)
    newHeight = newWidth / imageRatio
  } else {
    newHeight = Math.min(maxCanvasHeight, imgHeight)
    newWidth = newHeight * imageRatio
  }

  if (newWidth > maxCanvasWidth) {
    newWidth = maxCanvasWidth
    newHeight = newWidth / imageRatio
  }
  if (newHeight > maxCanvasHeight) {
    newHeight = maxCanvasHeight
    newWidth = newHeight * imageRatio
  }

  memeData.elCanvas.width = newWidth
  memeData.elCanvas.height = newHeight

  memeData.imageSize = { width: newWidth, height: newHeight }

  let img = new Image()
  img.src = memeData.imgDataUrl

  img.onload = () => {
    memeData.canvas.clearRect(0, 0, newWidth, newHeight)
    memeData.canvas.drawImage(img, 0, 0, newWidth, newHeight)
    drawTextOnCanvas()
  }

  memeData.baseImage = img
}

// Draw diagonal lines on the canvas (for debugging or effects)
function drawDiagonalLines(elCanvas, width, height) {
  const lineSpacing = 20
  elCanvas.strokeStyle = '#ccc'
  elCanvas.lineWidth = 1

  for (let i = -height; i < width; i += lineSpacing) {
    elCanvas.beginPath()
    elCanvas.moveTo(i, 0)
    elCanvas.lineTo(i + height, height)
    elCanvas.stroke()
  }

  for (let i = 0; i < width + height; i += lineSpacing) {
    elCanvas.beginPath()
    elCanvas.moveTo(i, height)
    elCanvas.lineTo(i - height, 0)
    elCanvas.stroke()
  }
}

// Draw text on the canvas, optionally hiding the selection box
function drawTextOnCanvas(hideSelection = false) {
  const memeData = getMemeData()
  const elCanvas = memeData.canvas

  elCanvas.clearRect(0, 0, memeData.elCanvas.width, memeData.elCanvas.height)

  if (memeData.baseImage) {
    elCanvas.drawImage(memeData.baseImage, 0, 0, memeData.elCanvas.width, memeData.elCanvas.height)
  }

  memeData.imgLines.forEach((line, index) => {
    drawTextLine(elCanvas, line, index, memeData.lineInChange, hideSelection)
  })

  memeData.imgSource = memeData.elCanvas.toDataURL()
}

// Draw a single line of text on the canvas
function drawTextLine(elCanvas, line, index, lineInChange, hideSelection = false) {
  elCanvas.save()

  const styleText = getTextStyle(line)
  elCanvas.font = styleText
  elCanvas.globalAlpha = line.opacity
  elCanvas.textAlign = 'center'
  elCanvas.textBaseline = 'middle'

  if (line.backgroundColor && line.backgroundColor !== 'transparent') {
    drawBackground(elCanvas, line)
  }

  elCanvas.fillStyle = line.colorText
  elCanvas.translate(line.posText.x, line.posText.y)
  elCanvas.rotate((line.angleSin * Math.PI) / 180)
  elCanvas.translate(-line.posText.x, -line.posText.y)

  if (index === lineInChange && !hideSelection) {
    drawSelectionBox(elCanvas, line)
  }

  elCanvas.fillText(line.text, line.posText.x, line.posText.y)

  if (line.isBottomLine) {
    drawUnderline(elCanvas, line)
  }

  elCanvas.restore()
}

// Get the CSS font style for a line of text
function getTextStyle(line) {
  return `${line.isBold ? 'bold' : 'normal'} ${line.isInclined ? 'italic' : 'normal'} ${line.sizeText}px ${line.styleText}`
}

// Draw a selection box around the text line
function drawSelectionBox(elCanvas, line) {
  elCanvas.save()

  elCanvas.font = getTextStyle(line)

  const textWidth = elCanvas.measureText(line.text).width
  const textHeight = line.sizeText * 1.2

  const rectX = line.posText.x - textWidth / 2 - 5
  const rectY = line.posText.y - textHeight / 2 - 5
  const rectWidth = textWidth + 10
  const rectHeight = textHeight + 10

  elCanvas.setLineDash([5, 5])
  elCanvas.strokeStyle = 'white'
  elCanvas.lineWidth = 2
  elCanvas.strokeRect(rectX, rectY, rectWidth, rectHeight)

  elCanvas.restore()
}

// Draw an underline beneath the text line
function drawUnderline(elCanvas, line) {
  const textWidth = elCanvas.measureText(line.text).width
  const startX = line.posText.x - textWidth / 2
  const endX = line.posText.x + textWidth / 2
  const underlineY = line.posText.y + line.sizeText / 4 + 15
  elCanvas.beginPath()
  elCanvas.moveTo(startX, underlineY)
  elCanvas.lineTo(endX, underlineY)
  elCanvas.lineWidth = 2
  elCanvas.strokeStyle = line.colorText
  elCanvas.stroke()
}

// Draw a background rectangle behind the text line
function drawBackground(elCanvas, line) {
  elCanvas.save()

  elCanvas.font = getTextStyle(line)

  const textWidth = elCanvas.measureText(line.text).width
  const textHeight = line.sizeText * 1.2

  const rectX = line.posText.x - textWidth / 2 - 5
  const rectY = line.posText.y - textHeight / 2 - 5
  const rectWidth = textWidth + 10
  const rectHeight = textHeight + 10

  elCanvas.fillStyle = line.backgroundColor
  elCanvas.fillRect(rectX, rectY, rectWidth, rectHeight)

  elCanvas.restore()
}
