// Scholarship Detail Page Script

const scholarshipDetails = {
    achiever: {
        title: 'Academic Achiever Scholarship',
        subtitle: 'Awarded to students who demonstrate exceptional academic excellence.',
        description: 'This scholarship supports high-achieving students with full tuition relief and mentorship during their academic journey.',
        about: 'The Academic Achiever Scholarship recognizes disciplined students who consistently perform at the top of their class and show commitment to their studies.',
        benefactorName: 'Mrs. Anjali Kumar',
        benefactorBio: 'A passionate educator and philanthropist committed to supporting bright students from all communities.',
        eligibility: [
            'Minimum 90% score in the most recent exams',
            'Strong academic record across subjects',
            'Active participation in school activities',
            'Interview with the selection committee'
        ],
        process: 'Applicants submit their academic records and statement of purpose. Shortlisted students are interviewed and reviewed by an expert panel.',
        type: 'Merit Scholarship',
        coverage: 'Full Tuition Support',
        duration: 'Academic Year',
        heroImage: '../images/faculty-avatar-1.svg',
        image1: '../images/faculty-avatar-3.svg',
        image2: '../images/faculty-avatar-4.svg',
        image3: '../images/faculty-avatar-5.svg'
    },
    'future-leader': {
        title: 'Future Leader Scholarship',
        subtitle: 'Supporting students who demonstrate leadership potential and community drive.',
        description: 'This scholarship empowers emerging leaders with financial support and leadership coaching to build future-ready skills.',
        about: 'The Future Leader Scholarship is dedicated to students who show a strong desire to create positive change and inspire their peers.',
        benefactorName: 'Mr. Rohit Mehta',
        benefactorBio: 'An education advocate who believes in nurturing leadership through opportunity and guidance.',
        eligibility: [
            'Verified leadership experience in school or community',
            'Strong academic performance',
            'A personal statement outlining leadership vision',
            'Recommendation from a teacher or mentor'
        ],
        process: 'Candidates apply with a leadership statement and references. Shortlisted applicants present their vision to the selection committee.',
        type: 'Leadership Scholarship',
        coverage: 'Partial Tuition + Mentorship',
        duration: 'One Academic Year',
        heroImage: '../images/faculty-avatar-4.svg',
        image1: '../images/faculty-avatar-1.svg',
        image2: '../images/faculty-avatar-2.svg',
        image3: '../images/faculty-avatar-5.svg'
    },
    'support-scholar': {
        title: 'Support Scholar Program',
        subtitle: 'Helping students with financial need pursue quality education.',
        description: 'This program offers support to learners who need financial assistance, enabling them to continue their studies without burden.',
        about: 'The Support Scholar Program exists to remove financial barriers for students with strong potential and limited means.',
        benefactorName: 'Ms. Priya Reddy',
        benefactorBio: 'A social contributor focused on creating access to education for deserving families.',
        eligibility: [
            'Demonstrated financial need',
            'Good academic standing',
            'Personal essay describing goals and challenges',
            'Verification of household income'
        ],
        process: 'Applicants submit income documentation and a personal essay. A review team evaluates each application for eligibility and impact.',
        type: 'Need-Based Scholarship',
        coverage: 'Partial or Full Tuition',
        duration: 'One Academic Year',
        heroImage: '../images/faculty-avatar-6.svg',
        image1: '../images/faculty-avatar-3.svg',
        image2: '../images/faculty-avatar-4.svg',
        image3: '../images/faculty-avatar-2.svg'
    }
};

function loadPageHeader() {
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
        .catch(error => console.error('Error loading header:', error));
}

function loadPageFooter() {
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
        .catch(error => console.error('Error loading footer:', error));
}

function loadScholarshipDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const program = urlParams.get('program') || 'achiever';
    const scholarship = scholarshipDetails[program] || scholarshipDetails['achiever'];

    document.getElementById('detail-title').textContent = scholarship.title;
    document.getElementById('detail-subtitle').textContent = scholarship.subtitle;
    document.getElementById('detail-description').textContent = scholarship.description;
    document.getElementById('detail-about').textContent = scholarship.about;
    document.getElementById('benefactor-name').textContent = scholarship.benefactorName;
    document.getElementById('benefactor-bio').textContent = scholarship.benefactorBio;
    document.getElementById('detail-type').textContent = scholarship.type;
    document.getElementById('detail-coverage').textContent = scholarship.coverage;
    document.getElementById('detail-duration').textContent = scholarship.duration;
    document.getElementById('detail-hero-img').setAttribute('src', scholarship.heroImage);
    document.getElementById('benefactor-image').setAttribute('src', scholarship.heroImage);
    document.getElementById('detail-breadcrumb').textContent = scholarship.title;

    const eligibilityList = document.getElementById('detail-eligibility');
    eligibilityList.innerHTML = '';
    scholarship.eligibility.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        eligibilityList.appendChild(li);
    });

    document.getElementById('detail-process').textContent = scholarship.process;
    document.getElementById('detail-image-1').setAttribute('src', scholarship.image1);
    document.getElementById('detail-image-2').setAttribute('src', scholarship.image2);
    document.getElementById('detail-image-3').setAttribute('src', scholarship.image3);
}

document.addEventListener('DOMContentLoaded', function() {
    loadPageHeader();
    loadPageFooter();
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
    loadScholarshipDetails();
});
