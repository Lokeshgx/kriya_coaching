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
    adjustHeaderOffset();
});

// Adjust header position based on top-notice height so they don't overlap
function adjustHeaderOffset() {
    const topNotice = document.querySelector('.top-notice');
    const navbar = document.querySelector('.navbar-wrapper');
    const topHeight = topNotice ? topNotice.offsetHeight : 0;
    const navHeight = navbar ? navbar.offsetHeight : 0;

    // Set CSS variables for any CSS that relies on them
    document.documentElement.style.setProperty('--topbar-height', topHeight + 'px');
    document.documentElement.style.setProperty('--navbar-height', navHeight + 'px');

    // Update body padding so content begins after top-notice + navbar
    document.body.style.paddingTop = (topHeight + navHeight) + 'px';
}

// Recompute on window load and resize (debounced)
window.addEventListener('load', adjustHeaderOffset);
let __hdrResizeTimer = null;
window.addEventListener('resize', function() {
    clearTimeout(__hdrResizeTimer);
    __hdrResizeTimer = setTimeout(adjustHeaderOffset, 120);
});
