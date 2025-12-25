// Search functionality
class Search {
    constructor() {
        this.searchInput = null;
        this.searchResults = [];
        this.init();
    }
    
    init() {
        // Инициализация поиска на всех страницах
        document.addEventListener('DOMContentLoaded', () => {
            this.searchInput = document.getElementById('searchInput');
            if (this.searchInput) {
                this.setupSearch();
            }
        });
    }
    
    setupSearch() {
        let searchTimeout;
        
        // Поиск при вводе (с задержкой)
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    this.performSearch(query);
                }, 300);
            } else {
                this.hideSearchResults();
            }
        });
        
        // Поиск при нажатии Enter
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.searchInput.value.trim();
                if (query.length >= 2) {
                    this.performSearch(query);
                    // Переход на страницу каталога с результатами поиска
                    if (window.location.pathname !== '/gallery.html' && !window.location.pathname.includes('gallery.html')) {
                        window.location.href = `gallery.html?search=${encodeURIComponent(query)}`;
                    } else {
                        this.performSearch(query);
                    }
                }
            }
        });
        
        // Обработка клика на кнопку поиска
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = this.searchInput.value.trim();
                if (query.length >= 2) {
                    if (window.location.pathname !== '/gallery.html' && !window.location.pathname.includes('gallery.html')) {
                        window.location.href = `gallery.html?search=${encodeURIComponent(query)}`;
                    } else {
                        this.performSearch(query);
                    }
                }
            });
        }
        
        // Проверка URL параметра search при загрузке страницы
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery && this.searchInput) {
            this.searchInput.value = searchQuery;
            // На странице каталога синхронизируем с локальным поиском
            const gallerySearchInput = document.getElementById('productSearch');
            if (gallerySearchInput) {
                gallerySearchInput.value = searchQuery;
                // Триггерим событие для обновления каталога
                setTimeout(() => {
                    gallerySearchInput.dispatchEvent(new Event('input', { bubbles: true }));
                }, 100);
            } else {
                this.performSearch(searchQuery);
            }
        }
        
        // Закрытие результатов поиска при клике вне области
        document.addEventListener('click', (e) => {
            if (this.searchInput && !this.searchInput.contains(e.target) && 
                !document.getElementById('searchResults')?.contains(e.target) &&
                !document.getElementById('searchBtn')?.contains(e.target)) {
                this.hideSearchResults();
            }
        });
    }
    
    performSearch(query) {
        if (!query || query.length < 2) {
            this.hideSearchResults();
            return;
        }
        
        const searchTerm = query.toLowerCase();
        const allProducts = this.getAllProducts();
        
        // Поиск по названию, бренду, описанию и характеристикам
        this.searchResults = allProducts.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            const brandMatch = product.brand && product.brand.toLowerCase().includes(searchTerm);
            const descMatch = product.description && product.description.toLowerCase().includes(searchTerm);
            
            // Поиск в характеристиках
            let charMatch = false;
            if (product.characteristics) {
                charMatch = Object.values(product.characteristics).some(value => 
                    value.toString().toLowerCase().includes(searchTerm)
                );
            }
            
            return nameMatch || brandMatch || descMatch || charMatch;
        });
        
        this.displaySearchResults();
        
        // Если мы на странице каталога, обновляем отображение товаров
        if (window.location.pathname.includes('gallery.html') || window.location.pathname.includes('index.html')) {
            this.updateCatalogDisplay();
        }
    }
    
    getAllProducts() {
        if (typeof getAllProducts === 'function') {
            return getAllProducts();
        }
        // Fallback: получаем все товары из объекта products
        if (typeof products !== 'undefined') {
            return Object.values(products);
        }
        return [];
    }
    
    displaySearchResults() {
        // Создаем или обновляем контейнер результатов
        let resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'searchResults';
            resultsContainer.className = 'search-results';
            this.searchInput.parentElement.appendChild(resultsContainer);
        }
        
        if (this.searchResults.length === 0) {
            resultsContainer.innerHTML = '<div class="search-results__empty">Товары не найдены</div>';
            resultsContainer.style.display = 'block';
            return;
        }
        
        // Показываем первые 5 результатов в выпадающем списке
        const maxResults = 5;
        const displayResults = this.searchResults.slice(0, maxResults);
        
        resultsContainer.innerHTML = displayResults.map(product => `
            <div class="search-results__item" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" class="search-results__image" 
                     onerror="this.src='https://via.placeholder.com/50x50?text=${encodeURIComponent(product.name)}'">
                <div class="search-results__info">
                    <div class="search-results__name">${this.highlightMatch(product.name, this.searchInput.value)}</div>
                    <div class="search-results__price">${product.price.toLocaleString('ru-RU')} ₽</div>
                </div>
            </div>
        `).join('');
        
        if (this.searchResults.length > maxResults) {
            resultsContainer.innerHTML += `
                <div class="search-results__more" onclick="window.location.href='gallery.html?search=${encodeURIComponent(this.searchInput.value)}'">
                    Показать все результаты (${this.searchResults.length})
                </div>
            `;
        }
        
        resultsContainer.style.display = 'block';
    }
    
    highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    hideSearchResults() {
        const resultsContainer = document.getElementById('searchResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }
    
    updateCatalogDisplay() {
        // Если на странице каталога, обновляем отображение товаров
        const gallerySearchInput = document.getElementById('productSearch');
        if (gallerySearchInput) {
            // Синхронизируем с поиском на странице каталога
            gallerySearchInput.value = this.searchInput.value;
            // Триггерим событие input для обновления каталога
            gallerySearchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        // Если на главной странице, обновляем отображение товаров
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            const productsContainer = document.querySelector('.products__grid') || 
                                     document.getElementById('productsContainer');
            
            if (productsContainer) {
                this.renderProductsOnPage(productsContainer, this.searchResults);
            }
        }
    }
    
    renderProductsOnPage(container, products) {
        if (!container) return;
        
        container.innerHTML = '';
        
        if (products.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-2xl);">
                    <p style="font-size: var(--font-size-large); color: var(--color-text-secondary);">
                        Товары не найдены
                    </p>
                </div>
            `;
            return;
        }
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}'">
                    ${product.discount ? `<span class="product-card__discount">-${product.discount}%</span>` : ''}
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${product.name}</h3>
                    <div class="product-card__price">
                        <span class="price__current">${product.price.toLocaleString('ru-RU')} ₽</span>
                        ${product.oldPrice ? `<span class="price__old">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>` : ''}
                    </div>
                    <div class="product-card__actions">
                        <button class="btn btn--primary" onclick="cart.addItem(${product.id}); cart.updateCartUI();">В корзину</button>
                        <button class="favorite-btn ${favorites.hasItem(product.id) ? 'active' : ''}" 
                                data-product-id="${product.id}" 
                                onclick="favorites.toggleItem(${product.id}); this.classList.toggle('active');">
                            ⭐
                        </button>
                    </div>
                </div>
            `;
            productCard.addEventListener('click', function(e) {
                if (!e.target.closest('.btn') && !e.target.closest('.favorite-btn')) {
                    window.location.href = `product.html?id=${product.id}`;
                }
            });
            container.appendChild(productCard);
        });
    }
    
    getSearchResults() {
        return this.searchResults;
    }
}

// Инициализация поиска
const search = new Search();

// Функция для использования в других скриптах
function performProductSearch(query) {
    if (search) {
        search.performSearch(query);
        return search.getSearchResults();
    }
    return [];
}

