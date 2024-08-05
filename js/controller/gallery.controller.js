'use strict'

function renderGallery(keyword = null) {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = `
      <div class="image-container">
        <p>Add Image</p>
        <img src="img/addImageButton.png" alt="add image" onclick="openDialog()" />
      </div>`
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

function openShowModal(id) {
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
        <tr>
          <td>Background Color</td>
          <td><input type="color" id="backgroundColor" value="${image.colors.backgroundColor}" disabled /></td>
        </tr>
        <tr>
          <td>Background Color Main</td>
          <td><input type="color" id="backgroundColorMain" value="${image.colors.backgroundColorMain}" disabled /></td>
        </tr>
        <tr>
          <td>Text Color</td>
          <td><input type="color" id="textColor" value="${image.colors.textColor}" disabled /></td>
        </tr>
      </table>
    </div>
    <button onclick="deleteImage('${id}')">Delete This Image</button>
    <button onclick="createMeme('${id}')">Create MEME</button>
  </div>`

  document.querySelector('.dialog').style.display = 'flex'
}
function openEditModal() {
  document.querySelector('.dialog').innerHTML = `
  <div class="dialog-content">
    <span class="close" onclick="closeDialog()">&times;</span>
    <img class="dialog-img" src="img/addImageButton.png" alt="Add image" />
    <input type="file" id="imgInput" class="pointer" accept="image/*" onchange="previewImage(event)" required />
    <div class="dialog-info">
      <table>
        <tr>
          <td>Image Name</td>
          <td><input type="text" id="imgName" placeholder="Image Name" required /></td>
        </tr>
        <tr>
          <td>Creator Name</td>
          <td><input type="text" id="creatorName" placeholder="Creator Name" required /></td>
        </tr>
        <tr style="display:none;">
          <td><input type="text" id="typeImg" value="base" disabled /></td>
        </tr>
        <tr>
          <td>Keywords</td>
          <td><input type="text" id="imgKeywords" placeholder="Keywords (comma separated)" required /></td>
        </tr>
        <tr>
          <td>Background Color</td>
          <td><input type="color" id="backgroundColor" class="pointer" value="#ffffff" required /></td>
        </tr>
        <tr>
          <td>Background Color Main</td>
          <td><input type="color" id="backgroundColorMain" class="pointer" value="#ffffff" required /></td>
        </tr>
        <tr>
          <td>Text Color</td>
          <td><input type="color" id="textColor" class="pointer" value="#000000" required /></td>
        </tr>
      </table>
    </div>
    <button onclick="saveImageToGallery()">Save Image</button>
    <button onclick="saveAndEditImage()">Save and Edit Image</button>
  </div>`

  document.querySelector('.dialog').style.display = 'flex'
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

function closeDialog(event = null) {
  if (event === null || event.key === 'Escape') {
    const elDialog = document.querySelector('.dialog')
    elDialog.style.display = 'none'
  }
}

function renderKeywords() {
  const keywordContainer = document.querySelector('.keywordContainer')
  const keywordSearches = isMobileDevice() ? getKeywordSearches().slice(0, 5) : getKeywordSearches().slice(0, 15)
  let kewWordHtml = ''
  keywordContainer.innerHTML = ''

  keywordSearches.forEach((keywordSearch) => {
    const fontSize = keywordSearch.times * 0.1 + 2
    kewWordHtml += `<span class="keyword" style="font-size: ${fontSize}vh;" onclick="showSelectedKeyword('${keywordSearch.keyword}')">${keywordSearch.keyword}</span>`
  })
  kewWordHtml += `<span class="keyword" style="font-size: 40px;" onclick="showAllKeyWords()">...</span>`
  keywordContainer.innerHTML = kewWordHtml
}

function showAllKeyWords() {
  const keywordContainer = document.querySelector('.keywordContainer')
  const keywordSearches = getKeywordSearches()
  let kewWordHtml = ''
  keywordContainer.innerHTML = ''

  keywordSearches.forEach((keywordSearch) => {
    const fontSize = keywordSearch.times * 0.1 + 2
    kewWordHtml += `<span class="keyword" style="font-size: ${fontSize}vh;" onclick="showSelectedKeyword('${keywordSearch.keyword}')">${keywordSearch.keyword}</span>`
  })
  kewWordHtml += `<span class="keyword" style="font-size: 40px;" onclick="renderKeywords()">(-)</span>`

  keywordContainer.innerHTML = kewWordHtml
}

function showSelectedKeyword(keyword) {
  const elKeywordList = document.getElementById('keywordInput')
  elKeywordList.value = keyword
  renderGallery(keyword)
  renderKeywords()
}

function clearSearchInput() {
  const elKeywordList = document.getElementById('keywordInput')
  elKeywordList.value = ''
  renderGallery()
}

function previewImage(event) {
  const imgPreview = document.querySelector('.dialog-img')
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      imgPreview.src = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imgPreview.src = 'img/addImageButton.png'
  }
}

function validateInputs() {
  const imgInput = document.getElementById('imgInput').files.length
  const imgName = document.getElementById('imgName').value.trim()
  const creatorName = document.getElementById('creatorName').value.trim()
  const imgKeywords = document.getElementById('imgKeywords').value.trim()

  if (!imgInput || !imgName || !creatorName || !imgKeywords) {
    showNotification('Please fill in all fields.')
    return false
  }
  return true
}

function showNotification(message) {
  const notification = document.querySelector('.notification')
  notification.innerText = message
  notification.style.display = 'block'

  setTimeout(() => {
    notification.style.display = 'none'
  }, 3000)
}

function saveImageToGallery() {
  if (!validateInputs()) return

  const imgInput = document.getElementById('imgInput')
  const imgName = document.getElementById('imgName').value
  const creatorName = document.getElementById('creatorName').value
  const imgDate = getCurrentDate()
  let keywords = []
  const colors = {
    backgroundColor: document.getElementById('backgroundColor').value,
    backgroundColorMain: document.getElementById('backgroundColorMain').value,
    textColor: document.getElementById('textColor').value,
  }
  const imgKeywords = document.getElementById('imgKeywords').value.split(/[ ,]+/)

  const imgType = 'base'

  if (imgInput.files && imgInput.files[0]) {
    const reader = new FileReader()
    reader.onload = function (e) {
      const imgSource = e.target.result
      const newImage = {
        imgID: generateUniqueId(),
        imgSource: imgSource,
        imgName: imgName,
        creator: creatorName,
        date: imgDate,
        keyword: imgKeywords,
        typeImg: imgType,
        colors: colors,
      }

      saveImage(newImage)
      renderKeywords()
      renderGallery()
      showNotification('Image saved successfully!')
      closeDialog()
    }
    reader.readAsDataURL(imgInput.files[0])
  }
}
