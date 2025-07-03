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
        <b>Moto:</b> ${aluguel.moto.nome} (${aluguel.moto.placa})<br>
        <b>Plano:</b> ${aluguel.plano.nome} - ${aluguel.plano.descricao}<br>
        <b>Início:</b> ${new Date(aluguel.inicio).toLocaleString('pt-BR')}<br>
        <b>Fim:</b> ${new Date(aluguel.fim).toLocaleString('pt-BR')}<br>
        <b>Valor Total:</b> ${aluguel.valorTotal}
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
        window.location.href = 'aluguel-relatorio.html';
    });
});
