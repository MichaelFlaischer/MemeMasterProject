'use strict'

let isDragging = false

let gMemeData = {
  imgId: null,
  canvas: null,
  elCanvas: null,
  imageSize: null,
  baseImage: null,
  lineInChange: 0,
  imgLines: [
    {
      text: '',
      posText: { x: 0, y: 0 },
      sizeText: 60,
      colorText: '#000000',
      styleText: 'Impact',
      opacity: 1,
      isBold: false,
      isInclined: false,
      isBottomLine: false,
      angleSin: 1,
    },
  ],
}
function getMemeData() {
  return gMemeData
}

function createCanvas() {
  let memeData = getMemeData()
  memeData.elCanvas = document.querySelector('.canvas')
  memeData.canvas = memeData.elCanvas.getContext('2d')

  const screenWidth = window.innerWidth * 0.5
  const screenHeight = window.innerHeight * 0.5

  memeData.elCanvas.width = screenWidth
  memeData.elCanvas.height = screenHeight

  memeData.canvas.clearRect(0, 0, screenWidth, screenHeight)
  drawDiagonalLines(memeData.canvas, screenWidth, screenHeight)
  drawTextOnCanvas()
  addEventListeners()
}

function addEventListeners() {
  let memeData = getMemeData()
  memeData.elCanvas.addEventListener('mousedown', startDrawing)
  memeData.elCanvas.addEventListener('mouseup', stopDrawing)
  memeData.elCanvas.addEventListener('mousemove', drawOnMove)
  memeData.elCanvas.addEventListener('mouseleave', stopDrawing)
  memeData.elCanvas.addEventListener('touchstart', startDrawing)
  memeData.elCanvas.addEventListener('touchend', stopDrawing)
  memeData.elCanvas.addEventListener('touchmove', drawOnMove)
  memeData.elCanvas.addEventListener('touchcancel', stopDrawing)
}

function startDrawing(e) {
  let memeData = getMemeData()
  const rect = memeData.elCanvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  memeData.imgLines.forEach((line, index) => {
    const textWidth = memeData.canvas.measureText(line.text).width
    if (
      x >= line.posText.x - textWidth / 2 &&
      x <= line.posText.x + textWidth / 2 &&
      y >= line.posText.y - line.sizeText / 2 &&
      y <= line.posText.y + line.sizeText / 2
    ) {
      memeData.lineInChange = index
      updateControlPanel(line)
      isDragging = true
    }
  })
}

function stopDrawing(e) {
  if (isDragging) {
    isDragging = false
  }
}

function drawOnMove(e) {
  if (!isDragging) return

  let memeData = getMemeData()
  const rect = memeData.elCanvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const lineNumber = memeData.lineInChange
  memeData.imgLines[lineNumber].posText.x = x
  memeData.imgLines[lineNumber].posText.y = y

  drawTextOnCanvas()
}

function updateBaseImage(baseImage, imgSize = null, imgId) {
  let memeData = getMemeData()

  toggleCanvas()

  memeData.baseImage = baseImage

  if (imgSize.width === undefined) {
    memeData.imageSize = { width: baseImage.width, height: baseImage.height }
    memeData.imgId = generateUniqueId()
  } else {
    memeData.imageSize = imgSize
    memeData.imgId = imgId
  }

  console.log(memeData.imgId)
  setImageOnCanvas()
}

function setImageOnCanvas() {
  let memeData = getMemeData()

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const imgWidth = memeData.imageSize.width
  const imgHeight = memeData.imageSize.height

  const imageRatio = imgWidth / imgHeight

  const maxCanvasWidth = screenWidth * 0.5
  const maxCanvasHeight = screenHeight * 0.6

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

  memeData.canvas.clearRect(0, 0, newWidth, newHeight)
  memeData.canvas.drawImage(memeData.baseImage, 0, 0, newWidth, newHeight)

  drawTextOnCanvas()
}

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

function addLine() {
  let memeData = getMemeData()

  const newLine = {
    text: '',
    posText: { x: memeData.elCanvas.width / 2, y: memeData.imgLines.length * 60 },
    sizeText: 60,
    colorText: '#000000',
    styleText: 'Impact',
    opacity: 1,
    isBold: false,
    isInclined: false,
    isBottomLine: false,
    angleSin: 1,
  }
  memeData.imgLines.push(newLine)
  memeData.lineInChange = memeData.imgLines.length - 1

  updateControlPanel(newLine)
  drawTextOnCanvas()
}

function addEmoji(emoji) {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.text += emoji
  updateTextInput()
  drawTextOnCanvas()
}

function deleteLine() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  if (memeData.imgLines.length === 1) {
    addLine()
    memeData.lineInChange = 0
  }
  memeData.imgLines.splice(lineNumber, 1)
  if (memeData.imgLines.length === memeData.lineInChange) {
    memeData.lineInChange--
  }
  updateTextInput()
  drawTextOnCanvas()
}

function moveLineUp() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  if (lineNumber > 0) memeData.lineInChange--
  updateControlPanel(memeData.imgLines[memeData.lineInChange])
  drawTextOnCanvas()
}

function moveLineDown() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  if (lineNumber < memeData.imgLines.length - 1) memeData.lineInChange++
  updateControlPanel(memeData.imgLines[memeData.lineInChange])
  drawTextOnCanvas()
}

