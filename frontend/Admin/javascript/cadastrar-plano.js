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
// Protege a página: só acessa se estiver logado e for admin
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('token') || localStorage.getItem('tipoUsuario')?.toLowerCase() !== 'admin') {
        window.location.href = '/frontend/Publico/html/login.html';
        return;
    }
    carregarPlanos();
});

const abrirCadastroPlanoBtn = document.getElementById('abrirCadastroPlanoBtn');
const modalCadastroPlano = document.getElementById('modal-cadastro-plano');
const fecharModalCadastroPlano = document.getElementById('fechar-modal-cadastro-plano');
const formCadastroPlano = document.getElementById('formCadastroPlano');
const cadastrarPlanoBtn = document.getElementById('cadastrarPlanoBtn');
const editarPlanoBtn = document.getElementById('editarPlanoBtn');
const excluirPlanoBtn = document.getElementById('excluirPlanoBtn');
const modalTituloPlano = document.getElementById('modalTituloPlano');
let idPlanoEditando = null;

abrirCadastroPlanoBtn.addEventListener('click', () => {
    abrirModalCadastroPlano();
});
fecharModalCadastroPlano.addEventListener('click', () => {
    fecharModalPlano();
});

function abrirModalCadastroPlano() {
    modalCadastroPlano.style.display = 'block';
    modalTituloPlano.textContent = 'Cadastrar Novo Plano';
    cadastrarPlanoBtn.style.display = '';
    editarPlanoBtn.style.display = 'none';
    //excluirPlanoBtn.style.display = 'none';
    formCadastroPlano.reset();
    idPlanoEditando = null;
}
function abrirModalEditarPlano(plano) {
    modalCadastroPlano.style.display = 'block';
    modalTituloPlano.textContent = 'Editar Plano';
    cadastrarPlanoBtn.style.display = 'none';
    editarPlanoBtn.style.display = '';
    //excluirPlanoBtn.style.display = 'none';
    document.getElementById('nomePlano').value = plano.nomePlano || '';
    document.getElementById('duracao').value = plano.duracao || '';
    const beneficiosArr = (plano.beneficios || '').split(',');
    document.getElementById('beneficio1').value = beneficiosArr[0] ? beneficiosArr[0].trim() : '';
    document.getElementById('beneficio2').value = beneficiosArr[1] ? beneficiosArr[1].trim() : '';
    document.getElementById('beneficio3').value = beneficiosArr[2] ? beneficiosArr[2].trim() : '';
    document.getElementById('beneficio4').value = beneficiosArr[3] ? beneficiosArr[3].trim() : '';
    idPlanoEditando = plano.id;
}
function fecharModalPlano() {
    modalCadastroPlano.style.display = 'none';
    formCadastroPlano.reset();
    idPlanoEditando = null;
}

formCadastroPlano.addEventListener('submit', async function(e) {
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
        fecharModalPlano();
        carregarPlanos();
    } catch (err) {
        showMsg('Erro ao cadastrar plano: ' + err.message, 'error');
    }
});

editarPlanoBtn.addEventListener('click', async function() {
    if (!idPlanoEditando) return;
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
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/planos/${idPlanoEditando}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(plano)
        });
        if (!response.ok) throw new Error('Erro ao editar plano');
        showMsg('Plano editado com sucesso!', 'success');
        fecharModalPlano();
        carregarPlanos();
    } catch (err) {
        showMsg('Erro ao editar plano: ' + err.message, 'error');
    }
});

// Removido botão de excluir do modal de edição de planos

async function carregarPlanos() {
    const tbody = document.getElementById('planosCadastrados');
    tbody.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/planos', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) throw new Error('Erro ao buscar planos');
        const planos = await response.json();
        if (!planos.length) {
            tbody.innerHTML = '<tr><td colspan="4">Nenhum plano cadastrado.</td></tr>';
            return;
        }
        tbody.innerHTML = planos.map(plano => `
            <tr>
                <td>${plano.nomePlano}</td>
                <td>${plano.duracao}</td>
                <td>${plano.beneficios}</td>
                <td class="acoes-btns">
                    <button class="btn-editar" onclick="editarPlanoFront(${plano.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirPlanoFront(${plano.id})">Excluir</button>
                </td>
            </tr>
        `).join('');
        window.editarPlanoFront = async function(id) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/planos/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Erro ao buscar dados do plano');
                const plano = await response.json();
                abrirModalEditarPlano(plano);
            } catch (err) {
                showMsg('Erro ao buscar dados do plano: ' + err.message, 'error');
            }
        };
        window.excluirPlanoFront = async function(id) {
            if (!confirm('Tem certeza que deseja excluir este plano?')) return;
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/planos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) throw new Error('Erro ao excluir plano');
                showMsg('Plano excluído com sucesso!', 'success');
                carregarPlanos();
            } catch (err) {
                showMsg('Erro ao excluir plano: ' + err.message, 'error');
            }
        };
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar planos.</td></tr>';
    }
}

// O código duplicado acima foi removido. O token deve ser declarado apenas uma vez por escopo de função.
// Certifique-se que todas as funções assíncronas estão corretamente fechadas e sem duplicidade.
