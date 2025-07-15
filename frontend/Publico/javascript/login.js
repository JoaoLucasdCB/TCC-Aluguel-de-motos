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
        .then(async response => {
            if (!response.ok) {
                const msg = await response.text();
                alert(msg || 'Email ou senha inválidos.');
                throw new Error(msg || 'Email ou senha inválidos.');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('tipoUsuario', data.tipoUsuario);
                localStorage.setItem('nomeUsuario', data.nome);
                if (data.tipoUsuario && data.tipoUsuario.toLowerCase() === 'admin') {
                    window.location.href = '../../Admin/html/cadastrar-moto.html';
                } else {
                    window.location.href = 'reservas.html';
                }
            } else {
                alert('Email ou senha inválidos.');
            }
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
