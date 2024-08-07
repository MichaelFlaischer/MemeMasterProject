'use strict'

function getRandomBaseImage() {
  const images = JSON.parse(localStorage.getItem('base')) || []
  if (images.length === 0) {
    showNotification('No base images found in local storage.')
    return null
  }
  const randomImage = images[Math.floor(Math.random() * images.length)]
  return randomImage
}

function getRandomMemeLines() {
  let randomMeme = getMemeData()

  const memeLinePairs = [
    ["I don't always...", 'But when I do, I...'],
    ['One does not simply...', '...walk into Mordor.'],
    ['That moment when...', '...you realize you forgot something.'],
    ['What if I told you...', '...everything is a meme.'],
    ['Yo dawg...', '...I heard you like memes.'],
    ['Brace yourselves...', '...memes are coming.'],
    ['In a galaxy far far away...', '...memes ruled the universe.'],
    ['To infinity and beyond!', '...with memes.'],
    ['Why so serious?', '...have a meme instead.'],
    ['Houston, we have a problem.', '...we ran out of memes.'],
    ["I'll be back.", '...with more memes.'],
    ["You can't handle the truth!", '...the memes are too strong.'],
    ['E.T. phone home.', '...and show them memes.'],
    ["I'm king of the world!", '...of memes.'],
    ['May the force be with you.', '...and also the memes.'],
    ['You talking to me?', '...or to my meme?'],
    ['Elementary, my dear Watson.', '...this meme is quite amusing.'],
    ['Go ahead, make my day.', '...with a meme.'],
    ["Here's looking at you, kid.", '...enjoying that meme.'],
    ['Hasta la vista, baby.', '...and take a meme with you.'],
    ['Keep your friends close,', '...but your memes closer.'],
    ['Say hello to my little friend!', '...it’s a meme.'],
    ["I'm gonna make him an offer he can't refuse.", '...a lifetime supply of memes.'],
    ["There's no place like home.", '...except meme land.'],
    ['I see dead people.', '...turning into memes.'],
    ['Carpe diem. Seize the day, boys.', '...and the memes.'],
    ['Elementary, my dear Watson.', '...memes are everywhere.'],
    ["I'm the king of the world!", '...of memes.'],
    ["You can't handle the truth!", '...memes are the truth.'],
    ["I'll be back.", '...with memes.'],
    ['My precious.', '...is a meme.'],
    ['Why so serious?', '...enjoy a meme.'],
    ['I am your father.', '...of all memes.'],
    ['To infinity and beyond!', '...with memes.'],
    ['You shall not pass!', '...without a meme.'],
    ["Here's looking at you, kid.", '...meme lover.'],
  ]

  const randomPair = memeLinePairs[Math.floor(Math.random() * memeLinePairs.length)]
  const line1 = randomPair[0]
  const line2 = randomPair[1]

  const colorCombination = getRandomColorCombination()

  const settings = {
    sizeText: Math.floor(Math.random() * 40) + 20,
    colorText: colorCombination.textColor,
    backgroundColor: colorCombination.backgroundColor,
    styleText: 'Impact',
    opacity: 1,
    isBold: true,
    isInclined: false,
    isBottomLine: false,
    angleSin: 0,
  }

  randomMeme.imgLines = [
    {
      text: line1,
      posText: { x: randomMeme.elCanvas.width / 2, y: 50 },
      ...settings,
    },
    {
      text: line2,
      posText: { x: randomMeme.elCanvas.width / 2, y: randomMeme.elCanvas.height - 50 },
      ...settings,
    },
  ]

  randomMeme.imgID = generateUniqueId()
}

function getRandomColorCombination() {
  const colorCombinations = [
    { textColor: 'White', backgroundColor: 'Black' },
    { textColor: 'Black', backgroundColor: 'White' },
    { textColor: 'Red', backgroundColor: 'Black' },
    { textColor: 'Green', backgroundColor: 'Blue' },
    { textColor: 'Yellow', backgroundColor: 'Magenta' },
  ]

  const randomIndex = Math.floor(Math.random() * colorCombinations.length)
  return colorCombinations[randomIndex]
}

function generateRandomMeme() {
  let randomMeme = getMemeData()
  const randomImage = getRandomBaseImage()
  if (!randomImage) return

  randomMeme.baseImage = new Image()
  randomMeme.baseImage.src = randomImage.imgSource

  randomMeme.baseImage.onload = () => {
    randomMeme.elCanvas = document.querySelector('.canvas')
    randomMeme.canvas = randomMeme.elCanvas.getContext('2d')
    randomMeme.elCanvas.width = randomMeme.baseImage.width
    randomMeme.elCanvas.height = randomMeme.baseImage.height

    randomMeme.canvas.drawImage(randomMeme.baseImage, 0, 0)

    randomMeme.imageSize = { width: randomMeme.baseImage.width, height: randomMeme.baseImage.height }
    randomMeme.imgSource = randomMeme.elCanvas.toDataURL()

    getRandomMemeLines()

    randomMeme.imgLines.forEach((line) => {
      line.sizeText = randomMeme.elCanvas.width / 15
      if (line === randomMeme.imgLines[0]) {
        line.posText = { x: randomMeme.elCanvas.width / 2, y: line.sizeText }
      } else {
        line.posText = { x: randomMeme.elCanvas.width / 2, y: randomMeme.elCanvas.height - line.sizeText }
      }
    })

    drawTextOnCanvas()
    updateTextInput()
    updateSelectList()
    closeDialog()
    updateControlPanel(randomMeme.imgLines[0])
  }
}
