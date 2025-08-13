// moto-detalhe.js - Funcionalidades otimizadas para a página de detalhes da moto

// Funções utilitárias
function getElement(id) {
    return document.getElementById(id);
}

function addOptimizedEventListener(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

function optimizedScrollHandler(handler) {
    let ticking = false;
    return function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handler();
                ticking = false;
            });
            ticking = true;
        }
    };
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

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando carregamento dos detalhes da moto...');
    // Carrega os dados da moto da URL
    loadMotoDetails();
    
    // Adiciona funcionalidades interativas
    addInteractiveFeatures();
});

async function loadMotoDetails() {
    // Obtém o ID da moto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const motoId = urlParams.get('id');
    
    console.log('ID da moto obtido da URL:', motoId);
    
    if (!motoId) {
        console.error('ID da moto não encontrado na URL');
        showError('ID da moto não encontrado');
        return;
    }

    try {
        console.log('Fazendo requisição para:', `http://localhost:8080/api/motos/${motoId}`);
        const response = await fetch(`http://localhost:8080/api/motos/${motoId}`);
        console.log('Resposta recebida:', response.status, response.statusText);
        
        if (!response.ok) {
            console.error('Erro na resposta:', response.status, response.statusText);
            showError('Moto não encontrada');
            return;
        }
        
        const motoData = await response.json();
        console.log('Dados recebidos do backend:', motoData);
        displayMotoDetails(motoData);
    } catch (error) {
        console.error('Erro ao buscar dados da moto:', error);
        showError('Erro ao buscar dados da moto. Tente novamente mais tarde.');
    }
}

// Função de mock removida. Agora os dados são buscados do backend.

function displayMotoDetails(moto) {
    console.log('Exibindo detalhes da moto:', moto);
    
    // Atualiza o título da página
    document.title = `${moto.nome || ''} - RideMoto`;

    // Atualiza a imagem principal
    const motoImg = getElement('motoImg');
    if (motoImg) {
        const imageSrc = moto.imagem || '../img/yamaha-purple.jpg';
        console.log('Definindo imagem:', imageSrc);
        motoImg.src = imageSrc;
        motoImg.alt = moto.nome || '';
    }

    // Atualiza o nome da moto
    const motoNome = getElement('motoNome');
    if (motoNome) {
        console.log('Definindo nome:', moto.nome);
        motoNome.textContent = moto.nome || '';
    }

    // Atualiza as especificações
    updateSpecification('motoMarca', moto.marca || '');
    updateSpecification('motoModelo', moto.modelo || '');
    updateSpecification('motoAno', moto.ano || '');
    updateSpecification('motoCilindrada', moto.cilindrada || '');
    updateSpecification('motoPlaca', moto.placa || '');
    updateSpecification('motoStatus', moto.status || '');
    updateSpecification('motoQuilometragem', moto.quilometragem || '');

    // Atualiza o preço (campo não existe no backend ainda)
    const motoPreco = getElement('motoPreco');
    if (motoPreco) {
        if (moto.preco !== undefined && moto.preco !== null) {
            motoPreco.textContent = Number(moto.preco).toFixed(2).replace('.', ',');
        } else {
            // Valor padrão se não houver preço definido
            motoPreco.textContent = '150,00';
        }
    }

    // Atualiza a galeria (se existir)
    updateGallery(moto.galeria || []);

    // Adiciona animação de entrada
    animateEntry();
}

function updateSpecification(elementId, value) {
    const element = getElement(elementId);
    if (element) {
        console.log(`Atualizando ${elementId}:`, value);
        element.textContent = value;
    } else {
        console.warn(`Elemento ${elementId} não encontrado`);
    }
}

function updateGallery(images) {
    const gallery = getElement('motoGallery');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Imagem ${index + 1}`;
        img.onclick = () => changeMainImage(image);
        gallery.appendChild(img);
    });
}

function changeMainImage(imageSrc) {
    const motoImg = getElement('motoImg');
    if (motoImg) {
        // Usar função otimizada de animação
        animateElement(motoImg, { opacity: '0', transform: 'scale(0.9)' }, 200);
        
        setTimeout(() => {
            motoImg.src = imageSrc;
            animateElement(motoImg, { opacity: '1', transform: 'scale(1)' }, 200);
        }, 200);
    }
}

function addInteractiveFeatures() {
    // Adiciona efeito de hover nas especificações
    const specsItems = document.querySelectorAll('.specs li');
    specsItems.forEach(item => {
        addOptimizedEventListener(item, 'mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        addOptimizedEventListener(item, 'mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Adiciona efeito de clique no botão voltar
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        addOptimizedEventListener(backBtn, 'click', function(e) {
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
                window.location.href = 'motos.html';
            }, 300);
        });
    }
    
    // Adiciona efeito de parallax suave na imagem
    const motoImg = getElement('motoImg');
    if (motoImg) {
        // Usar scroll handler otimizado
        const scrollHandler = optimizedScrollHandler(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            motoImg.style.transform = `translateY(${rate}px)`;
        });
        
        window.addEventListener('scroll', scrollHandler);
    }
    
    // Adiciona efeito de zoom na imagem principal
    if (motoImg) {
        addOptimizedEventListener(motoImg, 'mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        addOptimizedEventListener(motoImg, 'mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

function animateEntry() {
    const container = document.querySelector('.moto-detail-container');
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

function showError(message) {
    console.error('Exibindo erro:', message);
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #fff;">
                <h2 style="color: #ff6600; margin-bottom: 20px;">Erro</h2>
                <p style="font-size: 1.1rem; margin-bottom: 30px;">${message}</p>
                <button onclick="window.location.href='motos.html'" 
                        style="background: var(--secondary-gradient); color: #fff; border: none; 
                               border-radius: 12px; padding: 16px 32px; font-size: 1.1rem; 
                               cursor: pointer; transition: all 0.3s ease;">
                    Voltar para lista
                </button>
            </div>
        `;
    }
}

// Adiciona estilos CSS dinâmicos para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .moto-detail-container {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .specs li {
        transition: all 0.3s ease;
    }
    
    #motoImg {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
