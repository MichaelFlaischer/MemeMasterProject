'use strict'

function renderGallery(keyword = null) {
  const gallery = document.querySelector('.gallery')
  if (keyword === null || keyword.length === 0)
    gallery.innerHTML = `
      <div class="image-container">
        <p>Add Image</p>
        <img src="img/addImageButton.png" alt="add image" onclick="openDialog()" />
      </div>`
  else gallery.innerHTML = ''
  let images
  if (keyword === null || keyword.length === 0) images = getAllBaseImages()
  else {
    images = getImagesByKeyword(keyword)
    addKeywordSearch(keyword)
  }
  images.forEach((image) => {
    gallery.innerHTML += `
      <div class="image-container">
        <p>${image.imgName}</p>
        <img src="${image.imgSource}" alt="${image.imgName}" onclick="openDialog('${image.imgID}')" />
      </div>`
  })
}

function openDialog(id = null) {
  if (id !== null) {
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
  } else {
    console.log('asfdsa')
  }
}

function loadKeywordsByChar(characters) {
  const elKeywordList = document.getElementById('keywordList')
  let optionsList = ''
  const keywords = getKeywordsByCharacters(characters)
  keywords.forEach((keyword) => {
    optionsList += `<option value="${keyword}">`
  })
  elKeywordList.innerHTML = optionsList
}

function deletePainting(id) {
  deletePaintingById(id)
  renderGallery()
  closeDialog()
}
function closeDialog(event = null) {
  if (event === null || event.key === 'Escape') {
    const elDialog = document.querySelector('.dialog')
    elDialog.style.display = 'none'
  }
}
