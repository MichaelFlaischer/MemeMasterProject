'use strict'

let isDragging = false

let gMemeData = {
  imgId: null,
  canvas: null,
  elCanvas: null,
  imageSize: null,
  baseImage: null,
  imgSource: null,
  lineInChange: 0,
  imgLines: [],
}

function getMemeData() {
  return gMemeData
}

function createCanvas() {
  let memeData = getMemeData()
  memeData.elCanvas = document.querySelector('.canvas')
  memeData.canvas = memeData.elCanvas.getContext('2d')

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

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

  document.addEventListener('keydown', handleKeyDown)
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

  memeData.imgSource = memeData.elCanvas.toDataURL()
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

  const maxCanvasWidth = screenWidth * 0.8
  const maxCanvasHeight = screenHeight * 0.8

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
    posText: { x: memeData.elCanvas.width / 2.5, y: memeData.imgLines.length + 60 },
    sizeText: 60,
    colorText: '#000000',
    backgroundColor: 'transparent',
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
  updateSelectList()
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
  updateSelectList()
  drawTextOnCanvas()
}

function moveLineUp() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  if (lineNumber > 0) {
    memeData.lineInChange--
  } else {
    memeData.lineInChange = memeData.imgLines.length - 1
  }
  updateControlPanel(memeData.imgLines[memeData.lineInChange])
  drawTextOnCanvas()
}

function moveLineDown() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  if (lineNumber < memeData.imgLines.length - 1) {
    memeData.lineInChange++
  } else {
    memeData.lineInChange = 0
  }
  updateControlPanel(memeData.imgLines[memeData.lineInChange])
  drawTextOnCanvas()
}

function updateControlPanel(line) {
  document.getElementById('textLineInput').value = line.text
  document.getElementById('textSize').value = line.sizeText
  document.getElementById('textColor').value = line.colorText
  document.getElementById('fontStyle').value = line.styleText
  document.getElementById('opacity').value = line.opacity * 100
  document.getElementById('backgroundColor').value = line.backgroundColor || 'transparent'

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

  updateSelectList()
}

function updateSelectList() {
  const select = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  select.innerHTML = ''

  memeData.imgLines.forEach((line, index) => {
    const option = document.createElement('option')
    option.value = index
    option.textContent = line.text || `Line ${index + 1}`
    select.appendChild(option)
  })

  select.value = memeData.lineInChange
}

function selectTextFromList() {
  const select = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  const index = parseInt(select.value, 10)

  if (!isNaN(index) && index >= 0 && index < memeData.imgLines.length) {
    memeData.lineInChange = index
    updateControlPanel(memeData.imgLines[index])
    drawTextOnCanvas()
  }
}

function handleKeyDown(event) {
  if (event.key === 'Delete') {
    deleteLine()
  } else if (event.key === 'ArrowUp') {
    moveLineUp()
  } else if (event.key === 'ArrowDown') {
    moveLineDown()
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
    button.style.fontStyle = 'italic'
    button.style.transform = 'scale(1.1)'
    button.style.backgroundColor = 'lightgreen'
  } else {
    button.style.fontStyle = 'normal'
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

function changeBackground() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.backgroundColor = document.getElementById('backgroundColor').value

  drawTextOnCanvas()
}

function updateText() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.text = document.getElementById('textLineInput').value

  updateSelectList()
  drawTextOnCanvas()
}

function drawTextOnCanvas() {
  const memeData = getMemeData()
  const canvas = memeData.canvas

  canvas.clearRect(0, 0, memeData.elCanvas.width, memeData.elCanvas.height)

  if (memeData.baseImage) {
    canvas.drawImage(memeData.baseImage, 0, 0, memeData.elCanvas.width, memeData.elCanvas.height)
  }

  memeData.imgLines.forEach((line, index) => {
    drawTextLine(canvas, line, index, memeData.lineInChange)
  })

  memeData.imgSource = memeData.elCanvas.toDataURL()
}

function drawTextLine(canvas, line, index, lineInChange) {
  canvas.save()

  const styleText = getTextStyle(line)
  canvas.font = styleText
  canvas.globalAlpha = line.opacity
  canvas.textAlign = 'center'
  canvas.textBaseline = 'middle'

  if (line.backgroundColor && line.backgroundColor !== 'transparent') {
    drawBackground(canvas, line)
  }

  canvas.fillStyle = line.colorText
  canvas.translate(line.posText.x, line.posText.y)
  canvas.rotate((line.angleSin * Math.PI) / 180)
  canvas.translate(-line.posText.x, -line.posText.y)

  if (index === lineInChange) {
    drawSelectionBox(canvas, line)
  }

  canvas.fillText(line.text, line.posText.x, line.posText.y)

  if (line.isBottomLine) {
    drawUnderline(canvas, line)
  }

  canvas.restore()
}

function getTextStyle(line) {
  return `${line.isBold ? 'bold' : 'normal'} ${line.isInclined ? 'italic' : 'normal'} ${line.sizeText}px ${line.styleText}`
}

function drawSelectionBox(canvas, line) {
  const textWidth = canvas.measureText(line.text).width
  const rectX = line.posText.x - textWidth / 2 - 5
  const rectY = line.posText.y - line.sizeText / 2 - 5
  const rectWidth = textWidth + 10
  const rectHeight = line.sizeText + 10
  canvas.setLineDash([5, 5])
  canvas.strokeStyle = 'white'
  canvas.lineWidth = 2
  canvas.strokeRect(rectX, rectY, rectWidth, rectHeight)
}

function drawUnderline(canvas, line) {
  const textWidth = canvas.measureText(line.text).width
  const startX = line.posText.x - textWidth / 2
  const endX = line.posText.x + textWidth / 2
  const underlineY = line.posText.y + line.sizeText / 4 + 15
  canvas.beginPath()
  canvas.moveTo(startX, underlineY)
  canvas.lineTo(endX, underlineY)
  canvas.lineWidth = 2
  canvas.strokeStyle = line.colorText
  canvas.stroke()
}

function drawBackground(canvas, line) {
  const textWidth = canvas.measureText(line.text).width
  const rectX = line.posText.x - textWidth / 2 - 5
  const rectY = line.posText.y - line.sizeText / 2 - 5
  const rectWidth = textWidth + 10
  const rectHeight = line.sizeText + 10

  canvas.fillStyle = line.backgroundColor
  canvas.fillRect(rectX, rectY, rectWidth, rectHeight)
}

function disableTouchDefaultOnCanvas() {
  let memeData = getMemeData()
  memeData.elCanvas.addEventListener(
    'touchstart',
    function (event) {
      event.preventDefault()
    },
    { passive: false }
  )
}
