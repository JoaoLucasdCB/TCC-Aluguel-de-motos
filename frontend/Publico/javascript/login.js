// login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    // Aqui você pode adicionar a lógica de autenticação ou integração com backend
    if(email && senha) {
        alert('Login realizado com sucesso!');
        // Redirecionar ou chamar API
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
