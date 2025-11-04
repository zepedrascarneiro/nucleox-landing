/* ========================================
   NUCLEOˣ — PREMIUM LANDING PAGE SCRIPT
   Interatividade e Animações
   ======================================== */

// ========================================
// LANGUAGE SYSTEM
// ========================================
let currentLang = localStorage.getItem('nucleox-lang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('nucleox-lang', lang);
    
    // Update document language
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Language toggle buttons
document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

// ========================================
// PRICING TOGGLE (Monthly/Annual)
// ========================================
const billingSwitch = document.getElementById('billing-switch');
const priceAmounts = document.querySelectorAll('.amount');
const pricePeriods = document.querySelectorAll('.period');

billingSwitch.addEventListener('change', (e) => {
    const isAnnual = e.target.checked;
    
    priceAmounts.forEach(amount => {
        const monthly = parseInt(amount.getAttribute('data-monthly'));
        const annual = parseInt(amount.getAttribute('data-annual'));
        
        // Animate number change
        animateValue(amount, isAnnual ? monthly : annual, isAnnual ? annual : monthly, 500);
    });
    
    // Update period text
    pricePeriods.forEach(period => {
        const key = isAnnual ? 'period-annual' : 'period-monthly';
        period.innerHTML = translations[currentLang][key];
    });
});

// Number animation helper
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Stagger animations for grid items
            if (entry.target.classList.contains('pillar-card') || 
                entry.target.classList.contains('experience-card') ||
                entry.target.classList.contains('pricing-card')) {
                
                const cards = entry.target.parentElement.children;
                Array.from(cards).forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(`
        .section-why,
        .section-method,
        .section-experience,
        .section-pricing,
        .section-proof,
        .pillar-card,
        .experience-card,
        .pricing-card
    `);
    
    elementsToAnimate.forEach(el => {
        // Set initial state for cards
        if (el.classList.contains('pillar-card') || 
            el.classList.contains('experience-card') ||
            el.classList.contains('pricing-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        animateOnScroll.observe(el);
    });
});

// ========================================
// PARALLAX EFFECT
// ========================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallaxEffect();
            ticking = false;
        });
        ticking = true;
    }
});

function parallaxEffect() {
    const scrolled = window.pageYOffset;
    
    // Hero atom parallax
    const heroAtoms = document.querySelectorAll('.hero-background .atom-orbit');
    heroAtoms.forEach((atom, index) => {
        const speed = (index + 1) * 0.05;
        atom.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Why section atom parallax
    const whyAtom = document.querySelector('.atom-visual');
    if (whyAtom) {
        const rect = whyAtom.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const relativeScroll = (window.innerHeight - rect.top) / window.innerHeight;
            whyAtom.style.transform = `translateY(${relativeScroll * 50 - 25}px)`;
        }
    }
}

// ========================================
// CTA BUTTON RIPPLE EFFECT
// ========================================
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to all CTA buttons
document.querySelectorAll('.cta-primary, .cta-secondary, .cta-pricing').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    .cta-primary, .cta-secondary, .cta-pricing {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// PILLAR CARDS HOVER EFFECT
// ========================================
document.querySelectorAll('.pillar-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const letter = this.getAttribute('data-pillar');
        this.style.setProperty('--hover-color', 'var(--color-accent)');
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ========================================
// NAVBAR SCROLL EFFECT (se adicionar navbar)
// ========================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Change language toggle opacity based on scroll
    const langToggle = document.querySelector('.language-toggle');
    if (currentScroll > 100) {
        langToggle.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        langToggle.style.background = 'rgba(255, 255, 255, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// PRICING CARDS COMPARISON
// ========================================
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add selection to clicked card
        this.classList.add('selected');
    });
});

// Add selection style
const pricingStyle = document.createElement('style');
pricingStyle.textContent = `
    .pricing-card.selected {
        border-color: var(--color-accent) !important;
        box-shadow: 0 0 60px rgba(0, 255, 136, 0.2) !important;
        transform: translateY(-10px) scale(1.02) !important;
    }
`;
document.head.appendChild(pricingStyle);

// ========================================
// FORM VALIDATION (para futuros forms)
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// LOADING SCREEN (opcional)
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', (e) => {
    // Language switch with Ctrl/Cmd + L
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    }
    
    // Jump to pricing with Ctrl/Cmd + P
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// ========================================
// ANALYTICS TRACKING (placeholder)
// ========================================
function trackEvent(eventName, eventData = {}) {
    // Integrate with Google Analytics, Mixpanel, etc.
    console.log('Event:', eventName, eventData);
    
    // Example: gtag('event', eventName, eventData);
}

// Track CTA clicks
document.querySelectorAll('.cta-primary, .cta-secondary, .cta-pricing').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', {
            button_text: button.textContent.trim(),
            button_location: button.closest('section')?.id || 'unknown'
        });
    });
});

// Track pricing tier selection
document.querySelectorAll('.pricing-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const tierName = card.querySelector('.tier-name')?.textContent || 'unknown';
        trackEvent('pricing_tier_selected', {
            tier: tierName,
            tier_index: index
        });
    });
});

// ========================================
// EASTER EGG: Konami Code
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Change all accent colors to rainbow
    document.documentElement.style.setProperty('--color-accent', '#FF00FF');
    
    setTimeout(() => {
        document.documentElement.style.setProperty('--color-accent', '#00FF88');
    }, 5000);
    
    console.log('🎉 You found the Easter Egg! Welcome to the Geometry Tribe.');
}

// ========================================
// RESPONSIVE MENU (se adicionar menu mobile)
// ========================================
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

// ========================================
// SCROLL PROGRESS INDICATOR (opcional)
// ========================================
function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / height) * 100;
    
    // Se adicionar uma barra de progresso
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// COPY TO CLIPBOARD (para compartilhar links)
// ========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        showToast('Link copiado!');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Toast CSS
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--color-accent);
        color: var(--color-black);
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10000;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(toastStyle);

// ========================================
// CONSOLE ART
// ========================================
console.log(`
███╗   ██╗██╗   ██╗ ██████╗██╗     ███████╗ ██████╗ ˣ
████╗  ██║██║   ██║██╔════╝██║     ██╔════╝██╔═══██╗
██╔██╗ ██║██║   ██║██║     ██║     █████╗  ██║   ██║
██║╚██╗██║██║   ██║██║     ██║     ██╔══╝  ██║   ██║
██║ ╚████║╚██████╔╝╚██████╗███████╗███████╗╚██████╔╝
╚═╝  ╚═══╝ ╚═════╝  ╚═════╝╚══════╝╚══════╝ ╚═════╝ 

The Geometry of Thought
Ready to upgrade your mind?
`);

console.log('%c🧠 Join the movement at nucleox.com', 'font-size: 16px; font-weight: bold; color: #00FF88;');
