'use strict'

var gImgs = []

function onInitGallery() {
  menuRender()
  checkMemoryNotEmpty()
  renderGallery()
  renderKeywords()
}

function createImageObject(imgSource, imgName, creator, date, keywords) {
  return {
    imgID: generateUniqueId(),
    imgSource: imgSource,
    imgName: imgName,
    creator: creator,
    date: date,
    keyword: keywords,
    typeImg: 'base',
  }
}

function generateImageArray() {
  const images = [
    {
      imgID: 'A1b2C3d4E5',
      imgSource: 'img/2.jpg',
      imgName: 'Mountain Girl',
      creator: 'John Doe',
      date: '2022-01-01',
      keywords: ['mountain', 'girl', 'nature', 'landscape', 'outdoors'],
      typeImg: 'base',
    },
    {
      imgID: 'F6g7H8i9J0',
      imgSource: 'img/003.jpg',
      imgName: 'Trump Speech',
      creator: 'Jane Smith',
      date: '2021-06-15',
      keywords: ['trump', 'speech', 'politics', 'president', 'event'],
      typeImg: 'base',
    },
    {
      imgID: 'K1l2M3n4O5',
      imgSource: 'img/004.jpg',
      imgName: 'Dog Kisses',
      creator: 'Alex Johnson',
      date: '2023-02-10',
      keywords: ['dogs', 'kisses', 'pets', 'animals', 'cute'],
      typeImg: 'base',
    },
    {
      imgID: 'P6q7R8s9T0',
      imgSource: 'img/005.jpg',
      imgName: 'Baby and Dog',
      creator: 'Emily Davis',
      date: '2020-11-20',
      keywords: ['baby', 'dog', 'cute', 'friendship', 'adorable'],
      typeImg: 'base',
    },
    {
      imgID: 'U1v2W3x4Y5',
      imgSource: 'img/5.jpg',
      imgName: 'Beach Kid',
      creator: 'Michael Brown',
      date: '2019-07-30',
      keywords: ['beach', 'kid', 'summer', 'fun', 'holiday'],
      typeImg: 'base',
    },
    {
      imgID: 'Z6a7B8c9D0',
      imgSource: 'img/006.jpg',
      imgName: 'Cat Relaxing',
      creator: 'Sarah Wilson',
      date: '2023-05-25',
      keywords: ['cat', 'relax', 'pet', 'comfortable', 'cute'],
      typeImg: 'base',
    },
    {
      imgID: 'E1f2G3h4I5',
      imgSource: 'img/8.jpg',
      imgName: 'Wonka Meme',
      creator: 'Daniel Taylor',
      date: '2022-03-18',
      keywords: ['wonka', 'meme', 'funny', 'classic', 'reaction'],
      typeImg: 'base',
    },
    {
      imgID: 'J6k7L8m9N0',
      imgSource: 'img/9.jpg',
      imgName: 'Confused Kid',
      creator: 'Laura Martin',
      date: '2021-08-12',
      keywords: ['confused', 'kid', 'funny', 'expression', 'reaction'],
      typeImg: 'base',
    },
    {
      imgID: 'O1p2Q3r4S5',
      imgSource: 'img/12.jpg',
      imgName: 'Old Man Thinking',
      creator: 'Kevin Moore',
      date: '2020-09-22',
      keywords: ['old', 'man', 'thinking', 'pondering', 'wisdom'],
      typeImg: 'base',
    },
    {
      imgID: 'T6u7V8w9X0',
      imgSource: 'img/19.jpg',
      imgName: 'Surprised Man',
      creator: 'Brian Lee',
      date: '2023-07-01',
      keywords: ['surprised', 'man', 'reaction', 'shocked', 'expression'],
      typeImg: 'base',
    },
    {
      imgID: 'Y1z2A3b4C5',
      imgSource: 'img/Ancient-Aliens.jpg',
      imgName: 'Ancient Aliens',
      creator: 'Kim White',
      date: '2022-10-11',
      keywords: ['aliens', 'history', 'meme', 'theory', 'extraterrestrial'],
      typeImg: 'base',
    },
    {
      imgID: 'D6e7F8g9H0',
      imgSource: 'img/drevil.jpg',
      imgName: 'Dr. Evil',
      creator: 'Chris Harris',
      date: '2021-04-05',
      keywords: ['dr', 'evil', 'meme', 'funny', 'movie'],
      typeImg: 'base',
    },
    {
      imgID: 'I1j2K3l4M5',
      imgSource: 'img/img2.jpg',
      imgName: 'Dancing Kids',
      creator: 'Patricia Clark',
      date: '2019-11-30',
      keywords: ['dancing', 'kids', 'fun', 'joy', 'movement'],
      typeImg: 'base',
    },
    {
      imgID: 'N6o7P8q9R0',
      imgSource: 'img/img4.jpg',
      imgName: 'Trump Gesture',
      creator: 'Steven Young',
      date: '2020-01-25',
      keywords: ['trump', 'gesture', 'politics', 'leader', 'expression'],
      typeImg: 'base',
    },
    {
      imgID: 'S1t2U3v4W5',
      imgSource: 'img/img5.jpg',
      imgName: 'Happy Baby',
      creator: 'Angela King',
      date: '2022-08-08',
      keywords: ['happy', 'baby', 'cute', 'smile', 'joy'],
      typeImg: 'base',
    },
    {
      imgID: 'X6y7Z8a9B0',
      imgSource: 'img/img6.jpg',
      imgName: 'Stretched Cat',
      creator: 'George Scott',
      date: '2023-02-28',
      keywords: ['stretched', 'cat', 'funny', 'pose', 'pet'],
      typeImg: 'base',
    },
    {
      imgID: 'C1d2E3f4G5',
      imgSource: 'img/img11.jpg',
      imgName: 'Obama Laughing',
      creator: 'Donna Green',
      date: '2021-05-14',
      keywords: ['obama', 'laughing', 'happy', 'smile', 'joy'],
      typeImg: 'base',
    },
    {
      imgID: 'H6i7J8k9L0',
      imgSource: 'img/img12.jpg',
      imgName: 'Embrace',
      creator: 'Joshua Hall',
      date: '2020-12-24',
      keywords: ['embrace', 'friends', 'happy', 'hug', 'joy'],
      typeImg: 'base',
    },
    {
      imgID: 'M1n2O3p4Q5',
      imgSource: 'img/leo.jpg',
      imgName: 'Leo Cheers',
      creator: 'Rebecca Adams',
      date: '2019-06-10',
      keywords: ['leo', 'cheers', 'happy', 'toast', 'celebration'],
      typeImg: 'base',
    },
    {
      imgID: 'R6s7T8u9V0',
      imgSource: 'img/meme1.jpg',
      imgName: 'Matrix Meme',
      creator: 'Samantha Mitchell',
      date: '2022-11-18',
      keywords: ['matrix', 'meme', 'funny', 'movie', 'reaction'],
      typeImg: 'base',
    },
    {
      imgID: 'W1x2Y3z4A5',
      imgSource: 'img/One-Does-Not-Simply.jpg',
      imgName: 'One Does Not Simply',
      creator: 'Gary Collins',
      date: '2021-07-27',
      keywords: ['one', 'does', 'not', 'simply', 'meme'],
      typeImg: 'base',
    },
    {
      imgID: 'B6c7D8e9F0',
      imgSource: 'img/Oprah-You-Get-A.jpg',
      imgName: 'Oprah Giveaway',
      creator: 'Nicole Carter',
      date: '2020-03-02',
      keywords: ['oprah', 'giveaway', 'meme', 'show', 'gift'],
      typeImg: 'base',
    },
    {
      imgID: 'G1h2I3j4K5',
      imgSource: 'img/patrick.jpg',
      imgName: 'Patrick',
      creator: 'Frankie Rogers',
      date: '2022-09-15',
      keywords: ['patrick', 'spongebob', 'meme', 'cartoon', 'character'],
      typeImg: 'base',
    },
    {
      imgID: 'L6m7N8o9P0',
      imgSource: 'img/putin.jpg',
      imgName: 'Putin',
      creator: 'Terry Evans',
      date: '2023-06-21',
      keywords: ['putin', 'politics', 'leader', 'president', 'russia'],
      typeImg: 'base',
    },
    {
      imgID: 'Q1r2S3t4U5',
      imgSource: 'img/X-Everywhere.jpg',
      imgName: 'X Everywhere',
      creator: 'Andrea Price',
      date: '2021-02-08',
      keywords: ['x', 'everywhere', 'meme', 'buzz', 'lightyear'],
      typeImg: 'base',
    },
  ]

  return images.map((image) => createImageObject(image.imgSource, image.imgName, image.creator, image.date, image.keywords))
}

function checkMemoryNotEmpty() {
  if (getAllBaseImages().length < 1) {
    let images = generateImageArray()
    images.forEach((image) => saveImage(image))
  }
  initializeKeywordSearches()
}
