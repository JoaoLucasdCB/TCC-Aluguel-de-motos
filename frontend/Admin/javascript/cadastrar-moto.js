// Protege a página: só acessa se estiver logado
if (!localStorage.getItem('token')) {
    window.location.href = '../../Publico/html/login.html';
}
// cadastrar-moto.js - Lógica da tela de cadastro de moto do admin
document.getElementById('formCadastroMoto').addEventListener('submit', async function(e) {
    e.preventDefault();
    const moto = {
        nome: document.getElementById('nome').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        cilindrada: document.getElementById('cilindrada').value,
        placa: document.getElementById('placa').value,
        status: document.getElementById('status').value.toUpperCase(),
        ano: parseInt(document.getElementById('ano').value),
        quilometragem: document.getElementById('quilometragem').value ? parseInt(document.getElementById('quilometragem').value) : null,
        imagem: document.getElementById('imagem').value
    };
    // Validação básica
    if (!moto.nome || !moto.marca || !moto.modelo || !moto.cilindrada || !moto.placa || !moto.status || !moto.ano) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    console.log('Enviando JSON para cadastro:', JSON.stringify(moto));
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/motos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(moto)
        });
        if (!response.ok) throw new Error('Erro ao cadastrar moto');
        alert('Moto cadastrada com sucesso!');
        this.reset();
    } catch (err) {
        alert('Erro ao cadastrar moto: ' + err.message);
    }
});
// --- CONTROLE DE BOTOES E EDIÇÃO ---
const cadastrarBtn = document.getElementById('cadastrarMotoBtn');
const editarBtn = document.getElementById('editarMotoBtn');
const confirmarAlteracaoBtn = document.getElementById('confirmarAlteracaoBtn');
let idMotoEditando = null;

// Função para resetar o formulário para modo cadastro
function resetarParaCadastro() {
    cadastrarBtn.style.display = '';
    editarBtn.style.display = '';
    confirmarAlteracaoBtn.style.display = 'none';
    idMotoEditando = null;
    document.getElementById('formCadastroMoto').reset();
    document.getElementById('formCadastroMoto').onsubmit = null;
}

// --- MODAL DE PLACA ---
const modalPlaca = document.getElementById('modalPlaca');
const inputPlacaModal = document.getElementById('inputPlacaModal');
const btnBuscarPlaca = document.getElementById('btnBuscarPlaca');
const btnFecharModalPlaca = document.getElementById('btnFecharModalPlaca');

editarBtn.addEventListener('click', function() {
    inputPlacaModal.value = '';
    modalPlaca.style.display = 'flex';
    inputPlacaModal.focus();
});

btnFecharModalPlaca.addEventListener('click', function() {
    modalPlaca.style.display = 'none';
});

btnBuscarPlaca.addEventListener('click', async function() {
    const placa = inputPlacaModal.value.trim();
    if (!placa) {
        inputPlacaModal.focus();
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/motos/placa/${placa}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) throw new Error('Moto não encontrada com essa placa');
        const moto = await response.json();
        document.getElementById('nome').value = moto.nome || '';
        document.getElementById('marca').value = moto.marca || '';
        document.getElementById('modelo').value = moto.modelo || '';
        document.getElementById('cilindrada').value = moto.cilindrada || '';
        document.getElementById('placa').value = moto.placa || '';
        document.getElementById('status').value = moto.status || '';
        document.getElementById('ano').value = moto.ano || '';
        document.getElementById('quilometragem').value = moto.quilometragem || '';
        document.getElementById('imagem').value = moto.imagem || '';
        idMotoEditando = moto.id;
        cadastrarBtn.style.display = 'none';
        editarBtn.style.display = 'none';
        confirmarAlteracaoBtn.style.display = '';
        modalPlaca.style.display = 'none';
    } catch (err) {
        alert('Erro ao buscar moto: ' + err.message);
        inputPlacaModal.focus();
    }
});

// Ao clicar em confirmar alteração, faz o PUT
confirmarAlteracaoBtn.addEventListener('click', async function() {
    if (!idMotoEditando) return;
    const motoEditada = {
        nome: document.getElementById('nome').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        cilindrada: document.getElementById('cilindrada').value,
        placa: document.getElementById('placa').value,
        status: document.getElementById('status').value.toUpperCase().replace(/\s/g, ''),
        ano: parseInt(document.getElementById('ano').value),
        quilometragem: document.getElementById('quilometragem').value ? parseInt(document.getElementById('quilometragem').value) : null,
        imagem: document.getElementById('imagem').value
    };
    console.log('Enviando JSON para edição:', JSON.stringify(motoEditada));
    try {
        const token = localStorage.getItem('token');
        const putResponse = await fetch(`http://localhost:8080/api/motos/${idMotoEditando}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(motoEditada)
        });
        if (!putResponse.ok) throw new Error('Erro ao editar moto');
        alert('Moto editada com sucesso!');
        resetarParaCadastro();
    } catch (err) {
        alert('Erro ao editar moto: ' + err.message);
    }
});

// Opcional: ao cadastrar, reseta para modo cadastro
cadastrarBtn.addEventListener('click', function() {
    resetarParaCadastro();
});
