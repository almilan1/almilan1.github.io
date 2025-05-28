document.addEventListener('DOMContentLoaded', () => {
    // Language switching functionality
    const languageToggle = document.getElementById('languageToggle');
    const htmlElement = document.documentElement;
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Set initial language
    htmlElement.setAttribute('lang', currentLang);
    languageToggle.querySelector('.lang-text').textContent = currentLang.toUpperCase();
    updateTranslations();    function updateTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
                // Update aria-label for better accessibility
                if (element.tagName.toLowerCase() === 'a' && element.classList.contains('nav-link')) {
                    element.setAttribute('aria-label', translations[currentLang][key]);
                }
            }
        });
    }    function switchLanguage() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        htmlElement.setAttribute('lang', currentLang);
        languageToggle.querySelector('.lang-text').textContent = currentLang.toUpperCase();
        
        // Save language preference
        localStorage.setItem('preferredLanguage', currentLang);
        
        // Force reflow to ensure transitions work properly
        document.body.style.opacity = '0';
        setTimeout(() => {
            updateTranslations();
            // Force browser to recalculate styles
            void document.body.offsetHeight;
            document.body.style.opacity = '1';
        }, 200);
    }

    languageToggle.addEventListener('click', switchLanguage);
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation classes to elements when they enter viewport
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all section titles and cards
    document.querySelectorAll('.section-title, .publication-card, .project-card, .activity-card').forEach(element => {
        observer.observe(element);
    });

    // Enhanced navigation experience
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            header.classList.add('nav-hidden');
        } else {
            header.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;
    });
});
