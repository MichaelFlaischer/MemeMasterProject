'use strict'

function menuRender() {
  applyColorsOnSite()

  const elNnav = document.querySelector('nav')
  elNnav.innerHTML = `
        <input type="checkbox" id="active" />
        <label for="active" class="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <div class="nav-container">
          <ul>
            <li><a href="main.html">Home</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="generator.html">Generator</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
      `
}
