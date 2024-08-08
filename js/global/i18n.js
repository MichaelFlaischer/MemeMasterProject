'use strict'
const translations = {
  en: {
    addImage: 'Add Image',
    welcomeMessage: 'Welcome to MemeMaster',
    welcome: 'Welcome to MemeMaster',
    gallery: 'Gallery',
    generator: 'Generator',
    about: 'About MemeMaster',
    heroContent: 'Unleash Your Creativity with MemeMaster',
    heroText:
      'Create hilarious and engaging memes with intuitive tools and features designed for creators of all levels. Explore your imagination and bring your ideas to life!',
    memeGenerator: 'Meme Generator',
    imageName: 'Image Name',
    creatorName: 'Creator Name',
    keywords: 'Keywords (comma separated)',
    backgroundColor: 'Background Color',
    backgroundColorMain: 'Background Color Main',
    textColor: 'Text Color',
    saveToGallery: 'Save to Gallery',
    downloadImage: 'Download Image',
    shareImage: 'Share this Image',
    addImage: 'Add Image',
    clearSearchInput: 'Clear Search Input',
    showAll: 'Show All',
    showBaseImages: 'Show Base Images',
    showMemes: 'Show MEMEs',
    noImageFound: 'No image found',
    goToGallery: 'Go to Gallery',
    uploadFromComputer: 'Upload from Computer',
    createMemeFromUrl: 'Create Meme from URL',
    generateRandomMeme: 'Generate Random Meme',
    changeTheme: 'Change Theme',
    createMEME: 'Create MEME',
    deleteThisImage: 'Delete This Image',
    shareThisImage: 'Share This Image',
    languageToggle: 'עברית',
    selectImages: 'Select images from our extensive gallery or upload your own.',
    uniqueFeatures:
      'Add and customize text with various fonts and styles, include stickers and emojis to enhance your memes, and drag and drop elements for easy customization.',
    shareOnFacebook: 'Our platform also includes features like download and upload, allowing you to save your creations or share them with others.',
    developedBy: 'MemeMaster was developed by Michael Flaischer.',
    joinCommunity: 'Join our community of meme creators and start generating hilarious content today.',
    type: 'Type',
    date: 'Date',
    selectImage: 'Select an Image',
    uploadImage: 'Upload Image',
    cancel: 'Cancel',
    textSize: 'Text Size',
    opacity: 'Opacity',
    transparent: 'Transparent',
    white: 'White',
    black: 'Black',
    red: 'Red',
    green: 'Green',
    blue: 'Blue',
    close: 'Close',
    youCan: 'You can:',
    chooseImage: 'Choose an image from the web',
    enterImageUrl: 'Enter image URL',
    home: 'Home',
    shareOnFacebook: 'Our platform also includes features like download and upload, allowing you to save your creations or share them with others.',
  },
  he: {
    addImage: 'הוסף תמונה',
    welcomeMessage: 'ברוכים הבאים ל-MemeMaster',
    welcome: 'ברוכים הבאים ל-MemeMaster',
    gallery: 'גלריה',
    generator: 'מחולל',
    about: 'אודות MemeMaster',
    heroContent: 'שחררו את היצירתיות שלכם עם MemeMaster',
    heroText: 'צרו ממים מצחיקים ומרתקים עם כלים ותכונות אינטואיטיביים המיועדים ליוצרים בכל הרמות. חקרו את הדמיון שלכם והביאו את הרעיונות שלכם לחיים!',
    memeGenerator: 'מחולל ממים',
    imageName: 'שם התמונה',
    creatorName: 'שם היוצר',
    keywords: 'מילות מפתח (מופרדות בפסיקים)',
    backgroundColor: 'צבע רקע',
    backgroundColorMain: 'צבע רקע ראשי',
    textColor: 'צבע טקסט',
    saveToGallery: 'שמור לגלריה',
    downloadImage: 'הורד תמונה',
    shareImage: 'שתף תמונה זו',
    addImage: 'הוסף תמונה',
    clearSearchInput: 'נקה שדה חיפוש',
    showAll: 'הצג הכל',
    showBaseImages: 'הצג תמונות בסיס',
    showMemes: 'הצג ממים',
    noImageFound: 'לא נמצאה תמונה',
    goToGallery: 'עבור לגלריה',
    uploadFromComputer: 'העלה מהמחשב',
    createMemeFromUrl: 'צור מם מ-URL',
    generateRandomMeme: 'צור מם אקראי',
    changeTheme: 'שנה נושא',
    createMEME: 'צור מם',
    deleteThisImage: 'מחק תמונה זו',
    shareThisImage: 'שתף תמונה זו',
    languageToggle: 'English',
    selectImages: 'בחרו תמונות מהגלריה הנרחבת שלנו או העלו תמונות משלכם.',
    uniqueFeatures: 'הוסיפו והתאימו טקסט עם גופנים וסגנונות שונים, כללו מדבקות ואימוגים לשיפור הממים שלכם, וגררו ושחררו אלמנטים להתאמה קלה.',
    developedBy: 'MemeMaster פותח על ידי מיכאל פליישר.',
    joinCommunity: 'הצטרפו לקהילת יוצרי הממים שלנו והתחילו ליצור תוכן מצחיק היום.',
    type: 'סוג',
    date: 'תאריך',
    selectImage: 'בחר תמונה',
    uploadImage: 'העלה תמונה',
    cancel: 'בטל',
    textSize: 'גודל טקסט',
    opacity: 'אטימות',
    transparent: 'שקוף',
    white: 'לבן',
    black: 'שחור',
    red: 'אדום',
    green: 'ירוק',
    blue: 'כחול',
    close: 'סגור',
    youCan: 'אתם יכולים:',
    chooseImage: 'בחרו תמונה מהאינטרנט',
    enterImageUrl: 'הכניסו כתובת URL של תמונה',
    home: 'בית',
    shareOnFacebook: 'הפלטפורמה שלנו כוללת גם תכונות כמו הורדה והעלאה, מה שמאפשר לשמור את היצירות שלכם או לשתף אותן עם אחרים.',
  },
}

function translatePage(lang) {
  const elements = document.querySelectorAll('[data-i18n]')
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n')
    const translation = translations[lang][key]
    if (translation) {
      element.textContent = translation
    } else {
      element.textContent = `Missing translation: ${key}`
    }
  })
  document.querySelector('.language-toggle').textContent = translations[lang].languageToggle
  const url = new URL(window.location)
  url.searchParams.set('lang', lang)
  window.history.pushState({}, '', url)
}

function toggleLanguage() {
  const currentLang = new URLSearchParams(window.location.search).get('lang') || 'en'
  const newLang = currentLang === 'en' ? 'he' : 'en'
  const url = new URL(window.location.href)
  url.searchParams.set('lang', newLang)
  window.location.href = url.toString()
}

function onInitPage() {
  const currentLanguage = getCurrentLanguage()
  translatePage(currentLanguage)
  document.documentElement.dir = currentLanguage === 'he' ? 'rtl' : 'ltr'
  const languageToggle = document.querySelector('.language-toggle')
  if (languageToggle) {
    languageToggle.style.position = 'absolute'
    languageToggle.style.top = '10px'
    languageToggle.style.right = '10px'
  }
  addLanguageQueryParamToLinks()
}

function addLanguageQueryParamToLinks() {
  const links = document.querySelectorAll('a')
  const currentLanguage = getCurrentLanguage()
  links.forEach((link) => {
    const url = new URL(link.href)
    url.searchParams.set('lang', currentLanguage)
    link.href = url.toString()
  })
}

function getCurrentLanguage() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('lang') || 'en'
}
