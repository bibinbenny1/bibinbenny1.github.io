document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark-theme');
        localStorage.setItem('theme', html.classList.contains('dark-theme') ? 'dark-theme' : '');
    });

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });

            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // --- Header Scroll Behavior ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
    
    // --- Mobile Navigation ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    
    mobileNavToggle.addEventListener('click', () => {
        body.classList.toggle('mobile-nav-open');
    });
    
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('mobile-nav-open');
        });
    });

    // --- Scroll Reveal ---
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Project Carousel Logic ---
    function initializeCarousel(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        const items = container.querySelectorAll('.carousel-item');
        let currentIndex = 0;
        
        if (items.length <= 1) return;

        setInterval(() => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }, 4000); // Change image every 4 seconds
    }

    initializeCarousel('.phone-screen');
    initializeCarousel('.laptop-screen');

    // --- Typing Effect for Hero Role ---
    const heroRole = document.querySelector('.hero-role');
    if (heroRole) {
        const text = heroRole.textContent;
        heroRole.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroRole.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500); // Start typing after 500ms delay
    }

    // --- 3D Tilt & Touch Effect for Cards ---
    const tiltCards = document.querySelectorAll('.skill-card, .thinking-card');
    tiltCards.forEach(card => {
        card.style.transition = 'transform 0.1s ease';
        
        // Mouse Interaction (Tilt) - Only for fine pointers
        if (window.matchMedia("(pointer: fine)").matches) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg rotation
                const rotateY = ((x - centerX) / centerX) * 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        }

        // Touch Interaction (Press Effect)
        card.addEventListener('touchstart', () => {
            card.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'scale(0.95)';
        }, { passive: true });

        const resetCard = () => {
            card.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'scale(1)';
        };

        card.addEventListener('touchend', resetCard);
        card.addEventListener('touchcancel', resetCard);
    });
});