// usuarios-admin.js - Lógica para listar, editar e excluir usuários via API

const API_URL = 'http://localhost:8080/usuarios'; // ajuste se necessário

window.listaUsuarios = [];

async function renderUsuarios() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao buscar usuários: ${response.status} - ${errorText}`);
        }
        
        const usuarios = await response.json();
        window.listaUsuarios = usuarios;
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
                        <button onclick="editarUsuario(${usuario.id})" class="btn-editar">Editar</button>
                        <button onclick="excluirUsuario(${usuario.id})" class="btn-excluir">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        alert('Erro ao carregar usuários: ' + err.message);
    }
}

window.editarUsuario = function(id) {
    // Abrir modal de edição e preencher dados do usuário
    const usuario = window.listaUsuarios.find(u => u.id === id);
    if (!usuario) return alert('Usuário não encontrado!');
    document.getElementById('editUsuarioId').value = usuario.id;
    document.getElementById('editUsuarioNome').value = usuario.nome;
    document.getElementById('editUsuarioEmail').value = usuario.email;
    document.getElementById('editUsuarioTelefone').value = usuario.telefone || '';
    document.getElementById('editUsuarioTipo').value = usuario.tipoUsuario || 'cliente';
    document.getElementById('modal-editar-usuario').style.display = 'flex';
}

// Fechar modal
if(document.getElementById('fechar-modal-editar')){
    document.getElementById('fechar-modal-editar').onclick = function() {
        document.getElementById('modal-editar-usuario').style.display = 'none';
    }
}

// Salvar edição
if(document.getElementById('formEditarUsuario')){
    document.getElementById('formEditarUsuario').onsubmit = async function(e) {
        e.preventDefault();
        const id = document.getElementById('editUsuarioId').value;
        const nome = document.getElementById('editUsuarioNome').value;
        const email = document.getElementById('editUsuarioEmail').value;
        const telefone = document.getElementById('editUsuarioTelefone').value;
        const tipoUsuario = document.getElementById('editUsuarioTipo').value;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, telefone, tipoUsuario })
            });
            if (!response.ok) throw new Error('Erro ao editar usuário');
            document.getElementById('modal-editar-usuario').style.display = 'none';
            renderUsuarios();
        } catch (err) {
            alert('Falha ao editar usuário: ' + err.message);
        }
    }
}

window.excluirUsuario = async function(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao excluir usuário: ${response.status} - ${errorText}`);
            }
            
            alert('Usuário excluído com sucesso!');
            renderUsuarios();
        } catch (err) {
            alert('Erro ao excluir usuário: ' + err.message);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderUsuarios();
    // Listeners do modal de edição
    var fecharBtn = document.getElementById('fechar-modal-editar');
    if (fecharBtn) {
        fecharBtn.onclick = function() {
            document.getElementById('modal-editar-usuario').style.display = 'none';
        }
    }
    var formEditar = document.getElementById('formEditarUsuario');
    if (formEditar) {
        formEditar.onsubmit = async function(e) {
            e.preventDefault();
            const id = document.getElementById('editUsuarioId').value;
            const nome = document.getElementById('editUsuarioNome').value;
            const email = document.getElementById('editUsuarioEmail').value;
            const telefone = document.getElementById('editUsuarioTelefone').value;
            const tipoUsuario = document.getElementById('editUsuarioTipo').value;
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, email, telefone, tipoUsuario })
                });
                if (!response.ok) throw new Error('Erro ao editar usuário');
                document.getElementById('modal-editar-usuario').style.display = 'none';
                renderUsuarios();
            } catch (err) {
                alert('Falha ao editar usuário: ' + err.message);
            }
        }
    }
});
