// Ajusta a altura do divisor central para acompanhar o conteúdo da direita
function ajustarAlturaDivisor() {
    const rightSection = document.querySelector('.right');
    const divider = document.getElementById('divider-dynamic');
    if (rightSection && divider) {
        // Pega a altura da seção da direita (formulário)
        const rightHeight = rightSection.offsetHeight;
        // Pega a altura da seção da esquerda para garantir que o divisor cubra tudo
        const leftSection = document.querySelector('.left');
        const leftHeight = leftSection ? leftSection.offsetHeight : 0;
        // Usa a maior altura entre as duas seções
        const maxHeight = Math.max(rightHeight, leftHeight);
        divider.style.height = maxHeight + 'px';
    }
}

window.addEventListener('DOMContentLoaded', ajustarAlturaDivisor);
window.addEventListener('resize', ajustarAlturaDivisor);
window.addEventListener('scroll', ajustarAlturaDivisor);
// JS básico para o formulário de cadastro

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;
    // Campos extras esperados pelo backend
    const telefone = document.getElementById('telefone').value;
    const cnhNumero = document.getElementById('cnhNumero').value;
    const cnhValidade = document.getElementById('cnhValidade').value;
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const status = document.getElementById('status').value;
    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, cpf, telefone, cnhNumero, cnhValidade, tipoUsuario, status })
    })
    .then(response => {
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert('Erro ao cadastrar.');
        }
    })
    .catch(error => {
        alert('Erro de conexão com o servidor.');
        console.error(error);
    });
});
