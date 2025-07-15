// aluguel.js - Lógica para página de aluguel

document.addEventListener('DOMContentLoaded', function() {
    const motoSelect = document.getElementById('moto');
    const planoSelect = document.getElementById('plano');
    const detalhesMoto = document.getElementById('detalhesMoto');
    const detalhesPlano = document.getElementById('detalhesPlano');
    const inicioInput = document.getElementById('inicio');
    const fimInput = document.getElementById('fim');
    let avisoDatas = document.createElement('div');
    avisoDatas.id = 'avisoDatas';
    avisoDatas.style = 'color:#f357a8; margin-bottom:8px; font-size:0.98rem;';
    motoSelect.parentNode.insertBefore(avisoDatas, motoSelect);
    // Impede datas anteriores ao dia atual
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}T00:00`;
    inicioInput.setAttribute('min', minDate);

    let motos = [];
    let planos = [];


    function carregarTodasMotos() {
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8080/api/motos/disponiveis'
            : '/api/motos/disponiveis';
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                motos = data;
                motoSelect.innerHTML = '<option value="">Selecione a moto</option>';
                if (motos.length === 0) {
                    avisoDatas.textContent = 'Nenhuma moto disponível.';
                    avisoDatas.style.display = 'block';
                    motoSelect.disabled = true;
                } else {
                    avisoDatas.style.display = 'none';
                    motoSelect.disabled = false;
                    motos.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m.id;
                        opt.textContent = `${m.nome} (${m.placa})`;
                        motoSelect.appendChild(opt);
                    });
                }
            });
    }

    function atualizarMotosPorData() {
        const inicio = inicioInput.value;
        const fim = fimInput.value;
        if (!inicio || !fim) {
            carregarTodasMotos();
            return;
        }
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8080/api/motos/disponiveis'
            : '/api/motos/disponiveis';
        fetch(`${apiUrl}?inicio=${encodeURIComponent(inicio)}&fim=${encodeURIComponent(fim)}`)
            .then(res => res.json())
            .then(data => {
                motos = data;
                motoSelect.innerHTML = '<option value="">Selecione a moto</option>';
                if (motos.length === 0) {
                    avisoDatas.textContent = 'Nenhuma moto disponível para o período selecionado.';
                    avisoDatas.style.display = 'block';
                    motoSelect.disabled = true;
                } else {
                    avisoDatas.style.display = 'none';
                    motoSelect.disabled = false;
                    motos.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m.id;
                        opt.textContent = `${m.nome} (${m.placa})`;
                        motoSelect.appendChild(opt);
                    });
                }
            });
    }

    // Carrega todas as motos ao abrir
    carregarTodasMotos();

    // Desabilita o select de motos até as datas serem preenchidas
    function toggleMotoSelect() {
        if (!inicioInput.value || !fimInput.value) {
            motoSelect.disabled = true;
            avisoDatas.textContent = 'Selecione a data de início e fim para escolher uma moto.';
            avisoDatas.style.display = 'block';
        } else {
            motoSelect.disabled = false;
            avisoDatas.style.display = 'none';
        }
    }
    toggleMotoSelect();
    inicioInput.addEventListener('change', function() {
        atualizarMotosPorData();
        toggleMotoSelect();
    });
    fimInput.addEventListener('change', function() {
        atualizarMotosPorData();
        toggleMotoSelect();
    });

    // Buscar planos do backend
    fetch('http://localhost:8080/planos')
        .then(res => res.json())
        .then(data => {
            planos = data;
            planos.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = `${p.nomePlano} - ${p.duracao} dias`;
                planoSelect.appendChild(opt);
            });
        });

    // Atualiza detalhes
    motoSelect.addEventListener('change', function(e) {
        if (motoSelect.disabled) {
            avisoDatas.textContent = 'Selecione a data de início e fim antes de escolher a moto.';
            avisoDatas.style.display = 'block';
            motoSelect.value = '';
            detalhesMoto.innerHTML = '';
            return;
        }
        const m = motos.find(m => m.id == motoSelect.value);
        if (m && m.status && m.status.toUpperCase() === 'RESERVADA') {
            avisoDatas.textContent = 'Esta moto já está reservada para o período selecionado. Escolha outra moto.';
            avisoDatas.style.display = 'block';
            motoSelect.value = '';
            detalhesMoto.innerHTML = '';
            return;
        }
        detalhesMoto.innerHTML = m ? `<b>Moto:</b> ${m.nome}<br><b>Placa:</b> ${m.placa}<br><b>Cilindrada:</b> ${m.cilindrada}<br><b>Marca:</b> ${m.marca}<br><b>Modelo:</b> ${m.modelo}` : '';
    });
    planoSelect.addEventListener('change', function() {
        const p = planos.find(p => p.id == planoSelect.value);
        detalhesPlano.innerHTML = p ? `<b>Plano:</b> ${p.nomePlano}<br><b>Duração:</b> ${p.duracao} dias<br><b>Benefícios:</b> ${p.beneficios || '-'}` : '';
    });

    // Submissão do formulário
    document.getElementById('aluguelForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const reservaInput = {
            motoId: motoSelect.value,
            planoId: planoSelect.value,
            usuarioId: 4, // ID do Bernardo
            dataInicio: inicioInput.value,
            dataFim: fimInput.value, // campo para o backend
            status: "PENDENTE"
        };
        fetch('http://localhost:8080/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservaInput)
        })
        .then(async res => {
            if (res.ok) {
                const reserva = await res.json();
                sessionStorage.setItem('aluguel', JSON.stringify(reserva));
                window.location.href = 'aluguel-resumo.html';
            } else if (res.status === 409) {
                const msg = await res.text();
                avisoDatas.textContent = msg || 'Moto já reservada para o período selecionado.';
                avisoDatas.style.display = 'block';
            } else {
                avisoDatas.textContent = 'Erro ao realizar reserva. Tente novamente.';
                avisoDatas.style.display = 'block';
            }
        })
        .catch(() => {
            avisoDatas.textContent = 'Erro de conexão com o servidor.';
            avisoDatas.style.display = 'block';
        });
    });
});
