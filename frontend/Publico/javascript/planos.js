async function fetchAndRenderPlanos() {
    try {
        const response = await fetch('http://localhost:8080/planos');
        if (!response.ok) throw new Error('Erro ao buscar planos');
        const planos = await response.json();
        const planosList = document.getElementById('planosList');
        planosList.innerHTML = '';
        planos.forEach(plano => {
            const card = document.createElement('div');
            card.className = 'plano-card';
            card.innerHTML = `
                <div class="badge">${plano.destaque ? plano.destaque : ''}</div>
                <div class="plano-nome">${plano.nomePlano}</div>
                <div class="plano-descricao">Duração: ${plano.duracao} dias</div>
                <ul class="plano-beneficios">
                    ${plano.beneficios.split('\n').map(b => `<li>${b}</li>`).join('')}
                </ul>
                <button class="plano-btn">Ver Detalhes</button>
            `;
            card.querySelector('.plano-btn').onclick = (e) => {
                e.stopPropagation();
                window.location.href = `plano-detalhe.html?id=${plano.id}`;
            };
            card.onclick = () => {
                window.location.href = `plano-detalhe.html?id=${plano.id}`;
            };
            planosList.appendChild(card);
        });
    } catch (err) {
        document.getElementById('planosList').innerHTML = '<p>Erro ao carregar planos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderPlanos);
