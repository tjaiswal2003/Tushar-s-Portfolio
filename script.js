document.addEventListener('DOMContentLoaded', () => {

    // --- Query Selectors ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');
    const progressBar = document.getElementById('progress-bar');
    const typedElement = document.querySelector('.multiple-text');
    const projectSlides = document.querySelectorAll('.project-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');
    const projectsSection = document.querySelector('#projects');
    const contactForm = document.getElementById('contact-form');
    
    // --- Mobile Menu Toggle ---
    if (menuIcon) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        };
    }

    // --- Throttle Function for Performance ---
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const context = this;
            const args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // --- Consolidated Scroll Events ---
    const handleScroll = () => {
        // Active Navigation Link on Scroll & Sticky Navbar
        let top = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            };
        });
        
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }
        
        // Remove menu on scroll
        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');

        // Progress Bar
        if (progressBar) {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (top / scrollableHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }
    };

    window.addEventListener('scroll', throttle(handleScroll, 100));

    // --- Typed.js for Typing Animation ---
    if (typedElement) {
        new Typed('.multiple-text', {
            strings: ['Software Developer', 'Data Scientist', 'ML Enthusiast'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    // --- AOS Animation Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // --- Particles.js Logic ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }},
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }},
            "retina_detect": true
        });
    }

    // --- Project Slider Logic ---
    if (projectSlides.length > 0) {
        let currentSlide = 0;
        let autoSlideInterval;

        const showSlide = (n) => {
            currentSlide = (n + projectSlides.length) % projectSlides.length;
            projectSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            projectSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);

        const startAutoSlide = () => {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 7000); // Change slide every 7 seconds
        };
        const stopAutoSlide = () => clearInterval(autoSlideInterval);
        
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); stopAutoSlide(); startAutoSlide(); });
        dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); stopAutoSlide(); startAutoSlide(); }));
        
        if (projectsSection) {
            const projectsObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => entry.isIntersecting ? startAutoSlide() : stopAutoSlide());
            }, { threshold: 0.5 });
            projectsObserver.observe(projectsSection);
        }
        
        showSlide(0); // Show first slide initially
    }

    // --- Contact Form Logic ---
    if (contactForm) {
        // This is a placeholder. For a real form, you would use a backend or a service like Formspree.
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message!');
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
            }, 2000);
        });
    }
});