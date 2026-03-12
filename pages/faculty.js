// ===== FACULTY PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    AOS.init({ duration: 1000, once: true, offset: 100 });
});

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

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('./footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
                setupBackToTopButton();
                // Reinitialize AOS for dynamically loaded footer elements
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

console.log('Faculty page loaded successfully');
