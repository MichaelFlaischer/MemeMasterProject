'use strict'

var gMemeData = {
  canvas: null,
  elCanvas: null,
  imgId: null,
  imageSize: null,
  baseImage: null,
  imgLines: [{ text: '', posText: { x: 0, y: 0 }, sizeText: null, colorText: null, isSelected: false, angleSin: 1 }],
}

function createCanvas() {
  gMemeData.elCanvas = document.querySelector('.canvas')
  gMemeData.canvas = gMemeData.elCanvas.getContext('2d')

  gMemeData.canvas.clearRect(0, 0, gMemeData.elCanvas.width, gMemeData.elCanvas.height)
  gMemeData.canvas.fillStyle = getBGColor()
  gMemeData.canvas.fillRect(0, 0, gMemeData.elCanvas.width, gMemeData.elCanvas.height)
}

function addEventListeners() {
  gMemeData.elCanvas.addEventListener('mousedown', startDrawing)
  gMemeData.elCanvas.addEventListener('mouseup', stopDrawing)
  gMemeData.elCanvas.addEventListener('mousemove', drawOnMove)
  gMemeData.elCanvas.addEventListener('touchstart', startDrawing)
  gMemeData.elCanvas.addEventListener('touchend', stopDrawing)
  gMemeData.elCanvas.addEventListener('touchmove', drawOnMove)
}

function startDrawing(e) {
  // Implement the start drawing logic
}

function stopDrawing(e) {
  // Implement the stop drawing logic
}

function drawOnMove(e) {
  // Implement the drawing logic
}

function updateBaseImage(baseImage, imgSize = null, imgId) {
  gMemeData.baseImage = baseImage

  if (imgSize.width === undefined) {
    gMemeData.imageSize = { width: baseImage.width, height: baseImage.height }
    gMemeData.imgId = generateUniqueId()
  } else {
    gMemeData.imageSize = imgSize
    gMemeData.imgId = imgId
  }

  console.log(gMemeData.imgId)
  setImageOnCanvas()
}

function setImageOnCanvas() {
  console.log(gMemeData)
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const imgWidth = gMemeData.imageSize.width
  const imgHeight = gMemeData.imageSize.height

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

  gMemeData.elCanvas.width = newWidth
  gMemeData.elCanvas.height = newHeight

  gMemeData.imageSize = { width: newWidth, height: newHeight }

  gMemeData.canvas.clearRect(0, 0, newWidth, newHeight)
  gMemeData.canvas.drawImage(gMemeData.baseImage, 0, 0, newWidth, newHeight)
}
