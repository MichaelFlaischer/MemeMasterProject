'use strict'

// Initialize gallery on page load
function onInitGallery() {
  menuRender() // Render the navigation menu
  checkMemoryNotEmpty() // Check if there are images in memory, if not generate default images
  renderGallery() // Render the gallery of images
  renderKeywords() // Render the keywords for search
}

// Save and edit image in the gallery
function saveAndEditImage() {
  if (!validateInputs()) return // Validate the input fields

  saveImageToGallery() // Save the image to the gallery
  showNotification('Image saved and ready for editing!') // Show notification
}

// Open a dialog for viewing or editing an image
function openDialog(id = null, type = null) {
  if (id !== null) {
    openShowModal(id, type) // Open modal to show image details
  } else {
    openEditModal() // Open modal to edit image details
  }
}

// Delete an image from the gallery
function deleteImage(id, type) {
  deleteImageById(id, type) // Delete the image by ID and type
  renderGallery() // Re-render the gallery
  renderKeywords() // Re-render the keywords
  showNotification('Image deleted successfully!') // Show notification
  closeDialog() // Close the dialog
}

// Create an image object
function createImageObject(imgSource, imgName, creator, date, keywords, colors) {
  return {
    imgID: generateUniqueId(), // Generate a unique ID for the image
    imgSource: imgSource,
    imgName: imgName,
    creator: creator,
    date: date,
    keyword: keywords,
    colors: colors,
    typeImg: 'base', // Default image type
  }
}

// Check if memory is not empty, otherwise generate default images
function checkMemoryNotEmpty() {
  if (getAllBaseImages().length < 1) {
    let images = generateImageArray() // Generate an array of default images
    images.forEach((image) => saveImage(image)) // Save each image to local storage
    initializeKeywordSearches() // Initialize keyword searches
  }
}

