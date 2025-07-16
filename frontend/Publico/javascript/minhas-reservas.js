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
        tabela += '<thead><tr><th>Moto</th><th>Plano</th><th>Data Início</th><th>Data Fim</th><th>Status</th></tr></thead><tbody>';
        reservas.forEach(reserva => {
            tabela += `<tr>
                <td>${reserva.motoNome || reserva.moto_nome || ''}</td>
                <td>${reserva.nomePlano || reserva.planoNome || ''}</td>
                <td>${reserva.dataInicio || ''}</td>
                <td>${reserva.data_fim || reserva.dataFim || ''}</td>
                <td>${reserva.status || ''}</td>
            </tr>`;
        });
        tabela += '</tbody></table>';
        return tabela;
    }

    buscarReservasUsuario().then(reservas => {
        document.getElementById('reservasTabelaContainer').innerHTML = criarTabelaReservas(reservas);
    });
});
