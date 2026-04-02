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

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-category');

    elements.forEach(element => {
        const position = element.getBoundingClientRect();

        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Add initial styles for animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.project-card, .skill-category');

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Call once to animate elements already in view
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Implement a dark/light mode toggle
function setupThemeToggle() {
    // This would be implemented with a toggle button in the UI
    // For now, we'll prepare the code but not activate it

    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');

        // Store preference
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    };

    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }

    // To use this, you would add a toggle button to your HTML
    // and call toggleTheme when it's clicked
}
