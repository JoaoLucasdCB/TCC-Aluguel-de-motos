// Adiciona exportação de relatório com SheetJS, logo e texto identificador
// Certifique-se de instalar SheetJS no frontend: https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js
// Adicione a tag abaixo no <head> do HTML:
// <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>

// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    fetch('http://localhost:8080/reservas')
        .then(response => response.json())
        .then(reservas => {
            const relatorioDiv = document.getElementById('relatorioDados');
            // ...tabela e exibição...
            // Adiciona evento ao botão de exportação SEMPRE após preencher a tabela
            const exportarBtn = document.getElementById('exportarPlanilhaBtn');
            if (exportarBtn) {
                exportarBtn.onclick = function() {
                    // Gera dados para SheetJS
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
                    const ws = XLSX.utils.aoa_to_sheet(dados);
                    XLSX.utils.book_append_sheet(wb, ws, "Relatório");

                    // Adiciona texto identificador no topo
                    XLSX.utils.sheet_add_aoa(ws, [["RideMoto Serviços"]], {origin: "A1"});
                    XLSX.utils.sheet_add_aoa(ws, [["Relatório de Aluguel"]], {origin: "A2"});
                    // Move dados para começar na linha 4
                    XLSX.utils.sheet_add_aoa(ws, [dados[0]], {origin: "A4"});
                    for(let i=1; i<dados.length; i++) {
                        XLSX.utils.sheet_add_aoa(ws, [dados[i]], {origin: `A${4+i}`});
                    }

                    // Adiciona logo (imagem) - SheetJS Pro faz nativamente, mas na versão gratuita só é possível adicionar um link
                    // Adiciona link para logo no topo
                    ws["A3"] = { t: "s", v: "Logo: https://localhost:8080/frontend/Publico/img/LogoRideMoto.png" };

                    // Organiza largura das colunas
                    ws['!cols'] = [
                        { wch: 20 }, // Moto
                        { wch: 20 }, // Usuário
                        { wch: 20 }, // Data de Retirada
                        { wch: 15 }  // Status
                    ];

                    // Salva arquivo
                    XLSX.writeFile(wb, "relatorio-aluguel.xlsx");
                };
            }
            // ...eventos editar/excluir...
        })
        // ...existing code...
});
// ...existing code...
