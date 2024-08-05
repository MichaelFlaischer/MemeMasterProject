'use strict'
function onInitMeme() {
  menuRender()

  const searchParams = new URLSearchParams(window.location.search)
  const imgType = searchParams.get('imgtype')
  const imgId = searchParams.get('imgid')

  let image = getImageByIdAndType(imgType, imgId)
  if (image !== null) console.log(image)
  else openSelectModal()
}

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
      <p><h2>No image found for the given details.</h2></p>
      <p>You can:</p>
      <ul>
        <li>Go to the gallery and select an image or meme for editing</li>
          <button onclick="window.location.href='gallery.html'">Go to Gallery</button>
        <li>Upload an image from your computer to create a meme</li>
          <input type="file" id="imgInput" class="pointer" accept="image/*" onchange="previewImage(event)" />
      <button onclick="uploadImageFromFile()">Upload from Computer</button>
        <li>Choose an image from the web</li>
           <input type="text" id="imgUrl" placeholder="Enter image URL" />
           <button onclick="createMemeFromUrl()">Create Meme from URL</button>
      </ul>

    </div>
  </div>`

  document.querySelector('.dialog').style.display = 'flex'
}

function uploadImageFromFile() {
  const imgInput = document.getElementById('imgInput').files[0]
  if (imgInput) {
    const reader = new FileReader()
    reader.onload = function (e) {
      createMeme(e.target.result)
    }
    reader.readAsDataURL(imgInput)
  } else {
    alert('Please select an image file to upload.')
  }
}
