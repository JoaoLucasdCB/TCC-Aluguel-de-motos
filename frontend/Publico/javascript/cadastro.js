// JS básico para o formulário de cadastro

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio para o backend
    alert('Cadastro realizado com sucesso!');
    // Redirecionar para login, se desejar:
    // window.location.href = 'login.html';
});
