'use strict'

function getBGColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--bg-color-main')
}

function generateUniqueId(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let uniqueId = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    uniqueId += characters[randomIndex]
  }
  return uniqueId
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function getCurrentDate() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${day}/${month}/${year}`
}

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent)
}

function getImageDimensions(dataUrl) {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = dataUrl
    img.onload = () => {
      const imageSize = {
        width: img.width,
        height: img.height,
      }
      resolve(imageSize)
    }
  })
}

function showNotification(message) {
  const elNotification = document.querySelector('.notification')
  elNotification.innerText = message
  elNotification.style.display = 'block'
  onInitPage()

  setTimeout(() => {
    elNotification.style.display = 'none'
  }, 3000)
}
