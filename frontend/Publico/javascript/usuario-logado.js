// usuario-logado.js
// Exibe o nome do usuário logado no ícone superior direito em todas as páginas públicas

document.addEventListener('DOMContentLoaded', function() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const usuarioIcon = document.getElementById('usuarioLogado');
    const perfilDropdown = document.getElementById('perfilDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    if (usuarioIcon) {
        if (nomeUsuario) {
            usuarioIcon.innerHTML = nomeUsuario + (tipoUsuario ? ` (${tipoUsuario})` : '');
            usuarioIcon.style.display = 'inline-block';
            if (perfilDropdown) {
                perfilDropdown.style.display = 'none';
                let hideTimeout;
                usuarioIcon.onmouseenter = () => {
                    clearTimeout(hideTimeout);
                    perfilDropdown.style.display = 'block';
                };
                usuarioIcon.onmouseleave = () => {
                    hideTimeout = setTimeout(() => { perfilDropdown.style.display = 'none'; }, 400);
                };
                perfilDropdown.onmouseenter = () => {
                    clearTimeout(hideTimeout);
                    perfilDropdown.style.display = 'block';
                };
                perfilDropdown.onmouseleave = () => {
                    hideTimeout = setTimeout(() => { perfilDropdown.style.display = 'none'; }, 400);
                };
            }
            if (logoutBtn) {
                logoutBtn.onclick = () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('nomeUsuario');
                    localStorage.removeItem('tipoUsuario');
                    window.location.href = 'login.html';
                };
            }
        } else {
            usuarioIcon.innerHTML = '<a href="login.html">Fazer login</a>';
            usuarioIcon.style.display = 'inline-block';
            if (perfilDropdown) perfilDropdown.style.display = 'none';
        }
    }
});
