// aluguel-relatorio.js - Mostra o relatório final do aluguel

document.addEventListener('DOMContentLoaded', function() {
    const aluguelCompleto = JSON.parse(sessionStorage.getItem('aluguelCompleto'));
    const relatorioDados = document.getElementById('relatorioDados');

    if (!aluguelCompleto) {
        relatorioDados.innerHTML = '<span style="color:#f357a8">Nenhum relatório disponível.</span>';
        return;
    }

    relatorioDados.innerHTML = `
        <b>Moto:</b> ${aluguelCompleto.moto.nome} (${aluguelCompleto.moto.placa})<br>
        <b>Plano:</b> ${aluguelCompleto.plano.nome} - ${aluguelCompleto.plano.descricao}<br>
        <b>Início:</b> ${new Date(aluguelCompleto.inicio).toLocaleString('pt-BR')}<br>
        <b>Fim:</b> ${new Date(aluguelCompleto.fim).toLocaleString('pt-BR')}<br>
        <b>Valor Total:</b> ${aluguelCompleto.valorTotal}<br>
        <b>CNH:</b> ${aluguelCompleto.cnh}<br>
        <b>Identidade:</b> ${aluguelCompleto.identidade}<br>
        <b>Telefone:</b> ${aluguelCompleto.telefone}
    `;
});
