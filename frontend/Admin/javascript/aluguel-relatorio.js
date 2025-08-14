document.addEventListener('DOMContentLoaded', function() {
    // Protege páginas admin: só admin pode acessar
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if (!tipoUsuario || tipoUsuario.toLowerCase() !== 'admin') {
        window.location.href = '../../Publico/html/login.html';
        return;
    }

    // Dropdown perfil
    const perfilBtn = document.getElementById('perfilMenuBtn');
    const perfilDropdown = document.getElementById('perfilDropdown');
    let perfilTimeout;
    if (perfilBtn && perfilDropdown) {
        perfilBtn.addEventListener('mouseenter', () => {
            clearTimeout(perfilTimeout);
            perfilDropdown.style.display = 'block';
        });
        perfilBtn.addEventListener('mouseleave', () => {
            perfilTimeout = setTimeout(() => {
                perfilDropdown.style.display = 'none';
            }, 300);
        });
        perfilDropdown.addEventListener('mouseenter', () => {
            clearTimeout(perfilTimeout);
        });
        perfilDropdown.addEventListener('mouseleave', () => {
            perfilTimeout = setTimeout(() => {
                perfilDropdown.style.display = 'none';
            }, 300);
        });
    }

    // Buscar reservas do backend e exibir no relatório, com botão de exclusão
    fetch('http://localhost:8080/reservas')
        .then(response => response.json())
        .then(reservas => {
            const relatorioDiv = document.getElementById('relatorioDados');
            if (!reservas || reservas.length === 0) {
                relatorioDiv.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
            } else {
                let html = '<table style="width:100%;border-collapse:collapse;margin-top:16px;">';
                html += '<tr style="background:#f357a8;color:#fff;"><th>Moto</th><th>Usuário</th><th>Data de Retirada</th><th>Status</th><th>Ações</th></tr>';
                reservas.forEach(r => {
                    html += `<tr style="border-bottom:1px solid #eee;">
                        <td>${r.motoNome || '-'}</td>
                        <td>${r.usuarioNome || '-'}</td>
                        <td>${r.dataRetirada ? r.dataRetirada : '-'}</td>
                        <td>${r.status || '-'}</td>
                        <td>
                          <button class="editar-reserva-btn" data-id="${r.id}" data-status="${r.status || ''}" style="background:#4caf50;color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;margin-right:8px;">Editar</button>
                          <button class="excluir-reserva-btn" data-id="${r.id}" style="background:#f357a8;color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;">Excluir</button>
                        </td>
                    </tr>`;
                });
                html += '</table>';
                relatorioDiv.innerHTML = html;
            }

            // Adiciona evento ao botão de exportação SEMPRE após preencher a tabela
            const exportarBtn = document.getElementById('exportarPlanilhaBtn');
            if (exportarBtn) {
                exportarBtn.onclick = function() {
                    // SheetJS - Gera dados
                    let dados = [];
                    // Cabeçalhos
                    dados.push(["Moto", "Usuário", "Data de Retirada", "Status"]);
                    // Linhas
                    reservas.forEach(r => {
                        dados.push([
                            r.motoNome || '-',
                            r.usuarioNome || '-',
                            r.dataRetirada || '-',
                            r.status || '-'
                        ]);
                    });

                    // Cria workbook e worksheet
                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.aoa_to_sheet([]);

                    // Adiciona texto identificador e logo
                    XLSX.utils.sheet_add_aoa(ws, [["RideMoto Serviços"]], {origin: "A1"});
                    XLSX.utils.sheet_add_aoa(ws, [["Relatório de Aluguel"]], {origin: "A2"});
                    ws["A3"] = { t: "s", v: "Logo: https://localhost:8080/frontend/Publico/img/LogoRideMoto.png" };

                    // Adiciona dados a partir da linha 4
                    XLSX.utils.sheet_add_aoa(ws, [dados[0]], {origin: "A4"});
                    for(let i=1; i<dados.length; i++) {
                        XLSX.utils.sheet_add_aoa(ws, [dados[i]], {origin: `A${4+i}`});
                    }

                    // Organiza largura das colunas
                    ws['!cols'] = [
                        { wch: 20 }, // Moto
                        { wch: 20 }, // Usuário
                        { wch: 20 }, // Data de Retirada
                        { wch: 15 }  // Status
                    ];

                    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
                    XLSX.writeFile(wb, "relatorio-aluguel.xlsx");
                };
            }

            // Eventos dos botões editar/excluir
            document.querySelectorAll('.editar-reserva-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    const id = this.getAttribute('data-id');
                    let reservaCompleta = null;
                    try {
                        const resp = await fetch(`http://localhost:8080/reservas/${id}`);
                        if (resp.ok) {
                            reservaCompleta = await resp.json();
                        }
                    } catch (e) {}
                    if (!reservaCompleta) {
                        showMsg('Erro ao buscar dados da reserva.', 'error');
                        return;
                    }
                    window.reservaParaEditar = reservaCompleta;
                    document.getElementById('editar-id').value = id;
                    document.getElementById('editar-status').value = reservaCompleta.status || 'PENDENTE';
                    document.getElementById('modal-editar').style.display = 'flex';
                });
            });
            document.querySelectorAll('.excluir-reserva-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const reservaId = this.getAttribute('data-id');
                    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
                        const token = localStorage.getItem('token');
                        fetch(`http://localhost:8080/reservas/${reservaId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': token ? `Bearer ${token}` : ''
                            }
                        })
                        .then(resp => {
                            if (resp.ok) {
                                showMsg('Reserva excluída com sucesso!', 'success');
                                location.reload();
                            } else if (resp.status === 403 || resp.status === 401) {
                                showMsg('Sem permissão para excluir. Faça login como admin.', 'error');
                            } else {
                                showMsg('Erro ao excluir reserva.', 'error');
                            }
                        })
                        .catch(() => showMsg('Erro ao excluir reserva.', 'error'));
                    }
                });
            });
        })
        .catch(err => {
            document.getElementById('relatorioDados').innerHTML = '<p style="color:red">Erro ao buscar reservas.</p>';
            console.error('Erro ao buscar reservas:', err);
        });

    // Modal editar reserva
    const modal = document.getElementById('modal-editar');
    const fecharBtn = document.getElementById('fechar-modal-editar');
    if (fecharBtn) fecharBtn.onclick = () => { modal.style.display = 'none'; };
    const cancelarBtn = document.getElementById('fechar-modal-editar-2');
    if (cancelarBtn) cancelarBtn.onclick = () => { modal.style.display = 'none'; };
    if (modal) modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
    const form = document.getElementById('form-editar-reserva');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            const id = document.getElementById('editar-id').value;
            const status = document.getElementById('editar-status').value;
            const token = localStorage.getItem('token');
            const r = window.reservaParaEditar || {};
            const body = {
                status,
                usuarioId: r.usuarioId,
                planoId: r.planoId,
                motoId: r.motoId,
                localRetiradaId: r.localRetiradaId,
                dataRetirada: r.dataRetirada
            };
            fetch(`http://localhost:8080/reservas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(body)
            })
            .then(resp => {
                if (resp.ok) {
                    showMsg('Reserva editada com sucesso!', 'success');
                    modal.style.display = 'none';
                    location.reload();
                } else if (resp.status === 403 || resp.status === 401) {
                    showMsg('Sem permissão para editar. Faça login como admin.', 'error');
                } else {
                    showMsg('Erro ao editar reserva.', 'error');
                }
            })
            .catch(() => showMsg('Erro ao editar reserva.', 'error'));
        };
    }
});