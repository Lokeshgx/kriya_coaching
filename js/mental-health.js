// Page-specific JS for Mental Health page
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initializeAOS();
});

function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('./header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html;
                if (typeof setActiveNavLink === 'function') {
                    setActiveNavLink();
                }
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
                if (typeof setupBackToTopButton === 'function') {
                    setupBackToTopButton();
                }
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }
}
