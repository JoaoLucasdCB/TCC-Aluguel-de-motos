// landing.js - animações e funcionalidades para a landing page melhorada

document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada dos elementos
    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Elementos para animar
        const animateElements = document.querySelectorAll('.vantagem-card, .step, .plano-card, .section-header');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Buscar moto de destaque do backend e exibir imagem (apenas se não houver imagem local)
    async function carregarMotoDestaque() {
        try {
            const imgDiv = document.querySelector('.hero-img img');
            if (!imgDiv) return;
            
            // Se a imagem atual não for a Yamaha local, tentar carregar do backend
            if (!imgDiv.src.includes('yamaha-purple.jpg')) {
                const resp = await fetch('http://localhost:8080/api/motos');
                if (!resp.ok) throw new Error('Erro ao buscar motos');
                const motos = await resp.json();
                if (!motos.length) return;
                
                // Critério: primeira moto ou a que tiver campo especial (ex: maisAlugada)
                const destaque = motos[0];
                if (destaque.imagem) {
                    imgDiv.src = destaque.imagem;
                    imgDiv.alt = destaque.nome || destaque.modelo || 'Moto em destaque';
                }
            }
        } catch (err) {
            console.error('Erro ao carregar moto destaque:', err);
        }
    }

    // Animação suave ao rolar para seções
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Efeito de parallax suave no hero
    function setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Animação dos números das estatísticas
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const isPercentage = finalValue.includes('%');
                    const isPlus = finalValue.includes('+');
                    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                    
                    let currentValue = 0;
                    const increment = numericValue / 50;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(timer);
                        }
                        
                        let displayValue = Math.floor(currentValue);
                        if (isPercentage) displayValue += '%';
                        if (isPlus) displayValue += '+';
                        if (finalValue.includes('h')) displayValue = '24h';
                        
                        target.textContent = displayValue;
                    }, 30);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    // Efeito hover nos cards
    function setupCardHoverEffects() {
        const cards = document.querySelectorAll('.vantagem-card, .plano-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Buscar planos do backend e renderizar cards (se necessário)
    async function carregarPlanos() {
        try {
            const resp = await fetch('http://localhost:8080/api/planos');
            if (!resp.ok) throw new Error('Erro ao buscar planos');
            const planos = await resp.json();
            
            // Se houver planos do backend, atualizar os cards
            if (planos.length > 0) {
                const container = document.querySelector('.planos-grid');
                if (container) {
                    container.innerHTML = '';
                    planos.forEach((plano, index) => {
                        const card = document.createElement('div');
                        card.className = `plano-card ${index === 1 ? 'destaque' : ''}`;
                        
                        const beneficios = plano.beneficios ? plano.beneficios.split(',').map(b => `✓ ${b.trim()}`).join('</li><li>') : '';
                        
                        card.innerHTML = `
                            ${index === 1 ? '<div class="plano-badge">Mais Popular</div>' : ''}
                            <div class="plano-header">
                                <h3>${plano.nomePlano || plano.nome || 'Plano'}</h3>
                                <div class="plano-preco">
                                    <span class="preco-valor">R$ ${plano.valor ? plano.valor.toFixed(2) : '0,00'}</span>
                                    <span class="preco-periodo">/${plano.duracao || 'período'}</span>
                                </div>
                            </div>
                            <ul class="plano-beneficios">
                                <li>${beneficios}</li>
                            </ul>
                            <a href="planos.html" class="plano-btn ${index === 1 ? 'destaque' : ''}">Ver Detalhes</a>
                        `;
                        container.appendChild(card);
                    });
                }
            }
        } catch (err) {
            console.error('Erro ao carregar planos:', err);
        }
    }

    // Efeito de fade-in no título principal
    function setupTitleAnimation() {
        const title = document.querySelector('.hero-text h1');
        if (!title) return;
        
        // Garantir que o HTML está correto
        title.innerHTML = 'Alugue sua moto com <span class="highlight">facilidade</span> e <span class="highlight">agilidade</span>!';
        
        // Animação de fade-in
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }

    // Contador de visitantes (simulado)
    function setupVisitorCounter() {
        const visitorCount = localStorage.getItem('visitorCount') || 0;
        const newCount = parseInt(visitorCount) + 1;
        localStorage.setItem('visitorCount', newCount);
        
        // Atualizar estatísticas se necessário
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            if (stat.textContent.includes('500+')) {
                const baseCount = 500 + Math.floor(newCount / 10);
                stat.textContent = `${baseCount}+`;
            }
        });
    }

    // Inicializar todas as funcionalidades
    function init() {
        animateOnScroll();
        setupSmoothScroll();
        setupParallax();
        animateStats();
        setupCardHoverEffects();
        setupTitleAnimation();
        setupVisitorCounter();
        carregarMotoDestaque();
        carregarPlanos();
    }

    // Iniciar após um pequeno delay para garantir que tudo carregou
    setTimeout(init, 100);
});

// Efeito de partículas no background (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.1)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        hero.appendChild(particle);
    }
}

// Adicionar partículas se desejado
// createParticles();
