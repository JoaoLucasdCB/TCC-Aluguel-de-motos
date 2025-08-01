// cabecalho-include.js - Script para incluir o cabeçalho dinamicamente

document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar o cabeçalho
    function loadCabecalho() {
        fetch('../html/cabecalho.html')
            .then(response => response.text())
            .then(data => {
                // Insere o cabeçalho no início do body
                document.body.insertAdjacentHTML('afterbegin', data);
                
                // Adiciona o CSS do cabeçalho se ainda não foi carregado
                if (!document.querySelector('link[href*="cabecalho.css"]')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = '../css/cabecalho.css';
                    document.head.appendChild(link);
                }
                
                // Inicializa as funcionalidades do cabeçalho
                initializeCabecalho();
                
                // Adiciona efeitos interativos ao cabeçalho
                addCabecalhoInteractions();
            })
            .catch(error => {
                console.error('Erro ao carregar o cabeçalho:', error);
                // Fallback: insere um cabeçalho básico se não conseguir carregar
                insertFallbackCabecalho();
            });
    }
    
    // Função para inicializar as funcionalidades do cabeçalho
    function initializeCabecalho() {
        const nomeUsuario = localStorage.getItem('nomeUsuario');
        const tipoUsuario = localStorage.getItem('tipoUsuario');
        const usuarioIcon = document.getElementById('usuarioLogado');
        const perfilDropdown = document.getElementById('perfilDropdown');
        const logoutBtn = document.getElementById('logoutBtn');
        const minhasReservasBtn = document.getElementById('minhasReservasBtn');
        const ctaBtn = document.getElementById('ctaBtn');
        const relatorioBtn = document.getElementById('relatorioBtn');
        
        console.log('Debug - nomeUsuario:', nomeUsuario);
        console.log('Debug - tipoUsuario:', tipoUsuario);
        console.log('Debug - usuarioIcon:', usuarioIcon);
        console.log('Debug - perfilDropdown:', perfilDropdown);
        
        // Configura o perfil do usuário
        if (usuarioIcon) {
            if (nomeUsuario) {
                usuarioIcon.innerHTML = nomeUsuario + (tipoUsuario ? ` (${tipoUsuario})` : '');
                usuarioIcon.style.display = 'inline-block';
                
                // Esconde o botão de cadastro quando logado
                if (ctaBtn) {
                    ctaBtn.style.display = 'none';
                }
                
                // Configura o dropdown do perfil
                if (perfilDropdown) {
                    perfilDropdown.style.display = 'block';
                    perfilDropdown.classList.remove('show');
                    console.log('Dropdown initialized', perfilDropdown);
                    console.log('Usuario icon:', usuarioIcon);
                    let hideTimeout;
                    
                    usuarioIcon.addEventListener('mouseenter', () => {
                        clearTimeout(hideTimeout);
                        console.log('Mouse enter - showing dropdown');
                        perfilDropdown.classList.add('show');
                    });
                    
                    // Adiciona evento de clique como fallback
                    usuarioIcon.addEventListener('click', () => {
                        console.log('Click - toggling dropdown');
                        perfilDropdown.classList.toggle('show');
                    });
                    
                    usuarioIcon.addEventListener('mouseleave', () => {
                        hideTimeout = setTimeout(() => { 
                            console.log('Mouse leave - hiding dropdown');
                            perfilDropdown.classList.remove('show'); 
                        }, 400);
                    });
                    
                    perfilDropdown.addEventListener('mouseenter', () => {
                        clearTimeout(hideTimeout);
                        perfilDropdown.classList.add('show');
                    });
                    
                    perfilDropdown.addEventListener('mouseleave', () => {
                        hideTimeout = setTimeout(() => { 
                            perfilDropdown.classList.remove('show'); 
                        }, 400);
                    });
                }
                
                // Configura o botão de minhas reservas
                if (minhasReservasBtn) {
                    minhasReservasBtn.onclick = () => {
                        window.location.href = 'minhas-reservas.html';
                    };
                }
                
                // Configura o botão de logout
                if (logoutBtn) {
                    logoutBtn.onclick = () => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('nomeUsuario');
                        localStorage.removeItem('tipoUsuario');
                        window.location.href = 'login.html';
                    };
                }
                
                // Configura o botão de relatório para admin
                if (relatorioBtn && tipoUsuario && tipoUsuario.toUpperCase() === 'ADMIN') {
                    relatorioBtn.style.display = 'block';
                    relatorioBtn.onclick = function() {
                        window.location.href = '../../Admin/html/aluguel-relatorio.html';
                    };
                }
                
            } else {
                // Usuário não logado
                usuarioIcon.innerHTML = '<a href="login.html">Fazer login</a>';
                usuarioIcon.style.display = 'inline-block';
                
                // Mostra o botão de cadastro
                if (ctaBtn) {
                    ctaBtn.style.display = 'inline-block';
                }
                
                if (perfilDropdown) {
                    perfilDropdown.classList.remove('show');
                }
            }
        }
        
        // Marca o link ativo baseado na página atual
        markActiveNavLink();
    }
    
    // Função para marcar o link de navegação ativo
    function markActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = {
            'landing.html': 'nav-landing',
            'aluguel.html': 'nav-aluguel',
            'sobre.html': 'nav-sobre',
            'motos.html': 'nav-motos',
            'planos.html': 'nav-planos',
            'moto-detalhe.html': 'nav-motos',
            'plano-detalhe.html': 'nav-planos',
            'minhas-reservas.html': 'nav-aluguel'
        };
        
        const activeLinkId = navLinks[currentPage];
        if (activeLinkId) {
            const activeLink = document.getElementById(activeLinkId);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Função para adicionar interações ao cabeçalho
    function addCabecalhoInteractions() {
        // Adiciona efeito de hover nos links de navegação
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
        
        // Adiciona efeito de clique no logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', function(e) {
                // Efeito de ripple
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(178, 102, 255, 0.3)';
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
            });
        }
        
        // Adiciona animação de entrada para o cabeçalho
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.opacity = '0';
            navbar.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                navbar.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                navbar.style.opacity = '1';
                navbar.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
    // Função de fallback para inserir um cabeçalho básico
    function insertFallbackCabecalho() {
        const fallbackCabecalho = `
            <nav class="navbar" style="display: flex; align-items: center; justify-content: space-between; background: linear-gradient(90deg, #2d085c 0%, #a12b8c 100%); padding: 16px 32px; border-bottom: 3px solid #00cfff; color: #fff;">
                <button class="logo" onclick="window.location.href='landing.html'" style="font-size: 2rem; color: #b266ff; font-weight: bold; background: transparent; border: none; cursor: pointer;">i&gt;</button>
                <ul class="nav-links" style="list-style: none; display: flex; gap: 32px; margin: 0; padding: 0;">
                    <li><a href="aluguel.html" style="color: #fff; text-decoration: none; font-size: 1.1rem;">Aluguel</a></li>
                    <li><a href="sobre.html" style="color: #fff; text-decoration: none; font-size: 1.1rem;">Sobre Nós</a></li>
                    <li><a href="motos.html" style="color: #fff; text-decoration: none; font-size: 1.1rem;">Motos</a></li>
                    <li><a href="planos.html" style="color: #fff; text-decoration: none; font-size: 1.1rem;">Planos</a></li>
                </ul>
                <a href="cadastro.html" style="background: #fff; color: #7b2ff2; border: none; border-radius: 20px; padding: 8px 18px; font-weight: 600; text-decoration: none; font-size: 0.95rem;">Cadastre-se</a>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', fallbackCabecalho);
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
        
        .navbar {
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .nav-links a {
            transition: all 0.3s ease;
        }
        
        .nav-links a:hover {
            color: #00cfff !important;
        }
        
        .logo {
            transition: all 0.3s ease;
        }
        
        .logo:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
    
    // Carrega o cabeçalho
    loadCabecalho();
});

// Função global para recarregar o cabeçalho (útil para SPA)
window.reloadCabecalho = function() {
    const existingNavbar = document.querySelector('.navbar');
    if (existingNavbar) {
        existingNavbar.remove();
    }
    
    // Recarrega o script
    const script = document.createElement('script');
    script.src = '../javascript/cabecalho-include.js';
    document.head.appendChild(script);
}; 