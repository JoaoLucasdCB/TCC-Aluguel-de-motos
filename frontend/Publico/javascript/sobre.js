// sobre.js - Funcionalidades específicas para a página Sobre Nós

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona efeito de scroll suave para as seções
    const secoes = document.querySelectorAll('.sobre-secao');
    
    // Observador de interseção para animações no scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Aplica o observador nas seções
    secoes.forEach(secao => {
        secao.style.opacity = '0';
        secao.style.transform = 'translateY(30px)';
        secao.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(secao);
    });

    // Efeito de hover nos cards de valores
    const valorCards = document.querySelectorAll('.valor-card');
    valorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de digitação no título principal
    const titulo = document.querySelector('.sobre-titulo');
    if (titulo) {
        const textoOriginal = titulo.textContent;
        titulo.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < textoOriginal.length) {
                titulo.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Inicia a animação após um pequeno delay
        setTimeout(typeWriter, 500);
    }

    // Removido efeito de parallax que estava causando problemas no scroll

    // Efeito de contador animado para estatísticas (se adicionadas no futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Adiciona efeito de clique nos cards de valores
    valorCards.forEach(card => {
        card.addEventListener('click', function() {
            // Adiciona uma classe temporária para efeito de clique
            this.classList.add('card-clicked');
            setTimeout(() => {
                this.classList.remove('card-clicked');
            }, 300);
        });
    });

    // Efeito de destaque no hover das seções
    secoes.forEach(secao => {
        secao.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(123, 47, 242, 0.5)';
        });
        
        secao.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Adiciona funcionalidade de copiar email para área de transferência
    const emailElement = document.querySelector('.contato-item');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Clique para copiar o email';
        
        emailElement.addEventListener('click', function() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Feedback visual
                const originalText = this.textContent;
                this.textContent = 'Email copiado!';
                this.style.color = '#00cfff';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '#e0e0e0';
                }, 2000);
            }).catch(err => {
                console.log('Erro ao copiar email:', err);
            });
        });
    }

    // Adiciona efeito de partículas flutuantes
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(particle);
        
        // Remove a partícula após a animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 12000);
    }

    // Cria partículas periodicamente
    setInterval(createParticle, 3000);
    
    // Cria algumas partículas iniciais
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 500);
    }
});

// Adiciona estilos CSS dinâmicos para as partículas
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(0, 207, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: float-particle 12s infinite linear;
    }
    
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
    
    .card-clicked {
        transform: scale(0.95) !important;
        transition: transform 0.3s ease !important;
    }
`;
document.head.appendChild(style); 