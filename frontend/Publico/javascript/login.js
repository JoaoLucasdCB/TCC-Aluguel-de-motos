// login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    if(email && senha) {
        // Exemplo de requisição para o backend (ajuste o endpoint para o correto de login)
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                // Caminho relativo para funcionar em qualquer ambiente local
                window.location.href = '../../Admin/html/cadastrar-moto.html';
            } else {
                alert('Email ou senha inválidos.');
            }
        })
        .catch(error => {
            alert('Erro de conexão com o servidor.');
            console.error(error);
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
