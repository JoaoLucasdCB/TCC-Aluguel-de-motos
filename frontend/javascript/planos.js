const planos = [
    {
        id: 1,
        nome: 'Plano Básico',
        descricao: 'Ideal para quem precisa de uma moto por poucos dias.',
        preco: 'R$ 99,00/mês',
        beneficios: [
            'Desconto de 5% no aluguel',
            '1 troca de moto por mês',
            'Suporte 24h'
        ]
    },
    {
        id: 2,
        nome: 'Plano Vantagem',
        descricao: 'Para quem usa moto com frequência e quer mais economia.',
        preco: 'R$ 179,00/mês',
        beneficios: [
            'Desconto de 12% no aluguel',
            '3 trocas de moto por mês',
            'Seguro incluso',
            'Suporte 24h'
        ]
    },
    {
        id: 3,
        nome: 'Plano Premium',
        descricao: 'O melhor para quem quer liberdade total e máximo desconto.',
        preco: 'R$ 249,00/mês',
        beneficios: [
            'Desconto de 20% no aluguel',
            'Trocas ilimitadas',
            'Seguro total',
            'Assistência VIP',
            'Suporte 24h prioritário'
        ]
    }
];

function renderPlanos() {
    const planosList = document.getElementById('planosList');
    planosList.innerHTML = '';
    planos.forEach(plano => {
        const card = document.createElement('div');
        card.className = 'plano-card';
        card.onclick = () => {
            window.location.href = `plano-detalhe.html?id=${plano.id}`;
        };
        card.innerHTML = `
            <div class="plano-nome">${plano.nome}</div>
            <div class="plano-descricao">${plano.descricao}</div>
            <div class="plano-preco">${plano.preco}</div>
            <ul class="plano-beneficios">
                ${plano.beneficios.map(b => `<li>${b}</li>`).join('')}
            </ul>
        `;
        planosList.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderPlanos);
