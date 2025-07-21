// editar-usuario.js - Lógica para editar usuário via API

const API_URL = 'http://localhost:8080/usuarios'; // ajuste se necessário

function getIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', async function() {
    const usuarioId = getIdFromQuery();
    if (!usuarioId) {
        alert('ID do usuário não informado!');
        window.location.href = 'usuarios-admin.html';
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${usuarioId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) throw new Error('Erro ao buscar usuário');
        const usuario = await response.json();
        document.getElementById('usuarioId').value = usuario.id || '';
        document.getElementById('nome').value = usuario.nome || '';
        document.getElementById('cpf').value = usuario.cpf || '';
        document.getElementById('email').value = usuario.email || '';
        document.getElementById('telefone').value = usuario.telefone || '';
        document.getElementById('tipoUsuario').value = usuario.tipoUsuario || '';
    } catch (err) {
        alert('Erro ao carregar usuário: ' + err.message);
        window.location.href = 'usuarios-admin.html';
    }

    document.getElementById('formEditarUsuario').addEventListener('submit', async function(e) {
        e.preventDefault();
        const usuarioAtualizado = {};
        if(document.getElementById('nome').value) usuarioAtualizado.nome = document.getElementById('nome').value;
        if(document.getElementById('cpf').value) usuarioAtualizado.cpf = document.getElementById('cpf').value;
        if(document.getElementById('email').value) usuarioAtualizado.email = document.getElementById('email').value;
        if(document.getElementById('telefone').value) usuarioAtualizado.telefone = document.getElementById('telefone').value;
        if(document.getElementById('tipoUsuario').value) usuarioAtualizado.tipoUsuario = document.getElementById('tipoUsuario').value;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/${usuarioId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(usuarioAtualizado)
            });
            if (!response.ok) throw new Error('Erro ao atualizar usuário');
            alert('Usuário atualizado com sucesso!');
            window.location.href = 'usuarios-admin.html';
        } catch (err) {
            alert('Erro ao atualizar usuário: ' + err.message);
        }
    });
});
