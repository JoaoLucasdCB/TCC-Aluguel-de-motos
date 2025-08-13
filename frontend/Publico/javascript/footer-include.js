// footer-include.js - Script para incluir o footer dinamicamente

document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar o footer
    function loadFooter() {
        fetch('../html/footer.html')
            .then(response => response.text())
            .then(data => {
                // Insere o footer antes do fechamento do body
                document.body.insertAdjacentHTML('beforeend', data);
                
                // Adiciona o CSS do footer se ainda não foi carregado
                if (!document.querySelector('link[href*="footer.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '../css/footer.css';
                    document.head.appendChild(link);
                }
                
                // Adiciona efeitos interativos ao footer
                addFooterInteractions();
            })
            .catch(error => {
                console.error('Erro ao carregar o footer:', error);
                // Fallback: insere um footer básico se não conseguir carregar
                insertFallbackFooter();
            });
    }
    
    // Função para adicionar interações ao footer
    function addFooterInteractions() {
        const footerLinks = document.querySelectorAll('footer a');
        
        footerLinks.forEach(link => {
            // Adiciona efeito de hover com delay
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
            
            // Adiciona efeito de clique
            link.addEventListener('click', function(e) {
                // Se não for um link externo ou mailto/tel, adiciona efeito de clique
                if (!this.href.includes('mailto:') && 
                    !this.href.includes('tel:') && 
                    !this.href.includes('wa.me') &&
                    !this.href.includes('#')) {
                    
                    // Efeito de ripple
                    const ripple = document.createElement('span');
                    ripple.style.position = 'absolute';
                    ripple.style.borderRadius = '50%';
                    ripple.style.background = 'rgba(0, 207, 255, 0.3)';
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
                    }, 600);
                }
            });
        });
        
        // Adiciona animação de entrada para as seções do footer
        const footerSections = document.querySelectorAll('.footer-section');
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
        
        footerSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
    
    // Função de fallback para inserir um footer básico
    function insertFallbackFooter() {
        const fallbackFooter = `
            <footer style="background: linear-gradient(135deg, #2d085c 0%, #a12b8c 100%); color: #fff; padding: 40px 8vw 20px 8vw; text-align: center;">
                <div style="margin-bottom: 20px;">
                    <h4 style="color: #00cfff; margin-bottom: 10px;">RideMoto</h4>
                    <p style="color: #e0e0e0; margin-bottom: 5px;">Liberdade sobre duas rodas para todos.</p>
                    <p style="color: #e0e0e0; margin-bottom: 5px;">📧 contato@ridemoto.com.br</p>
                    <p style="color: #e0e0e0;">📱 (31) 3353-1201</p>
                </div>
                <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px;">
                    <p style="color: #e0e0e0; margin: 0; font-size: 0.9rem;">&copy; 2025 RideMoto. Todos os direitos reservados.</p>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', fallbackFooter);
    }
    
    // Adiciona estilos CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .footer-section {
            transition: all 0.3s ease;
        }
        
        .footer-section:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
    
    // Carrega o footer
    loadFooter();
});

// Função global para recarregar o footer (útil para SPA)
window.reloadFooter = function() {
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
        existingFooter.remove();
    }
    
    // Recarrega o script
    const script = document.createElement('script');
    script.src = '../javascript/footer-include.js';
    document.head.appendChild(script);
}; 