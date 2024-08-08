'use strict'

// Flag to track if a text line is being dragged
let isDragging = false

// Global object to store meme data
let gMemeData = {
  imgID: null,
  imgSource: null,
  imgDataUrl: null,
  imgName: null,
  creator: null,
  date: null,
  keyword: [],
  typeImg: 'meme',
  colors: {
    backgroundColor: null,
    backgroundColorMain: null,
    textColor: null,
  },
  canvas: null,
  elCanvas: null,
  imageSize: null,
  baseImage: null,
  lineInChange: 0,
  imgLines: [],
}

// Function to get the current meme data
function getMemeData() {
  return gMemeData
}

// Function to set meme data and initialize canvas
function setMemeData(memeData) {
  gMemeData = memeData

  memeData.elCanvas = document.querySelector('.canvas')
  memeData.canvas = memeData.elCanvas.getContext('2d')

  const screenWidth = window.innerWidth * 0.5
  const screenHeight = window.innerHeight * 0.5

  memeData.elCanvas.width = screenWidth
  memeData.elCanvas.height = screenHeight

  memeData.canvas.clearRect(0, 0, screenWidth, screenHeight)
}

// Function to add event listeners for canvas interactions
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

// Function to start drawing and detect if a text line is being dragged
function startDrawing(e) {
  e.preventDefault()

  let memeData = getMemeData()
  const rect = memeData.elCanvas.getBoundingClientRect()
  let x, y

  if (e.touches) {
    x = e.touches[0].clientX - rect.left
    y = e.touches[0].clientY - rect.top
  } else {
    x = e.clientX - rect.left
    y = e.clientY - rect.top
  }

  memeData.imgLines.forEach((line, index) => {
    const textWidth = memeData.canvas.measureText(line.text).width
    const textHeight = line.sizeText * 1.2
    if (
      x >= line.posText.x - textWidth / 2 &&
      x <= line.posText.x + textWidth / 2 &&
      y >= line.posText.y - textHeight / 2 &&
      y <= line.posText.y + textHeight / 2
    ) {
      memeData.lineInChange = index
      updateControlPanel(line)
      isDragging = true
      drawTextOnCanvas()
    }
  })
}

// Function to stop drawing
function stopDrawing(e) {
  e.preventDefault()
  if (isDragging) {
    isDragging = false
  }
}

// Function to handle drawing on canvas while moving
function drawOnMove(e) {
  e.preventDefault()

  if (!isDragging) return

  let memeData = getMemeData()
  const rect = memeData.elCanvas.getBoundingClientRect()
  let x, y

  if (e.touches) {
    x = e.touches[0].clientX - rect.left
    y = e.touches[0].clientY - rect.top
  } else {
    x = e.clientX - rect.left
    y = e.clientY - rect.top
  }

  const lineNumber = memeData.lineInChange
  memeData.imgLines[lineNumber].posText.x = x
  memeData.imgLines[lineNumber].posText.y = y

  drawTextOnCanvas()
}

// Function to handle key down events for various actions
function handleKeyDown(event) {
  if (event.key === 'Delete') {
    deleteLine()
  } else if (event.key === 'ArrowUp') {
    moveLineUp()
  } else if (event.key === 'ArrowDown') {
    moveLineDown()
  } else if (event.key === 'Enter') {
    addLine()
  } else if (event.key === 'Escape') {
    closeDialog()
  }
}

// Function to rotate text line to the left
function rotateLeft() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]

  lineInChange.angleSin += 5
  if (lineInChange.angleSin >= 360) lineInChange.angleSin -= 360

  drawTextOnCanvas()
}

// Function to rotate text line to the right
function rotateRight() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]

  lineInChange.angleSin -= 5
  if (lineInChange.angleSin <= -360) lineInChange.angleSin += 360

  drawTextOnCanvas()
}

// Function to toggle bold style for the current text line
function toggleBold() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.isBold = !lineInChange.isBold

  const elButton = document.querySelector('.toggle-bold')
  if (lineInChange.isBold) {
    elButton.style.fontWeight = 'bold'
    elButton.style.transform = 'scale(1.1)'
    elButton.style.backgroundColor = 'lightgreen'
  } else {
    elButton.style.fontWeight = 'normal'
    elButton.style.transform = 'scale(1)'
    elButton.style.backgroundColor = ''
  }

  drawTextOnCanvas()
}

// Function to toggle italic style for the current text line
function toggleItalic() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.isInclined = !lineInChange.isInclined

  const elButton = document.querySelector('.toggle-italic')
  if (lineInChange.isInclined) {
    elButton.style.fontStyle = 'italic'
    elButton.style.transform = 'scale(1.1)'
    elButton.style.backgroundColor = 'lightgreen'
  } else {
    elButton.style.fontStyle = 'normal'
    elButton.style.transform = 'scale(1)'
    elButton.style.backgroundColor = ''
  }

  drawTextOnCanvas()
}

// Function to toggle underline for the current text line
function toggleUnderline() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.isBottomLine = !lineInChange.isBottomLine

  const elButton = document.querySelector('.toggle-underline')
  if (lineInChange.isBottomLine) {
    elButton.style.textDecoration = 'underline'
    elButton.style.transform = 'scale(1.1)'
    elButton.style.backgroundColor = 'lightgreen'
  } else {
    elButton.style.textDecoration = 'none'
    elButton.style.transform = 'scale(1)'
    elButton.style.backgroundColor = ''
  }

  drawTextOnCanvas()
}

// Function to change the font style of the current text line
function changeFontStyle() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.styleText = document.getElementById('fontStyle').value

  drawTextOnCanvas()
}

// Function to change the opacity of the current text line
function changeOpacity() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.opacity = document.getElementById('opacity').value / 100

  drawTextOnCanvas()
}

// Function to change the text size of the current text line
function changeTextSize() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.sizeText = document.getElementById('textSize').value

  drawTextOnCanvas()
}

// Function to change the text color of the current text line
function changeTextColor() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.colorText = document.getElementById('textColor').value

  drawTextOnCanvas()
}

// Function to change the background color of the current text line
function changeBackground() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.backgroundColor = document.getElementById('backgroundColor').value

  drawTextOnCanvas()
}

// Function to update the text content of the current text line
function updateText() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  if (memeData.imgLines.length === 0) addLine()
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.text = document.getElementById('textLineInput').value

  updateSelectList()
  updateControlPanel(lineInChange)
  drawTextOnCanvas()
}

// Function to add a new text line
function addLine() {
  let memeData = getMemeData()

  const newLine = {
    text: '',
    posText: { x: memeData.elCanvas.width / 2, y: memeData.imgLines.length * 60 },
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

  focusOnInputText()
  updateControlPanel(newLine)
  drawTextOnCanvas()
}

// Function to add an emoji to the current text line
function addEmoji(emoji) {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]
  lineInChange.text += emoji
  updateTextInput()
  updateSelectList()
  drawTextOnCanvas()
}

// Function to delete the current text line
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

// Function to move to the previous text line
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

// Function to move to the next text line
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

// Function to move the current text line in the specified direction
function moveText(direction) {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange
  let lineInChange = memeData.imgLines[lineNumber]

  const stepSize = 5

  switch (direction) {
    case 'up':
      lineInChange.posText.y -= stepSize
      break
    case 'down':
      lineInChange.posText.y += stepSize
      break
    case 'left':
      lineInChange.posText.x -= stepSize
      break
    case 'right':
      lineInChange.posText.x += stepSize
      break
    default:
      console.error('Invalid direction:', direction)
      return
  }

  drawTextOnCanvas()
}
