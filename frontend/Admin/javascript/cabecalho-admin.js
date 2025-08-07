// cabecalho-admin.js - Dropdown do perfil admin igual ao público

document.addEventListener('DOMContentLoaded', function() {
    const usuarioIcon = document.getElementById('usuarioLogado');
    const perfilDropdown = document.getElementById('perfilDropdown');
    const relatorioBtn = document.getElementById('relatorioBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Exibe nome do admin
    if (usuarioIcon) {
        usuarioIcon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><circle cx="12" cy="8" r="4" stroke="#fff" stroke-width="2"/><path d="M4 20c0-3.3137 3.134-6 7-6s7 2.6863 7 6" stroke="#fff" stroke-width="2"/></svg> <span style="color:#fff;font-weight:500;">Admin</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-left:2px;vertical-align:middle;"><path d="M7 10l5 5 5-5" stroke="#fff" stroke-width="2" fill="none"/></svg>';
        usuarioIcon.style.display = 'flex';
    }

    // Dropdown interativo igual ao público
    let hideTimeout;
    if (usuarioIcon && perfilDropdown) {
        usuarioIcon.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            perfilDropdown.classList.add('show');
        });
        usuarioIcon.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => perfilDropdown.classList.remove('show'), 400);
        });
        perfilDropdown.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            perfilDropdown.classList.add('show');
        });
        perfilDropdown.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => perfilDropdown.classList.remove('show'), 400);
        });
        usuarioIcon.addEventListener('click', () => {
            perfilDropdown.classList.toggle('show');
        });
    }

    // Botões do dropdown
    if (relatorioBtn) {
        relatorioBtn.onclick = () => window.location.href = 'aluguel-relatorio.html';
    }
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('nomeUsuario');
            localStorage.removeItem('tipoUsuario');
            window.location.href = '../../Publico/html/login.html';
        };
    }
});
