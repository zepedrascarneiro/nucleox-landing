/* ========================================
   NUCLEOˣ — EBOOK SALES PAGE SCRIPT
   Gatilhos Mentais Interativos
   ======================================== */

// ========================================
// COUNTDOWN TIMER (Urgência Real)
// ========================================
function initCountdown() {
    // Define 24 horas a partir de agora
    const endTime = Date.now() + (24 * 60 * 60 * 1000);
    
    // Ou use uma data fixa futura
    // const endTime = new Date('2025-11-07T23:59:59').getTime();
    
    function updateCountdown() {
        const now = Date.now();
        const distance = endTime - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "EXPIRADO";
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

initCountdown();

// ========================================
// SCARCITY COUNTER (Escassez Dinâmica)
// ========================================
let copiesLeft = 127; // Número inicial

function updateScarcity() {
    // Simula vendas aleatórias
    if (Math.random() > 0.7) { // 30% de chance a cada intervalo
        copiesLeft = Math.max(10, copiesLeft - 1);
        
        document.getElementById('copies-left').textContent = copiesLeft;
        document.getElementById('final-copies').textContent = copiesLeft;
        
        // Atualiza barra visual
        const percentage = (copiesLeft / 500) * 100;
        document.getElementById('scarcity-fill').style.width = percentage + '%';
        
        // Muda cor quando crítico
        if (copiesLeft < 50) {
            document.getElementById('scarcity-fill').style.background = 
                'linear-gradient(90deg, #FF3366 0%, #FF6600 100%)';
        }
    }
}

// Atualiza a cada 5-15 segundos (variação para parecer real)
setInterval(updateScarcity, Math.random() * 10000 + 5000);

// ========================================
// LANGUAGE SYSTEM
// ========================================
let currentLang = localStorage.getItem('nucleox-lang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('nucleox-lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

document.getElementById('lang-pt').addEventListener('click', () => setLanguage('pt'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

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
// CTA TRACKING & CHECKOUT
// ========================================
function trackCTAClick(location) {
    // Analytics
    console.log('CTA Click:', location);
    
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': location,
            'value': 9.90
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            value: 9.90,
            currency: 'USD',
            content_name: 'NUCLEOx Ebook'
        });
    }
    
    // Redirect to checkout
    initiateCheckout();
}

function initiateCheckout() {
    // Integração com Stripe
    // window.location.href = 'https://buy.stripe.com/seu_link_aqui';
    
    // Ou abrir modal de checkout
    alert('Checkout será integrado com Stripe/Gumroad/Hotmart');
}

// Adiciona evento a todos os CTAs
document.querySelectorAll('.cta-mega').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const location = btn.closest('section')?.id || `cta-${index}`;
        trackCTAClick(location);
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
            
            // Stagger animations para cards
            const cards = entry.target.querySelectorAll('.problem-card, .pillar-reveal-card, .bonus-card, .testimonial-card, .faq-item');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observa todas as seções
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        animateOnScroll.observe(section);
        
        // Set initial state for cards
        const cards = section.querySelectorAll('.problem-card, .pillar-reveal-card, .bonus-card, .testimonial-card, .faq-item');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
});

// ========================================
// EBOOK 3D PARALLAX
// ========================================
document.addEventListener('mousemove', (e) => {
    const ebook = document.querySelector('.ebook-cover');
    if (!ebook) return;
    
    const rect = ebook.getBoundingClientRect();
    const ebookCenterX = rect.left + rect.width / 2;
    const ebookCenterY = rect.top + rect.height / 2;
    
    const angleX = (e.clientY - ebookCenterY) / 20;
    const angleY = -(e.clientX - ebookCenterX) / 20;
    
    ebook.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

// Reset on mouse leave
document.querySelector('.ebook-mockup')?.addEventListener('mouseleave', () => {
    const ebook = document.querySelector('.ebook-cover');
    if (ebook) {
        ebook.style.transform = 'rotateY(-15deg) rotateX(5deg)';
    }
});

// ========================================
// SOCIAL PROOF LIVE UPDATES
// ========================================
let readersCount = 4287;

function updateSocialProof() {
    // Incrementa número de leitores ocasionalmente
    if (Math.random() > 0.6) {
        readersCount++;
        const readerElements = document.querySelectorAll('.proof-number');
        if (readerElements[0]) {
            animateNumber(readerElements[0], readersCount);
        }
    }
}

function animateNumber(element, target) {
    const start = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const duration = 1000;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('en-US');
    }, 16);
}

setInterval(updateSocialProof, 30000); // A cada 30 segundos

// ========================================
// EXIT INTENT POPUP (Última Tentativa)
// ========================================
let exitIntentShown = false;

