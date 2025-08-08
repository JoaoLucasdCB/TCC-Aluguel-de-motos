document.addEventListener('DOMContentLoaded', function() {
    atualizarDashboard();
    document.getElementById('atualizar-dados').addEventListener('click', atualizarDashboard);
});


document.addEventListener('DOMContentLoaded', function() {
    carregarDashboard();
    document.getElementById('atualizar-dados').addEventListener('click', carregarDashboard);
});

function carregarDashboard() {
    fetch('http://localhost:8080/dashboard/stats')
        .then(response => response.json())
        .then(stats => {
            document.getElementById('motos-cadastradas').textContent = stats.motosCadastradas ?? '-';
            document.getElementById('motos-alugadas').textContent = stats.motosAlugadas ?? '-';
            document.getElementById('usuarios-conectados').textContent = stats.usuariosConectados ?? '-';
            document.getElementById('plano-mais-alugado').textContent = stats.planoMaisAlugado ?? '-';
            document.getElementById('moto-mais-alugada').textContent = stats.motoMaisAlugada ?? '-';
        })
        .catch(() => {
            document.getElementById('motos-cadastradas').textContent = '-';
            document.getElementById('motos-alugadas').textContent = '-';
            document.getElementById('usuarios-conectados').textContent = '-';
            document.getElementById('plano-mais-alugado').textContent = '-';
            document.getElementById('moto-mais-alugada').textContent = '-';
        });

    fetch('http://localhost:8080/dashboard/grafico')
        .then(response => response.json())
        .then(grafico => {
            renderizarGrafico(grafico);
        })
        .catch(() => {
            renderizarGrafico();
        });
}

function renderizarGrafico(grafico) {
    // Espera que grafico contenha: { meses: [...], alugueis: [...], cadastradas: [...] }
    const meses = grafico?.meses ?? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const alugueis = grafico?.alugueis ?? [0,0,0,0,0,0,0,0,0,0,0,0];
    const cadastradas = grafico?.cadastradas ?? [0,0,0,0,0,0,0,0,0,0,0,0];

    const ctx = document.getElementById('dashboardChart').getContext('2d');
    if(window.dashboardChartInstance) {
        window.dashboardChartInstance.destroy();
    }
    window.dashboardChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Motos Alugadas',
                    data: alugueis,
                    backgroundColor: '#1a237e',
                },
                {
                    label: 'Motos Cadastradas',
                    data: cadastradas,
                    backgroundColor: '#ffb300',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Motos Alugadas vs. Cadastradas por Mês'
                }
            }
        }
    });
}

// Adiciona Chart.js via CDN
if (!window.Chart) {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = function() {
        carregarDashboard();
    };
    document.head.appendChild(script);
}
