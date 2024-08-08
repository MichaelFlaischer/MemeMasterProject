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

function createMemeFromUrl(imageUrl = null) {
  let imgUrl
  if (imageUrl) {
    imageUrl = imgUrl
  } else {
    imgUrl = document.getElementById('imgUrl').value
  }
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

function shareImage(urlData = null) {
  if (urlData) {
    if (urlData.startsWith('data:')) {
      // Convert data URL to Blob
      const byteString = atob(urlData.split(',')[1])
      const mimeString = urlData.split(',')[0].split(':')[1].split(';')[0]
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const blob = new Blob([ab], { type: mimeString })
      processAndShare(blob)
    } else {
      // Convert URL to data URL
      convertImageUrlToDataUrl(urlData, (dataUrl) => {
        const byteString = atob(dataUrl.split(',')[1])
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        const blob = new Blob([ab], { type: mimeString })
        processAndShare(blob)
      })
    }
  } else {
    drawTextOnCanvas(true)
    const memeData = getMemeData()
    const dataUrl = memeData.elCanvas.toDataURL('image/png')
    const byteString = atob(dataUrl.split(',')[1])
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab], { type: mimeString })
    drawTextOnCanvas(false)
    processAndShare(blob)
  }
}

function processAndShare(blob) {
  const file = new File([blob], 'meme.jpg', { type: 'image/jpeg' })

  if (navigator.share) {
    navigator
      .share({
        title: 'Check out this meme!',
        text: 'I made this meme, check it out!',
        files: [file],
      })
      .then(() => showNotification('Successful share'))
      .catch((error) => showNotification('Error sharing', error))
  } else {
    const shareUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = shareUrl
    link.download = 'meme.jpg'
    link.click()
    URL.revokeObjectURL(shareUrl)
    showNotification('Web Share API is not supported in your browser. The meme has been downloaded instead.')
  }
}
