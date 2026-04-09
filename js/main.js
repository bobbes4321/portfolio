// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling with Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const data = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        formStatus.innerText = '';
        formStatus.className = 'form-status';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formStatus.innerText = 'Thanks for reaching out! I will get back to you as soon as possible.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                // Error from server
                const errorData = await response.json();
                if (Object.hasOwnProperty.call(errorData, 'errors')) {
                    formStatus.innerText = errorData["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.innerText = 'Oops! There was a problem submitting your form.';
                }
                formStatus.className = 'form-status error';
            }
        } catch (error) {
            // Network error
            formStatus.innerText = 'Oops! There was a problem submitting your form.';
            formStatus.className = 'form-status error';
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Message';
        }
    });
}

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const phrases = ['Lead Unity Developer', 'VR & XR Specialist', 'Multiplayer Architect', 'Sound Designer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 75;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    type();
    
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .project-card, .skill-category, .interest-card, .education-card').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Make project cards clickable
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the first link in the card
            const link = card.querySelector('.project-links .btn') || card.querySelector('a');
            
            // If the user clicked on a link or a button inside the card, let the browser handle it
            if (e.target.tagName === 'A' || e.target.closest('a') || e.target.tagName === 'BUTTON') {
                return;
            }

            if (link) {
                const url = link.getAttribute('href');
                const target = link.getAttribute('target') || '_self';
                
                if (url) {
                    window.open(url, target);
                }
            }
        });
    });
});

// Scroll header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '5px 0';
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = 'none';
    }
});

// Highlight current nav tab on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));
