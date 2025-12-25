// Form validation and dynamic elements
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const deliveryAddress = document.getElementById('deliveryAddress');
    const addressField = document.getElementById('address');
    const addCertificateBtn = document.getElementById('addCertificateBtn');
    const certificatesContainer = document.getElementById('certificatesContainer');
    const confirmModal = document.getElementById('confirmModal');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const successModalClose = document.getElementById('successModalClose');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const okBtn = document.getElementById('okBtn');
    const fileUpload = document.getElementById('fileUpload');
    
    let certificateCount = 1;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Validate on input for email and password
        if (input.type === 'email' || input.type === 'password') {
            input.addEventListener('input', function() {
                validateField(this);
            });
        }
    });
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail(this);
        });
    }
    
    // Password validation
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this);
        });
    }
    
    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            validatePhone(this);
        });
    }
    
    // File upload validation
    if (fileUpload) {
        fileUpload.addEventListener('change', function() {
            validateFile(this);
        });
    }
    
    // Dynamic delivery address fields
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'delivery' || this.value === 'post') {
                deliveryAddress.style.display = 'block';
                addressField.setAttribute('required', 'required');
            } else {
                deliveryAddress.style.display = 'none';
                addressField.removeAttribute('required');
                addressField.value = '';
                clearError('addressError');
            }
        });
    });
    
    // Add certificate functionality
    if (addCertificateBtn) {
        addCertificateBtn.addEventListener('click', function() {
            const certificateItem = document.createElement('div');
            certificateItem.className = 'certificate-item';
            certificateItem.innerHTML = `
                <div class="form-group">
                    <label for="certificateType${certificateCount}" class="form-label">Тип сертификата</label>
                    <input type="text" id="certificateType${certificateCount}" name="certificateType[]" class="form-input">
                </div>
                <div class="form-group">
                    <label for="certificateNumber${certificateCount}" class="form-label">Номер сертификата</label>
                    <input type="text" id="certificateNumber${certificateCount}" name="certificateNumber[]" class="form-input">
                </div>
            `;
            certificatesContainer.appendChild(certificateItem);
            certificateCount++;
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка наличия отмеченных товаров в корзине
            if (typeof cart !== 'undefined') {
                const selectedItems = cart.getSelectedItems();
                if (selectedItems.length === 0) {
                    alert('Выберите товары для покупки, отметив их галочкой.');
                    return;
                }
            }
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            // Validate delivery address if needed
            if (deliveryRadios && Array.from(deliveryRadios).some(r => r.checked && (r.value === 'delivery' || r.value === 'post'))) {
                if (addressField && !addressField.value.trim()) {
                    showError('addressError', 'Укажите адрес доставки');
                    isValid = false;
                }
            }
            
            if (isValid) {
                showModal(confirmModal);
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.form-input:invalid, .form-select:invalid, .form-textarea:invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    }
    
    // Modal handlers
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            hideModal(confirmModal);
            // Simulate form submission
            setTimeout(() => {
                hideModal(successModal);
                showModal(successModal);
                
                // Сохранение заказа в личный кабинет
                if (typeof account !== 'undefined' && account.isLoggedIn() && typeof cart !== 'undefined') {
                    const selectedItems = cart.getSelectedItems();
                    const totalPrice = cart.getSelectedTotalPrice();
                    const formData = new FormData(form);
                    
                    const orderData = {
                        items: selectedItems,
                        total: totalPrice,
                        delivery: formData.get('delivery'),
                        address: formData.get('address') || '',
                        comment: formData.get('comment') || ''
                    };
                    
                    account.addOrder(orderData);
                }
                
                // Удаление только отмеченных товаров из корзины после успешного заказа
                if (typeof cart !== 'undefined') {
                    const selectedItems = cart.getSelectedItems();
                    selectedItems.forEach(item => {
                        cart.removeItem(item.id);
                    });
                }
                
                form.reset();
                certificateCount = 1;
                certificatesContainer.innerHTML = `
                    <div class="certificate-item">
                        <div class="form-group">
                            <label for="certificateType0" class="form-label">Тип сертификата</label>
                            <input type="text" id="certificateType0" name="certificateType[]" class="form-input">
                        </div>
                        <div class="form-group">
                            <label for="certificateNumber0" class="form-label">Номер сертификата</label>
                            <input type="text" id="certificateNumber0" name="certificateNumber[]" class="form-input">
                        </div>
                    </div>
                `;
                deliveryAddress.style.display = 'none';
                addressField.removeAttribute('required');
            }, 300);
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            hideModal(confirmModal);
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            hideModal(confirmModal);
        });
    }
    
    if (successModalClose) {
        successModalClose.addEventListener('click', function() {
            hideModal(successModal);
        });
    }
    
    if (okBtn) {
        okBtn.addEventListener('click', function() {
            hideModal(successModal);
        });
    }
    
    // Close modal on overlay click
    [confirmModal, successModal].forEach(modal => {
        if (modal) {
            const overlay = modal.querySelector('.modal__overlay');
            if (overlay) {
                overlay.addEventListener('click', function() {
                    hideModal(modal);
                });
            }
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal(confirmModal);
            hideModal(successModal);
        }
    });
    
    // Validation functions
    function validateField(field) {
        const errorId = field.id + 'Error';
        const errorElement = document.getElementById(errorId);
        const errorMessage = field.getAttribute('data-error') || 'Поле обязательно для заполнения';
        
        if (field.validity.valid) {
            clearError(errorId);
            return true;
        } else {
            if (field.validity.valueMissing) {
                showError(errorId, errorMessage);
            } else if (field.validity.tooShort) {
                showError(errorId, errorMessage || `Минимальная длина: ${field.minLength} символов`);
            } else if (field.validity.patternMismatch) {
                showError(errorId, errorMessage || 'Неверный формат');
            } else {
                showError(errorId, errorMessage);
            }
            return false;
        }
    }
    
    function validateEmail(field) {
        const errorId = 'emailError';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (field.value && !emailRegex.test(field.value)) {
            showError(errorId, 'Введите корректный email адрес');
            return false;
        } else {
            clearError(errorId);
            return true;
        }
    }
    
    function validatePassword(field) {
        const errorId = 'passwordError';
        
        if (field.value.length < 8) {
            showError(errorId, 'Пароль должен содержать минимум 8 символов');
            return false;
        } else {
            clearError(errorId);
            return true;
        }
    }
    
    function validatePhone(field) {
        const errorId = 'phoneError';
        const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
        
        if (field.value && !phoneRegex.test(field.value)) {
            showError(errorId, 'Введите корректный номер телефона');
            return false;
        } else {
            clearError(errorId);
            return true;
        }
    }
    
    function validateFile(field) {
        const errorId = 'fileError';
        const maxSize = 5 * 1024 * 1024; // 5 MB
        
        if (field.files.length > 0) {
            const file = field.files[0];
            if (file.size > maxSize) {
                showError(errorId, 'Размер файла не должен превышать 5 МБ');
                return false;
            } else {
                clearError(errorId);
                return true;
            }
        } else {
            clearError(errorId);
            return true;
        }
    }
    
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    function showModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function hideModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