// Generate an array of default images
function generateImageArray() {
  const images = [
    {
      imgID: 'A1b2C3d4E5',
      imgSource: 'img/2.jpg',
      imgName: 'Mountain Girl',
      creator: 'John Doe',
      date: '2022-01-01',
      keywords: ['mountain', 'girl', 'nature', 'landscape', 'outdoors', 'scenery', 'hiking', 'adventure'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#a1c4fd',
        backgroundColorMain: '#c2e9fb',
        textColor: '#ffffff',
      },
    },
    {
      imgID: 'F6g7H8i9J0',
      imgSource: 'img/003.jpg',
      imgName: 'Trump Speech',
      creator: 'Jane Smith',
      date: '2021-06-15',
      keywords: ['trump', 'speech', 'politics', 'president', 'event', 'leader', 'address', 'public'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#d32f2f',
        backgroundColorMain: '#f44336',
        textColor: '#ffffff',
      },
    },
    {
      imgID: 'K1l2M3n4O5',
      imgSource: 'img/004.jpg',
      imgName: 'Dog Kisses',
      creator: 'Alex Johnson',
      date: '2023-02-10',
      keywords: ['dogs', 'kisses', 'pets', 'animals', 'cute', 'love', 'affection', 'companionship'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ffab91',
        backgroundColorMain: '#ffccbc',
        textColor: '#000000',
      },
    },
    {
      imgID: 'P6q7R8s9T0',
      imgSource: 'img/005.jpg',
      imgName: 'Baby and Dog',
      creator: 'Emily Davis',
      date: '2020-11-20',
      keywords: ['baby', 'dog', 'cute', 'friendship', 'adorable', 'family', 'bond', 'innocence'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#f48fb1',
        backgroundColorMain: '#f8bbd0',
        textColor: '#000000',
      },
    },
    {
      imgID: 'U1v2W3x4Y5',
      imgSource: 'img/5.jpg',
      imgName: 'Beach Kid',
      creator: 'Michael Brown',
      date: '2019-07-30',
      keywords: ['beach', 'kid', 'summer', 'fun', 'holiday', 'sun', 'vacation', 'play'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#81d4fa',
        backgroundColorMain: '#b3e5fc',
        textColor: '#000000',
      },
    },
    {
      imgID: 'Z6a7B8c9D0',
      imgSource: 'img/006.jpg',
      imgName: 'Cat Relaxing',
      creator: 'Sarah Wilson',
      date: '2023-05-25',
      keywords: ['cat', 'relax', 'pet', 'comfortable', 'cute', 'rest', 'sleep', 'calm'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#a5d6a7',
        backgroundColorMain: '#c8e6c9',
        textColor: '#000000',
      },
    },
    {
      imgID: 'E1f2G3h4I5',
      imgSource: 'img/8.jpg',
      imgName: 'Wonka Meme',
      creator: 'Daniel Taylor',
      date: '2022-03-18',
      keywords: ['wonka', 'meme', 'funny', 'classic', 'reaction', 'sarcasm', 'humor', 'joke'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ce93d8',
        backgroundColorMain: '#e1bee7',
        textColor: '#000000',
      },
    },
    {
      imgID: 'J6k7L8m9N0',
      imgSource: 'img/9.jpg',
      imgName: 'Confused Kid',
      creator: 'Laura Martin',
      date: '2021-08-12',
      keywords: ['confused', 'kid', 'funny', 'expression', 'reaction', 'puzzled', 'perplexed', 'face'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ffcc80',
        backgroundColorMain: '#ffe0b2',
        textColor: '#000000',
      },
    },
    {
      imgID: 'O1p2Q3r4S5',
      imgSource: 'img/12.jpg',
      imgName: 'Old Man Thinking',
      creator: 'Kevin Moore',
      date: '2020-09-22',
      keywords: ['old', 'man', 'thinking', 'pondering', 'wisdom', 'reflection', 'thoughtful', 'elder'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#bcaaa4',
        backgroundColorMain: '#d7ccc8',
        textColor: '#000000',
      },
    },
    {
      imgID: 'T6u7V8w9X0',
      imgSource: 'img/19.jpg',
      imgName: 'Surprised Man',
      creator: 'Brian Lee',
      date: '2023-07-01',
      keywords: ['surprised', 'man', 'reaction', 'shocked', 'expression', 'amazed', 'astonished', 'face'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ffab91',
        backgroundColorMain: '#ffccbc',
        textColor: '#000000',
      },
    },
    {
      imgID: 'Y1z2A3b4C5',
      imgSource: 'img/Ancient-Aliens.jpg',
      imgName: 'Ancient Aliens',
      creator: 'Kim White',
      date: '2022-10-11',
      keywords: ['aliens', 'history', 'meme', 'theory', 'extraterrestrial', 'space', 'mystery', 'conspiracy'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#a1887f',
        backgroundColorMain: '#bcaaa4',
        textColor: '#000000',
      },
    },
    {
      imgID: 'D6e7F8g9H0',
      imgSource: 'img/drevil.jpg',
      imgName: 'Dr. Evil',
      creator: 'Chris Harris',
      date: '2021-04-05',
      keywords: ['dr', 'evil', 'meme', 'funny', 'movie', 'villain', 'humor', 'character'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#90a4ae',
        backgroundColorMain: '#b0bec5',
        textColor: '#000000',
      },
    },
    {
      imgID: 'I1j2K3l4M5',
      imgSource: 'img/img2.jpg',
      imgName: 'Dancing Kids',
      creator: 'Patricia Clark',
      date: '2019-11-30',
      keywords: ['dancing', 'kids', 'fun', 'joy', 'movement', 'playful', 'celebration', 'activity'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ffcc80',
        backgroundColorMain: '#ffe0b2',
        textColor: '#000000',
      },
    },
    {
      imgID: 'N6o7P8q9R0',
      imgSource: 'img/img4.jpg',
      imgName: 'Trump Gesture',
      creator: 'Steven Young',
      date: '2020-01-25',
      keywords: ['trump', 'gesture', 'politics', 'leader', 'expression', 'sign', 'hand', 'symbol'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#d32f2f',
        backgroundColorMain: '#f44336',
        textColor: '#ffffff',
      },
    },
    {
      imgID: 'S1t2U3v4W5',
      imgSource: 'img/img5.jpg',
      imgName: 'Happy Baby',
      creator: 'Angela King',
      date: '2022-08-08',
      keywords: ['happy', 'baby', 'cute', 'smile', 'joy', 'infant', 'laughter', 'delight'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#f48fb1',
        backgroundColorMain: '#f8bbd0',
        textColor: '#000000',
      },
    },
    {
      imgID: 'X6y7Z8a9B0',
      imgSource: 'img/img6.jpg',
      imgName: 'Stretched Cat',
      creator: 'George Scott',
      date: '2023-02-28',
      keywords: ['stretched', 'cat', 'funny', 'pose', 'pet', 'yoga', 'flexibility', 'relaxation'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#a5d6a7',
        backgroundColorMain: '#c8e6c9',
        textColor: '#000000',
      },
    },
    {
      imgID: 'C1d2E3f4G5',
      imgSource: 'img/img11.jpg',
      imgName: 'Obama Laughing',
      creator: 'Donna Green',
      date: '2021-05-14',
      keywords: ['obama', 'laughing', 'happy', 'smile', 'joy', 'president', 'fun', 'expression'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#90a4ae',
        backgroundColorMain: '#b0bec5',
        textColor: '#000000',
      },
    },
    {
      imgID: 'H6i7J8k9L0',
      imgSource: 'img/img12.jpg',
      imgName: 'Embrace',
      creator: 'Joshua Hall',
      date: '2020-12-24',
      keywords: ['embrace', 'friends', 'happy', 'hug', 'joy', 'love', 'support', 'together'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#bcaaa4',
        backgroundColorMain: '#d7ccc8',
        textColor: '#000000',
      },
    },
    {
      imgID: 'M1n2O3p4Q5',
      imgSource: 'img/leo.jpg',
      imgName: 'Leo Cheers',
      creator: 'Rebecca Adams',
      date: '2019-06-10',
      keywords: ['leo', 'cheers', 'happy', 'toast', 'celebration', 'smile', 'party', 'joy'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ffcc80',
        backgroundColorMain: '#ffe0b2',
        textColor: '#000000',
      },
    },
    {
      imgID: 'R6s7T8u9V0',
      imgSource: 'img/meme1.jpg',
      imgName: 'Matrix Meme',
      creator: 'Samantha Mitchell',
      date: '2022-11-18',
      keywords: ['matrix', 'meme', 'funny', 'movie', 'reaction', 'science fiction', 'character', 'scene'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#90a4ae',
        backgroundColorMain: '#b0bec5',
        textColor: '#000000',
      },
    },
    {
      imgID: 'W1x2Y3z4A5',
      imgSource: 'img/One-Does-Not-Simply.jpg',
      imgName: 'One Does Not Simply',
      creator: 'Gary Collins',
      date: '2021-07-27',
      keywords: ['one', 'does', 'not', 'simply', 'meme', 'funny', 'expression', 'movie'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#a1887f',
        backgroundColorMain: '#bcaaa4',
        textColor: '#000000',
      },
    },
    {
      imgID: 'B6c7D8e9F0',
      imgSource: 'img/Oprah-You-Get-A.jpg',
      imgName: 'Oprah Giveaway',
      creator: 'Nicole Carter',
      date: '2020-03-02',
      keywords: ['oprah', 'giveaway', 'meme', 'show', 'gift', 'surprise', 'celebrity', 'host'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ffcc80',
        backgroundColorMain: '#ffe0b2',
        textColor: '#000000',
      },
    },
    {
      imgID: 'G1h2I3j4K5',
      imgSource: 'img/patrick.jpg',
      imgName: 'Patrick',
      creator: 'Frankie Rogers',
      date: '2022-09-15',
      keywords: ['patrick', 'spongebob', 'meme', 'cartoon', 'character', 'funny', 'animated', 'series'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#ce93d8',
        backgroundColorMain: '#e1bee7',
        textColor: '#000000',
      },
    },
    {
      imgID: 'L6m7N8o9P0',
      imgSource: 'img/putin.jpg',
      imgName: 'Putin',
      creator: 'Terry Evans',
      date: '2023-06-21',
      keywords: ['putin', 'politics', 'leader', 'president', 'russia', 'power', 'authority', 'figure'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#d32f2f',
        backgroundColorMain: '#f44336',
        textColor: '#ffffff',
      },
    },
    {
      imgID: 'Q1r2S3t4U5',
      imgSource: 'img/X-Everywhere.jpg',
      imgName: 'X Everywhere',
      creator: 'Andrea Price',
      date: '2021-02-08',
      keywords: ['x', 'everywhere', 'meme', 'buzz', 'lightyear', 'toystory', 'movie', 'scene'],
      typeImg: 'base',
      colors: {
        backgroundColor: '#81d4fa',
        backgroundColorMain: '#b3e5fc',
        textColor: '#000000',
      },
    },
  ]

  return images.map((image) => createImageObject(image.imgSource, image.imgName, image.creator, image.date, image.keywords, image.colors, image.typeImg))
}
