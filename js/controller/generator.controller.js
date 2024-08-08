'use strict'

function saveToGallery() {
  drawTextOnCanvas(true)
  const memeData = getMemeData()
  const imageSrc = memeData.elCanvas.toDataURL('image/png')
  memeData.imgSource = imageSrc
  memeData.imgName = document.getElementById('imageName').value
  memeData.creator = document.getElementById('creatorName').value
  memeData.date = new Date().toISOString().split('T')[0]
  memeData.keyword = document.getElementById('imgKeywords').value.split(/[ ,]+/)
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

function showSaveDialog() {
  const memeData = getMemeData()
  const imageSrc = memeData.elCanvas.toDataURL('image/png')

  const elDialog = document.querySelector('.dialog')
  elDialog.innerHTML = `<div class='dialog-content'>
      <img src='${imageSrc}' alt='Meme Thumbnail' style='width: 100px; height: 100px;' />
      <div class='dialog-info'>
        <table>
          <tr>
            <td data-i18n="imageName">Image Name</td>
            <td>
              <input type='text' id='imageName' placeholder='Image Name' required />
            </td>
          </tr>
          <tr>
            <td data-i18n="creatorName">Creator Name</td>
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
            <td data-i18n="keywords">Keywords</td>
            <td>
              <input type='text' id='imgKeywords' placeholder='Keywords (comma separated)' required />
            </td>
          </tr>
          <tr>
            <td data-i18n="backgroundColor">Background Color</td>
            <td>
              <input type='color' id='userBackgroundColor' class='pointer' value='#ffffff' required />
            </td>
          </tr>
          <tr>
            <td data-i18n="backgroundColorMain">Background Color Main</td>
            <td>
              <input type='color' id='backgroundColorMain' class='pointer' value='#ffffff' required />
            </td>
          </tr>
          <tr>
            <td data-i18n="textColor">Text Color</td>
            <td>
              <input type='color' id='userTextColor' class='pointer' value='#000000' required />
            </td>
          </tr>
        </table>
      </div>
      <button onclick='saveToGallery()' data-i18n="saveToGallery">Save</button>
      <button onclick='closeDialog()' data-i18n="close">Close</button>
    </div>`

  elDialog.style.display = 'flex'
  onInitPage()
}

function closeDialog() {
  let memeData = getMemeData()
  if (memeData.imgLines.length > 0) {
    const elDialog = document.querySelector('.dialog')
    elDialog.style.display = 'none'
  }
}

function openSelectModal() {
  const currentLanguage = getCurrentLanguage()
  const elDialog = document.querySelector('.dialog')
  elDialog.innerHTML = `<div class='dialog-content'>
      <div class='dialog-info'>
        <h2 data-i18n="noImageFound">No image found</h2>
        <p data-i18n="youCan">You can:</p>
        <ul>
          <li data-i18n="goToGallery">Go to the gallery and select an image or meme for editing</li>
          <button onclick="window.location.href='gallery.html?lang=${currentLanguage}'" data-i18n="goToGallery">Go to Gallery</button>
          <li data-i18n="uploadFromComputer">Upload an image from your computer to create a meme</li>
          <input type='file' id='imgInput' class='pointer' accept='image/*' />
          <button onclick='uploadImageFromFile()' data-i18n="uploadFromComputer">Upload from Computer</button>
          <li data-i18n="chooseImage">Choose an image from the web</li>
          <input type='text' id='imgUrl' placeholder='Enter image URL' />
          <button onclick='createMemeFromUrl()' data-i18n="createMemeFromUrl">Create Meme from URL</button>
          <li data-i18n="generateRandomMeme">Generate a random meme</li>
          <button onclick='generateRandomMeme()' data-i18n="generateRandomMeme">Generate Random Meme</button>
        </ul>
      </div>
    </div>`

  elDialog.style.display = 'flex'
  onInitPage()
}

function toggleCanvas() {
  const elCanvas = document.querySelector('.canvas')
  elCanvas.style.display = 'flex'
}

function focusOnInputText() {
  document.getElementById('textLineInput').focus()
}

function updateTextInput() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange

  document.getElementById('textLineInput').value = memeData.imgLines[lineNumber].text
}

function updateSelectList() {
  const elSelect = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  elSelect.innerHTML = ''

  memeData.imgLines.forEach((line, index) => {
    const option = document.createElement('option')
    option.value = index
    option.textContent = line.text || `Line ${index + 1}`
    elSelect.appendChild(option)
  })

  elSelect.value = memeData.lineInChange
}

function selectTextFromList() {
  const elSelect = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  const index = parseInt(elSelect.value, 10)

  if (!isNaN(index) && index >= 0 && index < memeData.imgLines.length) {
    memeData.lineInChange = index
    updateControlPanel(memeData.imgLines[index])
    drawTextOnCanvas()
  }
}

function updateControlPanel(line) {
  document.getElementById('textLineInput').value = line.text
  document.getElementById('textSize').value = line.sizeText
  document.getElementById('textColor').value = line.colorText
  document.getElementById('fontStyle').value = line.styleText
  document.getElementById('opacity').value = line.opacity * 100
  document.getElementById('backgroundColor').value = line.backgroundColor || 'transparent'

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
