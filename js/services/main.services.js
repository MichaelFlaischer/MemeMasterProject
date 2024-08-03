'use strict'

function onInit() {
  menuRender()
  loadMainVideo()
}

function loadMainVideo() {
  const videoContainer = document.querySelector('.video-container')
  if (videoContainer) {
    videoContainer.innerHTML = `<video loop controls autoplay muted>
          <source src="video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>`
  }
}
