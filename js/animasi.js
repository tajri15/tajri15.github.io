// animasi.js - Enhanced Portfolio Animations
document.addEventListener('DOMContentLoaded', function() {
    // 1. SCROLL-BASED ANIMATIONS
    const animateOnScroll = function() {
        const elements = document.querySelectorAll(
            '.animate-on-scroll, ' +
            '.project-card, ' +
            '.skill-category, ' +
            'section, ' +
            '.metric, ' +
            '.gallery-item'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animation class based on data attributes
                    const animation = element.dataset.animation || 'fadeInUp';
                    const duration = element.dataset.duration || '0.6s';
                    const delay = element.dataset.delay || '0s';
                    
                    element.style.animation = `${animation} ${duration} ease-out ${delay} forwards`;
                    observer.unobserve(element);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach((el, index) => {
            // Stagger delays for natural flow
            const staggerDelay = `${(index % 5) * 0.15}s`;
            el.style.setProperty('--delay', staggerDelay);
            el.dataset.delay = `calc(var(--delay) + ${staggerDelay})`;
            
            observer.observe(el);
        });
    };

    // 2. SLIDESHOW FUNCTIONALITY
    const initSlideshows = function() {
        const slideshows = document.querySelectorAll('.slideshow-container');
        
        slideshows.forEach(slideshow => {
            slideshow.setAttribute('data-current-slide', '0');
            const slides = slideshow.querySelectorAll('.slide');
            let autoPlayInterval;
            
            // Initialize first slide
            showSlide(slideshow, 0);
            
            // Auto-play configuration
            const autoplay = slideshow.dataset.autoplay === 'true';
            const interval = parseInt(slideshow.dataset.interval) || 5000;
            
            if (autoplay && slides.length > 1) {
                autoPlayInterval = setInterval(() => {
                    const currentIndex = parseInt(slideshow.getAttribute('data-current-slide'));
                    const nextIndex = (currentIndex + 1) % slides.length;
                    showSlide(slideshow, nextIndex);
                }, interval);
                
                // Pause on hover
                slideshow.addEventListener('mouseenter', () => {
                    clearInterval(autoPlayInterval);
                });
                
                slideshow.addEventListener('mouseleave', () => {
                    autoPlayInterval = setInterval(() => {
                        const currentIndex = parseInt(slideshow.getAttribute('data-current-slide'));
                        const nextIndex = (currentIndex + 1) % slides.length;
                        showSlide(slideshow, nextIndex);
                    }, interval);
                });
            }
            
            // Navigation arrows
            const prevButtons = slideshow.querySelectorAll('.prev');
            const nextButtons = slideshow.querySelectorAll('.next');
            
            prevButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const currentIndex = parseInt(slideshow.getAttribute('data-current-slide'));
                    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                    showSlide(slideshow, prevIndex);
                });
            });
            
            nextButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const currentIndex = parseInt(slideshow.getAttribute('data-current-slide'));
                    const nextIndex = (currentIndex + 1) % slides.length;
                    showSlide(slideshow, nextIndex);
                });
            });
        });
        
        function showSlide(slideshow, index) {
            const slides = slideshow.querySelectorAll('.slide');
            slides.forEach(slide => {
                slide.style.opacity = '0';
                slide.style.transform = 'translateY(10px)';
                slide.style.transition = 'none';
            });
            
            slides[index].style.opacity = '1';
            slides[index].style.transform = 'translateY(0)';
            slides[index].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            slideshow.setAttribute('data-current-slide', index.toString());
        }
    };

    // 3. HERO SECTION ANIMATIONS
    const animateHero = function() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const elements = [
            hero.querySelector('h1'),
            hero.querySelector('.tagline'),
            hero.querySelector('.intro-box'),
            hero.querySelector('.cta-buttons')
        ].filter(el => el);
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
        });
    };

    // 4. BUTTON HOVER EFFECTS
    const buttonEffects = function() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px)';
                btn.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
    };

    // 5. PROJECT CARD EFFECTS
    const projectCardEffects = function() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    };

    // Initialize all animations
    animateOnScroll();
    initSlideshows();
    animateHero();
    buttonEffects();
    projectCardEffects();

    // Add CSS animations to head dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});