// Система управления избранным
class Favorites {
    constructor() {
        this.items = this.loadFavorites();
        this.updateFavoritesUI();
    }

    // Загрузка избранного из localStorage
    loadFavorites() {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    }

    // Сохранение избранного в localStorage
    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.items));
        this.updateFavoritesUI();
    }

    // Добавление товара в избранное
    addItem(productId) {
        const product = getProductById(productId);
        if (!product) {
            console.error('Товар не найден');
            return false;
        }

        if (!this.hasItem(productId)) {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            this.saveFavorites();
            this.showNotification('Товар добавлен в избранное');
            return true;
        }
        return false;
    }

    // Удаление товара из избранного
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveFavorites();
        this.showNotification('Товар удален из избранного');
    }

    // Переключение состояния избранного
    toggleItem(productId) {
        if (this.hasItem(productId)) {
            this.removeItem(productId);
            return false;
        } else {
            this.addItem(productId);
            return true;
        }
    }

    // Очистка избранного
    clear() {
        this.items = [];
        this.saveFavorites();
    }

    // Получение всех товаров в избранном
    getItems() {
        return this.items;
    }

    // Проверка, есть ли товар в избранном
    hasItem(productId) {
        return this.items.some(item => item.id === productId);
    }

    // Получение количества товаров в избранном
    getCount() {
        return this.items.length;
    }

    // Обновление UI избранного
    updateFavoritesUI() {
        const favoritesCount = this.getCount();
        const favoritesCountElements = document.querySelectorAll('.favorites-count');
        favoritesCountElements.forEach(el => {
            el.textContent = favoritesCount;
            el.style.display = favoritesCount > 0 ? 'block' : 'none';
        });

        // Обновление иконки избранного
        const favoritesIcon = document.querySelector('.favorites-icon');
        if (favoritesIcon) {
            const countBadge = favoritesIcon.querySelector('.favorites-badge') || document.createElement('span');
            if (!favoritesIcon.querySelector('.favorites-badge')) {
                countBadge.className = 'favorites-badge';
                favoritesIcon.appendChild(countBadge);
            }
            countBadge.textContent = favoritesCount;
            countBadge.style.display = favoritesCount > 0 ? 'flex' : 'none';
        }

        // Обновление кнопок избранного на страницах товаров
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const productId = parseInt(btn.getAttribute('data-product-id'));
            if (productId && this.hasItem(productId)) {
                btn.classList.add('active');
                btn.setAttribute('title', 'Удалить из избранного');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('title', 'Добавить в избранное');
            }
        });
    }

    // Показ уведомления
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'favorites-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Создаем глобальный экземпляр избранного
const favorites = new Favorites();

// Инициализация избранного при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    favorites.updateFavoritesUI();
});


