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
  const keywords = new Set()

  allImages.forEach((image) => {
    image.keywords.forEach((keyword) => {
      keywords.add(keyword)
    })
  })

  return Array.from(keywords)
}
