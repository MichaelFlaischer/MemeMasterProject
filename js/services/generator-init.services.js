'use strict'

function onInitMeme() {
  menuRender()
  createCanvas()

  const searchParams = new URLSearchParams(window.location.search)
  const imgType = searchParams.get('imgtype')
  const imgId = searchParams.get('imgid')

  let image = getImageByIdAndType(imgType, imgId)
  if (image !== null) {
    if (imgType === 'base') {
      getImageDimensions(image.imgSource).then((imgSize) => {
        renderImage(image.imgSource, imgSize, generateUniqueId())
        addLine()
      })
    } else if (imgType === 'meme') {
      loadMeme(image)
    }
  } else {
    openSelectModal()
  }
}

function loadMeme(image) {
  setMemeData(image)
  let memeData = getMemeData()
  memeData.imgID = generateUniqueId()
  setImageOnCanvas()
  memeData.imgLines.forEach((line) => updateControlPanel(line))
}

function saveToGallery() {
  drawTextOnCanvas(true)
  const memeData = getMemeData()
  const imageSrc = memeData.elCanvas.toDataURL('image/png')
  memeData.imgSource = imageSrc
  const elImageName = document.getElementById('imageName')
  memeData.imgName = elImageName.value
  const elCreatorName = document.getElementById('creatorName')
  memeData.creator = elCreatorName.value
  memeData.date = new Date().toISOString().split('T')[0]
  const elImgKeywords = document.getElementById('imgKeywords')
  memeData.keyword = elImgKeywords.value.split(/[ ,]+/)
  memeData.colors = {
    backgroundColor: document.getElementById('userBackgroundColor').value,
    backgroundColorMain: document.getElementById('backgroundColorMain').value,
    textColor: document.getElementById('userTextColor').value,
  }
  memeData.imgDataUrl = memeData.baseImage.src
  saveImage(memeData)
  showNotification('Meme saved to gallery.')
  closeDialog()
  drawTextOnCanvas(false)
}

function downloadImage() {
  drawTextOnCanvas(true)
  const memeData = getMemeData()
  const link = document.createElement('a')
  link.href = memeData.elCanvas.toDataURL('image/png')
  link.download = 'meme.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  showNotification('Meme downloaded.')
  drawTextOnCanvas(false)
}

function showSaveDialog() {
  const memeData = getMemeData()
  const imageSrc = memeData.elCanvas.toDataURL('image/png')

  const elDialog = document.querySelector('.dialog')
  elDialog.innerHTML = `<div class='dialog-content'>
      <img src='${imageSrc}' alt='Meme Thumbnail' style='width: 100px; height: 100px;' />
      <div class='dialog-info'>
        <table>
          <tr>
            <td>Image Name</td>
            <td>
              <input type='text' id='imageName' placeholder='Image Name' required />
            </td>
          </tr>
          <tr>
            <td>Creator Name</td>
            <td>
              <input type='text' id='creatorName' placeholder='Creator Name' required />
            </td>
          </tr>
          <tr style='display:none;'>
            <td>
              <input type='text' id='typeImg' value='base' disabled />
            </td>
          </tr>
          <tr>
            <td>Keywords</td>
            <td>
              <input type='text' id='imgKeywords' placeholder='Keywords (comma separated)' required />
            </td>
          </tr>
          <tr>
            <td>Background Color</td>
            <td>
              <input type='color' id='userBackgroundColor' class='pointer' value='#ffffff' required />
            </td>
          </tr>
          <tr>
            <td>Background Color Main</td>
            <td>
              <input type='color' id='backgroundColorMain' class='pointer' value='#ffffff' required />
            </td>
          </tr>
          <tr>
            <td>Text Color</td>
            <td>
              <input type='color' id='userTextColor' class='pointer' value='#000000' required />
            </td>
          </tr>
        </table>
      </div>
      <button onclick='saveToGallery()'>Save</button>
      <button onclick='closeDialog()'>Close</button>
    </div>`

  elDialog.style.display = 'flex'
}

function closeDialog() {
  let memeData = getMemeData()
  if (memeData.imgLines.length > 0) {
    const elDialog = document.querySelector('.dialog')
    elDialog.style.display = 'none'
  }
}

