'use strict'

// Function to initialize the page
function onInit() {
  // Render the menu
  menuRender()
  // Load the main video in the hero section
  loadMainVideo()
}

// Function to load the main video in the hero section
function loadMainVideo() {
  const videoContainer = document.querySelector('.video-container')
  if (videoContainer) {
    // Insert the video element with controls and autoplay settings
    videoContainer.innerHTML = `<video loop controls autoplay muted>
          <source src="video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>`
  }
}
