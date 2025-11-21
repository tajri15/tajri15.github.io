// animasi.js - Simplified Version for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio animations loaded successfully!');
    
    // 1. WELCOME POPUP
    function welcomePopup() {
        const welcomePopup = document.getElementById('welcomePopup');
        const welcomeBtn = document.getElementById('welcomeBtn');
        
        if (welcomePopup && welcomeBtn) {
            // Check if popup was shown before in this session
            if (!sessionStorage.getItem('popupShown')) {
                // Tampilkan popup setelah 1 detik
                setTimeout(() => {
                    welcomePopup.style.display = 'flex';
                    setTimeout(() => {
                        welcomePopup.style.opacity = '1';
                    }, 10);
                }, 1000);
                
                // Tutup popup ketika tombol diklik
                welcomeBtn.addEventListener('click', () => {
                    welcomePopup.style.opacity = '0';
                    setTimeout(() => {
                        welcomePopup.style.display = 'none';
                        sessionStorage.setItem('popupShown', 'true');
                    }, 500);
                });
            }
        }
    }

    // 2. STATS COUNTER ANIMATION
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-count');
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // 3. SCROLL ANIMATIONS
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animated-section, .project-card, .skill-category, .process-step, .contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // 4. BUTTON EFFECTS
    function buttonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
    }

    // 5. PROJECT CARD EFFECTS
    function projectCardEffects() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        });
    }

    // 6. TYPING ANIMATION
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            // Reset untuk memastikan animasi berjalan
            typingElement.style.animation = 'none';
            void typingElement.offsetWidth; // Trigger reflow
            typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }
    }

    // 7. ROLE CAROUSEL
    function initRoleCarousel() {
        const roles = document.querySelectorAll('.role');
        if (roles.length === 0) return;
        
        let currentIndex = 0;
        
        function showNextRole() {
            // Sembunyikan semua role
            roles.forEach(role => {
                role.style.opacity = '0';
                role.style.transform = 'translateY(20px)';
            });
            
            // Tampilkan role berikutnya
            currentIndex = (currentIndex + 1) % roles.length;
            setTimeout(() => {
                roles[currentIndex].style.opacity = '1';
                roles[currentIndex].style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Mulai dengan role pertama
        roles[0].style.opacity = '1';
        roles[0].style.transform = 'translateY(0)';
        
        // Ganti role setiap 3 detik
        setInterval(showNextRole, 3000);
    }

    // 8. ORBIT ANIMATIONS
    function initOrbits() {
        const orbits = document.querySelectorAll('.orbit');
        orbits.forEach((orbit, index) => {
            const delay = orbit.style.getPropertyValue('--i') || index;
            orbit.style.animation = `orbit ${15 + index * 2}s linear infinite ${delay * -3}s`;
        });
    }

    // 9. SKILLS LEVEL ANIMATION
    function initTechLevels() {
        const techLevels = document.querySelectorAll('.tech-level-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'width 1.5s ease-in-out';
                        entry.target.style.width = width;
                    }, 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        techLevels.forEach(level => observer.observe(level));
    }

    // 10. PROCESS TIMELINE ANIMATION
    function initProcessTimeline() {
        const steps = document.querySelectorAll('.process-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.style.opacity = '1';
                            step.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the parent section
        const processSection = document.getElementById('workflow');
        if (processSection) {
            steps.forEach(step => {
                step.style.opacity = '0';
                step.style.transform = 'translateY(30px)';
                step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            observer.observe(processSection);
        }
    }

    // 11. CONTACT CARDS ANIMATION
    function initContactCards() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
            observer.observe(contactSection);
        }
    }

    // 12. MOCKUP CONTAINER EFFECTS
    function initMockupEffects() {
        const mockups = document.querySelectorAll('.mockup-container');
        
        mockups.forEach(mockup => {
            mockup.addEventListener('mouseenter', () => {
                const frame = mockup.querySelector('.mockup-frame');
                const img = mockup.querySelector('img');
                if (frame) frame.style.transform = 'translateY(-10px) scale(1.05)';
                if (img) img.style.transform = 'scale(1.1)';
            });
            
            mockup.addEventListener('mouseleave', () => {
                const frame = mockup.querySelector('.mockup-frame');
                const img = mockup.querySelector('img');
                if (frame) frame.style.transform = 'translateY(0) scale(1)';
                if (img) img.style.transform = 'scale(1)';
            });
        });
    }

    // 13. SMOOTH SCROLL FOR INTERNAL LINKS
    function initSmoothScroll() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
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
    }

    // 14. ADD CSS ANIMATIONS DYNAMICALLY
    function addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
            }
            
            @keyframes blink-caret {
                from, to { border-color: transparent; }
                50% { border-color: #3498db; }
            }
            
            @keyframes orbit {
                0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
            }
            
            @keyframes fadeInUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .typing-animation {
                overflow: hidden;
                border-right: .15em solid #3498db;
                white-space: nowrap;
                margin: 0 auto;
                animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
            }
            
            .role {
                transition: all 0.5s ease-in-out;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }
            
            .role-carousel {
                position: relative;
                height: 40px;
                overflow: hidden;
            }
            
            .orbit {
                animation: orbit 15s linear infinite;
            }
            
            .welcome-popup {
                transition: opacity 0.5s ease;
            }
            
            .animated-section,
            .project-card,
            .skill-category,
            .process-step,
            .contact-card {
                animation: fadeInUp 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize semua fungsi
    addCSSAnimations();
    welcomePopup();
    animateCounters();
    animateOnScroll();
    buttonEffects();
    projectCardEffects();
    initTypingAnimation();
    initRoleCarousel();
    initOrbits();
    initTechLevels();
    initProcessTimeline();
    initContactCards();
    initMockupEffects();
    initSmoothScroll();

    console.log('All animations initialized successfully!');
});

// Export functions for global access (if needed)
window.portfolioAnimations = {
    refreshAnimations: function() {
        document.querySelectorAll('.animated-section, .project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
        setTimeout(() => {
            document.dispatchEvent(new Event('DOMContentLoaded'));
        }, 100);
    }
};