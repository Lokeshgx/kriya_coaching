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
    initializeEnquiryDropdowns();
    setupCarouselAutoplay();
    initializeStudentCarousel();
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


// Send enquiry form data on WhatsApp
function sendToWhatsapp() {
    const name = document.getElementById('fullName').value.trim();
    const mobile = document.getElementById('mobileNumber').value.trim();
    const email = document.getElementById('emailId').value.trim();
    const service = document.getElementById('service').value;

    // Validate fixed fields
    if (!name || name.length < 2) {
        showNotification('Please enter your full name', 'danger');
        return;
    }
    if (!mobile || mobile.replace(/\D/g, '').length < 10) {
        showNotification('Please enter a valid 10-digit mobile number', 'danger');
        return;
    }
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'danger');
        return;
    }
    if (!service) {
        showNotification('Please select a service', 'danger');
        return;
    }

    // Validate visible cascading dropdowns
    const boardClassRow = document.getElementById('board-class-row');
    if (boardClassRow && !boardClassRow.classList.contains('d-none')) {
        const board = document.getElementById('board').value;
        if (!board) {
            showNotification('Please select a Board', 'danger');
            return;
        }
        const classCol = document.getElementById('class-col');
        if (classCol && !classCol.classList.contains('d-none')) {
            const className = document.getElementById('className').value;
            if (!className) {
                showNotification('Please select a Class', 'danger');
                return;
            }
            const subjectRow = document.getElementById('subject-row');
            if (subjectRow && !subjectRow.classList.contains('d-none')) {
                const subject = document.getElementById('subject').value;
                if (!subject) {
                    showNotification('Please select a Subject', 'danger');
                    return;
                }
            }
        }
    }

    const query = document.getElementById('queryMessage').value.trim();
    if (!query) {
        showNotification('Please enter your query or message', 'danger');
        return;
    }

    // Build WhatsApp message
    const lines = [
        '\uD83C\uDF93 New Enquiry - Kriya Coaching Classes',
        '',
        '\uD83D\uDCCB Contact Details:',
        'Name: ' + name,
        'Mobile: ' + mobile,
        'Email: ' + email,
        '',
        '\uD83D\uDCDA Service Interest:',
        'Service: ' + service
    ];

    // Append academic sub-fields if visible
    if (boardClassRow && !boardClassRow.classList.contains('d-none')) {
        const board = document.getElementById('board').value;
        if (board) lines.push('Board: ' + board);

        const classCol = document.getElementById('class-col');
        if (classCol && !classCol.classList.contains('d-none')) {
            const className = document.getElementById('className').value;
            if (className) lines.push('Class: ' + className);
        }

        const subjectRow = document.getElementById('subject-row');
        if (subjectRow && !subjectRow.classList.contains('d-none')) {
            const subject = document.getElementById('subject').value;
            if (subject) lines.push('Subject: ' + subject);
        }
    }

    if (query) {
        lines.push('');
        lines.push('\uD83D\uDCAC Message: ' + query);
    }

    const phoneNumber = '918431345144';
    const message = encodeURIComponent(lines.join('\n'));
    const whatsappURL = 'https://wa.me/' + phoneNumber + '?text=' + message;

    // Open WhatsApp immediately — must be called directly in the submit event,
    // NOT inside setTimeout, or browsers will block it as a popup.
    window.open(whatsappURL, '_blank');
    showNotification('\u2713 Redirecting to WhatsApp.', 'success', 3000);
    resetEnquiryForm();
}

// Reset enquiry form and cascading dropdowns to initial state
function resetEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (form) form.reset();

    const boardClassRow = document.getElementById('board-class-row');
    const classCol = document.getElementById('class-col');
    const subjectRow = document.getElementById('subject-row');
    if (boardClassRow) boardClassRow.classList.add('d-none');
    if (classCol) classCol.classList.add('d-none');
    if (subjectRow) subjectRow.classList.add('d-none');

    ['board', 'className', 'subject'].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.removeAttribute('required');
    });
}

