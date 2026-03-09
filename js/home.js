// ===== HOME PAGE JAVASCRIPT =====

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Load Header and Footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initializeStatCounters();
    initializeEnquiryForm();
    setupCarouselAutoplay();
});

// Load Header from header.html
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        fetch('./pages/header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html;
                adjustHeaderLinksForRoot(); // Fix relative paths for root context
                setActiveNavLink();
            })
            .catch(error => console.error('Error loading header:', error));
    }
}

// Load Footer from footer.html
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('./pages/footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
                adjustFooterLinksForRoot(); // Fix relative paths for root context
                setupBackToTopButton();
                // Reinitialize AOS for dynamically loaded footer elements
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Adjust header links to work from root (index.html) context
// Supports both local development and GitHub Pages subdirectory deployments
function adjustHeaderLinksForRoot() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    
    // Detect base path for subdirectory deployments (e.g., GitHub Pages with /kriyaCoaching/)
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const basePath = pathParts.length > 1 ? '/' + pathParts[0] : '';
    
    const links = headerContainer.querySelectorAll('a[href]');
    links.forEach(link => {
        let href = link.getAttribute('href');
        
        // Skip external links and already absolute paths
        if (href.startsWith('http') || href.startsWith('/')) return;
        if (href.startsWith('#')) return;
        
        let newHref = href;
        
        // If link starts with ../ (going to parent directory), remove it
        if (href.startsWith('../')) {
            newHref = href.replace('../', '');
        }
        // If it's a relative path without pages/, prepend pages/
        else if (!href.startsWith('pages/') && !href.startsWith('?')) {
            newHref = 'pages/' + href;
        }
        
        // Prepend base path for subdirectory deployments
        if (basePath && !newHref.startsWith('/')) {
            newHref = basePath + '/' + newHref;
        }
        
        link.setAttribute('href', newHref);
    });
}

// Adjust footer links to work from root (index.html) context
// Supports both local development and GitHub Pages subdirectory deployments
function adjustFooterLinksForRoot() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    // Detect base path for subdirectory deployments (e.g., GitHub Pages with /kriyaCoaching/)
    const pathParts = window.location.pathname.split('/').filter(p => p);
    const basePath = pathParts.length > 1 ? '/' + pathParts[0] : '';
    
    const links = footerContainer.querySelectorAll('a[href]');
    links.forEach(link => {
        let href = link.getAttribute('href');
        
        // Skip external links and already absolute paths
        if (href.startsWith('http') || href.startsWith('/')) return;
        if (href.startsWith('#')) return;
        
        let newHref = href;
        
        // If link starts with ../ (going to parent directory), remove it
        if (href.startsWith('../')) {
            newHref = href.replace('../', '');
        }
        // If it's a relative path without pages/, prepend pages/
        else if (!href.startsWith('pages/') && !href.startsWith('?')) {
            newHref = 'pages/' + href;
        }
        
        // Prepend base path for subdirectory deployments
        if (basePath && !newHref.startsWith('/')) {
            newHref = basePath + '/' + newHref;
        }
        
        link.setAttribute('href', newHref);
    });
}

// Initialize Stat Counters with Animation
function initializeStatCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const statElements = entry.target.querySelectorAll('.stat-number');
                statElements.forEach(element => {
                    const target = parseInt(element.getAttribute('data-target'));
                    animateCounter(element, target, 2000);
                });
                entry.target.setAttribute('data-animated', 'true');
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Animate Counter Function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 50);
    const stepTime = 50;

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, stepTime);
}

// Initialize Enquiry Form
function initializeEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateEnquiryForm()) {
            showNotification('Please fill all required fields correctly', 'danger');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = {
            fullName: formData.get('fullName'),
            mobileNumber: formData.get('mobileNumber'),
            emailId: formData.get('emailId'),
            course: formData.get('course'),
            queryMessage: formData.get('queryMessage'),
            timestamp: new Date().toISOString()
        };

        // Submit form (in real scenario, send to backend)
        submitEnquiryForm(data);
    });
}

// Validate Enquiry Form
function validateEnquiryForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const emailId = document.getElementById('emailId').value.trim();
    const course = document.getElementById('course').value.trim();

    if (!fullName || fullName.length < 3) {
        console.log('Invalid name');
        return false;
    }

    if (!isValidPhoneNumber(mobileNumber) || mobileNumber.length < 10) {
        console.log('Invalid phone');
        return false;
    }

    if (!isValidEmail(emailId)) {
        console.log('Invalid email');
        return false;
    }

    if (!course) {
        console.log('Course not selected');
        return false;
    }

    return true;
}

// Submit Enquiry Form (Mock implementation)
function submitEnquiryForm(data) {
    // Disable button during submission
    const submitBtn = document.querySelector('#enquiry-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

    // Simulate API call
    setTimeout(() => {
        // In real implementation, send to backend API
        console.log('Form Data:', data);
        
        // Show success message
        showNotification('✓ Thank you! Your enquiry has been submitted successfully. We will contact you soon!', 'success', 5000);
        
        // Reset form
        document.getElementById('enquiry-form').reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Scroll to form
        document.getElementById('enquiry-form').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

// Setup Carousel Autoplay
function setupCarouselAutoplay() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            keyboard: true
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            bsCarousel.pause();
        });

        carousel.addEventListener('mouseleave', () => {
            bsCarousel.cycle();
        });
    }
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

// Event Listeners for Navigation Links
document.addEventListener('click', function(e) {
    if (e.target.matches('.navbar-nav a') || e.target.closest('.navbar-nav a')) {
        // Close mobile menu if open
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar && navbar.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler.click();
        }
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        const href = e.target.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Log page load
console.log('Home page loaded successfully');
