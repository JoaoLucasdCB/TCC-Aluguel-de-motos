    // (Removido: código antigo de botão inexistente)
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

    // Exibe o resumo usando apenas os campos do DTO do backend
    resumoDados.innerHTML = `
        <b>Moto:</b> ${aluguel.motoNome || '-'} (${aluguel.motoPlaca || '-'})<br>
        <b>Marca:</b> ${aluguel.motoMarca || '-'}<br>
        <b>Modelo:</b> ${aluguel.motoModelo || '-'}<br>
        <b>Cilindrada:</b> ${aluguel.motoCilindrada || '-'}<br>
        <b>Plano:</b> ${aluguel.nomePlano || '-'}<br>
        <b>Duração:</b> ${aluguel.planoDuracao || '-'} dias<br>
        <b>Benefícios:</b> ${aluguel.planoBeneficios || '-'}<br>
        <b>Usuário:</b> ${aluguel.usuarioNome || aluguel.nomeUsuario || '-'}<br>
        <b>Início:</b> ${aluguel.dataRetirada ? new Date(aluguel.dataRetirada).toLocaleDateString('pt-BR') : '-'}<br>
        <b>Status:</b> ${aluguel.status || '-'}<br>
    `;
    // Submissão do formulário de dados extras
    document.getElementById('dadosExtrasForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const cnh = document.getElementById('cnh').value;
        const telefone = document.getElementById('telefone').value;
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar logado para finalizar a reserva.');
            return;
        }
        const usuarioId = localStorage.getItem('usuarioId');
        fetch(`http://localhost:8080/usuarios/${usuarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ cnhNumero: cnh, telefone: telefone })
        })
        .then(response => {
            if (response.ok) {
                // Se atualização for ok, faz a reserva
                const aluguel = JSON.parse(sessionStorage.getItem('aluguel'));
                fetch('http://localhost:8080/reservas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(aluguel)
                })
                .then(res => {
                    if (res.ok) {
                        alert('Reserva finalizada com sucesso!');
                        window.location.href = 'landing.html';
                    } else {
                        alert('Erro ao finalizar reserva.');
                    }
                });
            } else {
                alert('Erro ao atualizar dados do usuário.');
            }
        });
    });
});
