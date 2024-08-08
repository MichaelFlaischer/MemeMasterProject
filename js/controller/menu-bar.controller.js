'use strict'

// Function to render the menu and apply necessary styles and translations
function menuRender() {
  applyColorsOnSite() // Apply the site color scheme

  const elNnav = document.querySelector('nav')
  elNnav.innerHTML = `
        <input type="checkbox" id="active" />
        <label for="active" class="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <div class="nav-container">
          <ul>
            <li><a href="main.html" data-i18n="home">Home</a></li>
            <li><a href="gallery.html" data-i18n="gallery">Gallery</a></li>
            <li><a href="generator.html" data-i18n="generator">Generator</a></li>
            <li><a href="about.html" data-i18n="about">About</a></li>
          </ul>
        </div>
      `
  onInitPage() // Initialize translations and styles
}
