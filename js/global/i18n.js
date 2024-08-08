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
  ru: {
    addImage: 'Добавить изображение',
    welcomeMessage: 'Добро пожаловать в MemeMaster',
    welcome: 'Добро пожаловать в MemeMaster',
    gallery: 'Галерея',
    generator: 'Генератор',
    about: 'О MemeMaster',
    heroContent: 'Развяжите свою креативность с MemeMaster',
    heroText:
      'Создавайте смешные и увлекательные мемы с помощью интуитивно понятных инструментов и функций, предназначенных для создателей любого уровня. Исследуйте свое воображение и воплощайте свои идеи в жизнь!',
    memeGenerator: 'Генератор мемов',
    imageName: 'Название изображения',
    creatorName: 'Имя создателя',
    keywords: 'Ключевые слова (через запятую)',
    backgroundColor: 'Цвет фона',
    backgroundColorMain: 'Основной цвет фона',
    textColor: 'Цвет текста',
    saveToGallery: 'Сохранить в галерею',
    downloadImage: 'Скачать изображение',
    shareImage: 'Поделиться этим изображением',
    addImage: 'Добавить изображение',
    clearSearchInput: 'Очистить поле поиска',
    showAll: 'Показать все',
    showBaseImages: 'Показать базовые изображения',
    showMemes: 'Показать мемы',
    noImageFound: 'Изображение не найдено',
    goToGallery: 'Перейти в галерею',
    uploadFromComputer: 'Загрузить с компьютера',
    createMemeFromUrl: 'Создать мем по URL',
    generateRandomMeme: 'Создать случайный мем',
    changeTheme: 'Изменить тему',
    createMEME: 'Создать мем',
    deleteThisImage: 'Удалить это изображение',
    shareThisImage: 'Поделиться этим изображением',
    languageToggle: 'עברית',
    selectImages: 'Выберите изображения из нашей обширной галереи или загрузите свои.',
    uniqueFeatures:
      'Добавляйте и настраивайте текст с различными шрифтами и стилями, включайте стикеры и эмодзи для улучшения ваших мемов, перетаскивайте элементы для легкой настройки.',
    shareOnFacebook: 'Наша платформа также включает функции загрузки и скачивания, позволяя вам сохранять свои творения или делиться ими с другими.',
    developedBy: 'MemeMaster был разработан Михаэлем Флейшером.',
    joinCommunity: 'Присоединяйтесь к нашему сообществу создателей мемов и начните создавать смешной контент уже сегодня.',
    type: 'Тип',
    date: 'Дата',
    selectImage: 'Выбрать изображение',
    uploadImage: 'Загрузить изображение',
    cancel: 'Отмена',
    textSize: 'Размер текста',
    opacity: 'Прозрачность',
    transparent: 'Прозрачный',
    white: 'Белый',
    black: 'Черный',
    red: 'Красный',
    green: 'Зеленый',
    blue: 'Синий',
    close: 'Закрыть',
    youCan: 'Вы можете:',
    chooseImage: 'Выберите изображение из интернета',
    enterImageUrl: 'Введите URL изображения',
    home: 'Главная',
  },
  ar: {
    addImage: 'إضافة صورة',
    welcomeMessage: 'مرحبًا بك في MemeMaster',
    welcome: 'مرحبًا بك في MemeMaster',
    gallery: 'معرض',
    generator: 'مولد',
    about: 'حول MemeMaster',
    heroContent: 'أطلق العنان لإبداعك مع MemeMaster',
    heroText: 'أنشئ ميمات مضحكة وجذابة باستخدام أدوات وميزات بديهية مصممة للمبدعين من جميع المستويات. استكشف خيالك وأحضر أفكارك إلى الحياة!',
    memeGenerator: 'مولد الميمات',
    imageName: 'اسم الصورة',
    creatorName: 'اسم المنشئ',
    keywords: 'الكلمات الرئيسية (مفصولة بفواصل)',
    backgroundColor: 'لون الخلفية',
    backgroundColorMain: 'لون الخلفية الرئيسي',
    textColor: 'لون النص',
    saveToGallery: 'حفظ في المعرض',
    downloadImage: 'تنزيل الصورة',
    shareImage: 'مشاركة هذه الصورة',
    addImage: 'إضافة صورة',
    clearSearchInput: 'مسح حقل البحث',
    showAll: 'عرض الكل',
    showBaseImages: 'عرض الصور الأساسية',
    showMemes: 'عرض الميمات',
    noImageFound: 'لم يتم العثور على صورة',
    goToGallery: 'الانتقال إلى المعرض',
    uploadFromComputer: 'تحميل من الكمبيوتر',
    createMemeFromUrl: 'إنشاء ميم من URL',
    generateRandomMeme: 'إنشاء ميم عشوائي',
    changeTheme: 'تغيير السمة',
    createMEME: 'إنشاء ميم',
    deleteThisImage: 'حذف هذه الصورة',
    shareThisImage: 'مشاركة هذه الصورة',
    languageToggle: 'עברית',
    selectImages: 'اختر صورًا من معرضنا الواسع أو قم بتحميل صورك الخاصة.',
    uniqueFeatures: 'أضف وخصص النصوص بخطوط وأنماط مختلفة، وأضف الملصقات والرموز التعبيرية لتحسين الميمات الخاصة بك، واسحب وأسقط العناصر لتخصيص سهل.',
    shareOnFacebook: 'تتضمن منصتنا أيضًا ميزات مثل التنزيل والتحميل، مما يتيح لك حفظ إبداعاتك أو مشاركتها مع الآخرين.',
    developedBy: 'تم تطوير MemeMaster بواسطة مايكل فليشر.',
    joinCommunity: 'انضم إلى مجتمع منشئي الميمات لدينا وابدأ في إنشاء محتوى مضحك اليوم.',
    type: 'النوع',
    date: 'التاريخ',
    selectImage: 'اختر صورة',
    uploadImage: 'تحميل صورة',
    cancel: 'إلغاء',
    textSize: 'حجم النص',
    opacity: 'الشفافية',
    transparent: 'شفاف',
    white: 'أبيض',
    black: 'أسود',
    red: 'أحمر',
    green: 'أخضر',
    blue: 'أزرق',
    close: 'إغلاق',
    youCan: 'يمكنك:',
    chooseImage: 'اختر صورة من الويب',
    enterImageUrl: 'أدخل عنوان URL للصورة',
    home: 'الصفحة الرئيسية',
  },
  de: {
    addImage: 'Bild hinzufügen',
    welcomeMessage: 'Willkommen bei MemeMaster',
    welcome: 'Willkommen bei MemeMaster',
    gallery: 'Galerie',
    generator: 'Generator',
    about: 'Über MemeMaster',
    heroContent: 'Entfessle deine Kreativität mit MemeMaster',
    heroText:
      'Erstelle lustige und fesselnde Memes mit intuitiven Werkzeugen und Funktionen, die für Kreative aller Niveaus entwickelt wurden. Erkunde deine Fantasie und bringe deine Ideen zum Leben!',
    memeGenerator: 'Meme-Generator',
    imageName: 'Bildname',
    creatorName: 'Name des Erstellers',
    keywords: 'Schlüsselwörter (durch Kommas getrennt)',
    backgroundColor: 'Hintergrundfarbe',
    backgroundColorMain: 'Haupt-Hintergrundfarbe',
    textColor: 'Textfarbe',
    saveToGallery: 'In Galerie speichern',
    downloadImage: 'Bild herunterladen',
    shareImage: 'Dieses Bild teilen',
    addImage: 'Bild hinzufügen',
    clearSearchInput: 'Suchfeld löschen',
    showAll: 'Alle anzeigen',
    showBaseImages: 'Basisbilder anzeigen',
    showMemes: 'Memes anzeigen',
    noImageFound: 'Kein Bild gefunden',
    goToGallery: 'Zur Galerie gehen',
    uploadFromComputer: 'Vom Computer hochladen',
    createMemeFromUrl: 'Meme aus URL erstellen',
    generateRandomMeme: 'Zufälliges Meme erstellen',
    changeTheme: 'Thema ändern',
    createMEME: 'Meme erstellen',
    deleteThisImage: 'Dieses Bild löschen',
    shareThisImage: 'Dieses Bild teilen',
    languageToggle: 'עברית',
    selectImages: 'Wähle Bilder aus unserer umfangreichen Galerie oder lade deine eigenen hoch.',
    uniqueFeatures:
      'Füge Text mit verschiedenen Schriftarten und Stilen hinzu und passe ihn an, füge Sticker und Emojis hinzu, um deine Memes zu verbessern, und ziehe und lege Elemente zur einfachen Anpassung.',
    shareOnFacebook:
      'Unsere Plattform bietet auch Funktionen wie das Herunterladen und Hochladen, sodass du deine Kreationen speichern oder mit anderen teilen kannst.',
    developedBy: 'MemeMaster wurde von Michael Flaischer entwickelt.',
    joinCommunity: 'Tritt unserer Community von Meme-Erstellern bei und beginne noch heute, lustige Inhalte zu erstellen.',
    type: 'Typ',
    date: 'Datum',
    selectImage: 'Bild auswählen',
    uploadImage: 'Bild hochladen',
    cancel: 'Abbrechen',
    textSize: 'Textgröße',
    opacity: 'Deckkraft',
    transparent: 'Transparent',
    white: 'Weiß',
    black: 'Schwarz',
    red: 'Rot',
    green: 'Grün',
    blue: 'Blau',
    close: 'Schließen',
    youCan: 'Du kannst:',
    chooseImage: 'Wähle ein Bild aus dem Web',
    enterImageUrl: 'Bild-URL eingeben',
    home: 'Startseite',
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
  document.querySelector('.language-toggle').value = lang
  const url = new URL(window.location)
  url.searchParams.set('lang', lang)
  window.history.pushState({}, '', url)
}

function changeLanguage(lang) {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', lang)
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
    languageToggle.style.backgroundColor = '#fff'
    languageToggle.style.border = '1px solid #000'
    languageToggle.style.borderRadius = '5px'
    languageToggle.style.padding = '5px'
    languageToggle.style.cursor = 'pointer'
    languageToggle.style.zIndex = '1000'
    languageToggle.innerHTML = `
      <option value="en">English</option>
      <option value="he">עברית</option>
      <option value="ru">Русский</option>
      <option value="ar">العربية</option>
      <option value="de">Deutsch</option>
    `
    languageToggle.value = currentLanguage
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
