'use strict'

function saveImage(image) {
  const type = image.typeImg
  const storedImages = JSON.parse(localStorage.getItem(type)) || []
  storedImages.push(image)
  localStorage.setItem(type, JSON.stringify(storedImages))
  addKeywordsSearch(image.keyword)
}

function getAllPaintings() {
  return JSON.parse(localStorage.getItem('painting')) || []
}

function getAllBaseImages() {
  return JSON.parse(localStorage.getItem('base')) || []
}

function deleteImageById(id) {
  const filteredImages = getAllBaseImages().filter((image) => image.imgID !== id)
  localStorage.setItem('base', JSON.stringify(filteredImages))
  updateKeywordSearches()
}
function getAllKeywords() {
  const allImages = [...getAllBaseImages()]
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
  const allBaseImages = getAllBaseImages()
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
  console.log(keywordSearches)
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
