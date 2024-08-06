'use strict'

function showNotification(message) {
  const notification = document.querySelector('.notification')
  notification.innerText = message
  notification.style.display = 'block'

  setTimeout(() => {
    notification.style.display = 'none'
  }, 3000)
}

function openSelectModal() {
  document.querySelector('.dialog').innerHTML = `
    <div class="dialog-content">
      <div class="dialog-info">
        <h2>No image found</h2>
        <p>You can:</p>
        <ul>
          <li>Go to the gallery and select an image or meme for editing</li>
          <button onclick="window.location.href='gallery.html'">Go to Gallery</button>
          <li>Upload an image from your computer to create a meme</li>
          <input type="file" id="imgInput" class="pointer" accept="image/*"/>
        <button onclick="uploadImageFromFile()">Upload from Computer</button>
          <li>Choose an image from the web</li>
          <input type="text" id="imgUrl" placeholder="Enter image URL" />
          <button onclick="createMemeFromUrl()">Create Meme from URL</button>
        </ul>
      </div>
    </div>`

  document.querySelector('.dialog').style.display = 'flex'
}

function closeDialog() {
  const elDialog = document.querySelector('.dialog')
  elDialog.style.display = 'none'
}

function toggleCanvas() {
  const elCanvas = document.querySelector('.canvas')
  elCanvas.style.display = 'flex'
}

function updateTextInput() {
  let memeData = getMemeData()
  let lineNumber = memeData.lineInChange

  document.getElementById('textLineInput').value = memeData.imgLines[lineNumber].text
}
