// editar-usuario.js - Lógica para editar usuário (mock)

document.addEventListener('DOMContentLoaded', function() {
    // Recupera dados do usuário do localStorage (mock)
    const usuario = JSON.parse(localStorage.getItem('usuarioParaEditar'));
    if (usuario) {
        document.getElementById('usuarioId').value = usuario.id;
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('email').value = usuario.email;
        document.getElementById('telefone').value = usuario.telefone;
    }

    document.getElementById('formEditarUsuario').addEventListener('submit', function(e) {
        e.preventDefault();
        // Atualiza dados no localStorage (mock)
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const idx = usuarios.findIndex(u => u.id === usuario.id);
        if (idx !== -1) {
            usuarios[idx] = {
                id: usuario.id,
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value
            };
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
        alert('Usuário atualizado! (Mock)');
        window.location.href = 'usuarios-admin.html';
    });
});
