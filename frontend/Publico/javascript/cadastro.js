// Máscara e validação de CPF: formato 000.000.000-00
document.getElementById('cpf').addEventListener('input', function(e) {
    let val = this.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 9) val = val.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    else if (val.length > 6) val = val.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (val.length > 3) val = val.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    this.value = val;
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

// Verificação de força da senha
document.getElementById('senha').addEventListener('input', function() {
    const senha = this.value;
    const strengthDiv = document.getElementById('senha-strength');
    let strength = 0;
    if (senha.length >= 8) strength++;
    if (/[A-Z]/.test(senha)) strength++;
    if (/[a-z]/.test(senha)) strength++;
    if (/[0-9]/.test(senha)) strength++;
    if (/[^A-Za-z0-9]/.test(senha)) strength++;
    let msg = '';
    let color = '';
    if (senha.length === 0) {
        msg = '';
    } else if (strength <= 2) {
        msg = 'Senha fraca';
        color = '#e74c3c';
    } else if (strength === 3 || strength === 4) {
        msg = 'Senha média';
        color = '#f1c40f';
    } else if (strength === 5) {
        msg = 'Senha forte';
        color = '#27ae60';
    }
    strengthDiv.textContent = msg;
    strengthDiv.style.color = color;
});

document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;
    if (senha.length < 4) {
    showMsg('A senha deve ter no minimo 4 caracteres.', 'error');
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
            showMsg('Cadastro realizado com sucesso!', 'success');
            window.location.href = 'login.html';
        } else {
            try {
                const text = await response.text();
                showMsg(text || 'Erro ao cadastrar.', 'error');
            } catch {
                showMsg('Erro ao cadastrar.', 'error');
            }
        }
    })
    .catch(error => {
    showMsg('Erro de conexão com o servidor.', 'error');
        console.error(error);
    });
});
