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
    // Função para validar CNH (11 dígitos, algoritmo módulo 11)
    function validarCNH(cnh) {
        if (!/^[0-9]{11}$/.test(cnh)) return false;
        // Não pode ser todos os dígitos iguais
        if (/^([0-9])\1{10}$/.test(cnh)) return false;
        let dsc = 0;
        let v = [];
        for (let i = 0; i < 9; i++) v[i] = parseInt(cnh.charAt(i));
        // Primeiro dígito verificador
        let soma = 0;
        for (let i = 0, j = 9; i < 9; i++, j--) soma += v[i] * j;
        let dv1 = soma % 11;
        if (dv1 >= 10) { dv1 = 0; dsc = 2; }
        // Segundo dígito verificador
        soma = 0;
        for (let i = 0, j = 1; i < 9; i++, j++) soma += v[i] * j;
        let dv2 = soma % 11;
        if (dv2 >= 10) dv2 = 0;
        // Ajuste para casos especiais
        if (dsc > 0) dv2 = dv2 - dsc < 0 ? 0 : dv2 - dsc;
        return dv1 === parseInt(cnh.charAt(9)) && dv2 === parseInt(cnh.charAt(10));
    }
    // Restringe o campo CNH para aceitar apenas números e até 11 dígitos
    const cnhInput = document.getElementById('cnh');
    if (cnhInput) {
        cnhInput.addEventListener('input', function(e) {
            let val = this.value.replace(/\D/g, '');
            if (val.length > 11) val = val.slice(0, 11);
            this.value = val;
        });
    }

    // Máscara e restrição para telefone: (00) 90000-0000
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let val = this.value.replace(/\D/g, '');
            if (val.length > 11) val = val.slice(0, 11);
            // Formata para (00) 90000-0000
            if (val.length > 0) {
                val = '(' + val;
            }
            if (val.length > 3) {
                val = val.slice(0, 3) + ') ' + val.slice(3);
            }
            if (val.length > 10) {
                val = val.slice(0, 10) + '-' + val.slice(10);
            }
            this.value = val;
        });
    }
    // Submissão do formulário de dados extras
    document.getElementById('dadosExtrasForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const cnh = document.getElementById('cnh').value;
        const telefone = document.getElementById('telefone').value;
        // Validação do telefone: deve estar no formato (00) 90000-0000
        if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
            alert('Telefone inválido. Use o formato (00) 90000-0000.');
            return;
        }
        if (!validarCNH(cnh)) {
            alert('CNH inválida. Digite uma CNH real.');
            return;
        }

        // Simulação de chamada a uma API externa para validação de CNH
        // Substitua a URL e lógica conforme a API real futuramente
        fetch('http://localhost:8080/api/validar-cnh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cnh: cnh })
        })
        .then(resp => resp.json())
        .then(data => {
            // Supondo que a resposta seja { valida: true } ou { valida: false }
            if (!data.valida) {
                alert('CNH não encontrada ou inválida na base nacional.');
                return;
            }
            // ...continua fluxo normal após validação externa...
            finalizarReserva();
        })
        .catch(() => {
            alert('Erro ao validar CNH na base nacional. Tente novamente mais tarde.');
        });
        // Impede o fluxo normal, só continua se a API retornar válida
        return;

        // Função para finalizar reserva (fluxo original)
        function finalizarReserva() {
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
                            window.location.href = 'minhas-reservas.html';
                        } else {
                            alert('Erro ao finalizar reserva.');
                        }
                    });
                } else {
                    alert('Erro ao atualizar dados do usuário.');
                }
            });
        }
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
                        window.location.href = 'minhas-reservas.html';
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
