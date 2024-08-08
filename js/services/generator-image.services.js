'use strict'

function uploadImageFromFile() {
  const imgInput = document.getElementById('imgInput').files[0]
  if (imgInput) {
    const reader = new FileReader()
    reader.onload = function (e) {
      validateAndRenderImage(e.target.result)
    }
    reader.readAsDataURL(imgInput)
  } else {
    showNotification('Please select an image file to upload.')
  }
}

function createMemeFromUrl() {
  const imgUrl = document.getElementById('imgUrl').value
  convertImageUrlToDataUrl(imgUrl, validateAndRenderImage)
}

function convertImageUrlToDataUrl(url, callback) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader()
      reader.onloadend = () => callback(reader.result)
      reader.readAsDataURL(blob)
    })
    .catch((error) => {
      console.error('Error converting image URL to Data URL:', error)
      showNotification('Failed to convert image URL to Data URL.')
    })
}

function renderImage(imgSrc, size = null, imgId = null) {
  let img = new Image()
  img.src = imgSrc

  img.onload = () => {
    if (!size) size = { width: img.width, height: img.height }
    updateBaseImage(img, size, imgId)
  }
}

function validateAndRenderImage(imgSrc) {
  let img = new Image()
  img.src = imgSrc
  img.onload = () => {
    if (img.width && img.height) {
      renderImage(imgSrc, { width: img.width, height: img.height }, generateUniqueId())
      addLine()
      closeDialog()
    } else {
      showNotification('Invalid image file. Please upload a valid image.')
    }
  }
  img.onerror = () => {
    showNotification('Failed to load image. Please check the image file or URL.')
  }
}

function downloadImage(imageDataUrl = null) {
  console.log('safsaf')
  let memeData
  let link = document.createElement('a')

  if (imageDataUrl === null) {
    drawTextOnCanvas(true)
    memeData = getMemeData()
    link.href = memeData.elCanvas.toDataURL('image/png')
  } else {
    link.href = imageDataUrl
  }

  link.download = 'meme.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  showNotification('Meme downloaded.')

  if (imageDataUrl === null) {
    drawTextOnCanvas(false)
  }
}

function shareOnFacebook() {}
