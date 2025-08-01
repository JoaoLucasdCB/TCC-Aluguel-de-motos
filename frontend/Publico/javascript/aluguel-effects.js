// aluguel-effects.js - Efeitos interativos para a página de aluguel

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeitos de validação visual
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select');
        if (input) {
            // Efeito de foco
            input.addEventListener('focus', function() {
                group.classList.remove('invalid');
                group.classList.add('valid');
            });
            
            // Efeito de blur com validação
            input.addEventListener('blur', function() {
                if (input.hasAttribute('required') && !input.value) {
                    group.classList.remove('valid');
                    group.classList.add('invalid');
                } else if (input.value) {
                    group.classList.remove('invalid');
                    group.classList.add('valid');
                }
            });
            
            // Efeito de input
            input.addEventListener('input', function() {
                if (input.value) {
                    group.classList.remove('invalid');
                    group.classList.add('valid');
                }
            });
        }
    });
    
    // Efeito de loading no botão de alugar
    const alugarBtn = document.querySelector('.alugar-btn');
    const aluguelForm = document.getElementById('aluguelForm');
    
    if (aluguelForm && alugarBtn) {
        aluguelForm.addEventListener('submit', function(e) {
            // Adicionar classe de loading
            alugarBtn.classList.add('loading');
            alugarBtn.textContent = 'Processando...';
            
            // Simular processamento (remover em produção)
            setTimeout(() => {
                alugarBtn.classList.remove('loading');
                alugarBtn.classList.add('success');
                alugarBtn.textContent = 'Aluguel Confirmado!';
                
                // Resetar após 3 segundos
                setTimeout(() => {
                    alugarBtn.classList.remove('success');
                    alugarBtn.textContent = 'Alugar';
                }, 3000);
            }, 2000);
        });
    }
    
    // Efeito de confirmação para detalhes
    const detalhesMoto = document.getElementById('detalhesMoto');
    const detalhesPlano = document.getElementById('detalhesPlano');
    
    // Observar mudanças nos selects
    const motoSelect = document.getElementById('moto');
    const planoSelect = document.getElementById('plano');
    
    if (motoSelect && detalhesMoto) {
        motoSelect.addEventListener('change', function() {
            if (this.value) {
                detalhesMoto.classList.add('detail-confirmed');
                setTimeout(() => {
                    detalhesMoto.classList.remove('detail-confirmed');
                }, 500);
            }
        });
    }
    
    if (planoSelect && detalhesPlano) {
        planoSelect.addEventListener('change', function() {
            if (this.value) {
                detalhesPlano.classList.add('detail-confirmed');
                setTimeout(() => {
                    detalhesPlano.classList.remove('detail-confirmed');
                }, 500);
            }
        });
    }
    
    // Efeito de hover nos cards - reduzido
    const cards = document.querySelectorAll('.aluguel-info, .aluguel-detalhes');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de partículas dinâmicas - reduzido
    function createParticle() {
        const particles = document.querySelector('.particles');
        if (!particles) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
        
        particles.appendChild(particle);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 12000);
    }
    
    // Criar partículas periodicamente - menos frequente
    setInterval(createParticle, 5000);
    
    // Efeito de scroll suave para elementos
    function smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    // Efeito de destaque para campos com erro
    function highlightInvalidFields() {
        const requiredFields = document.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value) {
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('invalid');
                    
                    // Scroll suave para o primeiro campo inválido
                    if (field === requiredFields[0]) {
                        smoothScrollTo(formGroup);
                    }
                }
            }
        });
    }
    
    // Adicionar validação ao formulário
    if (aluguelForm) {
        aluguelForm.addEventListener('submit', function(e) {
            const requiredFields = document.querySelectorAll('[required]');
            let hasErrors = false;
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    hasErrors = true;
                    const formGroup = field.closest('.form-group');
                    if (formGroup) {
                        formGroup.classList.add('invalid');
                    }
                }
            });
            
            if (hasErrors) {
                e.preventDefault();
                highlightInvalidFields();
                return false;
            }
        });
    }
    
    // Efeito de digitação no título - mais lento
    const title = document.querySelector('.aluguel-info h1');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        };
        
        // Iniciar efeito de digitação após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // Efeito de parallax sutil no background - reduzido
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.particles');
        
        if (parallax) {
            const speed = scrolled * 0.3;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Efeito de confirmação visual para campos preenchidos - reduzido
    function addConfirmationEffect(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.style.background = 'rgba(0, 207, 255, 0.05)';
            formGroup.style.borderRadius = '12px';
            formGroup.style.padding = '12px';
            formGroup.style.margin = '4px 0';
            formGroup.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                formGroup.style.background = 'transparent';
                formGroup.style.padding = '0';
                formGroup.style.margin = '0';
            }, 800);
        }
    }
    
    // Aplicar efeito de confirmação aos campos
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value) {
                addConfirmationEffect(this);
            }
        });
    });
}); 