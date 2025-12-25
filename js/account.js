// Система управления личным кабинетом
class Account {
    constructor() {
        this.user = this.loadUser();
        this.updateAccountUI();
    }

    // Загрузка данных пользователя из localStorage
    loadUser() {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    }

    // Сохранение данных пользователя в localStorage
    saveUser(userData) {
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        this.updateAccountUI();
    }

    // Вход пользователя
    login(email, password) {
        // В реальном приложении здесь был бы запрос к серверу
        // Для демонстрации проверяем наличие пользователя
        const savedUser = this.loadUser();
        
        if (savedUser && savedUser.email === email) {
            // Проверяем пароль, если он сохранен
            if (savedUser.password) {
                if (savedUser.password !== password) {
                    alert('Неверный пароль');
                    return false;
                }
            }
            this.user = savedUser;
            this.updateAccountUI();
            return true;
        }
        
        alert('Пользователь с таким email не найден. Пожалуйста, зарегистрируйтесь.');
        return false;
    }

    // Выход пользователя
    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.updateAccountUI();
        window.location.href = 'index.html';
    }

    // Обновление данных пользователя
    updateUser(userData) {
        if (this.user) {
            this.user = { ...this.user, ...userData };
            this.saveUser(this.user);
            return true;
        }
        return false;
    }

    // Добавление заказа в историю
    addOrder(orderData) {
        if (this.user) {
            if (!this.user.orders) {
                this.user.orders = [];
            }
            this.user.orders.push({
                ...orderData,
                id: Date.now(),
                date: new Date().toISOString(),
                status: 'Обрабатывается'
            });
            this.saveUser(this.user);
            return true;
        }
        return false;
    }

    // Получение данных пользователя
    getUser() {
        return this.user;
    }

    // Проверка, авторизован ли пользователь
    isLoggedIn() {
        return this.user !== null;
    }

    // Обновление UI личного кабинета
    updateAccountUI() {
        const accountIcon = document.querySelector('.account-icon');
        const accountMenu = document.querySelector('.account-menu');
        
        if (this.user) {
            // Пользователь авторизован
            if (accountIcon) {
                accountIcon.setAttribute('title', this.user.name || this.user.email);
                accountIcon.classList.add('logged-in');
            }
            
            if (accountMenu) {
                const userName = accountMenu.querySelector('.account-menu__name');
                const userEmail = accountMenu.querySelector('.account-menu__email');
                
                if (userName) userName.textContent = this.user.name || 'Пользователь';
                if (userEmail) userEmail.textContent = this.user.email;
            }
        } else {
            // Пользователь не авторизован
            if (accountIcon) {
                accountIcon.setAttribute('title', 'Войти в личный кабинет');
                accountIcon.classList.remove('logged-in');
            }
        }
    }
}

// Создаем глобальный экземпляр аккаунта
const account = new Account();

// Инициализация аккаунта при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    account.updateAccountUI();
});

