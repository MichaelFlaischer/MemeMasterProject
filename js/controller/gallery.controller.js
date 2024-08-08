'use strict'

// Function to render the gallery with images based on the selected type or keyword
function renderGallery(keyword = null) {
  const gallery = document.querySelector('.gallery')
  let type = document.querySelector('.filterSelect').value

  // Add "Add Image" button
  gallery.innerHTML = `
      <div class="image-container">
        <p data-i18n="addImage">Add Image</p>
        <img src="img/addImageButton.png" alt="add image" onclick="openDialog()" />
      </div>`

  // If no keyword is provided, show images by type
  if (keyword === null || keyword.length === 0) {
    showByType(type)
  } else {
    // Filter images by keyword
    let images = getImagesByKeyword(keyword)
    addKeywordSearch(keyword)
    if (type !== 'all') {
      images = images.filter((image) => image.typeImg === type)
    }

    // Display filtered images
    images.forEach((image) => {
      gallery.innerHTML += `
      <div class="image-container">
      <p>${image.imgName}</p>
      <img src="${image.imgSource}" alt="${image.imgName}" onclick="openDialog('${image.imgID}', '${image.typeImg}')" />
      </div>`
    })
  }
}

// Function to open the modal to show image details
function openShowModal(id, type) {
  const currentLanguage = getCurrentLanguage()
  const images = JSON.parse(localStorage.getItem(type)) || []
  const image = images.find((image) => image.imgID === id)
  if (!image) return

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
          <td data-i18n="creatorName">Creator Name</td>
          <td>${image.creator}</td>
        </tr>
        <tr>
          <td data-i18n="type">Type</td>
          <td>${image.typeImg}</td>
        </tr>
        <tr>
          <td data-i18n="date">Date</td>
          <td>${image.date}</td>
        </tr>
        <tr>
          <td data-i18n="keywords">Keywords</td>
          <td>${image.keyword.join(', ')}</td>
        </tr>
        <tr>
          <td data-i18n="backgroundColor">Background Color</td>
          <td><input type="color" id="backgroundColor" value="${image.colors.backgroundColor}" disabled /></td>
        </tr>
        <tr>
          <td data-i18n="backgroundColorMain">Background Color Main</td>
          <td><input type="color" id="backgroundColorMain" value="${image.colors.backgroundColorMain}" disabled /></td>
        </tr>
        <tr>
          <td data-i18n="textColor">Text Color</td>
          <td><input type="color" id="textColor" value="${image.colors.textColor}" disabled /></td>
        </tr>
      </table>
    </div>
    <button onclick="saveColors('${image.colors.backgroundColor}', '${image.colors.backgroundColorMain}', '${
    image.colors.textColor
  }')" data-i18n="changeTheme">Change Theme</button>
    <button onclick="window.location.href='generator.html?imgtype=${image.typeImg}&imgid=${
    image.imgID
  }&lang=${currentLanguage}'" data-i18n="createMEME">Create MEME</button>
    <button onclick="deleteImage('${id}','${image.typeImg}')" data-i18n="deleteThisImage">Delete This Image</button>
    <button onclick="downloadImage('${image.imgSource}')" data-i18n="downloadImage">Download Image</button>
    <button onclick="shareImage('${image.imgSource}')" data-i18n="shareThisImage">Share This Image</button>
    </div>`

  document.querySelector('.dialog').style.display = 'flex'
  onInitPage() // Initialize translations and styles
}

// Function to open the modal to add a new image
function openEditModal() {
  document.querySelector('.dialog').innerHTML = `
  <div class="dialog-content">
    <span class="close" onclick="closeDialog()">&times;</span>
    <img class="dialog-img" src="img/addImageButton.png" alt="Add image" />
    <input type="file" id="imgInput" class="pointer" accept="image/*" onchange="previewImage(event)" required />
    <div class="dialog-info">
      <table>
        <tr>
          <td data-i18n="imageName">Image Name</td>
          <td><input type="text" id="imgName" placeholder="Image Name" required /></td>
        </tr>
        <tr>
          <td data-i18n="creatorName">Creator Name</td>
          <td><input type="text" id="creatorName" placeholder="Creator Name" required /></td>
        </tr>
        <tr style="display:none;">
          <td><input type="text" id="typeImg" value="base" disabled /></td>
        </tr>
        <tr>
          <td data-i18n="keywords">Keywords</td>
          <td><input type="text" id="imgKeywords" placeholder="Keywords (comma separated)" required /></td>
        </tr>
        <tr>
          <td data-i18n="backgroundColor">Background Color</td>
          <td><input type="color" id="backgroundColor" class="pointer" value="#ffffff" required /></td>
        </tr>
        <tr>
          <td data-i18n="backgroundColorMain">Background Color Main</td>
          <td><input type="color" id="backgroundColorMain" class="pointer" value="#ffffff" required /></td>
        </tr>
        <tr>
          <td data-i18n="textColor">Text Color</td>
          <td><input type="color" id="textColor" class="pointer" value="#000000" required /></td>
        </tr>
      </table>
    </div>
    <button onclick="saveImageToGallery()" data-i18n="saveToGallery">Save Image</button>
  </div>`

  document.querySelector('.dialog').style.display = 'flex'
  onInitPage() // Initialize translations and styles
}

// Function to load keywords by characters entered
function loadKeywordsByChar(characters) {
  const elKeywordList = document.getElementById('keywordList')
  let optionsList = ''
  const keywords = getKeywordsByCharacters(characters)
  keywords.forEach((keyword) => {
    optionsList += `<option value="${keyword}">`
  })
  elKeywordList.innerHTML = optionsList
}

// Function to close the dialog
function closeDialog(event = null) {
  if (event === null || event.key === 'Escape') {
    const elDialog = document.querySelector('.dialog')
    elDialog.style.display = 'none'
  }
}

// Function to render keywords in the keyword container
function renderKeywords() {
  const keywordContainer = document.querySelector('.keywordContainer')
  const keywordSearches = isMobileDevice() ? getKeywordSearches().slice(0, 5) : getKeywordSearches().slice(0, 15)
  let kewWordHtml = ''
  keywordContainer.innerHTML = ''

  keywordSearches.forEach((keywordSearch) => {
    const fontSize = Math.min(keywordSearch.times * 0.1 + 2, 4.5)
    kewWordHtml += `<span class="keyword" style="font-size: ${fontSize}vh;" onclick="showSelectedKeyword('${keywordSearch.keyword}')">${keywordSearch.keyword}</span>`
  })
  kewWordHtml += `<span class="keyword" style="font-size: 40px;" onclick="showAllKeyWords()">...</span>`
  keywordContainer.innerHTML = kewWordHtml
}

// Function to show all keywords
function showAllKeyWords() {
  const keywordContainer = document.querySelector('.keywordContainer')
  const keywordSearches = getKeywordSearches()
  let kewWordHtml = ''
  keywordContainer.innerHTML = ''

  keywordSearches.forEach((keywordSearch) => {
    const fontSize = Math.min(keywordSearch.times * 0.1 + 2, 4.5)
    kewWordHtml += `<span class="keyword" style="font-size: ${fontSize}vh;" onclick="showSelectedKeyword('${keywordSearch.keyword}')">${keywordSearch.keyword}</span>`
  })
  kewWordHtml += `<span class="keyword" style="font-size: 40px;" onclick="renderKeywords()">(-)</span>`

  keywordContainer.innerHTML = kewWordHtml
}

// Function to show selected keyword
function showSelectedKeyword(keyword) {
  const elKeywordList = document.getElementById('keywordInput')
  elKeywordList.value = keyword
  renderGallery(keyword)
  renderKeywords()
}

// Function to clear the search input
function clearSearchInput() {
  const elKeywordList = document.getElementById('keywordInput')
  elKeywordList.value = ''
  renderGallery()
}

// Function to preview image before uploading
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

// Function to validate input fields in the dialog
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

// Function to save image to the gallery
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

// Function to show images by type (all, base, meme)
function showByType() {
  let images
  let type = document.querySelector('.filterSelect').value
  if (type === 'all') {
    images = [...getAllBaseImages(), ...getAllMeme()]
  } else if (type === 'base') {
    images = getAllBaseImages()
  } else if (type === 'meme') {
    images = getAllMeme()
  }

  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = `
      <div class="image-container">
        <p data-i18n="addImage">Add Image</p>
        <img src="img/addImageButton.png" alt="add image" onclick="openDialog()" />
      </div>`

  images.forEach((image) => {
    gallery.innerHTML += `
      <div class="image-container">
        <p>${image.imgName}</p>
        <img src="${image.imgSource}" alt="${image.imgName}" onclick="openDialog('${image.imgID}', '${image.typeImg}')" />
      </div>`
  })

  const elKeywordList = document.getElementById('keywordInput')
  elKeywordList.value = ''
  onInitPage() // Initialize translations and styles
}
