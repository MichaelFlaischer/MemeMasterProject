'use strict'

function saveImage(image) {
  const type = image.typeImg
  const storedImages = JSON.parse(localStorage.getItem(type)) || []
  storedImages.push(image)
  localStorage.setItem(type, JSON.stringify(storedImages))
}

function getAllPaintings() {
  return JSON.parse(localStorage.getItem('painting')) || []
}

function getAllBaseImages() {
  return JSON.parse(localStorage.getItem('base')) || []
}

function deleteImageById(id) {
  ;['base', 'painting'].forEach((type) => {
    const storedImages = JSON.parse(localStorage.getItem(type)) || []
    const filteredImages = storedImages.filter((image) => image.imgID !== id)
    localStorage.setItem(type, JSON.stringify(filteredImages))
  })
}

function getAllKeywords() {
  const allImages = [...getAllPaintings(), ...getAllBaseImages()]
  const keywords = []

  allImages.forEach((image) => {
    image.keyword.forEach((keyword) => {
      keywords.push(keyword)
    })
  })

  return keywords
}

function getImagesByKeyword(keywordSearch) {
  const allImages = [...getAllBaseImages()]
  return allImages.filter((image) => {
    return image.keyword.some((keyword) => keyword.includes(keywordSearch))
  })
}

function getKeywordsByCharacters(characters) {
  const allKeywords = getAllKeywords()
  return allKeywords.filter((keyword) => keyword.includes(characters))
}

function addKeywordSearch(keyword) {
  const allKeywords = getAllKeywords()

  if (!allKeywords.includes(keyword)) return

  let keywordSearches = JSON.parse(localStorage.getItem('keywordSearches')) || []
  const keywordIndex = keywordSearches.findIndex((k) => k.keyword === keyword)

  if (keywordIndex > -1) {
    keywordSearches[keywordIndex].times += 1
  } else {
    keywordSearches.push({ keyword: keyword, times: 1 })
  }

  localStorage.setItem('keywordSearches', JSON.stringify(keywordSearches))
}
function getKeywordSearches() {
  return JSON.parse(localStorage.getItem('keywordSearches')) || []
}

function initializeKeywordSearches() {
  const allKeywords = getAllKeywords()
  let keywordSearches = []

  allKeywords.forEach((keyword) => {
    const randomTimes = Math.floor(Math.random() * 100) + 1
    keywordSearches.push({ keyword: keyword, times: randomTimes })
  })

  localStorage.setItem('keywordSearches', JSON.stringify(keywordSearches))
}
