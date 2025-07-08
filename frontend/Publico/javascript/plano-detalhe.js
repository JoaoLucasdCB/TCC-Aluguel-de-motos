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

function renderPlanoDetalhe() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const plano = planos.find(p => p.id == id) || planos[0];
    document.getElementById('planoDetailNome').textContent = plano.nome;
    document.getElementById('planoDetailDescricao').textContent = plano.descricao;
    document.getElementById('planoDetailPreco').textContent = plano.preco;
    document.getElementById('planoDetailBeneficios').innerHTML = plano.beneficios.map(b => `<li>${b}</li>`).join('');
}

document.addEventListener('DOMContentLoaded', renderPlanoDetalhe);
