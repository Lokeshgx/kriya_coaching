// ===== COURSES PAGE JAVASCRIPT =====

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initializeCourseFilters();
    AOS.init({ duration: 1000, once: true, offset: 100 });
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

// Initialize Course Filters
function initializeCourseFilters() {
    const boardFilter = document.getElementById('boardFilter');
    const classFilter = document.getElementById('classFilter');
    const courseCards = document.querySelectorAll('.course-card');

    boardFilter.addEventListener('change', filterCourses);
    classFilter.addEventListener('change', filterCourses);

    function filterCourses() {
        const selectedBoard = boardFilter.value;
        const selectedClass = classFilter.value;

        courseCards.forEach(card => {
            const cardBoard = card.getAttribute('data-board');
            const cardClass = card.getAttribute('data-class');

            let show = true;

            if (selectedBoard && cardBoard !== selectedBoard) {
                show = false;
            }

            if (selectedClass && cardClass !== selectedClass) {
                show = false;
            }

            if (show) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });

        AOS.refresh();
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('Courses page loaded successfully');
