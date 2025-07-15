// logout.js - Remove dados do usuário/admin e redireciona para login
function logoutAdmin() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('nomeUsuario');
    sessionStorage.clear();
    window.location.href = '../../Publico/html/login.html';
}
