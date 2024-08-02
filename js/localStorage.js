'use strict'

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()
  reader.onload = function (event) {
    let elImg = new Image()
    elImg.src = event.target.result
    elImg.onload = () => onImageReady(elImg)
  }
  reader.readAsDataURL(ev.target.files[0])
}

function downloadCanvas(elLink) {
  const data = getCanvasDataUR()
  elLink.href = data
  elLink.download = 'my-canvas.png'
}

function savePaintingToGallery(paintingName, paintingType, artistName, artistEmail) {
  const id = generateUniqueId()
  const canvasData = getCanvasDataUR()
  const date = new Date()
  const painting = {
    id,
    name: paintingName,
    type: paintingType,
    artist: artistName,
    email: artistEmail,
    img: canvasData,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  }
  const paintings = getSavedPaintings()
  paintings.push(painting)
  localStorage.setItem('paintings', JSON.stringify(paintings))
}

function getSavedPaintings() {
  const paintings = localStorage.getItem('paintings')
  return paintings ? JSON.parse(paintings) : []
}

function getArtPaintings() {
  const paintings = getSavedPaintings()
  return paintings.filter((painting) => painting.type.toLowerCase() === 'art')
}

function getMemePaintings() {
  const paintings = getSavedPaintings()
  return paintings.filter((painting) => painting.type.toLowerCase() === 'meme')
}

function deletePaintingById(id) {
  let paintings = JSON.parse(localStorage.getItem('paintings'))
  if (!paintings) {
    return
  }

  paintings = paintings.filter((painting) => painting.id !== id)

  localStorage.setItem('paintings', JSON.stringify(paintings))
}
