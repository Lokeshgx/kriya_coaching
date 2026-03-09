// Contact Page JavaScript
(function() {
    'use strict';
    
    // Initialize contact page on DOM ready
    function initializeContactPage() {
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
        
        // Setup contact form
        setupContactForm();
    }
    
    // Setup contact form handler
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Validate form
                if (validateContactForm(formData)) {
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
                    // Reset form
                    this.reset();
                    // You can add form submission logic here (e.g., AJAX to backend)
                }
            });
        }
    }
    
    // Validate contact form
    function validateContactForm(data) {
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        return true;
    }
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', initializeContactPage);
})();