document.addEventListener('mouseout', (e) => {
    if (exitIntentShown) return;
    if (e.clientY <= 0) {
        showExitIntent();
        exitIntentShown = true;
    }
});

function showExitIntent() {
    // Criar modal de exit intent
    const modal = document.createElement('div');
    modal.className = 'exit-intent-modal';
    modal.innerHTML = `
        <div class="exit-intent-content">
            <button class="exit-close" onclick="this.closest('.exit-intent-modal').remove()">✕</button>
            <h2>⚠️ ESPERA!</h2>
            <p>Você realmente vai perder a chance de transformar sua mente por menos que um café?</p>
            <p class="exit-price">US$ 9.90 = <strong>Estrutura mental para a vida toda</strong></p>
            <button class="cta-mega pulsing" onclick="trackCTAClick('exit-intent')">
                OK, QUERO GARANTIR AGORA!
            </button>
            <p class="exit-guarantee">✓ Garantia de 30 dias | ✓ Acesso imediato</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exit_intent_shown');
    }
}

// CSS para exit intent (inline)
const exitIntentStyle = document.createElement('style');
exitIntentStyle.textContent = `
    .exit-intent-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .exit-intent-content {
        background: var(--color-gray-900);
        border: 2px solid var(--color-accent);
        border-radius: 16px;
        padding: 3rem;
        max-width: 500px;
        text-align: center;
        position: relative;
        animation: scaleIn 0.3s ease;
    }
    
    .exit-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: var(--color-gray-300);
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.2s;
    }
    
    .exit-close:hover {
        color: var(--color-white);
        transform: scale(1.2);
    }
    
    .exit-intent-content h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: var(--color-red);
    }
    
    .exit-intent-content p {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: var(--color-gray-300);
    }
    
    .exit-price {
        font-size: 1.5rem !important;
        color: var(--color-white) !important;
    }
    
    .exit-price strong {
        color: var(--color-accent);
    }
    
    .exit-guarantee {
        margin-top: 1rem;
        font-size: 0.875rem !important;
    }
    
    @keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(exitIntentStyle);

// ========================================
// SCROLL PROGRESS BAR
// ========================================
function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / height) * 100;
    
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--color-accent);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// TIME ON PAGE TRACKING
// ========================================
let timeOnPage = 0;
setInterval(() => {
    timeOnPage++;
    
    // Marca milestones
    if (timeOnPage === 30) { // 30 segundos
        if (typeof gtag !== 'undefined') {
            gtag('event', 'engaged_user', { time_seconds: 30 });
        }
    }
    
    if (timeOnPage === 120) { // 2 minutos
        if (typeof gtag !== 'undefined') {
            gtag('event', 'highly_engaged', { time_seconds: 120 });
        }
    }
}, 1000);

// ========================================
// COPY TO CLIPBOARD (Compartilhamento)
// ========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Link copiado! Compartilhe com amigos 🚀');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--color-accent);
        color: var(--color-black);
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Adiciona CSS de animação para toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + L = Language switch
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setLanguage(currentLang === 'pt' ? 'en' : 'pt');
    }
    
    // Ctrl/Cmd + B = Buy now (jump to offer)
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        document.getElementById('final-offer').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========================================
// CONSOLE BRANDING
// ========================================
console.log(`
%c███╗   ██╗██╗   ██╗ ██████╗██╗     ███████╗ ██████╗ ˣ
%c████╗  ██║██║   ██║██╔════╝██║     ██╔════╝██╔═══██╗
%c██╔██╗ ██║██║   ██║██║     ██║     █████╗  ██║   ██║
%c██║╚██╗██║██║   ██║██║     ██║     ██╔══╝  ██║   ██║
%c██║ ╚████║╚██████╔╝╚██████╗███████╗███████╗╚██████╔╝
%c╚═╝  ╚═══╝ ╚═════╝  ╚═════╝╚══════╝╚══════╝ ╚═════╝
`, 
'color: #00FF88; font-weight: bold;',
'color: #00FF88; font-weight: bold;',
'color: #00FF88; font-weight: bold;',
'color: #00FF88; font-weight: bold;',
'color: #00FF88; font-weight: bold;',
'color: #00FF88; font-weight: bold;'
);

console.log('%c🧠 The Geometry of Thought', 'font-size: 20px; font-weight: bold; color: #00FF88;');
console.log('%c💰 Get the ebook for only US$ 9.90', 'font-size: 14px; color: #FFFFFF;');
console.log('%c🚀 Transform your mind. Join the 1%.', 'font-size: 14px; color: #B0B0B0;');

// ========================================
// PERFORMANCE MONITORING
// ========================================
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'lcp', { value: entry.startTime });
                }
            }
        }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log('Page Load Time:', loadTime.toFixed(2), 'ms');
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load', { value: loadTime });
    }
});
