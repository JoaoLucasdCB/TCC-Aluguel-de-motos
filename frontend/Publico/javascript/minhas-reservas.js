document.addEventListener('DOMContentLoaded', function () {
    async function buscarReservasUsuario() {
        const usuarioId = Number(localStorage.getItem('usuarioId'));
        if (!usuarioId) return [];
        try {
            const resposta = await fetch('http://localhost:8080/reservas');
            if (!resposta.ok) throw new Error('Erro ao buscar reservas');
            const todasReservas = await resposta.json();
            // Filtra no frontend pelo ID do usuário logado
            return todasReservas.filter(r => r.usuarioId === usuarioId);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    function criarTabelaReservas(reservas) {
        if (!reservas.length) {
            return '<div class="sem-reservas">Nenhuma reserva encontrada.</div>';
        }
        let tabela = '<table class="reservas-tabela">';
        tabela += '<thead><tr><th>Moto</th><th>Plano</th><th>Usuário</th><th>Data de Retirada</th><th>Status</th><th>Local de Retirada</th><th>Ações</th></tr></thead><tbody>';
        reservas.forEach((reserva, idx) => {
            const localId = reserva.localRetiradaId || reserva.localRetirada_id || '';
            tabela += `
                <tr>
                    <td>${reserva.motoNome || reserva.moto_nome || ''}</td>
                    <td>${reserva.nomePlano || reserva.planoNome || reserva.plano_nome || '-'}</td>
                    <td>${reserva.usuarioNome || reserva.usuario_nome || ''}</td>
                    <td>${reserva.dataRetirada ? new Date(reserva.dataRetirada).toLocaleDateString('pt-BR') : '-'}</td>
                    <td>${reserva.status || ''}</td>
                    <td><button class="ver-local-btn" data-local-id="${localId}" data-row="${idx}">Ver Local</button></td>
                    <td>
                        <button class="excluir-reserva-btn" onclick="excluirReserva(${reserva.id})">Excluir</button>
                    </td>
                </tr>
                <tr class="detalhes-local-row" id="detalhes-local-row-${idx}" style="display:none;"><td colspan="7"><div class="detalhes-local-content" id="detalhes-local-content-${idx}"></div></td></tr>
            `;
        });
        tabela += '</tbody></table>';
        return tabela;


// Função para adicionar o event listener após a tabela ser renderizada
function ativarBotaoVerLocal() {
    const container = document.getElementById('reservasTabelaContainer');
    if (!container) return;
    container.onclick = async function(e) {
        if (e.target && e.target.classList.contains('ver-local-btn')) {
            console.log('Botão Ver Local clicado!', e.target);
            const btn = e.target;
            const rowIdx = btn.getAttribute('data-row');
            const localId = btn.getAttribute('data-local-id');
            const detalhesRow = document.getElementById(`detalhes-local-row-${rowIdx}`);
            const detalhesContent = document.getElementById(`detalhes-local-content-${rowIdx}`);
            if (!localId || !detalhesRow || !detalhesContent) {
                console.log('IDs não encontrados:', {localId, detalhesRow, detalhesContent});
                return;
            }
            if (detalhesRow.style.display === 'table-row') {
                detalhesRow.style.display = 'none';
                btn.classList.remove('aberto');
                btn.textContent = 'Ver Local';
                return;
            }
            detalhesContent.innerHTML = 'Carregando...';
            detalhesRow.style.display = 'table-row';
            btn.classList.add('aberto');
            btn.textContent = 'Fechar Local';
            try {
                const resp = await fetch(`http://localhost:8080/localizacoes/${localId}`);
                if (!resp.ok) throw new Error('Erro ao buscar localidade');
                const local = await resp.json();
                detalhesContent.innerHTML = `<b>Cidade:</b> ${local.cidade}<br><b>Estado:</b> ${local.estado}<br><b>Endereço:</b> ${local.enderecoCompleto}<br>${local.horarioFuncionamento ? `<b>Horário:</b> ${local.horarioFuncionamento}` : ''}`;
            } catch {
                detalhesContent.innerHTML = '<span style=\"color:#f357a8\">Erro ao carregar localidade.</span>';
            }
        }
    };
}


    }

buscarReservasUsuario().then(reservas => {
    document.getElementById('reservasTabelaContainer').innerHTML = criarTabelaReservas(reservas);
    ativarBotaoVerLocal();
});


window.excluirReserva = async function(id) {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
        try {
            const token = localStorage.getItem('token');
            const resposta = await fetch(`http://localhost:8080/reservas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!resposta.ok) throw new Error('Erro ao excluir reserva');
            // Atualiza a tabela após exclusão
            buscarReservasUsuario().then(reservas => {
                document.getElementById('reservasTabelaContainer').innerHTML = criarTabelaReservas(reservas);
            });
        } catch (err) {
            alert('Erro ao excluir reserva: ' + err.message);
        }
    }
}
});
