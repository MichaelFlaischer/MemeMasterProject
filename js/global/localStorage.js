'use strict'

function saveImage(image) {
  const type = image.typeImg
  const storedImages = JSON.parse(localStorage.getItem(type)) || []
  storedImages.push(image)
  localStorage.setItem(type, JSON.stringify(storedImages))
  addKeywordsSearch(image.keyword)
}

function getAllMeme() {
  return JSON.parse(localStorage.getItem('meme')) || []
}

function getAllBaseImages() {
  return JSON.parse(localStorage.getItem('base')) || []
}

function deleteImageById(id, type = 'base') {
  const allImages = JSON.parse(localStorage.getItem(type)) || []
  const filteredImages = allImages.filter((image) => image.imgID !== id)
  localStorage.setItem(type, JSON.stringify(filteredImages))
  updateKeywordSearches()
}

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

function getImagesByKeyword(keywordSearch) {
  const allBaseImages = [...getAllBaseImages(), ...getAllMeme()]
  return allBaseImages.filter((image) => {
    return image.keyword.some((keyword) => keyword.toLowerCase().includes(keywordSearch.toLowerCase()))
  })
}

function getKeywordsByCharacters(characters) {
  const allKeywords = getAllKeywords()
  return allKeywords.filter((keyword) => keyword.includes(characters))
}

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

function addKeywordsSearch(keywords) {
  keywords.map((keyword) => addKeywordSearch(keyword))
}

function getKeywordSearches() {
  const keywordSearches = JSON.parse(localStorage.getItem('keywordSearches')) || []
  return shuffleArray(keywordSearches)
}

function updateKeywordSearches() {
  const allKeywords = getAllKeywords()
  let keywordSearches = JSON.parse(localStorage.getItem('keywordSearches')) || []
  keywordSearches = keywordSearches.filter((keywordSearch) => allKeywords.includes(keywordSearch.keyword))
  localStorage.setItem('keywordSearches', JSON.stringify(keywordSearches))
}

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

function saveColors(backgroundColor, backgroundColorMain, textColor) {
  const colors = {
    backgroundColor: backgroundColor,
    backgroundColorMain: backgroundColorMain,
    textColor: textColor,
  }
  localStorage.setItem('siteColors', JSON.stringify(colors))

  applyColorsOnSite()
}

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

function applyColorsOnSite() {
  const colors = getSiteColors()

  document.documentElement.style.setProperty('--bg-color-light', colors.backgroundColor)
  document.documentElement.style.setProperty('--bg-color-main', colors.backgroundColorMain)
  document.documentElement.style.setProperty('--text-color', colors.textColor)
}

function resetColorsToDefault() {
  const defaultColors = {
    backgroundColor: '#e0e0e0',
    backgroundColorMain: '#f5f5f5',
    textColor: 'black',
  }

  saveColors(defaultColors.backgroundColor, defaultColors.backgroundColorMain, defaultColors.textColor)
}

function getImageByIdAndType(type, id) {
  const storedImages = JSON.parse(localStorage.getItem(type)) || []
  const image = storedImages.find((image) => image.imgID === id)
  return image || null
}
