// Protege a página: só acessa se estiver logado
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    // Loga o valor do campo nome sempre que for digitado
    const nomeInput = document.getElementById('nome');
    if (nomeInput) {
        nomeInput.addEventListener('input', function() {
            console.log('[DEBUG] Nome digitado:', this.value);
        });
    }
    if (!localStorage.getItem('token') || localStorage.getItem('tipoUsuario')?.toLowerCase() !== 'admin') {
        window.location.href = '/frontend/Publico/html/login.html';
        return;
    }

    // cadastrar-moto.js - Lógica da tela de cadastro de moto do admin
    document.getElementById('formCadastroMoto').addEventListener('submit', async function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim();
        console.log('[DEBUG] Valor do nome no SUBMIT:', nome);
    console.log('[DEBUG] Valor do campo nome:', nome);
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const cilindrada = document.getElementById('cilindrada').value.trim();
    const placa = document.getElementById('placa').value.trim();
    const status = document.getElementById('status').value.trim().toUpperCase();
    const anoStr = document.getElementById('ano').value;
    const quilometragemStr = document.getElementById('quilometragem').value;
    const imagem = document.getElementById('imagem').value.trim();
    // Atualiza preview ao submeter
    if (previewImagem && imagem) {
        previewImagem.src = imagem;
        previewImagem.style.display = 'block';
    }

    // Validação detalhada
    if (!nome) {
    showMsg('Preencha o campo Nome!', 'error');
        return;
    }
    if (!marca) {
    showMsg('Preencha o campo Marca!', 'error');
        return;
    }
    if (!modelo) {
    showMsg('Preencha o campo Modelo!', 'error');
        return;
    }
    if (!cilindrada) {
    showMsg('Preencha o campo Cilindrada!', 'error');
        return;
    }
    if (!placa) {
    showMsg('Preencha o campo Placa!', 'error');
        return;
    }
    if (!status) {
    showMsg('Selecione um Status!', 'error');
        return;
    }
    if (anoStr === '') {
    showMsg('Preencha o campo Ano de Fabricação!', 'error');
        return;
    }
    const ano = parseInt(anoStr);
    if (isNaN(ano) || ano < 1900 || ano > 2100) {
    showMsg('Ano de Fabricação deve ser um número entre 1900 e 2100!', 'error');
        return;
    }
    const quilometragem = quilometragemStr !== '' ? parseInt(quilometragemStr) : null;

    const moto = {
        nome,
        marca,
        modelo,
        cilindrada,
        placa,
        status,
        ano,
        quilometragem,
        imagem
    };
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
    showMsg('Moto cadastrada com sucesso!', 'success');
        this.reset();
    } catch (err) {
    showMsg('Erro ao cadastrar moto: ' + err.message, 'error');
    }
});
// --- CONTROLE DE BOTOES E EDIÇÃO ---
const cadastrarBtn = document.getElementById('cadastrarMotoBtn');
const editarBtn = document.getElementById('editarMotoBtn');
const confirmarAlteracaoBtn = document.getElementById('confirmarAlteracaoBtn');
const excluirMotoBtn = document.getElementById('excluirMotoBtn');
let idMotoEditando = null;

// Função para resetar o formulário para modo cadastro
function resetarParaCadastro() {
    cadastrarBtn.style.display = '';
    editarBtn.style.display = '';
    confirmarAlteracaoBtn.style.display = 'none';
    excluirMotoBtn.style.display = 'none';
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
        if (previewImagem) {
            if (moto.imagem) {
                previewImagem.src = moto.imagem;
                previewImagem.style.display = 'block';
            } else {
                previewImagem.src = '';
                previewImagem.style.display = 'none';
            }
        }
        idMotoEditando = moto.id;
        cadastrarBtn.style.display = 'none';
        editarBtn.style.display = 'none';
        confirmarAlteracaoBtn.style.display = '';
        excluirMotoBtn.style.display = '';
        modalPlaca.style.display = 'none';
    } catch (err) {
    showMsg('Erro ao buscar moto: ' + err.message, 'error');
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
    showMsg('Moto editada com sucesso!', 'success');
        resetarParaCadastro();
    } catch (err) {
    showMsg('Erro ao editar moto: ' + err.message, 'error');
    }
});

