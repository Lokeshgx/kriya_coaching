// Gallery Page JavaScript
(function() {
    'use strict';
    
    // Initialize gallery page on DOM ready
    function initializeGalleryPage() {
        // Fetch and load header
        fetch('./header.html')
            .then(r => r.text())
            .then(h => {
                document.getElementById('header-container').innerHTML = h;
                setActiveNavLink();
            });
        
        // Fetch and load footer
        fetch('./footer.html')
            .then(r => r.text())
            .then(h => {
                document.getElementById('footer-container').innerHTML = h;
                // Reinitialize AOS for dynamically loaded footer elements
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            });
        
        // Initialize AOS animations
        AOS.init({ duration: 1000, once: true });
        
        // Setup gallery filter
        setupGalleryFilter();
    }
    
    // Setup gallery filter functionality
    function setupGalleryFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === '*' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', initializeGalleryPage);
})();
