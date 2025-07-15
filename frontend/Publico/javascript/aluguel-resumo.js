// aluguel-resumo.js - Lógica para página de resumo do aluguel

document.addEventListener('DOMContentLoaded', function() {
    // Recupera dados do aluguel do sessionStorage
    const aluguel = JSON.parse(sessionStorage.getItem('aluguel'));
    const resumoDados = document.getElementById('resumoDados');

    if (!aluguel) {
        resumoDados.innerHTML = '<span style="color:#f357a8">Nenhum aluguel selecionado.</span>';
        document.getElementById('dadosExtrasForm').style.display = 'none';
        return;
    }


    resumoDados.innerHTML = `
        <b>Moto:</b> ${aluguel.motoNome || '-'} (${aluguel.motoPlaca || '-'})<br>
        <b>Marca:</b> ${aluguel.motoMarca || '-'}<br>
        <b>Modelo:</b> ${aluguel.motoModelo || '-'}<br>
        <b>Cilindrada:</b> ${aluguel.motoCilindrada || '-'}<br>
        <b>Plano:</b> ${aluguel.nomePlano || '-'}<br>
        <b>Duração:</b> ${aluguel.planoDuracao || '-'} dias<br>
        <b>Benefícios:</b> ${aluguel.planoBeneficios || '-'}<br>
        <b>Usuário:</b> ${aluguel.usuarioNome || '-'}<br>
        <b>Início:</b> ${aluguel.dataInicio ? new Date(aluguel.dataInicio).toLocaleString('pt-BR') : '-'}<br>
        <b>Fim:</b> ${(() => {
            const campos = [aluguel.data_fim, aluguel.dataFim, aluguel.fim, aluguel.dataFimReserva];
            for (const campo of campos) {
                if (campo) {
                    // Se vier como objeto Date ou string ISO
                    const dt = new Date(campo);
                    if (!isNaN(dt.getTime())) {
                        return dt.toLocaleString('pt-BR');
                    } else if (typeof campo === 'string' && /^\d{4}-\d{2}-\d{2}/.test(campo)) {
                        return campo.split('T')[0].split('-').reverse().join('/');
                    } else {
                        return campo;
                    }
                }
            }
            return '-';
        })()}<br>
    `;
    document.getElementById('dadosExtrasForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Coleta dados extras
        const cnh = document.getElementById('cnh').value;
        const identidade = document.getElementById('identidade').value;
        const telefone = document.getElementById('telefone').value;
        // Salva tudo para próxima página (relatório)
        const aluguelCompleto = {
            ...aluguel,
            cnh,
            identidade,
            telefone
        };
        sessionStorage.setItem('aluguelCompleto', JSON.stringify(aluguelCompleto));
        window.location.href = 'landing.html';
    });
});
