'use strict'

// Function to get a random base image from local storage
function getRandomBaseImage() {
  const images = JSON.parse(localStorage.getItem('base')) || []
  if (images.length === 0) {
    showNotification('No base images found in local storage.')
    return null
  }
  const randomImage = images[Math.floor(Math.random() * images.length)]
  return randomImage
}

// Function to get random meme lines
function getRandomMemeLines() {
  let randomMeme = getMemeData()

  // List of predefined meme line pairs
  const memeLinePairs = [
    // Pair of lines for memes
    ['I used to be an adventurer like you...', 'Then I took an arrow to the knee.'],
    ['Winter is coming...', 'But so is summer.'],
    ['I solemnly swear...', 'That I am up to no good.'],
    ['Keep calm...', 'And carry on.'],
    ['This is Sparta!', 'No, this is Patrick.'],
    ['May the force be with you...', 'Always.'],
    ['Life is like a box of chocolates...', "You never know what you're gonna get."],
    ['To be or not to be...', 'That is the question.'],
    ["I'm Batman...", "And you're not."],
    ["Here's Johnny!", "Nope, it's me."],
    ['Elementary, my dear Watson...', "It's just a meme."],
    ['E.T. phone home...', 'But first, let me take a selfie.'],
    ["I'll have what she's having...", 'Extra fries, please.'],
    ['Inconceivable!', 'You keep using that word.'],
    ['Say hello to my little friend...', "It's a puppy!"],
    ["I'll be back...", 'With pizza.'],
    ["You're gonna need a bigger boat...", 'Or a smaller fish.'],
    ['Why so serious?', "Let's put a smile on that face."],
    ['I am Groot...', 'We are Groot.'],
    ["You can't handle the truth!", 'But you can handle a meme.'],
    ['Hasta la vista, baby...', "Don't forget to tip your waitress."],
    ["The name's Bond...", 'James Bond.'],
    ['Frankly, my dear...', "I don't give a damn."],
    ["Here's looking at you, kid...", "You're doing great."],
    ['Go ahead, make my day...', 'With a cup of coffee.'],
    ["I'm the king of the world!", 'And the world is my oyster.'],
    ["It's alive!", "And it's fabulous."],
    ["There's no place like home...", 'Except maybe Disneyland.'],
    ['Keep your friends close...', 'And your snacks closer.'],
    ['I see dead people...', "Just kidding, it's a costume party."],
    ['To infinity and beyond!', "Don't forget your towel."],
    ['I love the smell of napalm in the morning...', 'It smells like victory.'],
    ['Houston, we have a problem...', 'I forgot my charger.'],
    ["I'm walking here!", 'Move over, pigeons.'],
    ['Show me the money!', "And I'll show you the honey."],
    ['Life is short...', 'Eat dessert first.'],
    ["You can't stop the signal...", 'But you can pause the movie.'],
    ["I'm not a doctor...", 'But I play one on TV.'],
    ["What we've got here is failure to communicate...", "So let's text instead."],
    ['Carpe diem...', 'Seize the taco.'],
    ['You talking to me?', "I don't see anyone else here."],
    ["I'm ready for my close-up...", "But where's the camera?"],
    ['Bond. James Bond.', 'Shaken, not stirred.'],
    ["I'm the Dude...", "So that's what you call me."],
    ['This is the beginning of a beautiful friendship...', 'Pass the popcorn.'],
    ['I find your lack of faith disturbing...', 'But your cooking is amazing.'],
    ["There's no place like home...", "Unless there's WiFi."],
    ['Nobody puts Baby in a corner...', "Unless she's charging her phone."],
    ["I'll have what she's having...", 'And make it a double.'],
    ['They may take our lives...', "But they'll never take our freedom!"],
    ["You can't handle the truth!", 'But you can handle a kitten.'],
    ['Just keep swimming...', 'And avoid the sharks.'],
    ['Why so serious?', "Let's have a party."],
    ['I love the smell of napalm in the morning...', 'It smells like... coffee.'],
    ['Elementary, my dear Watson...', 'The butler did it.'],
    ['Life is like a box of chocolates...', 'Full of surprises.'],
    ["Here's looking at you, kid...", "You've got this."],
    ['The force will be with you...', 'Always.'],
    ['To infinity and beyond!', "Let's fly."],
    ["I'm not a smart man...", 'But I know what love is.'],
    ['I see dead people...', "Oh wait, it's just Halloween."],
    ["I'm the king of the world!", "And it's nap time."],
    ["There's no place like home...", 'And the WiFi password is...'],
    ['You talking to me?', 'Yes, you with the face.'],
    ["I'm ready for my close-up...", "Where's the spotlight?"],
    ['Bond. James Bond.', 'License to chill.'],
    ["What we've got here is failure to communicate...", "So let's text."],
    ['Carpe diem...', 'Seize the donuts.'],
    ['Go ahead, make my day...', 'With a smile.'],
    ['Houston, we have a problem...', "We're out of coffee."],
    ["I'm walking here!", 'Watch your step.'],
    ['Show me the money!', 'Or show me the door.'],
    ['Life is short...', 'Take the trip.'],
    ["You can't stop the signal...", 'But you can change the channel.'],
    ["I'm not a doctor...", 'But I can Google it.'],
    ['Just keep swimming...', 'And bring snacks.'],
    ['They may take our lives...', "But they'll never take our memes!"],
    ['Why so serious?', "Let's dance."],
    ["The name's Bond...", 'But you can call me tonight.'],
    ['Frankly, my dear...', 'I do give a damn.'],
    ["Here's looking at you, kid...", "You're a star."],
    ['Go ahead, make my day...', 'With a joke.'],
    ["It's alive!", "And it's fabulous."],
    ['Keep your friends close...', 'And your pizza closer.'],
    ['I see dead people...', "But it's just a movie."],
    ['To infinity and beyond!', "Let's go on an adventure."],
    ['I love the smell of napalm in the morning...', 'But I prefer bacon.'],
    ['Houston, we have a problem...', 'We forgot the snacks.'],
    ["I'm walking here!", 'In style.'],
    ['Show me the money!', "And I'll show you the memes."],
    ['Life is short...', 'Enjoy every moment.'],
    ["You can't stop the signal...", 'But you can pause the show.'],
    ["I'm not a doctor...", 'But I play one on TV.'],
    ['Just keep swimming...', 'And smile.'],
  ]

  const randomPair = memeLinePairs[Math.floor(Math.random() * memeLinePairs.length)]
  const line1 = randomPair[0]
  const line2 = randomPair[1]

  const colorCombination = getRandomColorCombination()

  // Settings for the text
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

  // Assigning the random lines to the meme
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

// Function to get a random color combination
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

// Function to generate a random meme
function generateRandomMeme() {
  let randomMeme = getMemeData()
  const randomImage = getRandomBaseImage()
  if (!randomImage) return

  randomMeme.baseImage = new Image()
  randomMeme.baseImage.src = randomImage.imgSource

  // Load the base image and set up the canvas
  randomMeme.baseImage.onload = () => {
    randomMeme.elCanvas = document.querySelector('.canvas')
    randomMeme.canvas = randomMeme.elCanvas.getContext('2d')
    randomMeme.elCanvas.width = randomMeme.baseImage.width
    randomMeme.elCanvas.height = randomMeme.baseImage.height

    randomMeme.canvas.drawImage(randomMeme.baseImage, 0, 0)

    randomMeme.imageSize = { width: randomMeme.baseImage.width, height: randomMeme.baseImage.height }
    randomMeme.imgSource = randomMeme.elCanvas.toDataURL()

    getRandomMemeLines()

    // Position the text lines on the canvas
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
