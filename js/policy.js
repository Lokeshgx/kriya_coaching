// Policy Page Loader

// Initialize policy page behavior and animations
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();

    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }
});

function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    fetch('./header.html')
        .then(response => response.text())
        .then(html => {
            headerContainer.innerHTML = html;
            if (typeof setActiveNavLink === 'function') {
                setActiveNavLink();
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    fetch('./footer.html')
        .then(response => response.text())
        .then(html => {
            footerContainer.innerHTML = html;
            if (typeof setupBackToTopButton === 'function') {
                setupBackToTopButton();
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}
