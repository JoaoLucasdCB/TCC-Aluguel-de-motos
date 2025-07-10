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

async function renderPlanoDetalhe() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    try {
        const response = await fetch(`http://localhost:8080/planos/${id}`);
        if (!response.ok) throw new Error('Plano não encontrado');
        const plano = await response.json();
        document.getElementById('planoDetailNome').textContent = plano.nomePlano;
        document.getElementById('planoDetailDescricao').textContent = `Duração: ${plano.duracao} dias`;
        document.getElementById('planoDetailPreco').style.display = 'none'; // Esconde campo preço se não existir
        document.getElementById('planoDetailBeneficios').innerHTML = plano.beneficios
            ? plano.beneficios.split('\n').map(b => `<li>${b}</li>`).join('')
            : '<li>Sem benefícios cadastrados</li>';
    } catch (err) {
        document.querySelector('.plano-detail-container').innerHTML = '<p>Plano não encontrado.</p>';
    }
}

document.addEventListener('DOMContentLoaded', renderPlanoDetalhe);
