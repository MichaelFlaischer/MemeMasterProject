'use strict'

let gMemeData = {
  imgId: null,
  canvas: null,
  elCanvas: null,
  imageSize: null,
  baseImage: null,
  imgLines: [
    {
      text: '',
      posText: { x: 0, y: 0 },
      sizeText: null,
      colorText: null,
      isSelected: false,
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
}

function addEventListeners() {
  let memeData = getMemeData()
  memeData.elCanvas.addEventListener('mousedown', startDrawing)
  memeData.elCanvas.addEventListener('mouseup', stopDrawing)
  memeData.elCanvas.addEventListener('mousemove', drawOnMove)
  memeData.elCanvas.addEventListener('touchstart', startDrawing)
  memeData.elCanvas.addEventListener('touchend', stopDrawing)
  memeData.elCanvas.addEventListener('touchmove', drawOnMove)
}

function startDrawing(e) {
  let memeData = getMemeData()

  // Implement the start drawing logic
}

function stopDrawing(e) {
  let memeData = getMemeData()

  // Implement the stop drawing logic
}

function drawOnMove(e) {
  let memeData = getMemeData()

  // Implement the drawing logic
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
