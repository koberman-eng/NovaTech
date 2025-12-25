// Gallery filtering and lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    const imageArray = Array.from(galleryImages);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // Add fade-in animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Get visible images based on current filter
    function getVisibleImages() {
        const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        return visibleItems.map(item => item.querySelector('.gallery-image')).filter(img => img !== null);
    }
    
    // Lightbox functionality
    galleryImages.forEach((image) => {
        image.addEventListener('click', function() {
            const visibleImages = getVisibleImages();
            currentImageIndex = visibleImages.indexOf(this);
            if (currentImageIndex === -1) currentImageIndex = 0;
            openLightbox(this.getAttribute('data-full') || this.src, this.alt);
        });
    });
    
    function openLightbox(imageSrc, imageAlt) {
        if (lightbox && lightboxImage) {
            lightboxImage.src = imageSrc;
            lightboxImage.alt = imageAlt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateNavigationButtons();
        }
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function showNextImage() {
        const visibleImages = getVisibleImages();
        if (visibleImages.length === 0) return;
        
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        const nextImage = visibleImages[currentImageIndex];
        openLightbox(nextImage.getAttribute('data-full') || nextImage.src, nextImage.alt);
    }
    
    function showPrevImage() {
        const visibleImages = getVisibleImages();
        if (visibleImages.length === 0) return;
        
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        const prevImage = visibleImages[currentImageIndex];
        openLightbox(prevImage.getAttribute('data-full') || prevImage.src, prevImage.alt);
    }
    
    function updateNavigationButtons() {
        const visibleImages = getVisibleImages();
        if (lightboxPrev && lightboxNext) {
            lightboxPrev.style.display = visibleImages.length > 1 ? 'flex' : 'none';
            lightboxNext.style.display = visibleImages.length > 1 ? 'flex' : 'none';
        }
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Close lightbox on overlay click (click outside image area)
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            // Close if clicked directly on lightbox (background), but not on image or buttons
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Prevent closing when clicking on image or content area
        const lightboxContent = lightbox.querySelector('.lightbox__content');
        if (lightboxContent) {
            lightboxContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
    
    // Update current index when filter changes
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const visibleImages = getVisibleImages();
            if (visibleImages.length > 0) {
                currentImageIndex = 0;
            }
        });
    });
});

