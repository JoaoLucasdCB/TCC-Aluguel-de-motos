// cadastrar-plano.js - Lógica da tela de cadastro de plano do admin

document.getElementById('formCadastroPlano').addEventListener('submit', async function(e) {
    e.preventDefault();
    const beneficio1 = document.getElementById('beneficio1').value.trim();
    const beneficio2 = document.getElementById('beneficio2').value.trim();
    const beneficio3 = document.getElementById('beneficio3').value.trim();
    const beneficio4 = document.getElementById('beneficio4').value.trim();
    const beneficios = [beneficio1, beneficio2, beneficio3, beneficio4].filter(b => b).join(', ');
    const plano = {
        nomePlano: document.getElementById('nomePlano').value,
        duracao: parseInt(document.getElementById('duracao').value),
        beneficios: beneficios
    };
    if (!plano.nomePlano || !plano.duracao || !beneficio1 || !beneficio2 || !beneficio3 || !beneficio4) {
    showMsg('Preencha todos os campos obrigatórios!', 'error');
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
    showMsg('Plano cadastrado com sucesso!', 'success');
        this.reset();
    } catch (err) {
    showMsg('Erro ao cadastrar plano: ' + err.message, 'error');
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
            const beneficiosArr = (plano.beneficios || '').split(',');
            document.getElementById('beneficio1').value = beneficiosArr[0] ? beneficiosArr[0].trim() : '';
            document.getElementById('beneficio2').value = beneficiosArr[1] ? beneficiosArr[1].trim() : '';
            document.getElementById('beneficio3').value = beneficiosArr[2] ? beneficiosArr[2].trim() : '';
            document.getElementById('beneficio4').value = beneficiosArr[3] ? beneficiosArr[3].trim() : '';
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
            const beneficiosArr = (plano.beneficios || '').split(',');
            document.getElementById('beneficio1').value = beneficiosArr[0] ? beneficiosArr[0].trim() : '';
            document.getElementById('beneficio2').value = beneficiosArr[1] ? beneficiosArr[1].trim() : '';
            document.getElementById('beneficio3').value = beneficiosArr[2] ? beneficiosArr[2].trim() : '';
            document.getElementById('beneficio4').value = beneficiosArr[3] ? beneficiosArr[3].trim() : '';
            idPlanoEditando = plano.id;
            cadastrarPlanoBtn.style.display = 'none';
            editarPlanoBtn.style.display = 'none';
            confirmarAlteracaoPlanoBtn.style.display = '';
            excluirPlanoBtn.style.display = '';
        }
    } catch (err) {
    showMsg('Erro ao buscar plano: ' + err.message, 'error');
    }
});

// Ao clicar em confirmar alteração, faz o PUT
confirmarAlteracaoPlanoBtn.addEventListener('click', async function() {
    if (!idPlanoEditando) return;
    const beneficio1 = document.getElementById('beneficio1').value.trim();
    const beneficio2 = document.getElementById('beneficio2').value.trim();
    const beneficio3 = document.getElementById('beneficio3').value.trim();
    const beneficio4 = document.getElementById('beneficio4').value.trim();
    const beneficios = [beneficio1, beneficio2, beneficio3, beneficio4].filter(b => b).join(', ');
    const planoEditado = {
        nomePlano: document.getElementById('nomePlano').value,
        duracao: parseInt(document.getElementById('duracao').value),
        beneficios: beneficios
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
    showMsg('Plano editado com sucesso!', 'success');
        resetarParaCadastroPlano();
    } catch (err) {
    showMsg('Erro ao editar plano: ' + err.message, 'error');
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
    showMsg('Plano excluído com sucesso!', 'success');
        resetarParaCadastroPlano();
    } catch (err) {
    showMsg('Erro ao excluir plano: ' + err.message, 'error');
    }
});
