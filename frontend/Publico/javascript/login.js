// login.js


function showMsg(msg, type = 'error') {
    const msgContainer = document.getElementById('msgContainer');
    if (!msgContainer) return;
    const div = document.createElement('div');
    div.className = `msg-toast ${type}`;
    div.textContent = msg;
    msgContainer.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 3000);
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    if(email && senha) {
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
                showMsg(msg || 'Email ou senha inválidos.', 'error');
                throw new Error(msg || 'Email ou senha inválidos.');
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                // Garante que tipoUsuario sempre será salvo em maiúsculo
                localStorage.setItem('tipoUsuario', data.tipoUsuario ? data.tipoUsuario.toUpperCase() : '');
                localStorage.setItem('nomeUsuario', data.nome);
                if (data.id) {
                    localStorage.setItem('usuarioId', data.id);
                }
                showMsg('Login realizado com sucesso!', 'success');
                setTimeout(() => {
                    if (data.tipoUsuario && data.tipoUsuario.toLowerCase() === 'admin') {
                        window.location.href = '../../Admin/html/cadastrar-moto.html';
                    } else {
                        window.location.href = 'aluguel.html';
                    }
                }, 900);
            } else {
                showMsg('Email ou senha inválidos.', 'error');
            }
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        showMsg('Por favor, preencha todos os campos.', 'error');
    }
});
