// ===== CONTACT PAGE JAVASCRIPT =====

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
    initializeEnquiryDropdowns();
});

// Load Header from header.html (inside pages folder context)
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

// Load Footer from footer.html (inside pages folder context)
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('./footer.html')
            .then(response => response.text())
            .then(html => {
                footerContainer.innerHTML = html;
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

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

    const termsAccepted = document.getElementById('terms');
    if (!termsAccepted || !termsAccepted.checked) {
        showNotification('Please accept the consent checkbox to continue', 'danger');
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
        'New Enquiry - Kriya Coaching Classes',
        '',
        'Contact Details:',
        'Name: ' + name,
        'Mobile: ' + mobile,
        'Email: ' + email,
        '',
        'Service Interest:',
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

    lines.push('');
    lines.push('Message: ' + query);

    const phoneNumber = '918431345144';
    const message = encodeURIComponent(lines.join('\n'));
    const whatsappURL = 'https://wa.me/' + phoneNumber + '?text=' + message;

    // Must be called directly from submit event to avoid popup blocking.
    window.open(whatsappURL, '_blank');
    showNotification('Redirecting to WhatsApp.', 'success', 3000);
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

    ['board', 'className', 'subject'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.removeAttribute('required');
    });
}

// Cascading dropdown data for Academic Courses
const enquiryDropdownData = {
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    subjects: {
        'Class 6': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 7': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 8': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 9': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 10': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
        'Class 11': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Business Studies', 'Accountancy', 'Economics', 'English'],
        'Class 12': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Business Studies', 'Accountancy', 'Economics', 'English']
    }
};

// Initialize cascading dropdowns for Enquiry Form
function initializeEnquiryDropdowns() {
    const serviceSelect = document.getElementById('service');
    const boardClassRow = document.getElementById('board-class-row');
    const boardSelect = document.getElementById('board');
    const classCol = document.getElementById('class-col');
    const classSelect = document.getElementById('className');
    const subjectRow = document.getElementById('subject-row');
    const subjectSelect = document.getElementById('subject');

    if (!serviceSelect || !boardSelect || !classSelect || !subjectSelect) return;

    function populateSelect(select, values) {
        const placeholder = select.options[0].cloneNode(true);
        select.innerHTML = '';
        select.appendChild(placeholder);
        values.forEach(function(val) {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = val;
            select.appendChild(opt);
        });
    }

    // Service -> show/hide Board+Class row
    serviceSelect.addEventListener('change', function() {
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

    // Board -> show/hide Class column
    boardSelect.addEventListener('change', function() {
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

    // Class -> show/hide Subject row
    classSelect.addEventListener('change', function() {
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

console.log('Contact page loaded successfully');
