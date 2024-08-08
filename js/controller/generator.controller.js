'use strict'

// Function to save the current meme to the gallery
function saveToGallery() {
  // Draw the text on canvas without selection boxes
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
  drawTextOnCanvas(false) // Draw the text on canvas with selection boxes
}

// Function to show the save dialog
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
  onInitPage() // Initialize translations and styles
}

// Function to close the dialog
function closeDialog() {
  let memeData = getMemeData()
  if (memeData.imgLines.length > 0) {
    const elDialog = document.querySelector('.dialog')
    elDialog.style.display = 'none'
  }
}

// Function to open the select modal
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
  onInitPage() // Initialize translations and styles
}

// Function to toggle the canvas visibility
function toggleCanvas() {
  const elCanvas = document.querySelector('.canvas')
  elCanvas.style.display = 'flex'
}

// Function to focus on the text input field
function focusOnInputText() {
  document.getElementById('textLineInput').focus()
}

// Function to update the text input field with the current line text
function updateTextInput() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange

  document.getElementById('textLineInput').value = memeData.imgLines[lineNumber].text
}

// Function to update the select list with the text lines
function updateSelectList() {
  const elSelect = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  elSelect.innerHTML = ''

  // Populate the select list with text lines
  memeData.imgLines.forEach((line, index) => {
    const option = document.createElement('option')
    option.value = index
    option.textContent = line.text || `Line ${index + 1}`
    elSelect.appendChild(option)
  })

  elSelect.value = memeData.lineInChange
}

// Function to select a text line from the list
function selectTextFromList() {
  const elSelect = document.getElementById('textLineSelect')
  const memeData = getMemeData()
  const index = parseInt(elSelect.value, 10)

  // Update the current line in change and redraw the canvas
  if (!isNaN(index) && index >= 0 && index < memeData.imgLines.length) {
    memeData.lineInChange = index
    updateControlPanel(memeData.imgLines[index])
    drawTextOnCanvas()
  }
}

// Function to update the control panel with the selected line's properties
function updateControlPanel(line) {
  document.getElementById('textLineInput').value = line.text
  document.getElementById('textSize').value = line.sizeText
  document.getElementById('textColor').value = line.colorText
  document.getElementById('fontStyle').value = line.styleText
  document.getElementById('opacity').value = line.opacity * 100
  document.getElementById('backgroundColor').value = line.backgroundColor || 'transparent'

  // Update bold button style
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

  // Update italic button style
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

  // Update underline button style
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
