// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const sidebarNav = document.querySelector('.sidebar-nav');
    
    if (burger && sidebarNav) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            sidebarNav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = sidebarNav.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    burger.classList.remove('active');
                    sidebarNav.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768) {
                if (!sidebarNav.contains(event.target) && !burger.contains(event.target)) {
                    burger.classList.remove('active');
                    sidebarNav.classList.remove('active');
                }
            }
        });
    }
});

