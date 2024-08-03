'use strict'

function renderGallery() {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  const images = getAllBaseImages()

  images.forEach((image) => {
    gallery.innerHTML += `
      <div class="image-container">
        <p>${image.imgName}</p>
        <img src="${image.imgSource}" alt="${image.imgName}" onclick="openDialog('${image.imgID}')" />
      </div>`
  })
}

function openDialog(id) {
  const images = JSON.parse(localStorage.getItem('base')) || []
  const image = images.find((images) => images.imgID === id)

  if (!images) return

  let src = image.imgSource
  let alt = image.imgName

  document.querySelector('.dialog').innerHTML = `
    <div class="dialog-content">
      <span class="close" onclick="closeDialog()">&times;</span>
      <img class="dialog-img" src="${src}" alt="${alt}" />
      <div class="dialog-info">
        <h2>${image.imgName}</h2>
        <table>
          <tr>
            <td>Creator Name</td>
            <td>${image.creator}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>${image.typeImg}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>${image.date}</td>
          </tr>
          <tr>
            <td>Keywords</td>
            <td>${image.keyword.join(', ')}</td>
          </tr>
        </table>
      </div>
      <button onclick="deleteImage('${id}')">Delete This Image</button>
      <button onclick="createMeme('${id}')">Create MEME</button>
    </div>`

  document.querySelector('.dialog').style.display = 'flex'
}

function deletePainting(id) {
  deletePaintingById(id)
  renderGallery()
  closeDialog()
}
function closeDialog() {
  const dialog = document.querySelector('.dialog')
  dialog.style.display = 'none'
}
