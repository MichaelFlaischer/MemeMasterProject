'use strict'

function onInitGallery() {
  menuRender()
  renderGallery()
}

function renderGallery() {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  const paintings = getSavedPaintings()

  paintings.forEach((painting) => {
    const imgElement = document.createElement('img')
    imgElement.src = painting.img
    imgElement.alt = painting.name
    imgElement.addEventListener('click', () => openDialog(painting.id))
    gallery.appendChild(imgElement)
  })
}

function openDialog(id) {
  const paintings = JSON.parse(localStorage.getItem('paintings')) || []
  const painting = paintings.find((painting) => painting.id === id)

  if (!painting) return

  let src = painting.img
  let alt = painting.name

  document.querySelector('.dialog').innerHTML = `      <div class="dialog-content">
        <span class="close" onclick="closeDialog()">&times;</span>
        <img class="dialog-img" src="${src}" alt="${alt}" />
        <div class="dialog-info">
          <h2 id="paintingName">${painting.name}</h2>
          <p id="artistName">${painting.artist}</p>
          <p id="artistEmail">${painting.email}</p>
          <p id="paintingType">${painting.type}</p>
          <p id="paintingDate">${painting.date}</p>
          <p id="paintingTime">${painting.time}</p>
        </div>
        <button onclick="closeDialog()">Close</button>
        <button onclick="deletePainting('${id}')">Delete This Painting</button>
      </div>`

  document.querySelector('.dialog').style.display = 'flex'
}

function deletePainting(id) {
  deletePaintingById(id)
  renderGallery()
  closeDialog()
}
function closeDialog() {
  const dialog = document.querySelector('.dialog')
  dialog.style.display = 'none'
}