// Ao clicar em excluir, faz o DELETE
excluirMotoBtn.addEventListener('click', async function() {
    if (!idMotoEditando) return;
    if (!confirm('Tem certeza que deseja excluir esta moto? Esta ação não pode ser desfeita.')) return;
    try {
        const token = localStorage.getItem('token');
        const deleteResponse = await fetch(`http://localhost:8080/api/motos/${idMotoEditando}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!deleteResponse.ok) throw new Error('Erro ao excluir moto');
    showMsg('Moto excluída com sucesso!', 'success');
        resetarParaCadastro();
    } catch (err) {
    showMsg('Erro ao excluir moto: ' + err.message, 'error');
    }
});

// Removido: não limpar o formulário ao clicar em cadastrar, só após sucesso

}); // Fim do DOMContentLoaded

// --- NOVA LÓGICA DE MODAIS E TABELA DE MOTOS ---
document.addEventListener('DOMContentLoaded', function() {
    const abrirCadastroBtn = document.getElementById('abrirCadastroMotoBtn');
    const modalCadastro = document.getElementById('modal-cadastro-moto');
    const fecharModalCadastro = document.getElementById('fechar-modal-cadastro-moto');
    const formCadastro = document.getElementById('formCadastroMoto');
    const motosDiv = document.getElementById('motosCadastradas');

    const modalEditar = document.getElementById('modal-editar-moto');
    const fecharModalEditar = document.getElementById('fechar-modal-editar-moto');
    const fecharModalEditar2 = document.getElementById('fechar-modal-editar-moto-2');
    const formEditar = document.getElementById('form-editar-moto');

    // Abrir modal de cadastro
    abrirCadastroBtn.onclick = function() {
        modalCadastro.style.display = 'flex';
    };
    fecharModalCadastro.onclick = function() {
        modalCadastro.style.display = 'none';
        formCadastro.reset();
        document.getElementById('previewImagem').style.display = 'none';
    };

    // Abrir/fechar modal de edição
    fecharModalEditar.onclick = fecharModalEditar2.onclick = function() {
        modalEditar.style.display = 'none';
        formEditar.reset();
    };

    // Listar motos cadastradas
    function carregarMotos() {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/motos', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.json())
        .then(motos => {
            if (!motos || motos.length === 0) {
                motosDiv.innerHTML = '<p>Nenhuma moto cadastrada.</p>';
                return;
            }
            let html = '<table style="width:100%;border-collapse:collapse;margin-top:16px;">';
            html += '<tr style="background:#4caf50;color:#fff;"><th>Nome</th><th>Marca</th><th>Modelo</th><th>Placa</th><th>Status</th><th>Ano</th><th>Quilometragem</th><th>Ações</th></tr>';
            motos.forEach(m => {
                html += `<tr style="border-bottom:1px solid #eee;">
                    <td>${m.nome || '-'}</td>
                    <td>${m.marca || '-'}</td>
                    <td>${m.modelo || '-'}</td>
                    <td>${m.placa || '-'}</td>
                    <td>${m.status || '-'}</td>
                    <td>${m.ano || '-'}</td>
                    <td>${m.quilometragem || '-'}</td>
                    <td>
                      <button class="editar-moto-btn" data-id="${m.id}" style="background:#2196f3;color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;margin-right:8px;">Editar</button>
                      <button class="excluir-moto-btn" data-id="${m.id}" style="background:#d9534f;color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;">Excluir</button>
                    </td>
                </tr>`;
            });
            html += '</table>';
            motosDiv.innerHTML = html;
        });
    }
    carregarMotos();

    // Cadastro de moto
    formCadastro.onsubmit = async function(e) {
        e.preventDefault();
        const moto = {
            nome: document.getElementById('nome').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            cilindrada: document.getElementById('cilindrada').value,
            placa: document.getElementById('placa').value,
            status: document.getElementById('status').value,
            ano: parseInt(document.getElementById('ano').value),
            quilometragem: document.getElementById('quilometragem').value ? parseInt(document.getElementById('quilometragem').value) : null,
            imagem: document.getElementById('imagem').value
        };
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/motos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(moto)
        });
        if (!res.ok) return showMsg('Erro ao cadastrar moto', 'error');
        showMsg('Moto cadastrada com sucesso!', 'success');
        modalCadastro.style.display = 'none';
        formCadastro.reset();
        document.getElementById('previewImagem').style.display = 'none';
        carregarMotos();
    };

    // ...existing code...

    // Editar moto
    motosDiv.addEventListener('click', async function(e) {
        if (e.target.classList.contains('editar-moto-btn')) {
            const id = e.target.getAttribute('data-id');
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/motos/${id}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (!res.ok) return showMsg('Erro ao buscar moto para edição', 'error');
            const moto = await res.json();
            document.getElementById('editar-moto-id').value = moto.id;
            document.getElementById('editar-moto-nome').value = moto.nome || '';
            document.getElementById('editar-moto-marca').value = moto.marca || '';
            document.getElementById('editar-moto-modelo').value = moto.modelo || '';
            document.getElementById('editar-moto-cilindrada').value = moto.cilindrada || '';
            document.getElementById('editar-moto-placa').value = moto.placa || '';
            document.getElementById('editar-moto-status').value = moto.status || '';
            document.getElementById('editar-moto-ano').value = moto.ano || '';
            document.getElementById('editar-moto-quilometragem').value = moto.quilometragem || '';
            document.getElementById('editar-moto-imagem').value = moto.imagem || '';
            modalEditar.style.display = 'flex';
        }
        // Excluir moto
        if (e.target.classList.contains('excluir-moto-btn')) {
            const id = e.target.getAttribute('data-id');
            if (!confirm('Tem certeza que deseja excluir esta moto?')) return;
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/motos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (!res.ok) return showMsg('Erro ao excluir moto', 'error');
            showMsg('Moto excluída com sucesso!', 'success');
            carregarMotos();
        }
    });

    // Salvar edição
    formEditar.onsubmit = async function(e) {
        e.preventDefault();
        const id = document.getElementById('editar-moto-id').value;
        const motoEditada = {
            nome: document.getElementById('editar-moto-nome').value,
            marca: document.getElementById('editar-moto-marca').value,
            modelo: document.getElementById('editar-moto-modelo').value,
            cilindrada: document.getElementById('editar-moto-cilindrada').value,
            placa: document.getElementById('editar-moto-placa').value,
            status: document.getElementById('editar-moto-status').value,
            ano: parseInt(document.getElementById('editar-moto-ano').value),
            quilometragem: document.getElementById('editar-moto-quilometragem').value ? parseInt(document.getElementById('editar-moto-quilometragem').value) : null,
            imagem: document.getElementById('editar-moto-imagem').value
        };
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/api/motos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(motoEditada)
        });
        if (!res.ok) return showMsg('Erro ao editar moto', 'error');
        showMsg('Moto editada com sucesso!', 'success');
    modalEditar.style.display = 'none';
    formEditar.reset();
    carregarMotos();
    };

    // ...existing code...
});
