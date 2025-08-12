

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
                return;
            }
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

            // Evento editar
            document.querySelectorAll('.editar-reserva-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    const id = this.getAttribute('data-id');
                    // Busca dados completos da reserva
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
                    // Salva dados completos em window para uso no submit
                    window.reservaParaEditar = reservaCompleta;
                    document.getElementById('editar-id').value = id;
                    document.getElementById('editar-status').value = reservaCompleta.status || 'PENDENTE';
                    document.getElementById('modal-editar').style.display = 'flex';
                });
            });
            // Evento excluir
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
    // Botão cancelar dentro do form
    const cancelarBtn = document.getElementById('fechar-modal-editar-2');
    if (cancelarBtn) cancelarBtn.onclick = () => { modal.style.display = 'none'; };
    // Fecha ao clicar fora do conteúdo
    if (modal) modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
    // Submissão do form
    const form = document.getElementById('form-editar-reserva');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            const id = document.getElementById('editar-id').value;
            const status = document.getElementById('editar-status').value;
            const token = localStorage.getItem('token');
            // Usa os dados completos da reserva, só alterando o status
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
