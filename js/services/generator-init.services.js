'use strict'

// Function to initialize the meme creation page
function onInitMeme() {
  // Render the menu and create the canvas for drawing
  menuRender()
  createCanvas()

  // Get the image type and image ID from the URL parameters
  const searchParams = new URLSearchParams(window.location.search)
  const imgType = searchParams.get('imgtype')
  const imgId = searchParams.get('imgid')

  // Retrieve the image data based on the image type and ID
  let image = getImageByIdAndType(imgType, imgId)
  if (image !== null) {
    // If the image type is 'base', render the image and add a text line
    if (imgType === 'base') {
      getImageDimensions(image.imgSource).then((imgSize) => {
        renderImage(image.imgSource, imgSize, generateUniqueId())
        addLine()
      })
    }
    // If the image type is 'meme', load the meme data
    else if (imgType === 'meme') {
      loadMeme(image)
    }
  }
  // If no image is found, open the image selection modal
  else {
    openSelectModal()
  }
}

// Function to load the meme data
function loadMeme(image) {
  // Set the meme data with the retrieved image data
  setMemeData(image)
  let memeData = getMemeData()
  memeData.imgID = generateUniqueId()
  setImageOnCanvas()

  // Update the control panel with the meme lines
  memeData.imgLines.forEach((line) => updateControlPanel(line))
}
