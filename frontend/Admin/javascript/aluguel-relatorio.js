// aluguel-relatorio.js - Mostra o relatório final do aluguel

document.addEventListener('DOMContentLoaded', function() {
    const aluguel = JSON.parse(sessionStorage.getItem('aluguel'));
    const relatorioDados = document.getElementById('relatorioDados');

    if (!aluguel) {
        relatorioDados.innerHTML = '<span style="color:#f357a8">Nenhum relatório disponível.</span>';
        return;
    }

    relatorioDados.innerHTML = `
        <b>Moto:</b> ${aluguel.motoNome || aluguel.moto_nome || '-'} (${aluguel.motoPlaca || aluguel.moto_placa || '-'})<br>
        <b>Plano:</b> ${aluguel.nomePlano || aluguel.planoNome || '-'}<br>
        <b>Data de Retirada:</b> ${aluguel.dataRetirada ? new Date(aluguel.dataRetirada).toLocaleString('pt-BR') : '-'}<br>
        <b>Valor Total:</b> ${aluguel.valorTotal || '-'}<br>
        <b>CNH:</b> ${aluguel.cnh || '-'}<br>
        <b>Identidade:</b> ${aluguel.identidade || '-'}<br>
        <b>Telefone:</b> ${aluguel.telefone || '-'}
    `;
});
