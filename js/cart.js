// Система управления корзиной
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.selectedItems = this.loadSelectedItems();
        this.updateCartUI();
    }

    // Загрузка корзины из localStorage
    loadCart() {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Загрузка отмеченных товаров из localStorage
    loadSelectedItems() {
        const saved = localStorage.getItem('cartSelectedItems');
        return saved ? JSON.parse(saved) : [];
    }

    // Сохранение отмеченных товаров в localStorage
    saveSelectedItems() {
        localStorage.setItem('cartSelectedItems', JSON.stringify(this.selectedItems));
    }

    // Сохранение корзины в localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    // Добавление товара в корзину
    addItem(productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) {
            console.error('Товар не найден');
            return false;
        }

        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        // Автоматически отмечаем товар как выбранный при добавлении
        this.setItemSelected(productId, true);

        this.saveCart();
        this.showNotification('Товар добавлен в корзину');
        return true;
    }

    // Удаление товара из корзины
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.selectedItems = this.selectedItems.filter(id => id !== productId);
        this.saveCart();
        this.saveSelectedItems();
        this.showNotification('Товар удален из корзины');
    }

    // Изменение количества товара
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Очистка корзины
    clear() {
        this.items = [];
        this.selectedItems = [];
        this.saveCart();
        this.saveSelectedItems();
    }

    // Получение общего количества товаров
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Получение общей стоимости
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Получение всех товаров в корзине
    getItems() {
        return this.items;
    }

    // Проверка, есть ли товар в корзине
    hasItem(productId) {
        return this.items.some(item => item.id === productId);
    }

    // Получение количества конкретного товара
    getItemQuantity(productId) {
        const item = this.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    }

    // Установка отметки товара
    setItemSelected(productId, isSelected) {
        if (isSelected) {
            if (!this.selectedItems.includes(productId)) {
                this.selectedItems.push(productId);
            }
        } else {
            this.selectedItems = this.selectedItems.filter(id => id !== productId);
        }
        this.saveSelectedItems();
    }

    // Проверка, отмечен ли товар
    isItemSelected(productId) {
        return this.selectedItems.includes(productId);
    }

    // Получение только отмеченных товаров
    getSelectedItems() {
        return this.items.filter(item => this.selectedItems.includes(item.id));
    }

    // Получение суммы только отмеченных товаров
    getSelectedTotalPrice() {
        return this.getSelectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Обновление UI корзины
    updateCartUI() {
        const cartCount = this.getTotalItems();
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
            el.textContent = cartCount;
            el.style.display = cartCount > 0 ? 'block' : 'none';
        });

        // Обновление иконки корзины
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            const countBadge = cartIcon.querySelector('.cart-badge') || document.createElement('span');
            if (!cartIcon.querySelector('.cart-badge')) {
                countBadge.className = 'cart-badge';
                cartIcon.appendChild(countBadge);
            }
            countBadge.textContent = cartCount;
            countBadge.style.display = cartCount > 0 ? 'flex' : 'none';
        }
    }

    // Показ уведомления
    showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Показываем уведомление
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Скрываем уведомление через 3 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Создаем глобальный экземпляр корзины
const cart = new Cart();

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    cart.updateCartUI();
});


