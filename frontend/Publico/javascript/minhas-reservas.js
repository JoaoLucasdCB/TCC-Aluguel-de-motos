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
        tabela += '<thead><tr><th>Moto</th><th>Usuário</th><th>Data de Retirada</th><th>Status</th><th>Ações</th></tr></thead><tbody>';
        reservas.forEach(reserva => {
            tabela += `
                <tr>
                    <td>${reserva.motoNome || reserva.moto_nome || ''}</td>
                    <td>${reserva.usuarioNome || reserva.usuario_nome || ''}</td>
                    <td>${reserva.dataRetirada ? new Date(reserva.dataRetirada).toLocaleDateString('pt-BR') : '-'}</td>
                    <td>${reserva.status || ''}</td>
                    <td>
                        <button class="excluir-reserva-btn" onclick="excluirReserva(${reserva.id})">Excluir</button>
                    </td>
                </tr>
            `;
        });
        tabela += '</tbody></table>';
        return tabela;
    }

buscarReservasUsuario().then(reservas => {
    document.getElementById('reservasTabelaContainer').innerHTML = criarTabelaReservas(reservas);
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
