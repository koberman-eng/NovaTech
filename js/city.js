// Система управления выбором города
class CitySelector {
    constructor() {
        this.currentCity = this.loadCity();
        this.popularCities = [
            { id: 'moscow', name: 'Москва', region: 'Московская область' },
            { id: 'spb', name: 'Санкт-Петербург', region: 'Ленинградская область' },
            { id: 'novosibirsk', name: 'Новосибирск', region: 'Новосибирская область' },
            { id: 'ekaterinburg', name: 'Екатеринбург', region: 'Свердловская область' },
            { id: 'kazan', name: 'Казань', region: 'Республика Татарстан' },
            { id: 'nizhny-novgorod', name: 'Нижний Новгород', region: 'Нижегородская область' },
            { id: 'chelyabinsk', name: 'Челябинск', region: 'Челябинская область' },
            { id: 'samara', name: 'Самара', region: 'Самарская область' },
            { id: 'omsk', name: 'Омск', region: 'Омская область' },
            { id: 'rostov', name: 'Ростов-на-Дону', region: 'Ростовская область' },
            { id: 'ufa', name: 'Уфа', region: 'Республика Башкортостан' },
            { id: 'krasnoyarsk', name: 'Красноярск', region: 'Красноярский край' },
            { id: 'voronezh', name: 'Воронеж', region: 'Воронежская область' },
            { id: 'perm', name: 'Пермь', region: 'Пермский край' },
            { id: 'volgograd', name: 'Волгоград', region: 'Волгоградская область' }
        ];
        this.updateCityUI();
    }

    // Загрузка города из localStorage
    loadCity() {
        const savedCity = localStorage.getItem('selectedCity');
        if (savedCity) {
            return JSON.parse(savedCity);
        }
        // По умолчанию Москва
        return this.popularCities[0];
    }

    // Сохранение города в localStorage
    saveCity(city) {
        this.currentCity = city;
        localStorage.setItem('selectedCity', JSON.stringify(city));
        this.updateCityUI();
    }

    // Установка города
    setCity(cityId) {
        const city = this.popularCities.find(c => c.id === cityId);
        if (city) {
            this.saveCity(city);
            return true;
        }
        return false;
    }

    // Получение текущего города
    getCurrentCity() {
        return this.currentCity;
    }

    // Получение списка популярных городов
    getPopularCities() {
        return this.popularCities;
    }

    // Обновление UI выбора города
    updateCityUI() {
        const citySelectors = document.querySelectorAll('.city-selector');
        const cityNames = document.querySelectorAll('.city-name');
        
        if (this.currentCity) {
            citySelectors.forEach(el => {
                el.setAttribute('data-city-id', this.currentCity.id);
                el.setAttribute('title', 'Выбрать город: ' + this.currentCity.name);
            });
            
            cityNames.forEach(el => {
                if (el) {
                    el.textContent = this.currentCity.name;
                }
            });
        }
    }
}

// Создаем глобальный экземпляр селектора города
const citySelector = new CitySelector();

// Универсальная функция инициализации выбора города
function initCitySelector() {
    const citySelectorBtn = document.getElementById('citySelector');
    if (!citySelectorBtn) return;
    
    // Проверяем, не инициализирован ли уже обработчик
    if (citySelectorBtn.dataset.initialized === 'true') return;
    citySelectorBtn.dataset.initialized = 'true';
    
    // Создаем или находим модальное окно
    let cityModal = document.getElementById('cityModal');
    if (!cityModal) {
        cityModal = document.createElement('div');
        cityModal.className = 'modal';
        cityModal.id = 'cityModal';
        cityModal.innerHTML = `
            <div class="modal__overlay"></div>
            <div class="modal__content">
                <button class="modal__close" id="cityModalClose">&times;</button>
                <h2 class="modal__title">Выберите город</h2>
                <div class="city-list" id="cityList"></div>
            </div>
        `;
        document.body.appendChild(cityModal);
    }
    
    // Функция загрузки списка городов
    function loadCityList() {
        const cityList = document.getElementById('cityList');
        if (!cityList) return;
        
        const cities = citySelector.getPopularCities();
        const currentCity = citySelector.getCurrentCity();
        cityList.innerHTML = '';
        
        cities.forEach(city => {
            const cityItem = document.createElement('div');
            cityItem.className = 'city-item';
            if (currentCity && currentCity.id === city.id) {
                cityItem.classList.add('active');
            }
            cityItem.innerHTML = `
                <div class="city-item__name">${city.name}</div>
                <div class="city-item__region">${city.region}</div>
            `;
            cityItem.style.cursor = 'pointer';
            cityItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                citySelector.setCity(city.id);
                cityModal.classList.remove('active');
                citySelector.updateCityUI();
            });
            cityList.appendChild(cityItem);
        });
    }
    
    // Обработчик клика на селектор города
    citySelectorBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        cityModal.classList.add('active');
        loadCityList();
    });
    
    // Обработчик закрытия модального окна
    const cityModalClose = document.getElementById('cityModalClose');
    if (cityModalClose) {
        cityModalClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            cityModal.classList.remove('active');
        });
    }
    
    // Закрытие при клике на overlay
    const overlay = cityModal.querySelector('.modal__overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            cityModal.classList.remove('active');
        });
    }
    
    // Закрытие при нажатии Escape
    function handleEscape(e) {
        if (e.key === 'Escape' && cityModal.classList.contains('active')) {
            cityModal.classList.remove('active');
        }
    }
    document.addEventListener('keydown', handleEscape);
}

// Инициализация селектора города при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    citySelector.updateCityUI();
    initCitySelector();
});

