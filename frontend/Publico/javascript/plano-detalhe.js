const planos = [
    {
        id: 1,
        nome: 'Plano Básico',
        descricao: 'Ideal para quem precisa de uma moto por poucos dias.',
        preco: 'R$ 99,00/mês',
        beneficios: [
            'Desconto de 5% no aluguel',
            '1 troca de moto por mês',
            'Suporte 24h'
        ]
    },
    {
        id: 2,
        nome: 'Plano Vantagem',
        descricao: 'Para quem usa moto com frequência e quer mais economia.',
        preco: 'R$ 179,00/mês',
        beneficios: [
            'Desconto de 12% no aluguel',
            '3 trocas de moto por mês',
            'Seguro incluso',
            'Suporte 24h'
        ]
    },
    {
        id: 3,
        nome: 'Plano Premium',
        descricao: 'O melhor para quem quer liberdade total e máximo desconto.',
        preco: 'R$ 249,00/mês',
        beneficios: [
            'Desconto de 20% no aluguel',
            'Trocas ilimitadas',
            'Seguro total',
            'Assistência VIP',
            'Suporte 24h prioritário'
        ]
    }
];

// Funções utilitárias
function getElement(id) {
    return document.getElementById(id);
}

function addOptimizedEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

function animateElement(element, properties, duration) {
    if (!element) return;
    
    const originalStyles = {};
    Object.keys(properties).forEach(prop => {
        originalStyles[prop] = element.style[prop];
    });
    
    Object.assign(element.style, properties);
    
    setTimeout(() => {
        Object.keys(originalStyles).forEach(prop => {
            element.style[prop] = originalStyles[prop];
        });
    }, duration);
}

async function renderPlanoDetalhe() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    try {
        const response = await fetch(`http://localhost:8080/planos/${id}`);
        if (!response.ok) throw new Error('Plano não encontrado');
        const plano = await response.json();
        
        // Atualiza o título da página
        document.title = `${plano.nomePlano || 'Plano'} - RideMoto`;
        
        // Atualiza o nome do plano
        const planoNome = getElement('planoDetailNome');
        if (planoNome) {
            planoNome.textContent = plano.nomePlano || 'Plano';
        }
        
        // Atualiza o badge do plano
        updatePlanoBadge(plano.nomePlano || '');
        
        // Atualiza a descrição
        const planoDescricao = getElement('planoDetailDescricao');
        if (planoDescricao) {
            planoDescricao.textContent = `Duração: ${plano.duracao || 30} dias`;
        }
        
        // Atualiza o preço (se existir)
        const planoPreco = getElement('planoDetailPreco');
        if (planoPreco) {
            if (plano.preco) {
                planoPreco.textContent = `R$ ${plano.preco}`;
                planoPreco.style.display = 'block';
            } else {
                planoPreco.style.display = 'none';
            }
        }
        
        // Atualiza os benefícios
        const planoBeneficios = getElement('planoDetailBeneficios');
        if (planoBeneficios) {
            if (plano.beneficios) {
                const beneficiosArray = plano.beneficios.split('\n');
                planoBeneficios.innerHTML = beneficiosArray.map(b => `<li>${b}</li>`).join('');
            } else {
                planoBeneficios.innerHTML = '<li>Sem benefícios cadastrados</li>';
            }
        }
        
        // Adiciona animação de entrada
        animateEntry();
        
        // Adiciona funcionalidades interativas
        addInteractiveFeatures();
        
    } catch (err) {
        console.error('Erro ao carregar plano:', err);
        document.querySelector('.plano-detail-container').innerHTML = '<p>Plano não encontrado.</p>';
    }
}

function updatePlanoBadge(nomePlano) {
    const badgeElement = getElement('planoBadge');
    if (!badgeElement) return;
    
    // Remove classes anteriores
    badgeElement.classList.remove('popular', 'premium', 'basico');
    
    // Define o texto e classe baseado no nome do plano
    let badgeText = 'Popular';
    let badgeClass = 'popular';
    
    if (nomePlano.toLowerCase().includes('premium')) {
        badgeText = 'Premium';
        badgeClass = 'premium';
    } else if (nomePlano.toLowerCase().includes('básico') || nomePlano.toLowerCase().includes('basico')) {
        badgeText = 'Básico';
        badgeClass = 'basico';
    }
    
    badgeElement.textContent = badgeText;
    badgeElement.classList.add(badgeClass);
}

function addInteractiveFeatures() {
    // Adiciona efeito de hover nos benefícios
    const beneficiosItems = document.querySelectorAll('.plano-detail-beneficios li');
    beneficiosItems.forEach(item => {
        addOptimizedEventListener(item, 'mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        addOptimizedEventListener(item, 'mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Adiciona efeito de clique no botão contratar
    const contratarBtn = document.querySelector('.contratar-btn');
    if (contratarBtn) {
        addOptimizedEventListener(contratarBtn, 'click', function(e) {
            e.preventDefault();
            
            // Adiciona efeito de ripple
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
                window.location.href = 'cadastro.html';
            }, 300);
        });
    }
    
    // Adiciona efeito de clique no botão voltar
    const voltarBtn = document.querySelector('.plano-detail-btn');
    if (voltarBtn) {
        addOptimizedEventListener(voltarBtn, 'click', function(e) {
            e.preventDefault();
            
            // Adiciona efeito de ripple
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
                window.location.href = 'planos.html';
            }, 300);
        });
    }
    
    // Adiciona efeito de hover na seção de preço
    const precoSection = document.querySelector('.plano-detail-preco');
    if (precoSection) {
        addOptimizedEventListener(precoSection, 'mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        addOptimizedEventListener(precoSection, 'mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

function animateEntry() {
    const container = document.querySelector('.plano-detail-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando carregamento dos detalhes do plano...');
    renderPlanoDetalhe();
});

// Adiciona estilos CSS dinâmicos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .plano-detail-container {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .plano-detail-beneficios li {
        transition: all 0.3s ease;
    }
    
    .plano-detail-preco {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
