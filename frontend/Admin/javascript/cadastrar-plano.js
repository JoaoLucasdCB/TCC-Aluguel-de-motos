// cadastrar-plano.js - Lógica da tela de cadastro de plano do admin

document.getElementById('formCadastroPlano').addEventListener('submit', async function(e) {
    e.preventDefault();
    const plano = {
        nomePlano: document.getElementById('nomePlano').value,
        duracao: parseInt(document.getElementById('duracao').value),
        beneficios: document.getElementById('beneficios').value
    };
    if (!plano.nomePlano || !plano.duracao || !plano.beneficios) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/planos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(plano)
        });
        if (!response.ok) throw new Error('Erro ao cadastrar plano');
        alert('Plano cadastrado com sucesso!');
        this.reset();
    } catch (err) {
        alert('Erro ao cadastrar plano: ' + err.message);
    }
});

const cadastrarPlanoBtn = document.getElementById('cadastrarPlanoBtn');
const editarPlanoBtn = document.getElementById('editarPlanoBtn');
const confirmarAlteracaoPlanoBtn = document.getElementById('confirmarAlteracaoPlanoBtn');
const excluirPlanoBtn = document.getElementById('excluirPlanoBtn');
let idPlanoEditando = null;

// Função para resetar o formulário para modo cadastro
function resetarParaCadastroPlano() {
    cadastrarPlanoBtn.style.display = '';
    editarPlanoBtn.style.display = '';
    confirmarAlteracaoPlanoBtn.style.display = 'none';
    excluirPlanoBtn.style.display = 'none';
    idPlanoEditando = null;
    document.getElementById('formCadastroPlano').reset();
}

// Ao clicar em editar, pede o nome do plano para buscar
editarPlanoBtn.addEventListener('click', async function() {
    const nomePlano = prompt('Digite o nome do plano que deseja editar:');
    if (!nomePlano) return;
    try {
        const token = localStorage.getItem('token');
        // Tenta buscar pelo endpoint direto
        let response = await fetch(`http://localhost:8080/planos/nome/${encodeURIComponent(nomePlano)}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.status === 403 || response.status === 404) {
            // Se não existir, busca todos e filtra no frontend
            response = await fetch('http://localhost:8080/planos', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!response.ok) throw new Error('Erro ao buscar planos');
            const planos = await response.json();
            const plano = planos.find(p => p.nomePlano && p.nomePlano.toLowerCase() === nomePlano.toLowerCase());
            if (!plano) throw new Error('Plano não encontrado');
            document.getElementById('nomePlano').value = plano.nomePlano || '';
            document.getElementById('duracao').value = plano.duracao || '';
            document.getElementById('beneficios').value = plano.beneficios || '';
            idPlanoEditando = plano.id;
            cadastrarPlanoBtn.style.display = 'none';
            editarPlanoBtn.style.display = 'none';
            confirmarAlteracaoPlanoBtn.style.display = '';
            excluirPlanoBtn.style.display = '';
        } else if (!response.ok) {
            throw new Error('Plano não encontrado');
        } else {
            const plano = await response.json();
            document.getElementById('nomePlano').value = plano.nomePlano || '';
            document.getElementById('duracao').value = plano.duracao || '';
            document.getElementById('beneficios').value = plano.beneficios || '';
            idPlanoEditando = plano.id;
            cadastrarPlanoBtn.style.display = 'none';
            editarPlanoBtn.style.display = 'none';
            confirmarAlteracaoPlanoBtn.style.display = '';
            excluirPlanoBtn.style.display = '';
        }
    } catch (err) {
        alert('Erro ao buscar plano: ' + err.message);
    }
});

// Ao clicar em confirmar alteração, faz o PUT
confirmarAlteracaoPlanoBtn.addEventListener('click', async function() {
    if (!idPlanoEditando) return;
    const planoEditado = {
        nomePlano: document.getElementById('nomePlano').value,
        duracao: parseInt(document.getElementById('duracao').value),
        beneficios: document.getElementById('beneficios').value
    };
    try {
        const token = localStorage.getItem('token');
        const putResponse = await fetch(`http://localhost:8080/planos/${idPlanoEditando}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(planoEditado)
        });
        if (!putResponse.ok) throw new Error('Erro ao editar plano');
        alert('Plano editado com sucesso!');
        resetarParaCadastroPlano();
    } catch (err) {
        alert('Erro ao editar plano: ' + err.message);
    }
});

// Ao clicar em excluir, faz o DELETE
excluirPlanoBtn.addEventListener('click', async function() {
    if (!idPlanoEditando) return;
    if (!confirm('Tem certeza que deseja excluir este plano? Esta ação não pode ser desfeita.')) return;
    try {
        const token = localStorage.getItem('token');
        const deleteResponse = await fetch(`http://localhost:8080/planos/${idPlanoEditando}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!deleteResponse.ok) throw new Error('Erro ao excluir plano');
        alert('Plano excluído com sucesso!');
        resetarParaCadastroPlano();
    } catch (err) {
        alert('Erro ao excluir plano: ' + err.message);
    }
});
