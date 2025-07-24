// animasi.js - Enhanced Portfolio Animations with Advanced Space Background
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

  // 2. ADVANCED SPACE BACKGROUND
  const createSpaceBackground = function() {
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
      
      // Create stars
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
        
        // Create lines between stars
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
  };

  // Theme toggle function
  function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const toggleBtn = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('light-theme')) {
      toggleBtn.innerHTML = '🌙';
    } else {
      toggleBtn.innerHTML = '☀️';
    }
    // Save preference to localStorage
    localStorage.setItem('themePreference', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  }

  // Check for saved theme preference
  function checkSavedTheme() {
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      document.querySelector('.theme-toggle').innerHTML = '🌙';
    }
  }

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
  createSpaceBackground();
  checkSavedTheme();
  animateOnScroll();
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