function updateControlPanel(line) {
  document.getElementById('textLineInput').value = line.text
  document.getElementById('textSize').value = line.sizeText
  document.getElementById('textColor').value = line.colorText
  document.getElementById('fontStyle').value = line.styleText
  document.getElementById('opacity').value = line.opacity * 100

  const boldButton = document.querySelector('.toggle-bold')
  if (line.isBold) {
    boldButton.style.fontWeight = 'bold'
    boldButton.style.transform = 'scale(1.1)'
    boldButton.style.backgroundColor = 'lightgreen'
  } else {
    boldButton.style.fontWeight = 'normal'
    boldButton.style.transform = 'scale(1)'
    boldButton.style.backgroundColor = ''
  }

  const italicButton = document.querySelector('.toggle-italic')
  if (line.isInclined) {
    italicButton.style.fontStyle = 'italic'
    italicButton.style.transform = 'scale(1.1)'
    italicButton.style.backgroundColor = 'lightgreen'
  } else {
    italicButton.style.fontStyle = 'normal'
    italicButton.style.transform = 'scale(1)'
    italicButton.style.backgroundColor = ''
  }

  const underlineButton = document.querySelector('.toggle-underline')
  if (line.isBottomLine) {
    underlineButton.style.textDecoration = 'underline'
    underlineButton.style.transform = 'scale(1.1)'
    underlineButton.style.backgroundColor = 'lightgreen'
  } else {
    underlineButton.style.textDecoration = 'none'
    underlineButton.style.transform = 'scale(1)'
    underlineButton.style.backgroundColor = ''
  }
}

function rotateLeft() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]

  lineInChange.angleSin += 5
  if (lineInChange.angleSin >= 360) lineInChange.angleSin -= 360

  drawTextOnCanvas()
}

function rotateRight() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]

  lineInChange.angleSin -= 5
  if (lineInChange.angleSin <= -360) lineInChange.angleSin += 360

  drawTextOnCanvas()
}

function toggleBold() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.isBold = !lineInChange.isBold

  const button = document.querySelector('.toggle-bold')
  if (lineInChange.isBold) {
    button.style.fontWeight = 'bold'
    button.style.transform = 'scale(1.1)'
    button.style.backgroundColor = 'lightgreen'
  } else {
    button.style.fontWeight = 'normal'
    button.style.transform = 'scale(1)'
    button.style.backgroundColor = ''
  }

  drawTextOnCanvas()
}

function toggleItalic() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.isInclined = !lineInChange.isInclined

  const button = document.querySelector('.toggle-italic')
  if (lineInChange.isInclined) {
    button.style.styleText = 'italic'
    button.style.transform = 'scale(1.1)'
    button.style.backgroundColor = 'lightgreen'
  } else {
    button.style.styleText = 'normal'
    button.style.transform = 'scale(1)'
    button.style.backgroundColor = ''
  }

  drawTextOnCanvas()
}

function toggleUnderline() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.isBottomLine = !lineInChange.isBottomLine

  const button = document.querySelector('.toggle-underline')
  if (lineInChange.isBottomLine) {
    button.style.textDecoration = 'underline'
    button.style.transform = 'scale(1.1)'
    button.style.backgroundColor = 'lightgreen'
  } else {
    button.style.textDecoration = 'none'
    button.style.transform = 'scale(1)'
    button.style.backgroundColor = ''
  }

  drawTextOnCanvas()
}

function changeFontStyle() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.styleText = document.getElementById('fontStyle').value

  drawTextOnCanvas()
}

function changeOpacity() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.opacity = document.getElementById('opacity').value / 100

  drawTextOnCanvas()
}

function changeTextSize() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.sizeText = document.getElementById('textSize').value

  drawTextOnCanvas()
}

function changeTextColor() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.colorText = document.getElementById('textColor').value

  drawTextOnCanvas()
}

function updateText() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.text = document.getElementById('textLineInput').value

  drawTextOnCanvas()
}

function drawTextOnCanvas() {
  const memeData = getMemeData()
  const canvas = memeData.canvas

  canvas.clearRect(0, 0, memeData.elCanvas.width, memeData.elCanvas.height)

  if (memeData.baseImage) {
    canvas.drawImage(memeData.baseImage, 0, 0, memeData.elCanvas.width, memeData.elCanvas.height)
  }

  memeData.imgLines.forEach((line) => {
    canvas.save()

    const styleText = `${line.isBold ? 'bold' : 'normal'} ${line.isInclined ? 'italic' : 'normal'} ${line.sizeText}px ${line.styleText}`
    canvas.font = styleText
    canvas.globalAlpha = line.opacity
    canvas.fillStyle = line.colorText
    canvas.textAlign = 'center'
    canvas.textBaseline = 'middle'

    canvas.translate(line.posText.x, line.posText.y)
    canvas.rotate((line.angleSin * Math.PI) / 180)
    canvas.translate(-line.posText.x, -line.posText.y)

    canvas.fillText(line.text, line.posText.x, line.posText.y)

    if (line.isBottomLine) {
      const textWidth = canvas.measureText(line.text).width
      const startX = line.posText.x - textWidth / 2
      const endX = line.posText.x + textWidth / 2
      const underlineY = line.posText.y + line.sizeText + 10
      canvas.beginPath()
      canvas.moveTo(startX, underlineY)
      canvas.lineTo(endX, underlineY)
      canvas.lineWidth = 2
      canvas.strokeStyle = line.colorText
      canvas.stroke()
    }

    canvas.restore()
  })
}
