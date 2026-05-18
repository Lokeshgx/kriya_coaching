// Scholarship Page Script

const scholarshipPrograms = [
    {
        id: 'priya',
        title: 'Dr. Priya Iyer Memorial Scholarship',
        description: 'Dr. Priya Iyer was an amazing researcher and well-wisher of the society. She was a wholesome human being who always strived to help those in need. She had a soft corner for special kids and also for the transgender community. Therefore, in the fond memory of our dear friend, Priya, this scholarship is specially for the students between the age group of 13 to 18 years, who either belong to transgender community or face any physical or mental challenge. Every year we aim to provide one such student, free tutoring for a year at our centre for Science and Math.',
        image: '../images/priya-iyer.jpg',
        link: 'scholarship-detail.html?program=achiever'
    },
    {
        id: 'kamala',
        title: 'Smt. Kamala Saxena Scholarship',
        description: 'Smt. Kamala Saxena is an amazing human being who has been ahead by a century to her peers. Her zeal towards learning and life is what makes her extraordinary. She is a self-made lady who not only educated herself after losing her husband at an early age of 25 or so years but also raised to excellence her 6 daughters all by herself. She allowed each of them to follow their passions and supported them in their life endeavours. She also raised their kids to support them in their budding careers. A very independent and discipliarian person, she instilled the same virtues in her grandkids. A true femanist who valued equity in tasks, she ensured that her male grandkid (aka. me - Nitin Saxena) also learns all life skills that a female grandkid needs to learn. Her learnings have served as the path on which I walk today. This scholarship is meant to help kids as well as adults who need a restart to their lives.',
        image: '../images/kamala.jpg',
        link: 'scholarship-detail.html?program=future-leader'
    },
    {
        id: 'abha',
        title: 'Ms. Abha Saxena Scholarship',
        description: 'Ms. Abha Saxena is a world class artist whose art work has been appreciated in India as well as among International fronts alike. She has devoted her entire life to art. An excellent teacher, she has taught more than 5000 students various art skills. Very peculiar in her choices and having a meticulous global culture sense, her work and her personality speaks volume of her immense caliber. This scholarship is meant to help kids as well as adults who are passionate for a specific skill or obtaining certain knowledge base to showcase their hidden talents.',
        image: '../images/abha.jpg',
        link: 'scholarship-detail.html?program=support-scholar'
    },
    {
        id: 'manju',
        title: 'Mrs. Manju Saxena Scholarship',
        description: 'A merit-based scholarship for students who demonstrate outstanding academic performance and ambition.',
        image: '../images/manju.jpg',
        link: 'scholarship-detail.html?program=achiever'
    },
    {
        id: 'sanjeev',
        title: 'Mr. Sanjeev Kumar Saxena Scholarship',
        description: 'A merit-based scholarship for students who demonstrate outstanding academic performance and ambition.',
        image: '../images/sanjeev.jpg',
        link: 'scholarship-detail.html?program=achiever'
    }
];

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
        .catch(error => console.error('Error loading header:', error));
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
        .catch(error => console.error('Error loading footer:', error));
}

function renderScholarshipCards() {
    const listContainer = document.getElementById('scholarshipList');
    if (!listContainer) return;

    scholarshipPrograms.forEach((program, index) => {
        const card = document.createElement('article');
        card.className = 'scholarship-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100);
        // Alternate layout: even index (0,2,4...) = text left/image right; odd index (1,3,5...) = image left/text right
        const isEvenIndex = index % 2 === 0;
        card.setAttribute('data-layout', isEvenIndex ? 'text-left' : 'text-right');
        card.innerHTML = `
            <div class="card-image">
                <img src="${program.image}" alt="${program.title}">
            </div>
            <div class="card-content">
                <h3>${program.title}</h3>
                <p>${program.description}</p>
                <a class="link-more" href="${program.link}">Learn More <i class="fas fa-arrow-right ms-2"></i></a>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    renderScholarshipCards();
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 120 });
    }
});
