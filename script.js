// Função para toggle do menu mobile
function toggleMobileMenu() {
    const sidebar = document.getElementById('mobile-menu-sidebar');
    const overlay = document.getElementById('mobile-menu-overlay');
    const hamburger = document.getElementById('hamburger-btn');
    
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
    if (overlay) {
        overlay.classList.toggle('active');
    }
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// Fechar menu ao pressionar ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('mobile-menu-sidebar');
        const overlay = document.getElementById('mobile-menu-overlay');
        const hamburger = document.getElementById('hamburger-btn');
        
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Função para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = "558994535859";
    const message = "Olá, gostaria de agendar uma consulta.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}

// Função para abrir Instagram
function openInstagram() {
    const instagramURL = "https://www.instagram.com/elvisbrito_adv/";
    window.open(instagramURL, "_blank");
}

// Função de scroll suave
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Função para voltar ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Função para toggle do FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os outros FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle do FAQ atual
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Header effect
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (scrolled > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Parallax effect no hero (suave)
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Animação de entrada dos elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.specialization-card, .service-card, .contact-card, .section-header, .about-content, .about-highlights, .credential-item, .highlight-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contador animado para estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }

    // Lazy loading para imagens
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.loading = 'lazy';
        imageObserver.observe(img);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
});

// Função para animar contadores
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Função para lidar com o envio do formulário
function handleFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Mostrar loading
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Enviando...';
    submitBtn.disabled = true;

    // Simular envio (aqui você integraria com seu backend)
    setTimeout(() => {
        // Criar mensagem para WhatsApp com os dados do formulário
        const message = `
Olá! Recebi uma mensagem através do site:

*Nome:* ${data.name}
*E-mail:* ${data.email}
*Telefone:* ${data.phone}
*Assunto:* ${data.subject}
*Mensagem:* ${data.message}

Gostaria de agendar uma consulta gratuita.
        `.trim();

        // Abrir WhatsApp com a mensagem
        const phoneNumber = "558994535859";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");

        // Resetar formulário
        form.reset();
        
        // Mostrar mensagem de sucesso
        showNotification('Mensagem enviada! Você será redirecionado para o WhatsApp.', 'success');
        
        // Restaurar botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Adicionar estilos se não existirem
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            .notification-success {
                border-left: 4px solid #10b981;
            }
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #666;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Otimizar animações em dispositivos móveis
if (isMobile()) {
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
}

// Função para analytics (Google Analytics, etc.)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
    // Exemplo para Google Analytics (descomente se estiver usando)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }
}

// Rastrear cliques nos botões
document.addEventListener('click', function(e) {
    const target = e.target.closest('button') || e.target;
    
    if (target.matches('.btn-primary') || target.closest('.btn-primary')) {
        trackEvent('whatsapp_click', { location: 'hero_section' });
    }
    
    if (target.matches('.btn-whatsapp') || target.closest('.btn-whatsapp')) {
        trackEvent('whatsapp_click', { location: 'contact_section' });
    }
    
    if (target.matches('.btn-secondary') || target.closest('.btn-secondary') || 
        target.matches('.btn-instagram') || target.closest('.btn-instagram')) {
        trackEvent('instagram_click');
    }
    
    if (target.matches('.btn-header') || target.closest('.btn-header')) {
        trackEvent('whatsapp_click', { location: 'header' });
    }
    
    if (target.matches('.btn-submit') || target.closest('.btn-submit')) {
        trackEvent('form_submit', { form: 'contact' });
    }
});

// Preloader
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remover qualquer preloader se existir
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 300);
    }
});

// Melhorar acessibilidade
document.addEventListener('keydown', function(e) {
    // Permitir navegação por teclado nos botões
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.matches('button') && !e.target.type === 'submit') {
            e.preventDefault();
            e.target.click();
        }
    }
    
    // ESC para fechar modais/menus
    if (e.key === 'Escape') {
        const activeMenu = document.querySelector('.nav-menu.active');
        const activeToggle = document.querySelector('.mobile-menu-toggle.active');
        
        if (activeMenu && activeToggle) {
            activeMenu.classList.remove('active');
            activeToggle.classList.remove('active');
        }
    }
});

// Função para validar formulário
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    // Validar email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('error');
            isValid = false;
        }
    }
    
    // Validar telefone
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(phoneField.value) || phoneField.value.length < 10) {
            phoneField.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Adicionar estilos para campos com erro
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(errorStyles);

// Função para formatar telefone
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    input.value = value;
}

// Aplicar formatação de telefone
document.addEventListener('input', function(e) {
    if (e.target.type === 'tel') {
        formatPhone(e.target);
    }
});

// Função para scroll spy (destacar seção ativa no menu)
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Inicializar scroll spy
initScrollSpy();

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll
const debouncedScrollHandler = debounce(() => {
    // Handlers de scroll já implementados acima
}, 10);

// Adicionar classe active para links do menu
const activeStyles = document.createElement('style');
activeStyles.textContent = `
    .nav-menu a.active {
        color: var(--primary);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyles);




// Função para redirecionar para links externos ao clicar em operações
document.addEventListener('DOMContentLoaded', function() {
    const operationItems = document.querySelectorAll('.operation-item');

    operationItems.forEach(item => {
        item.addEventListener('click', function() {
            const links = this.dataset.links;
            if (links) {
                const linkArray = links.split(',').map(link => link.trim());
                linkArray.forEach(link => {
                    window.open(link, '_blank');
                });
            }
        });
    });
});








// Função para redirecionar operações
document.addEventListener('DOMContentLoaded', function() {
    const operationItems = document.querySelectorAll('.operation-item');
    operationItems.forEach(item => {
        item.addEventListener('click', function() {
            const links = this.getAttribute('data-links');
            if (links) {
                const linkArray = links.split(',');
                if (linkArray.length > 1) {
                    // Abre múltiplos links em novas abas
                    linkArray.forEach(link => {
                        window.open(link.trim(), '_blank');
                    });
                } else {
                    // Abre um único link em uma nova aba
                    window.open(links, '_blank');
                }
            }
        });
    });
});