// Cascading dropdown data for Academic Courses
const enquiryDropdownData = {
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    subjects: {
        'Class 6':  ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 7':  ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 8':  ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 9':  ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 10': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 11': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Business Studies', 'Accountancy', 'Economics', 'English'],
        'Class 12': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Business Studies', 'Accountancy', 'Economics', 'English']
    }
};

// Initialize cascading dropdowns for Enquiry Form
function initializeEnquiryDropdowns() {
    const serviceSelect  = document.getElementById('service');
    const boardClassRow  = document.getElementById('board-class-row');
    const boardSelect    = document.getElementById('board');
    const classCol       = document.getElementById('class-col');
    const classSelect    = document.getElementById('className');
    const subjectRow     = document.getElementById('subject-row');
    const subjectSelect  = document.getElementById('subject');

    if (!serviceSelect || !boardSelect || !classSelect || !subjectSelect) return;

    function populateSelect(select, values) {
        const placeholder = select.options[0].cloneNode(true);
        select.innerHTML = '';
        select.appendChild(placeholder);
        values.forEach(function (val) {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = val;
            select.appendChild(opt);
        });
    }

    // Service → show/hide Board+Class row
    serviceSelect.addEventListener('change', function () {
        // Reset all sub-fields
        boardSelect.value = '';
        boardSelect.removeAttribute('required');
        classSelect.innerHTML = '<option value="">Select a Class</option>';
        classSelect.removeAttribute('required');
        subjectSelect.innerHTML = '<option value="">Select a Subject</option>';
        subjectSelect.removeAttribute('required');
        classCol.classList.add('d-none');
        subjectRow.classList.add('d-none');

        if (this.value === 'Academic Courses') {
            boardClassRow.classList.remove('d-none');
            boardSelect.setAttribute('required', 'required');
        } else {
            boardClassRow.classList.add('d-none');
        }
    });

    // Board → show/hide Class column
    boardSelect.addEventListener('change', function () {
        classSelect.innerHTML = '<option value="">Select a Class</option>';
        classSelect.removeAttribute('required');
        subjectSelect.innerHTML = '<option value="">Select a Subject</option>';
        subjectSelect.removeAttribute('required');
        subjectRow.classList.add('d-none');

        if (this.value) {
            populateSelect(classSelect, enquiryDropdownData.classes);
            classCol.classList.remove('d-none');
            classSelect.setAttribute('required', 'required');
        } else {
            classCol.classList.add('d-none');
        }
    });

    // Class → show/hide Subject row
    classSelect.addEventListener('change', function () {
        subjectSelect.innerHTML = '<option value="">Select a Subject</option>';
        subjectSelect.removeAttribute('required');

        if (this.value) {
            const subjects = enquiryDropdownData.subjects[this.value] || [];
            populateSelect(subjectSelect, subjects);
            subjectRow.classList.remove('d-none');
            subjectSelect.setAttribute('required', 'required');
        } else {
            subjectRow.classList.add('d-none');
        }
    });
}

// ===== STUDENT CAROUSEL FUNCTIONALITY =====

function initializeStudentCarousel() {
    const wrapper = document.querySelector('.students-carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevStudents');
    const nextBtn = document.getElementById('nextStudents');
    
    if (!wrapper || slides.length === 0) return;
    
    let currentSlide = 0;
    let autoPlayInterval;
    const slideWidth = 100; // Each slide is 100% width
    
    // Update carousel position with smooth animation
    function goToSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
        });
        
        // Use transform instead of scroll for smooth animation
        const translateValue = -slideIndex * slideWidth;
        wrapper.style.transform = `translateX(${translateValue}%)`;
        
        slides[slideIndex].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    
    // Auto play carousel
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop auto play
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    // Pause on hover
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);
    
    // Initialize first slide
    goToSlide(0);
    
    // Start auto play
    startAutoPlay();
}

// Log page load
console.log('Home page loaded successfully');
