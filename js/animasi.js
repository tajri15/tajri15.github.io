document.addEventListener('DOMContentLoaded', function() {
    // 1. SPACE BACKGROUND CREATION
    createSpaceBackground();
    
    // 2. THEME TOGGLE FUNCTIONALITY
    checkSavedTheme();
    
    // 3. SCROLL-BASED ANIMATIONS
    animateOnScroll();
    
    // 4. HERO SECTION ANIMATIONS
    animateHero();
    
    // 5. SKILLS VISUALIZATION
    initSkillsRadar();
    initTechLevels();
    
    // 6. PROJECT SLIDESHOWS
    showInitialSlides();
    
    // 7. STATS COUNTER ANIMATION
    animateCounters();
    
    // 8. BUTTON EFFECTS
    buttonEffects();
    
    // 9. PROJECT CARD EFFECTS
    projectCardEffects();
    
    // 10. WELCOME POPUP
    welcomePopup();
    
    // 11. TYPING ANIMATION
    initTypingAnimation();
    
    // 12. ROLE CAROUSEL
    initRoleCarousel();
    
    // 13. ORBIT ANIMATIONS
    initOrbits();
    
    // 14. PROCESS TIMELINE ANIMATION
    initProcessTimeline();

    // 15. PROJECT CAROUSEL
    initProjectCarousel();

    // ===== FUNCTION DEFINITIONS =====

    // 1. SPACE BACKGROUND CREATION
    function createSpaceBackground() {
        const spaceBg = document.createElement('div');
        spaceBg.className = 'space-bg';
        
        // Create parallax star layers
        for (let i = 0; i < 3; i++) {
            const starsLayer = document.createElement('div');
            starsLayer.className = 'stars-layer';
            spaceBg.appendChild(starsLayer);
        }
        
        // Create shooting stars
        for (let i = 0; i < 5; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.top = `${Math.random() * 100}%`;
            shootingStar.style.animationDelay = `${Math.random() * 10}s`;
            spaceBg.appendChild(shootingStar);
        }
        
        // Create planets
        const planet1 = document.createElement('div');
        planet1.id = 'planet1';
        planet1.className = 'planet';
        spaceBg.appendChild(planet1);
        
        const planet2 = document.createElement('div');
        planet2.id = 'planet2';
        planet2.className = 'planet';
        spaceBg.appendChild(planet2);
        
        // Create constellations
        const constellations = [
            { name: 'Orion', points: [[20, 20], [40, 40], [20, 60], [40, 80]] },
            { name: 'Ursa', points: [[70, 30], [80, 40], [90, 30], [80, 20]] },
            { name: 'Lyra', points: [[60, 70], [70, 80], [80, 70], [70, 60]] }
        ];
        
        constellations.forEach(constellation => {
            const constellationDiv = document.createElement('div');
            constellationDiv.className = 'constellation';
            
            constellation.points.forEach((point, index) => {
                const star = document.createElement('div');
                star.style.position = 'absolute';
                star.style.width = '4px';
                star.style.height = '4px';
                star.style.backgroundColor = 'white';
                star.style.borderRadius = '50%';
                star.style.left = `${point[0]}%`;
                star.style.top = `${point[1]}%`;
                constellationDiv.appendChild(star);
                
                if (index > 0) {
                    const prevPoint = constellation.points[index-1];
                    const lineLength = Math.sqrt(
                        Math.pow(point[0]-prevPoint[0], 2) + 
                        Math.pow(point[1]-prevPoint[1], 2)
                    );
                    const lineAngle = Math.atan2(
                        point[1]-prevPoint[1], 
                        point[0]-prevPoint[0]
                    ) * 180 / Math.PI;
                    
                    const line = document.createElement('div');
                    line.className = 'constellation-line';
                    line.style.width = `${lineLength}%`;
                    line.style.left = `${prevPoint[0]}%`;
                    line.style.top = `${prevPoint[1]}%`;
                    line.style.transform = `rotate(${lineAngle}deg)`;
                    constellationDiv.appendChild(line);
                }
            });
            
            spaceBg.appendChild(constellationDiv);
        });
        
        // Create spaceship
        const spaceship = document.createElement('div');
        spaceship.className = 'spaceship';
        spaceBg.appendChild(spaceship);
        
        // Create theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Toggle Day/Night Mode';
        themeToggle.addEventListener('click', toggleTheme);
        
        document.body.insertBefore(spaceBg, document.body.firstChild);
        document.body.appendChild(themeToggle);
    }

    // 2. THEME TOGGLE FUNCTIONS
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const toggleBtn = document.querySelector('.theme-toggle');
        if (document.body.classList.contains('light-theme')) {
            toggleBtn.innerHTML = '🌙';
        } else {
            toggleBtn.innerHTML = '☀️';
        }
        localStorage.setItem('themePreference', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    }

    function checkSavedTheme() {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.querySelector('.theme-toggle').innerHTML = '🌙';
        }
    }

    // 3. SCROLL ANIMATIONS
    function animateOnScroll() {
        const elements = document.querySelectorAll(
            '.animate-on-scroll, ' +
            '.project-card, ' +
            '.skill-category, ' +
            'section, ' +
            '.metric, ' +
            '.gallery-item, ' +
            '.process-step, ' +
            '.contact-card'
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
    }

    // 4. HERO ANIMATIONS
    function animateHero() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const elements = [
            hero.querySelector('h1'),
            hero.querySelector('.tagline'),
            hero.querySelector('.stats-grid'),
            hero.querySelector('.cta-buttons')
        ].filter(el => el);
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
        });
    }

    // 5. SKILLS VISUALIZATION
    function initSkillsRadar() {
        const ctx = document.getElementById('skillsRadar');
        if (!ctx) return;
        
        const skillsRadar = new Chart(ctx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Frontend', 'Backend', 'Database', 'UI/UX', 'DevOps', 'Testing'],
                datasets: [{
                    label: 'Skill Level',
                    data: [85, 80, 75, 70, 65, 75],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                    pointRadius: 4
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });
    }

    function initTechLevels() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach(item => {
            const level = item.getAttribute('data-level');
            item.style.setProperty('--level', `${level}%`);
            
            item.addEventListener('mouseenter', function() {
                this.style.width = 'calc(var(--level) + 20px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.width = 'auto';
            });
        });
    }

    // 6. PROJECT SLIDESHOWS
    function showInitialSlides() {
        const slideshows = document.querySelectorAll('.slideshow-container');
        slideshows.forEach(container => {
            container.slideIndex = 1;
            showSlides(container, 1);
        });
    }

    window.changeSlide = function(button, n) {
        const slideshowContainer = button.closest('.slideshow-container');
        slideshowContainer.slideIndex += n;
        showSlides(slideshowContainer, slideshowContainer.slideIndex);
    }

    function showSlides(container, n) {
        let i;
        const slides = container.getElementsByClassName("slide");
        if (n > slides.length) { container.slideIndex = 1 }
        if (n < 1) { container.slideIndex = slides.length }
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        slides[container.slideIndex - 1].style.display = "block";
    }

    // 7. STATS COUNTER
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // 8. BUTTON EFFECTS
    function buttonEffects() {
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
    }

    // 9. PROJECT CARD EFFECTS
    function projectCardEffects() {
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
        
        // Fungsi baru untuk efek mockup
        function initMockupEffects() {
            document.querySelectorAll('.mockup-container').forEach(container => {
                const frame = container.querySelector('.mockup-frame');
                const img = frame.querySelector('img');
                
                container.addEventListener('mousemove', (e) => {
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const relX = x - centerX;
                    const relY = y - centerY;
                    
                    img.style.transform = `translate(-50%, -50%) translate(${relX * 0.05}px, ${relY * 0.05}px) scale(1.05)`;
                    frame.style.transform = `rotateY(${relX * 0.1}deg) rotateX(${-relY * 0.1}deg)`;
                });
                
                container.addEventListener('mouseleave', () => {
                    img.style.transform = 'translate(-50%, -50%)';
                    frame.style.transform = 'rotateY(0) rotateX(0)';
                });
            });
        }
        
        initMockupEffects();
    }

    // 10. WELCOME POPUP
    function welcomePopup() {
        const currentSession = sessionStorage.getItem('activeSession');
        const lastPopupTime = localStorage.getItem('lastPopupTime');
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (!currentSession || (lastPopupTime && now - lastPopupTime > oneDay)) {
            const popup = document.getElementById('welcomePopup');
            const welcomeBtn = document.getElementById('welcomeBtn');
            const textElements = document.querySelectorAll('.welcome-text p');
            
            sessionStorage.setItem('activeSession', 'true');
            
            setTimeout(() => {
                popup.classList.add('active');
                
                textElements.forEach((el, index) => {
                    const words = el.textContent.split(' ');
                    el.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
                    
                    const spans = el.querySelectorAll('span');
                    spans.forEach((span, i) => {
                        setTimeout(() => {
                            span.style.animation = `textReveal 0.5s ease-out ${i * 0.05}s forwards`;
                        }, index * 500);
                    });
                });
            }, 500);
            
            welcomeBtn.addEventListener('click', () => {
                popup.classList.remove('active');
                localStorage.setItem('lastPopupTime', now.toString());
            });
        }
    }

    // 11. TYPING ANIMATION
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;
        
        // Reset animation for replay
        typingElement.style.animation = 'none';
        void typingElement.offsetWidth; // Trigger reflow
        typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
    }

    // 12. ROLE CAROUSEL
    function initRoleCarousel() {
        const roles = document.querySelectorAll('.role');
        if (roles.length === 0) return;
        
        let currentIndex = 0;
        
        function showNextRole() {
            roles[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % roles.length;
            roles[currentIndex].classList.add('active');
        }
        
        // Start with first role visible
        roles[0].classList.add('active');
        
        // Change role every 3 seconds
        setInterval(showNextRole, 3000);
    }

    // 13. ORBIT ANIMATIONS
    function initOrbits() {
        const orbits = document.querySelectorAll('.orbit');
        orbits.forEach(orbit => {
            const delay = orbit.style.getPropertyValue('--i');
            orbit.style.animation = `orbit 15s linear infinite ${delay * -3}s`;
        });
    }

    // 14. PROCESS TIMELINE
    function initProcessTimeline() {
        const steps = document.querySelectorAll('.process-step');
        steps.forEach((step, index) => {
            step.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                    observer.unobserve(step);
                }
            }, { threshold: 0.1 });
            
            observer.observe(step);
        });
    }

    // 15. PROJECT CAROUSEL FUNCTIONALITY
    function initProjectCarousel() {
        const carouselContainer = document.querySelector('.carousel-container');
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const dots = document.querySelectorAll('.dot');
        
        if (!carouselContainer) return;
        
        const projects = document.querySelectorAll('.project-card');
        const totalProjects = projects.length;
        let currentIndex = 0;
        let projectsPerView = getProjectsPerView();
        
        function getProjectsPerView() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1200) return 2;
            return 3;
        }
        
        function updateCarousel() {
            const translateX = -currentIndex * (100 / projectsPerView);
            carouselContainer.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= Math.ceil(totalProjects / projectsPerView) - 1;
        }
        
        function nextSlide() {
            const maxIndex = Math.ceil(totalProjects / projectsPerView) - 1;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            projectsPerView = getProjectsPerView();
            currentIndex = 0;
            updateCarousel();
        });
        
        // Initialize carousel
        updateCarousel();
        
        // Auto-advance carousel (optional)
        let autoSlideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-slide on hover
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    }

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
        @keyframes typing {
            from { width: 0 }
            to { width: 100% }
        }
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: var(--primary-color); }
        }
        @keyframes roleChange {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            20% { opacity: 1; transform: translateY(0); }
            30% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        @keyframes textReveal {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});