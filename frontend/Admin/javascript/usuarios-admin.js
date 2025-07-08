// usuarios-admin.js - Lógica para listar, editar e excluir usuários (mock com localStorage)

// Inicializa mock no localStorage se não existir
if (!localStorage.getItem('usuarios')) {
    const usuariosMock = [
        { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-1111' },
        { id: 2, nome: 'Maria Souza', email: 'maria@email.com', telefone: '(21) 98888-2222' },
        { id: 3, nome: 'Carlos Lima', email: 'carlos@email.com', telefone: '(31) 97777-3333' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuariosMock));
}

function renderUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tbody = document.getElementById('usuariosTableBody');
    tbody.innerHTML = '';
    usuarios.forEach((usuario) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td><span class="nome">${usuario.nome}</span></td>
            <td><span class="email">${usuario.email}</span></td>
            <td><span class="telefone">${usuario.telefone}</span></td>
            <td>
                <button onclick="editarUsuario(${usuario.id})">Editar</button>
                <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.editarUsuario = function(id) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        localStorage.setItem('usuarioParaEditar', JSON.stringify(usuario));
        window.location.href = 'editar-usuario.html';
    }
}

window.excluirUsuario = function(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(u => u.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderUsuarios();
    }
}

document.addEventListener('DOMContentLoaded', renderUsuarios);
