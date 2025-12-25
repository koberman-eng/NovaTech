// Данные о товарах с реальными ценами и характеристиками
const products = {
    1: {
        id: 1,
        name: "Смартфон Realme 12 Pro 8/256GB Синий",
        brand: "Realme",
        price: 24999,
        oldPrice: 32999,
        discount: 24,
        image: "https://ir-3.ozone.ru/s3/multimedia-1-l/wc1000/8570308125.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-1-i/wc1000/8570308122.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-j/wc1000/8570308123.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-k/wc1000/8570308124.jpg"
        ],
        description: "Смартфон Realme 12 Pro с премиальным дизайном и мощным процессором Snapdragon. Отличная камера 50 Мп с оптической стабилизацией и быстрая зарядка 67W.",
        characteristics: {
            "Экран": "6.7\" AMOLED, 2412x1080, 120 Гц",
            "Процессор": "Snapdragon 7s Gen 2",
            "Оперативная память": "8 ГБ",
            "Встроенная память": "256 ГБ",
            "Камера основная": "50 Мп OIS + 8 Мп + 2 Мп",
            "Камера фронтальная": "32 Мп",
            "Батарея": "5000 мАч",
            "Зарядка": "67W SuperVOOC",
            "Операционная система": "Android 14, Realme UI 5.0",
            "Размеры": "161.5 x 74.0 x 8.7 мм",
            "Вес": "190 г"
        },
        rating: 4.6,
        reviewsCount: 89,
        category: "smartphone"
    },
    2: {
        id: 2,
        name: "Ноутбук Lenovo IdeaPad Gaming 3 15.6\" AMD Ryzen 7/16/512GB",
        brand: "Lenovo",
        price: 69999,
        oldPrice: 89999,
        discount: 22,
        image: "https://ir-3.ozone.ru/s3/multimedia-1-z/wc1000/8252721539.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-1-i/wc1000/8253223398.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-p/wc1000/8253223405.jpg"
        ],
        description: "Игровой ноутбук Lenovo IdeaPad Gaming 3 с процессором AMD Ryzen 7 и видеокартой NVIDIA GeForce RTX 4050. Отличная производительность для игр и работы.",
        characteristics: {
            "Экран": "15.6\" IPS, 1920x1080, 120 Гц",
            "Процессор": "AMD Ryzen 7 7735HS",
            "Оперативная память": "16 ГБ DDR5",
            "Накопитель": "512 ГБ SSD NVMe",
            "Видеокарта": "NVIDIA GeForce RTX 4050 6GB",
            "Операционная система": "Windows 11 Home",
            "Размеры": "359.2 x 251.9 x 20.1 мм",
            "Вес": "2.3 кг",
            "Батарея": "60 Вт·ч",
            "Порты": "USB-C, USB-A x3, HDMI 2.1, Ethernet, 3.5 мм"
        },
        rating: 4.7,
        reviewsCount: 156,
        category: "laptop"
    },
    3: {
        id: 3,
        name: "Наушники Sony WH-1000XM5 Black",
        brand: "Sony",
        price: 34999,
        oldPrice: 42999,
        discount: 19,
        image: "https://ir-3.ozone.ru/s3/multimedia-1-x/wc1000/7349593173.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-1-3/wc1000/7349593035.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-r/wc1000/7349593059.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-g/wc1000/7349593084.jpg"
        ],
        description: "Премиальные беспроводные наушники Sony WH-1000XM5 с лучшим в мире активным шумоподавлением. Качественный звук Hi-Res Audio и комфорт для длительного ношения.",
        characteristics: {
            "Тип": "Накладные беспроводные",
            "Шумоподавление": "Активное (ANC) V1",
            "Звук": "Hi-Res Audio, LDAC",
            "Время работы": "до 30 часов (ANC включен)",
            "Быстрая зарядка": "3 минуты = 3 часа",
            "Зарядка": "USB-C",
            "Bluetooth": "5.2",
            "Микрофон": "4 микрофона с шумоподавлением",
            "Совместимость": "Android, iOS, Windows",
            "Вес": "250 г"
        },
        rating: 4.9,
        reviewsCount: 287,
        category: "headphones"
    },
    4: {
        id: 4,
        name: "Планшет Samsung Galaxy Tab S9 FE 10.9\" 8/128GB Wi-Fi",
        brand: "Samsung",
        price: 34999,
        oldPrice: 44999,
        discount: 22,
        image: "https://ir-3.ozone.ru/s3/multimedia-3/wc1000/6811249575.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-y/wc1000/6811249570.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-8/wc1000/6811249580.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-w/wc1000/6811249568.jpg"
        ],
        description: "Планшет Samsung Galaxy Tab S9 FE с ярким экраном и стилусом S Pen в комплекте. Отличное решение для творчества, работы и учебы. Защита от воды IP68.",
        characteristics: {
            "Экран": "10.9\" TFT, 2304x1440, 90 Гц",
            "Процессор": "Exynos 1380",
            "Оперативная память": "8 ГБ",
            "Встроенная память": "128 ГБ",
            "Камера основная": "8 Мп",
            "Камера фронтальная": "12 Мп",
            "Батарея": "8000 мАч",
            "Зарядка": "45W",
            "Операционная система": "Android 13, One UI 5.1",
            "S Pen": "В комплекте",
            "Защита": "IP68",
            "Размеры": "254.3 x 165.8 x 6.5 мм",
            "Вес": "523 г"
        },
        rating: 4.6,
        reviewsCount: 134,
        category: "tablet"
    },
    5: {
        id: 5,
        name: "Умная колонка Яндекс Станция Макс с Алисой",
        brand: "Яндекс",
        price: 19999,
        oldPrice: 24999,
        discount: 20,
        image: "https://ir-3.ozone.ru/s3/multimedia-1-i/wc1000/8234487162.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-1-6/wc1000/8234609298.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-k/wc1000/8234609312.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-i/wc1000/8234609238.jpg"
        ],
        description: "Умная колонка Яндекс Станция Макс с голосовым помощником Алисой. Качественный звук, управление умным домом и доступ к Яндекс.Музыке и другим сервисам.",
        characteristics: {
            "Мощность": "50 Вт",
            "Динамики": "5 динамиков + сабвуфер",
            "Голосовой помощник": "Алиса",
            "Умный дом": "Zigbee, Wi-Fi",
            "Wi-Fi": "802.11ac",
            "Bluetooth": "5.0",
            "Экран": "10.1\" сенсорный",
            "Микрофоны": "7 микрофонов",
            "Цвет": "Черный",
            "Размеры": "230 x 140 x 140 мм",
            "Вес": "1.5 кг"
        },
        rating: 4.7,
        reviewsCount: 245,
        category: "smart-speaker"
    },
    6: {
        id: 6,
        name: "Телевизор Samsung UE50CU7100UXRU 50\" 4K UHD Smart TV",
        brand: "Samsung",
        price: 44999,
        oldPrice: 54999,
        discount: 18,
        image: "https://ir-3.ozone.ru/s3/multimedia-d/wc1000/6812103217.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-i/wc1000/6812103186.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-q/wc1000/6812103230.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-c/wc1000/6812103216.jpg",
        ],
        description: "Телевизор Samsung UE50CU7100UXRU с диагональю 50 дюймов и разрешением 4K UHD. Оснащен процессором Crystal 4K, который обеспечивает четкое и яркое изображение. Поддержка HDR10+ и технологии PurColor для реалистичной цветопередачи. Операционная система Tizen предоставляет доступ к популярным приложениям и сервисам. Технология Adaptive Sound+ автоматически оптимизирует звук в зависимости от контента. Тонкий безрамочный дизайн и универсальный пульт Smart Remote делают этот телевизор идеальным выбором для современного дома.",
        characteristics: {
            "Диагональ": "50\" (127 см)",
            "Разрешение": "4K UHD (3840x2160)",
            "Технология": "LED (Crystal UHD)",
            "Процессор": "Crystal 4K",
            "HDR": "HDR10, HDR10+, HLG",
            "Частота обновления": "60 Гц (Motion Xcelerator)",
            "Smart TV": "Tizen OS",
            "Голосовой помощник": "Bixby, Alexa, Google Assistant",
            "Wi-Fi": "802.11ac (5 ГГц, 2.4 ГГц)",
            "Bluetooth": "5.2",
            "Порты": "HDMI x3, USB x2, Ethernet, оптический выход",
            "Звук": "20 Вт (2 динамика), Dolby Digital Plus, Adaptive Sound+",
            "Поддержка форматов": "MPEG4, HEVC, VP9, AV1",
            "Размеры": "1128.1 x 655.1 x 60.9 мм (без подставки)",
            "Вес": "11.2 кг (без подставки)"
        },
        rating: 4.6,
        reviewsCount: 127,
        category: "tv",
        reviews: [
            {
                author: "Иван Петров",
                rating: 5,
                date: "2024-12-15",
                text: "Отличный телевизор Samsung! Картинка очень четкая, цвета насыщенные. Tizen работает быстро, все приложения загружаются без задержек. Звук хороший для встроенных динамиков."
            },
            {
                author: "Мария Сидорова",
                rating: 4,
                date: "2024-12-10",
                text: "Хороший телевизор за свои деньги. HDR10+ работает отлично, картинка яркая. Единственное - пульт мог бы быть более удобным, но это мелочи."
            },
            {
                author: "Алексей Козлов",
                rating: 5,
                date: "2024-12-05",
                text: "Покупкой очень доволен! Качество изображения на высоте, особенно в 4K. Smart TV функционал богатый, все нужные приложения есть. Рекомендую!"
            },
            {
                author: "Елена Волкова",
                rating: 4,
                date: "2024-11-28",
                text: "Купила для гостиной. Телевизор выглядит стильно, тонкие рамки. Изображение четкое, цвета реалистичные. Звук мог бы быть громче, но для просмотра новостей и сериалов вполне достаточно."
            },
            {
                author: "Дмитрий Соколов",
                rating: 5,
                date: "2024-11-20",
                text: "Лучший телевизор в своей ценовой категории! Процессор Crystal 4K действительно делает изображение более четким. Подключил игровую консоль - работает отлично, задержка минимальная."
            }
        ]
    },
    7: {
        id: 7,
        name: "Смартфон Xiaomi Redmi Note 13 8/256GB Черный",
        brand: "Xiaomi",
        price: 18999,
        oldPrice: 24999,
        discount: 24,
        image: "https://ir-3.ozone.ru/s3/multimedia-1-a/wc1000/7456596778.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-1-d/wc1000/7456596781.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-k/wc1000/7456596788.jpg",
        ],
        description: "Смартфон Xiaomi Redmi Note 13 с мощным процессором, большой памятью и отличной камерой. Долгая работа батареи и быстрая зарядка.",
        characteristics: {
            "Экран": "6.67\" AMOLED, 2400x1080, 120 Гц",
            "Процессор": "Snapdragon 685",
            "Оперативная память": "8 ГБ",
            "Встроенная память": "256 ГБ",
            "Камера основная": "108 Мп + 8 Мп + 2 Мп",
            "Камера фронтальная": "16 Мп",
            "Батарея": "5000 мАч",
            "Зарядка": "33 Вт быстрая зарядка",
            "Операционная система": "Android 14, MIUI 15",
            "Размеры": "161.1 x 75.0 x 7.6 мм",
            "Вес": "188 г"
        },
        rating: 4.7,
        reviewsCount: 127,
        category: "smartphone",
        reviews: [
            {
                author: "Дмитрий Волков",
                rating: 5,
                date: "2024-12-20",
                text: "Отличный телефон за свою цену! Камера снимает очень хорошо, батарея держит долго."
            },
            {
                author: "Елена Новикова",
                rating: 5,
                date: "2024-12-18",
                text: "Покупкой довольна. Экран яркий, телефон быстрый. Рекомендую!"
            },
            {
                author: "Сергей Морозов",
                rating: 4,
                date: "2024-12-12",
                text: "Хороший смартфон, но немного тяжеловат. В остальном все отлично."
            }
        ]
    },
    8: {
        id: 8,
        name: "Ноутбук ASUS VivoBook 15 X1504VA i5-1335U/16/512GB",
        brand: "ASUS",
        price: 54999,
        oldPrice: 69999,
        discount: 21,
        image: "https://ir-3.ozone.ru/s3/multimedia-1-7/wc1000/7669960747.jpg",
        images: [
            "https://ir-3.ozone.ru/s3/multimedia-1-l/wc1000/7669960761.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/7669960820.jpg",
            "https://ir-3.ozone.ru/s3/multimedia-1-p/wc1000/7669960837.jpg",
        ],
        description: "Ноутбук ASUS VivoBook 15 с процессором Intel Core i5 для работы и учебы. Легкий и компактный, с хорошей производительностью.",
        characteristics: {
            "Экран": "15.6\" IPS, 1920x1080",
            "Процессор": "Intel Core i5-1335U",
            "Оперативная память": "16 ГБ DDR4",
            "Накопитель": "512 ГБ SSD",
            "Видеокарта": "Intel Iris Xe",
            "Операционная система": "Windows 11 Home",
            "Размеры": "359.7 x 232.5 x 19.9 мм",
            "Вес": "1.7 кг",
            "Батарея": "42 Вт·ч",
            "Порты": "USB-C, USB-A x2, HDMI, 3.5 мм"
        },
        rating: 4.6,
        reviewsCount: 89,
        category: "laptop",
        reviews: [
            {
                author: "Анна Смирнова",
                rating: 5,
                date: "2024-12-19",
                text: "Отличный ноутбук для работы. Быстрый, легкий, удобная клавиатура."
            },
            {
                author: "Павел Лебедев",
                rating: 4,
                date: "2024-12-14",
                text: "Хороший ноутбук за свои деньги. Батарея держит около 6-7 часов."
            }
        ]
    }
};

// Функция для получения товара по ID
function getProductById(id) {
    return products[id] || null;
}

// Функция для получения всех товаров
function getAllProducts() {
    return Object.values(products);
}

// Функция для получения товаров по категории
function getProductsByCategory(category) {
    return Object.values(products).filter(product => product.category === category);
}

