// ===== SERVICES PAGE JAVASCRIPT =====

// Initialize page on DOM load
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initializeFilterButtons();
    initializeAOS();
});

// Load Header
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('./header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html;
                setActiveNavLink();
            })
            .catch(error => console.error('Error loading header:', error));
    }
}

// Load Footer
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('./footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
                setupBackToTopButton();                // Reinitialize AOS for dynamically loaded footer elements
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Initialize Filter Buttons
function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            filterItems(serviceItems, filter);
        });
    });

    // Get filter from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    if (typeParam) {
        filterItems(serviceItems, typeParam);
        // Set active button
        const activeBtn = document.querySelector(`[data-filter="${typeParam}"]`);
        if (activeBtn) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            activeBtn.classList.add('active');
        }
    }
}

// Filter Items Function
function filterItems(items, filter) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === '*' || category === filter) {
            item.style.display = 'block';
            // Re-trigger animation
            setTimeout(() => {
                item.style.opacity = '1';
            }, 10);
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });

    // Reinitialize AOS for newly visible items
    AOS.refresh();
}

// Initialize AOS
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Setup Back to Top Button
function setupBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Log page load
console.log('Services page loaded successfully');
