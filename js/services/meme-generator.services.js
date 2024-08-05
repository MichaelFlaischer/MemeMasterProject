'use strict'

function onInitMeme() {
  menuRender()
  createCanvas()

  const searchParams = new URLSearchParams(window.location.search)
  const imgType = searchParams.get('imgtype')
  const imgId = searchParams.get('imgid')

  let image = getImageByIdAndType(imgType, imgId)
  if (image !== null) {
    if (imgType === 'base') {
      getImageDimensions(image.imgSource).then((imgSize) => {
        renderImage(image.imgSource, imgSize, generateUniqueId())
      })
    } else if (imgType === 'meme') {
      //נוציא לפי ID את האובייקט של MEME ונחזיר את המידע שלו לקבנאס
    }
  } else {
    openSelectModal()
  }
}
