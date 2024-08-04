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

function deleteImage(id) {
  deleteImageById(id)
  renderGallery()
  renderKeywords()
  closeDialog()
}
function closeDialog(event = null) {
  if (event === null || event.key === 'Escape') {
    const elDialog = document.querySelector('.dialog')
    elDialog.style.display = 'none'
  }
}

function renderKeywords() {
  const keywordContainer = document.querySelector('.keywordContainer')
  console.log(getAllKeywords())
  const keywordSearches = isMobileDevice() ? getKeywordSearches().slice(0, 10) : getKeywordSearches().slice(0, 20)
  let kewWordHtml = ''
  keywordContainer.innerHTML = ''

  keywordSearches.forEach((keywordSearch) => {
    const fontSize = keywordSearch.times / 1.5 + 3
    kewWordHtml += `<span class="keyword" style="font-size: ${fontSize}px;" onclick="showSelectedKeyword('${keywordSearch.keyword}')">${
      keywordSearch.keyword + ' ' + isMobileDevice()
    }</span>`
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
    const fontSize = keywordSearch.times / 1.5 + 3
    kewWordHtml += `<span class="keyword" style="font-size: ${fontSize}px;" onclick="showSelectedKeyword('${keywordSearch.keyword}')">${keywordSearch.keyword}</span>`
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
