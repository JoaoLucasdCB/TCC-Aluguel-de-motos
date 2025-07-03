// aluguel.js - Lógica para página de aluguel

document.addEventListener('DOMContentLoaded', function() {
    // Simulação de dados de motos e planos (substituir por fetch da API futuramente)
    const motos = [
        { id: 1, nome: 'Honda CG 160', placa: 'ABC-1234', cilindrada: '160cc', cor: 'Preta' },
        { id: 2, nome: 'Yamaha Fazer 250', placa: 'XYZ-5678', cilindrada: '250cc', cor: 'Azul' }
    ];
    const planos = [
        { id: 1, nome: 'Diário', descricao: '24 horas', valor: 80 },
        { id: 2, nome: 'Semanal', descricao: '7 dias', valor: 400 }
    ];

    const motoSelect = document.getElementById('moto');
    const planoSelect = document.getElementById('plano');
    const detalhesMoto = document.getElementById('detalhesMoto');
    const detalhesPlano = document.getElementById('detalhesPlano');
    const valorTotalInput = document.getElementById('valorTotal');
    const inicioInput = document.getElementById('inicio');
    const fimInput = document.getElementById('fim');

    // Preenche selects
    motos.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.nome} (${m.placa})`;
        motoSelect.appendChild(opt);
    });
    planos.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.nome} - ${p.descricao}`;
        planoSelect.appendChild(opt);
    });

    // Atualiza detalhes
    motoSelect.addEventListener('change', function() {
        const m = motos.find(m => m.id == motoSelect.value);
        detalhesMoto.innerHTML = m ? `<b>Moto:</b> ${m.nome}<br><b>Placa:</b> ${m.placa}<br><b>Cilindrada:</b> ${m.cilindrada}<br><b>Cor:</b> ${m.cor}` : '';
    });
    planoSelect.addEventListener('change', function() {
        const p = planos.find(p => p.id == planoSelect.value);
        detalhesPlano.innerHTML = p ? `<b>Plano:</b> ${p.nome}<br><b>Duração:</b> ${p.descricao}<br><b>Valor:</b> R$ ${p.valor.toFixed(2)}` : '';
        calcularValorTotal();
    });
    inicioInput.addEventListener('change', calcularValorTotal);
    fimInput.addEventListener('change', calcularValorTotal);
    planoSelect.addEventListener('change', calcularValorTotal);

    function calcularValorTotal() {
        const plano = planos.find(p => p.id == planoSelect.value);
        if (!plano) {
            valorTotalInput.value = '';
            return;
        }
        // Exemplo: valor do plano * quantidade de períodos
        const inicio = new Date(inicioInput.value);
        const fim = new Date(fimInput.value);
        if (isNaN(inicio) || isNaN(fim) || fim <= inicio) {
            valorTotalInput.value = '';
            return;
        }
        let total = plano.valor;
        if (plano.nome === 'Diário') {
            const diff = Math.ceil((fim - inicio) / (1000*60*60*24));
            total = diff * plano.valor;
        } else if (plano.nome === 'Semanal') {
            const diff = Math.ceil((fim - inicio) / (1000*60*60*24*7));
            total = diff * plano.valor;
        }
        valorTotalInput.value = `R$ ${total.toFixed(2)}`;
    }

    // Submissão do formulário
    document.getElementById('aluguelForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aqui você pode salvar os dados no localStorage/sessionStorage ou enviar para backend
        // Exemplo: salvar dados e redirecionar para resumo
        const aluguel = {
            moto: motos.find(m => m.id == motoSelect.value),
            plano: planos.find(p => p.id == planoSelect.value),
            inicio: inicioInput.value,
            fim: fimInput.value,
            valorTotal: valorTotalInput.value
        };
        sessionStorage.setItem('aluguel', JSON.stringify(aluguel));
        window.location.href = 'aluguel-resumo.html';
    });
});
