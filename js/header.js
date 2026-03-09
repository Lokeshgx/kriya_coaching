// Header Navigation Functionality
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage || (currentPage === '' && href === '../index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Close mobile menu when a link is clicked
function setupMobileMenuClose() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                if (toggler) {
                    toggler.click();
                }
            }
        });
    });
}

// Add scroll effect to navbar
function setupNavbarScrollEffect() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar-wrapper');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
            } else {
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Initialize header on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    setupMobileMenuClose();
    setupNavbarScrollEffect();
});
