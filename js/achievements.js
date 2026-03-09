// Achievements Page JavaScript

(function() {
    'use strict';
    
    // Initialize achievements page on DOM ready
    function initializeAchievementsPage() {
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
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', initializeAchievementsPage);
})();
