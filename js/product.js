// Product page functionality with zoom and reviews
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const zoomContainer = document.getElementById('zoomContainer');
    const zoomModal = document.getElementById('zoomModal');
    const zoomModalImage = document.getElementById('zoomModalImage');
    const zoomModalClose = document.getElementById('zoomModalClose');
    
    let currentProduct = null;
    
    // Initialize zoom functionality - только по клику
    function initZoom() {
        if (!mainImage || !zoomContainer) return;
        
        const img = mainImage;
        const container = zoomContainer;
        
        // Click to open full zoom
        container.addEventListener('click', function(e) {
            if (e.target === img || e.target === container) {
                if (zoomModal && zoomModalImage) {
                    zoomModal.classList.add('active');
                    zoomModalImage.src = img.src;
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    }
    
    // Close zoom modal
    if (zoomModalClose) {
        zoomModalClose.addEventListener('click', function(e) {
            e.stopPropagation();
            if (zoomModal) {
                zoomModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    if (zoomModal) {
        zoomModal.addEventListener('click', function(e) {
            if (e.target === zoomModal || e.target === zoomModalImage) {
                zoomModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && zoomModal.classList.contains('active')) {
                zoomModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Thumbnail click handler
    if (thumbnailsContainer) {
        thumbnailsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('thumbnail')) {
                const newImageSrc = e.target.getAttribute('data-image');
                const index = parseInt(e.target.getAttribute('data-index')) || 0;
                if (newImageSrc && mainImage) {
                    mainImage.src = newImageSrc;
                    mainImage.alt = e.target.alt;
                    
                    // Update active thumbnail
                    thumbnailsContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                }
            }
        });
    }
    
    // Quantity selector
    if (quantityInput && decreaseBtn && increaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            const maxValue = parseInt(quantityInput.max) || 10;
            if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
            }
        });
        
        // Validate quantity input
        quantityInput.addEventListener('change', function() {
            const value = parseInt(this.value);
            const min = parseInt(this.min) || 1;
            const max = parseInt(this.max) || 10;
            
            if (isNaN(value) || value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
        });
    }
    
    // Load product data and initialize
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId && typeof getProductById === 'function') {
        currentProduct = getProductById(productId);
        
        if (currentProduct && mainImage) {
            // Initialize zoom after image loads
            mainImage.addEventListener('load', function() {
                initZoom();
            });
            
            // If image already loaded
            if (mainImage.complete) {
                initZoom();
            }
        }
    } else {
        initZoom();
    }
    
    // Render reviews
    function renderReviews(product) {
        const reviewsSection = document.getElementById('reviewsSection');
        const reviewsList = document.getElementById('reviewsList');
        const reviewsRatingValue = document.getElementById('reviewsRatingValue');
        const reviewsRatingStars = document.getElementById('reviewsRatingStars');
        const reviewsRatingCount = document.getElementById('reviewsRatingCount');
        
        if (!reviewsSection || !product) return;
        
        if (product.reviews && product.reviews.length > 0) {
            reviewsSection.style.display = 'block';
            
            if (reviewsRatingValue) {
                reviewsRatingValue.textContent = product.rating.toFixed(1);
            }
            
            if (reviewsRatingStars) {
                const fullStars = Math.floor(product.rating);
                const hasHalfStar = product.rating % 1 >= 0.5;
                reviewsRatingStars.innerHTML = 
                    '★'.repeat(fullStars) + 
                    (hasHalfStar ? '½' : '') + 
                    '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
            }
            
            if (reviewsRatingCount) {
                const count = product.reviewsCount;
                reviewsRatingCount.textContent = `${count} ${count === 1 ? 'отзыв' : count < 5 ? 'отзыва' : 'отзывов'}`;
            }
            
            if (reviewsList) {
                reviewsList.innerHTML = '';
                product.reviews.forEach(review => {
                    const reviewItem = document.createElement('div');
                    reviewItem.className = 'review-item';
                    reviewItem.innerHTML = `
                        <div class="review-item__header">
                            <div class="review-item__author">${review.author}</div>
                            <div class="review-item__date">${review.date}</div>
                        </div>
                        <div class="review-item__rating">
                            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                        </div>
                        <div class="review-item__text">${review.text}</div>
                    `;
                    reviewsList.appendChild(reviewItem);
                });
            }
        } else {
            reviewsSection.style.display = 'none';
        }
    }
    
    // Render reviews if product is loaded
    if (currentProduct) {
        renderReviews(currentProduct);
    }
    
    // Also render reviews when product is loaded from product.html script
    setTimeout(() => {
        if (productId && typeof getProductById === 'function') {
            const product = getProductById(productId);
            if (product) {
                renderReviews(product);
            }
        }
    }, 100);
});
