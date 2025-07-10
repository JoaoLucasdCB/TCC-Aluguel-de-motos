// Protege a página: só acessa se estiver logado
if (!localStorage.getItem('token')) {
    window.location.href = '../../Publico/html/login.html';
}
// cadastrar-moto.js - Lógica da tela de cadastro de moto do admin
document.getElementById('formCadastroMoto').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Cadastro de moto enviado! (Funcionalidade backend será implementada)');
});
