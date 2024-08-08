'use strict'

// Function to save an image to localStorage
function saveImage(image) {
  const type = image.typeImg
  const storedImages = JSON.parse(localStorage.getItem(type)) || []
  storedImages.push(image)
  localStorage.setItem(type, JSON.stringify(storedImages))
  addKeywordsSearch(image.keyword)
}

// Function to get all memes from localStorage
function getAllMeme() {
  return JSON.parse(localStorage.getItem('meme')) || []
}

// Function to get all base images from localStorage
function getAllBaseImages() {
  return JSON.parse(localStorage.getItem('base')) || []
}

// Function to delete an image by its ID and type from localStorage
function deleteImageById(id, type) {
  const allImages = JSON.parse(localStorage.getItem(type)) || []
  const filteredImages = allImages.filter((image) => image.imgID !== id)
  localStorage.setItem(type, JSON.stringify(filteredImages))
  updateKeywordSearches()
}

// Function to get all unique keywords from images stored in localStorage
function getAllKeywords() {
  const allImages = [...getAllBaseImages(), ...getAllMeme()]
  const keywordsObj = {}

  allImages.forEach((image) => {
    image.keyword.forEach((keyword) => {
      keywordsObj[keyword] = 1
    })
  })

  let keywords = []
  const keywordsArray = Object.keys(keywordsObj).map((keyword) => {
    keywords.push(keyword)
  })
  return keywords
}

// Function to get images by a specific keyword
function getImagesByKeyword(keywordSearch) {
  const allBaseImages = [...getAllBaseImages(), ...getAllMeme()]
  return allBaseImages.filter((image) => {
    return image.keyword.some((keyword) => keyword.toLowerCase().includes(keywordSearch.toLowerCase()))
  })
}

// Function to get keywords containing specific characters
function getKeywordsByCharacters(characters) {
  const allKeywords = getAllKeywords()
  return allKeywords.filter((keyword) => keyword.includes(characters))
}

// Function to add a keyword search to localStorage
function addKeywordSearch(keyword) {
  const allKeywords = getAllKeywords()

  if (!allKeywords.includes(keyword)) return

  let keywordSearches = getKeywordSearches()
  const keywordIndex = keywordSearches.findIndex((k) => k.keyword === keyword)

  if (keywordIndex > -1) {
    keywordSearches[keywordIndex].times += 1
  } else {
    keywordSearches.push({ keyword: keyword, times: 1 })
  }

  localStorage.setItem('keywordSearches', JSON.stringify(keywordSearches))
}

// Function to add multiple keyword searches to localStorage
function addKeywordsSearch(keywords) {
  keywords.map((keyword) => addKeywordSearch(keyword))
}

// Function to get keyword searches from localStorage and shuffle them
function getKeywordSearches() {
  const keywordSearches = JSON.parse(localStorage.getItem('keywordSearches')) || []
  return shuffleArray(keywordSearches)
}

// Function to update keyword searches in localStorage
function updateKeywordSearches() {
  const allKeywords = getAllKeywords()
  let keywordSearches = JSON.parse(localStorage.getItem('keywordSearches')) || []
  keywordSearches = keywordSearches.filter((keywordSearch) => allKeywords.includes(keywordSearch.keyword))
  localStorage.setItem('keywordSearches', JSON.stringify(keywordSearches))
}

// Function to initialize keyword searches with random times
function initializeKeywordSearches() {
  const allKeywords = getAllKeywords()
  let keywordSearches = []

  allKeywords.forEach((keyword) => {
    addKeywordSearch(keyword)
    const randomTimes = Math.floor(Math.random() * 100) + 1
    keywordSearches.push({ keyword: keyword, times: randomTimes })
  })

  localStorage.setItem('keywordSearches', JSON.stringify(keywordSearches))
}

// Function to save site colors to localStorage
function saveColors(backgroundColor, backgroundColorMain, textColor) {
  const colors = {
    backgroundColor: backgroundColor,
    backgroundColorMain: backgroundColorMain,
    textColor: textColor,
  }
  localStorage.setItem('siteColors', JSON.stringify(colors))

  applyColorsOnSite()
}

// Function to get site colors from localStorage, or set default colors if not found
function getSiteColors() {
  let colors = JSON.parse(localStorage.getItem('siteColors')) || null
  if (!colors) {
    colors = {
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-color-light').trim(),
      backgroundColorMain: getComputedStyle(document.documentElement).getPropertyValue('--bg-color-main').trim(),
      textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
    }

    saveColors(colors.backgroundColor, colors.backgroundColorMain, colors.textColor)
  }

  return colors
}

// Function to apply site colors from localStorage to the document
function applyColorsOnSite() {
  const colors = getSiteColors()

  document.documentElement.style.setProperty('--bg-color-light', colors.backgroundColor)
  document.documentElement.style.setProperty('--bg-color-main', colors.backgroundColorMain)
  document.documentElement.style.setProperty('--text-color', colors.textColor)
}

// Function to reset site colors to default values
function resetColorsToDefault() {
  const defaultColors = {
    backgroundColor: '#e0e0e0',
    backgroundColorMain: '#f5f5f5',
    textColor: 'black',
  }

  saveColors(defaultColors.backgroundColor, defaultColors.backgroundColorMain, defaultColors.textColor)
}

// Function to get an image by its ID and type from localStorage
function getImageByIdAndType(type, id) {
  const storedImages = JSON.parse(localStorage.getItem(type)) || []
  const image = storedImages.find((image) => image.imgID === id)
  return image || null
}
