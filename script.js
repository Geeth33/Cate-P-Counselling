/* ============================================
   CATE PORTERFIELD — COUNSELLING WEBSITE
   JavaScript — Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Header Scroll Effect ----
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });


    // ---- Mobile Menu Toggle ----
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            mobileOverlay.style.display = isActive ? 'flex' : 'none';
            menuToggle.setAttribute('aria-expanded', isActive);
            mobileOverlay.setAttribute('aria-hidden', !isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                mobileOverlay.style.display = 'none';
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileOverlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }


    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ---- FAQ Accordion ----
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });


    // ---- Scroll-triggered Animations ----
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: Show all elements immediately
        animatedElements.forEach(el => el.classList.add('visible'));
    }


    // ---- Apply Animation Classes ----
    // Add fade-in classes to elements after DOM is ready
    const addAnimationClass = (selector, className, delay = 0) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add(className);
            el.style.transitionDelay = `${delay + (i * 0.1)}s`;
        });
    };

    // Hero
    addAnimationClass('.hero-label', 'fade-in');
    addAnimationClass('.hero-heading', 'fade-in', 0.1);
    addAnimationClass('.hero-subheading', 'fade-in', 0.2);
    addAnimationClass('.hero-content .btn', 'fade-in', 0.3);
    addAnimationClass('.hero-detail', 'fade-in', 0.4);
    addAnimationClass('.hero-image-wrapper', 'fade-in-right', 0.2);

    // About
    addAnimationClass('.about-image', 'fade-in-left');
    addAnimationClass('.about-content', 'fade-in-right');

    // Services
    addAnimationClass('.services-section .section-header', 'fade-in');
    addAnimationClass('.service-card', 'fade-in');

    // Approach
    addAnimationClass('.approach-content', 'fade-in-left');
    addAnimationClass('.pillar', 'fade-in-right');

    // FAQ
    addAnimationClass('.faq-section .section-header', 'fade-in');
    addAnimationClass('.faq-item', 'fade-in');

    // Contact
    addAnimationClass('.contact-info', 'fade-in');

    // Re-observe all newly-classed elements
    if ('IntersectionObserver' in window) {
        const newObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    newObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
            newObserver.observe(el);
        });

        // Make hero elements visible immediately
        setTimeout(() => {
            document.querySelectorAll('.hero-section .fade-in, .hero-section .fade-in-right').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    }


    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });


    // ---- Contact Form Handling ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Real submission via Fetch (AJAX) to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    submitBtn.textContent = 'Message Sent ✓';
                    submitBtn.style.backgroundColor = '#8B9A7D';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem submitting your form");
                        }
                    });
                }
            }).catch(error => {
                alert("Oops! There was a problem submitting your form");
            }).finally(() => {
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
});

/* ============================================
   CUSTOM CURSOR LOGIC
   ============================================ */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;

    // Linear Interpolation (Lerp) for smooth lag
    const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Dot follows exactly
        dotX = mouseX;
        dotY = mouseY;
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;

        // Ring follows with lag (interpolation factor 0.15)
        ringX = lerp(ringX, mouseX, 0.15);
        ringY = lerp(ringY, mouseY, 0.15);
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(animate);
    }

    // Interaction handling
    const interactiveElements = document.querySelectorAll('a, button, .faq-question, .service-card, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-mousedown'));
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-mousedown'));

    // Start loop
    requestAnimationFrame(animate);
}

// Call initCustomCursor if DOM is already loaded or on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
    initCustomCursor();
}

