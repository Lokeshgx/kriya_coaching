(function() {
    'use strict';

    // Service Data Configuration
    const serviceData = {
    courses: {
        title: 'Regular Courses',
        subtitle: 'Comprehensive board and competitive exam preparation',
        description: 'Our regular courses are designed to cover all aspects of the school curriculum while preparing students for competitive exams...',
        benefits: 'Expert faculty, personalized attention, comprehensive study materials, regular tests and assessments, doubt clearing sessions',
        structure: 'Structured curriculum with monthly milestones, weekly tests, monthly cumulative exams, and specialized doubt classes',
        eligibility: 'Students of Class 9-12 or appearing for competitive exams',
        features: ['Expert Faculty Members', 'Small Batch Sizes', 'Monthly Tests', 'Comprehensive Study Materials', 'Doubt Clearing Sessions', 'Progress Tracking'],
        duration: '12 Months',
        price: '₹15,000 - ₹25,000',
        batch: '8-15 students'
    },
    training: {
        title: 'Training Programs',
        subtitle: 'Specialized intensive training for competitive exams',
        description: 'Our competitive exam training programs are designed for students aiming for IIT, NEET, UPSC and other national exams...',
        benefits: 'Updated curriculum, expert coaching, intensive mock tests, strategic preparation, proven success rate',
        structure: 'Advanced level content with weekly full-length tests, topic-wise practice, problem-solving sessions, and personal mentorship',
        eligibility: 'Class 11-12 students and those preparing for competitive exams',
        features: ['Updated Curriculum', 'Mock Tests', 'Personalized Coaching', 'Study Materials', 'Expert Mentors', 'Performance Analysis'],
        duration: '18 Months',
        price: '₹35,000 - ₹50,000',
        batch: '6-12 students'
    },
    'short-courses': {
        title: 'Short Courses',
        subtitle: 'Quick and focused learning modules for specific topics',
        description: 'Short courses are designed for students who need quick revision or want to focus on specific topics...',
        benefits: 'Flexible duration, focused learning, affordable fees, quick results, expert guidance',
        structure: 'Topic-wise modules, practice problems, revision sessions, and quick assessments',
        eligibility: 'All students preparing for exams',
        features: ['Flexible Duration', 'Focused Learning', 'Affordable', 'Quick Results', 'Expert Guidance', 'Certificates'],
        duration: '1-3 Months',
        price: '₹3,000 - ₹8,000',
        batch: '15-20 students'
    },
    workshops: {
        title: 'Events & Workshops',
        subtitle: 'Interactive seminars and hands-on learning sessions',
        description: 'Our workshops and events are designed to provide practical knowledge and interactive learning experiences...',
        benefits: 'Networking opportunities, expert speakers, practical knowledge, certificates, career guidance',
        structure: 'Interactive sessions with expert speakers, hands-on activities, Q&A sessions, and networking',
        eligibility: 'Open to all students and professionals',
        features: ['Expert Speakers', 'Interactive Sessions', 'Networking', 'Certificates', 'Hands-on Activities', 'Career Guidance'],
        duration: '1 Day - 1 Week',
        price: '₹500 - ₹2,000',
        batch: '30-50 participants'
    },
    scholarship: {
        title: 'Scholarship Programs',
        subtitle: 'Merit-based and need-based scholarships for talented students',
        description: 'We offer various scholarship programs to support talented and deserving students in pursuing their academic goals...',
        benefits: 'Financial support, merit recognition, equal opportunities, complete courses funded, monthly disbursement',
        structure: 'Merit-based selection, need-based assessment, regular monitoring, and career support',
        eligibility: 'Students with excellent academic records or financial need',
        features: ['Merit Scholarships', 'Need-based Aid', 'Easy Application', 'Monthly Disbursement', 'Complete Coverage', 'Career Support'],
        duration: 'Full course duration',
        price: '100% Funded',
        batch: 'Limited seats'
    },
    'mental-health': {
        title: 'Mental Health Support',
        subtitle: 'Comprehensive counseling and wellness programs',
        description: 'Our mental health support programs focus on student wellness, stress management, and holistic development...',
        benefits: 'Professional counseling, stress management, confidence building, career guidance, wellness activities',
        structure: 'One-on-one sessions, group counseling, stress management workshops, and wellness programs',
        eligibility: 'All students and parents',
        features: ['Professional Counselors', 'Stress Management', 'Confidential Sessions', 'Support Groups', 'Career Counseling', 'Parent Guidance'],
        duration: 'Variable',
        price: '₹500 - ₹2,000 per session',
        batch: 'Individual/Group'
    },
    nios: {
        title: 'NIOS Preparation',
        subtitle: 'Complete NIOS examination preparation',
        description: 'Comprehensive preparation for National Institute of Open Schooling examinations with complete syllabus coverage...',
        benefits: 'Complete syllabus, practice tests, study materials, revision classes, expert guidance',
        structure: 'Complete curriculum coverage, monthly tests, practice exams, and subject-specific guidance',
        eligibility: 'NIOS students of all classes',
        features: ['Complete Syllabus', 'Practice Tests', 'Study Materials', 'Revision Classes', 'Expert Guidance', 'Success Guaranteed'],
        duration: '12 Months',
        price: '₹8,000 - ₹15,000',
        batch: '10-15 students'
    }
};

// Initialize service description page
    document.addEventListener('DOMContentLoaded', function() {
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
            setupBackToTopButton();
            // Reinitialize AOS for dynamically loaded footer elements
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });
    
    // Load service details from URL parameter
    loadServiceDetails();
    });

    // Load service details from URL parameter
    function loadServiceDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('type') || 'courses';
    const data = serviceData[serviceType] || serviceData.courses;
    
    // Populate page elements with service data
    const titleEl = document.getElementById('detail-title');
    const subtitleEl = document.getElementById('detail-subtitle');
    const descriptionEl = document.getElementById('detail-description');
    const benefitsEl = document.getElementById('detail-benefits');
    const structureEl = document.getElementById('detail-structure');
    const eligibilityEl = document.getElementById('detail-eligibility');
    const priceEl = document.getElementById('detail-price');
    const durationEl = document.getElementById('detail-duration');
    const batchEl = document.getElementById('fact-batch');
    const serviceNameEl = document.getElementById('service-name');
    
    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (descriptionEl) descriptionEl.textContent = data.description;
    if (benefitsEl) benefitsEl.textContent = data.benefits;
    if (structureEl) structureEl.textContent = data.structure;
    if (eligibilityEl) eligibilityEl.textContent = data.eligibility;
    if (priceEl) priceEl.textContent = data.price;
    if (durationEl) durationEl.textContent = `Duration: ${data.duration}`;
    if (batchEl) batchEl.textContent = data.batch;
    if (serviceNameEl) serviceNameEl.textContent = data.title;
    
    // Populate features list
    data.features.forEach((feature, index) => {
        if (index < 4) {
            const featureLi = document.getElementById(`feature-${index + 1}`);
            if (featureLi) {
                const span = featureLi.querySelector('span');
                if (span) span.textContent = feature;
            }
        }
    });
};
})();
