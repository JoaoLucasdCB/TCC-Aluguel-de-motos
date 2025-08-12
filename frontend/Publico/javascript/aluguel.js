// aluguel.js - Lógica para página de aluguel

document.addEventListener('DOMContentLoaded', function() {
    const motoSelect = document.getElementById('moto');
    const planoSelect = document.getElementById('plano');
    const localRetiradaSelect = document.getElementById('localRetirada');
    const detalhesMoto = document.getElementById('detalhesMoto');
    const detalhesPlano = document.getElementById('detalhesPlano');
    const detalhesLocal = document.createElement('div');
    detalhesLocal.id = 'detalhesLocal';
    // Adiciona o container de detalhes do local após detalhesPlano, se não existir
    if (!document.getElementById('detalhesLocal')) {
        detalhesPlano.parentNode.appendChild(detalhesLocal);
    }
    // Atualiza detalhes do local ao selecionar
    localRetiradaSelect.addEventListener('change', function() {
        const localId = localRetiradaSelect.value;
        if (!localId) {
            detalhesLocal.innerHTML = '';
            return;
        }
        fetch(`http://localhost:8080/localizacoes/${localId}`)
            .then(res => res.json())
            .then(local => {
                detalhesLocal.innerHTML = `<b>Local de Retirada:</b> ${local.cidade} - ${local.estado}<br><b>Endereço:</b> ${local.enderecoCompleto}<br>${local.horarioFuncionamento ? `<b>Horário:</b> ${local.horarioFuncionamento}` : ''}`;
            })
            .catch(() => {
                detalhesLocal.innerHTML = '<span style="color:#f357a8">Erro ao carregar detalhes do local.</span>';
            });
    });
    const retiradaInput = document.getElementById('retirada');
    // Carregar locais de retirada
    function carregarLocaisRetirada() {
        fetch('http://localhost:8080/localizacoes')
            .then(res => res.json())
            .then(locais => {
                localRetiradaSelect.innerHTML = '<option value="">Selecione o local</option>';
                locais.forEach(local => {
                    const opt = document.createElement('option');
                    opt.value = local.id;
                    opt.textContent = `${local.cidade} - ${local.estado} (${local.enderecoCompleto})`;
                    localRetiradaSelect.appendChild(opt);
                });
            });
    }
    carregarLocaisRetirada();
    let avisoDatas = document.createElement('div');
    avisoDatas.id = 'avisoDatas';
    avisoDatas.style = 'color:#f357a8; margin-bottom:8px; font-size:0.98rem;';
    motoSelect.parentNode.insertBefore(avisoDatas, motoSelect);
    // Impede datas anteriores ao dia atual
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    retiradaInput.setAttribute('min', minDate);

    let motos = [];
    let planos = [];


    function carregarTodasMotos() {
        const token = localStorage.getItem('token');
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8080/api/motos/disponiveis'
            : '/api/motos/disponiveis';
        fetch(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
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
        const retirada = retiradaInput.value;
        if (!retirada) {
            carregarTodasMotos();
            return;
        }
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8080/api/motos/disponiveis'
            : '/api/motos/disponiveis';
        const token = localStorage.getItem('token');
        // Salva a moto selecionada antes de atualizar
        const motoSelecionada = motoSelect.value;
        fetch(`${apiUrl}?retirada=${encodeURIComponent(retirada)}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json())
            .then(data => {
                motos = data;
                motoSelect.innerHTML = '<option value="">Selecione a moto</option>';
                let selecionadaAindaDisponivel = false;
                motos.forEach(m => {
                    const opt = document.createElement('option');
                    opt.value = m.id;
                    opt.textContent = `${m.nome} (${m.placa})`;
                    if (String(m.id) === String(motoSelecionada)) {
                        selecionadaAindaDisponivel = true;
                    }
                    motoSelect.appendChild(opt);
                });
                if (motos.length === 0) {
                    avisoDatas.textContent = 'Nenhuma moto disponível para a data selecionada.';
                    avisoDatas.style.display = 'block';
                    motoSelect.disabled = true;
                } else {
                    avisoDatas.style.display = 'none';
                    motoSelect.disabled = false;
                    // Se a moto selecionada ainda está disponível, restaura a seleção
                    if (selecionadaAindaDisponivel) {
                        motoSelect.value = motoSelecionada;
                    }
                }
            });
    }

    // Carrega todas as motos ao abrir
    carregarTodasMotos();

    // Desabilita o select de motos até a data de retirada ser preenchida
    function toggleMotoSelect() {
        if (!retiradaInput.value) {
            motoSelect.disabled = true;
            avisoDatas.textContent = 'Selecione a data de retirada para escolher uma moto.';
            avisoDatas.style.display = 'block';
        } else {
            motoSelect.disabled = false;
            avisoDatas.style.display = 'none';
        }
    }
    toggleMotoSelect();
    retiradaInput.addEventListener('change', function() {
        atualizarMotosPorData();
        toggleMotoSelect();
    });

    // Buscar planos do backend
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/planos', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
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
        const usuarioId = Number(localStorage.getItem('usuarioId'));
        const token = localStorage.getItem('token');
        if (!token || !usuarioId) {
            sessionStorage.setItem('loginMessage', 'Faça login para alugar uma moto.');
            window.location.href = 'login.html';
            return;
        }
    const motoSelecionadaObj = motos.find(m => String(m.id) === String(motoSelect.value));
    const planoSelecionadoObj = planos.find(p => String(p.id) === String(planoSelect.value));
    // Debug: mostrar valor do nomeUsuario
    console.log('DEBUG nomeUsuario localStorage:', localStorage.getItem('nomeUsuario'));
    // Buscar detalhes do local de retirada
    const localId = localRetiradaSelect.value;
    fetch(`http://localhost:8080/localizacoes/${localId}`)
            .then(res => res.json())
            .then(localRetiradaObj => {
                // Debug: mostrar valor do nomeUsuario
                console.log('DEBUG nomeUsuario localStorage:', localStorage.getItem('nomeUsuario'));
                const reservaInput = {
                    motoId: motoSelect.value,
                    planoId: planoSelect.value,
                    usuarioId: usuarioId,
                    localRetiradaId: localRetiradaSelect.value,
                    dataRetirada: retiradaInput.value, // novo campo para o backend
                    status: "PENDENTE",
                    motoAno: motoSelecionadaObj ? Number(motoSelecionadaObj.ano) : 2000,
                    motoNome: motoSelecionadaObj ? motoSelecionadaObj.nome : '',
                    motoMarca: motoSelecionadaObj ? motoSelecionadaObj.marca : '',
                    motoModelo: motoSelecionadaObj ? motoSelecionadaObj.modelo : '',
                    motoCilindrada: motoSelecionadaObj ? motoSelecionadaObj.cilindrada : '',
                    motoPlaca: motoSelecionadaObj ? motoSelecionadaObj.placa : '',
                    motoQuilometragem: motoSelecionadaObj ? motoSelecionadaObj.quilometragem : '',
                    motoImagem: motoSelecionadaObj ? motoSelecionadaObj.imagem : '',
                    // Detalhes do plano
                    nomePlano: planoSelecionadoObj ? planoSelecionadoObj.nomePlano : '',
                    planoDuracao: planoSelecionadoObj ? planoSelecionadoObj.duracao : '',
                    planoBeneficios: planoSelecionadoObj ? planoSelecionadoObj.beneficios : '',
                    // Detalhes do local de retirada
                    localRetiradaCidade: localRetiradaObj && localRetiradaObj.cidade ? localRetiradaObj.cidade : '',
                    localRetiradaEstado: localRetiradaObj && localRetiradaObj.estado ? localRetiradaObj.estado : '',
                    localRetiradaEndereco: localRetiradaObj && (localRetiradaObj.enderecoCompleto || localRetiradaObj.endereco) ? (localRetiradaObj.enderecoCompleto || localRetiradaObj.endereco) : '',
                    localRetiradaHorario: localRetiradaObj && (localRetiradaObj.horarioFuncionamento || localRetiradaObj.horario) ? (localRetiradaObj.horarioFuncionamento || localRetiradaObj.horario) : '',
                    // Detalhes do usuário
                    nomeUsuario: localStorage.getItem('nomeUsuario') || '',
                };
                sessionStorage.setItem('aluguel', JSON.stringify(reservaInput));
                window.location.href = 'aluguel-resumo.html';
            })
            .catch(() => {
                // Se falhar, ainda salva o básico para não travar o fluxo
                const reservaInput = {
                    motoId: motoSelect.value,
                    planoId: planoSelect.value,
                    usuarioId: usuarioId,
                    localRetiradaId: localRetiradaSelect.value,
                    dataRetirada: retiradaInput.value,
                    status: "PENDENTE",
                    motoAno: motoSelecionadaObj ? Number(motoSelecionadaObj.ano) : 2000,
                    motoNome: motoSelecionadaObj ? motoSelecionadaObj.nome : '',
                    motoMarca: motoSelecionadaObj ? motoSelecionadaObj.marca : '',
                    motoModelo: motoSelecionadaObj ? motoSelecionadaObj.modelo : '',
                    motoCilindrada: motoSelecionadaObj ? motoSelecionadaObj.cilindrada : '',
                    motoPlaca: motoSelecionadaObj ? motoSelecionadaObj.placa : '',
                    motoQuilometragem: motoSelecionadaObj ? motoSelecionadaObj.quilometragem : '',
                    motoImagem: motoSelecionadaObj ? motoSelecionadaObj.imagem : '',
                    nomePlano: planoSelecionadoObj ? planoSelecionadoObj.nomePlano : '',
                    planoDuracao: planoSelecionadoObj ? planoSelecionadoObj.duracao : '',
                    planoBeneficios: planoSelecionadoObj ? planoSelecionadoObj.beneficios : '',
                    localRetiradaCidade: '',
                    localRetiradaEstado: '',
                    localRetiradaEndereco: '',
                    localRetiradaHorario: '',
                    usuarioNome: localStorage.getItem('usuarioNome') || '',
                };
                sessionStorage.setItem('aluguel', JSON.stringify(reservaInput));
                window.location.href = 'aluguel-resumo.html';
            });
    });
});
