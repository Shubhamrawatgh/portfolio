document.addEventListener('DOMContentLoaded', () => {

    // ==== MOBILE NAVIGATION TOGGLE ====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-active');
            navToggle.classList.toggle('is-active'); // Add this line
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('is-active')) {
                    navMenu.classList.remove('is-active');
                    navToggle.classList.remove('is-active'); // Add this line
                }
            });
        });
    }

    // ==== THEME SWITCHER ====
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme');

        function setIconForTheme(theme) {
            if (theme === 'light') {
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }

        if (currentTheme) {
            setIconForTheme(currentTheme);
        } else {
            setIconForTheme('dark');
        }

        themeToggle.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            setIconForTheme(newTheme);
        });
    }

    // ✨ ==== TYPED.JS INITIALIZATION ====
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: ['Full Stack Developer', 'Creative Professional', '<span class="ai-enthusiast-gradient">AI Enthusiast</span>'],
            typeSpeed: 40,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }


    // ==== SCROLL FADE-IN ANIMATION ====
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    // ==== CONTACT FORM VALIDATION ====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                // Using a custom modal or message box is better than alert()
                // For this example, we'll keep the alert.
                alert('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }


    // ==== SCROLL TO TOP BUTTON ====
    const scrollBtn = document.getElementById("scrollToTopBtn");
    if (scrollBtn) {
        scrollBtn.style.display = "none";

        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollBtn.style.display = "flex";
            } else {
                scrollBtn.style.display = "none";
            }
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
