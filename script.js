document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       1. PRELOADER SIMULATION
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('preloader-progress');
    let width = 0;
    
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                // Fade out preloader
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                // Re-enable scrolling
                document.body.style.overflow = '';
                
                // Trigger entry animations for hero elements
                triggerEntryAnimations();
            }, 400);
        } else {
            width += Math.floor(Math.random() * 15) + 5;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 100);

    /* ==========================================================================
       2. ENTRY ANIMATIONS
       ========================================================================== */
    function triggerEntryAnimations() {
        const heroLeft = document.querySelector('.hero-left');
        const heroRight = document.querySelector('.hero-right');
        
        if (heroLeft) heroLeft.classList.add('reveal');
        if (heroRight) heroRight.classList.add('reveal');
    }

    /* ==========================================================================
       3. CUSTOM LUXURY CURSOR
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Only enable custom cursor if it's not a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursorDot && cursorOutline) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate position for the dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth lag transition for the outline ring
        const animateOutline = () => {
            const easeFactor = 0.15; // smooth lag factor
            
            outlineX += (mouseX - outlineX) * easeFactor;
            outlineY += (mouseY - outlineY) * easeFactor;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateOutline);
        };
        requestAnimationFrame(animateOutline);

        // Hover expansions
        const hoverTargets = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .contact-card-mini, .form-input, #menu-toggle');
        
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    } else {
        // Hide custom cursor elements on touch screens
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }

    /* ==========================================================================
       4. SCROLL STYLING & NAVIGATION HIGHLIGHTS
       ========================================================================== */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Scroll style injection on header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active section link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       5. MOBILE NAVIGATION DRAWER TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenuLinks = document.querySelectorAll('.nav-menu a');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-active');
        });
    }

    // Close menu when links are clicked
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-active');
        });
    });

    /* ==========================================================================
       6. INTERSECTION OBSERVER FOR SKILLS FILLING
       ========================================================================== */
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress scale
                entry.target.style.transform = 'scaleX(1)';
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    skillProgressBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    /* ==========================================================================
       7. CONTACT FORM VALIDATION & LUXURY SIMULATED SENDING
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const feedback = document.getElementById('form-feedback');
    
    if (contactForm && feedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitBtnText = submitBtn.querySelector('span');
            
            // Basic check
            if (!name || !email || !message) {
                feedback.className = 'form-feedback error';
                feedback.textContent = 'Please fill out all contact fields.';
                return;
            }
            
            // Visual simulated loading process
            submitBtn.style.pointerEvents = 'none';
            submitBtnText.textContent = 'Encrypting & Sending...';
            feedback.textContent = '';
            
            setTimeout(() => {
                // Show success feedback
                feedback.className = 'form-feedback success';
                feedback.textContent = 'Thank you, Muhammad Abdullah has received your request. We will contact you soon.';

                // Open mail client to send email to Gmail
                const mailtoLink = `mailto:abdullahasadullah776@gmail.com?subject=${encodeURIComponent('Portfolio Message from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
                // Using window.open to avoid interfering with current page
                window.open(mailtoLink, '_blank');
                
                // Reset form fields
                contactForm.reset();
                submitBtnText.textContent = 'Message Sent';
                
                // Re-enable button after timeout
                setTimeout(() => {
                    submitBtn.style.pointerEvents = '';
                    submitBtnText.textContent = 'Send Message';
                    feedback.textContent = '';
                }, 4000);
            }, 2000);
        });
    }

});
