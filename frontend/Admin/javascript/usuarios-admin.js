// usuarios-admin.js - Lógica para listar, editar e excluir usuários via API

const API_URL = 'http://localhost:8080/usuarios'; // ajuste se necessário

async function renderUsuarios() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) throw new Error('Erro ao buscar usuários');
        const usuarios = await response.json();
        const tbody = document.getElementById('usuariosTableBody');
        tbody.innerHTML = '';
        usuarios.forEach((usuario) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.id}</td>
                <td><span class="nome">${usuario.nome}</span></td>
                <td><span class="email">${usuario.email}</span></td>
                <td><span class="telefone">${usuario.telefone || ''}</span></td>
                <td><span class="tipo-usuario">${usuario.tipoUsuario ? (usuario.tipoUsuario.charAt(0).toUpperCase() + usuario.tipoUsuario.slice(1)) : ''}</span></td>
                <td>
                    <button onclick="editarUsuario(${usuario.id})">Editar</button>
                    <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        alert('Erro ao carregar usuários: ' + err.message);
    }
}

window.editarUsuario = function(id) {
    // Redireciona para a tela de edição, passando o id por query string
    window.location.href = `editar-usuario.html?id=${id}`;
}

window.excluirUsuario = async function(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!response.ok) throw new Error('Erro ao excluir usuário');
            renderUsuarios();
        } catch (err) {
            alert('Erro ao excluir usuário: ' + err.message);
        }
    }
}

document.addEventListener('DOMContentLoaded', renderUsuarios);
