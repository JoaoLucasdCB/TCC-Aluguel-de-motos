// Permite apenas números, ponto e traço no campo CPF (bloqueia letras)
document.getElementById('cpf').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9.\-]/g, '');
});
// Permite apenas letras no campo nome
document.getElementById('nome').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
});
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
    if (senha.length < 4) {
        alert('A senha deve ter no minimo 4 caracteres.');
        document.getElementById('senha').focus();
        return;
    }
    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, cpf })
    })
    .then(async response => {
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        } else {
            try {
                const text = await response.text();
                alert(text || 'Erro ao cadastrar.');
            } catch {
                alert('Erro ao cadastrar.');
            }
        }
    })
    .catch(error => {
        alert('Erro de conexão com o servidor.');
        console.error(error);
    });
});
