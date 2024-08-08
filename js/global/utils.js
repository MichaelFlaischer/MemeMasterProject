'use strict'

// Function to get the background color from CSS variables
function getBGColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--bg-color-main')
}

// Function to generate a unique ID of a given length
function generateUniqueId(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let uniqueId = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    uniqueId += characters[randomIndex]
  }
  return uniqueId
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Function to get the current date in DD/MM/YYYY format
function getCurrentDate() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${day}/${month}/${year}`
}

// Function to check if the current device is a mobile device
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent)
}

// Function to get the dimensions of an image from a data URL
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

// Function to show a notification with a given message
function showNotification(message) {
  const elNotification = document.querySelector('.notification')
  elNotification.innerText = message
  elNotification.style.display = 'block'
  onInitPage() // Initialize page for language support

  setTimeout(() => {
    elNotification.style.display = 'none'
  }, 3000)
}