function showNotification(message) {
  const elNotification = document.querySelector('.notification')
  elNotification.innerText = message
  elNotification.style.display = 'block'

  setTimeout(() => {
    elNotification.style.display = 'none'
  }, 3000)
}

function openSelectModal() {
  const elDialog = document.querySelector('.dialog')
  elDialog.innerHTML = `<div class='dialog-content'>
      <div class='dialog-info'>
        <h2>No image found</h2>
        <p>You can:</p>
        <ul>
          <li>Go to the gallery and select an image or meme for editing</li>
          <button onclick="window.location.href='gallery.html'">Go to Gallery</button>
          <li>Upload an image from your computer to create a meme</li>
          <input type='file' id='imgInput' class='pointer' accept='image/*' />
          <button onclick='uploadImageFromFile()'>Upload from Computer</button>
          <li>Choose an image from the web</li>
          <input type='text' id='imgUrl' placeholder='Enter image URL' />
          <button onclick='createMemeFromUrl()'>Create Meme from URL</button>
        </ul>
      </div>
    </div>`

  elDialog.style.display = 'flex'
}

function toggleCanvas() {
  const elCanvas = document.querySelector('.canvas')
  elCanvas.style.display = 'flex'
}

function focusOnInputText() {
  const elTextLineInput = document.getElementById('textLineInput')
  elTextLineInput.focus()
}

function updateTextInput() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange

  const elTextLineInput = document.getElementById('textLineInput')
  elTextLineInput.value = memeData.imgLines[lineNumber].text
}

function updateSelectList() {
  const elTextLineSelect = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  elTextLineSelect.innerHTML = ''

  memeData.imgLines.forEach((line, index) => {
    const option = document.createElement('option')
    option.value = index
    option.textContent = line.text || `Line ${index + 1}`
    elTextLineSelect.appendChild(option)
  })

  elTextLineSelect.value = memeData.lineInChange
}

function selectTextFromList() {
  const elTextLineSelect = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  const index = parseInt(elTextLineSelect.value, 10)

  if (!isNaN(index) && index >= 0 && index < memeData.imgLines.length) {
    memeData.lineInChange = index
    updateControlPanel(memeData.imgLines[index])
    drawTextOnCanvas()
  }
}

function updateControlPanel(line) {
  const elTextLineInput = document.getElementById('textLineInput')
  elTextLineInput.value = line.text
  const elTextSize = document.getElementById('textSize')
  elTextSize.value = line.sizeText
  const elTextColor = document.getElementById('textColor')
  elTextColor.value = line.colorText
  const elFontStyle = document.getElementById('fontStyle')
  elFontStyle.value = line.styleText
  const elOpacity = document.getElementById('opacity')
  elOpacity.value = line.opacity * 100
  const elBackgroundColor = document.getElementById('backgroundColor')
  elBackgroundColor.value = line.backgroundColor || 'transparent'

  const elBoldButton = document.querySelector('.toggle-bold')
  if (line.isBold) {
    elBoldButton.style.fontWeight = 'bold'
    elBoldButton.style.transform = 'scale(1.1)'
    elBoldButton.style.backgroundColor = 'lightgreen'
  } else {
    elBoldButton.style.fontWeight = 'normal'
    elBoldButton.style.transform = 'scale(1)'
    elBoldButton.style.backgroundColor = ''
  }

  const elItalicButton = document.querySelector('.toggle-italic')
  if (line.isInclined) {
    elItalicButton.style.fontStyle = 'italic'
    elItalicButton.style.transform = 'scale(1.1)'
    elItalicButton.style.backgroundColor = 'lightgreen'
  } else {
    elItalicButton.style.fontStyle = 'normal'
    elItalicButton.style.transform = 'scale(1)'
    elItalicButton.style.backgroundColor = ''
  }

  const elUnderlineButton = document.querySelector('.toggle-underline')
  if (line.isBottomLine) {
    elUnderlineButton.style.textDecoration = 'underline'
    elUnderlineButton.style.transform = 'scale(1.1)'
    elUnderlineButton.style.backgroundColor = 'lightgreen'
  } else {
    elUnderlineButton.style.textDecoration = 'none'
    elUnderlineButton.style.transform = 'scale(1)'
    elUnderlineButton.style.backgroundColor = ''
  }

  updateSelectList()
}
