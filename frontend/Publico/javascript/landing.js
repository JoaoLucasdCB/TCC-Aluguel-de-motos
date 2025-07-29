// landing.js - animações simples para a landing page

document.addEventListener('DOMContentLoaded', function() {
    // Animação suave ao rolar para seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Destaque animado no botão principal
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        setInterval(() => {
            ctaBtn.classList.toggle('pulse');
        }, 1200);
    }

    // Buscar planos do backend e renderizar cards
    async function carregarPlanos() {
        try {
            const resp = await fetch('http://localhost:8080/planos');
            if (!resp.ok) throw new Error('Erro ao buscar planos');
            const planos = await resp.json();
            const container = document.querySelector('.planos-cards');
            if (!container) return;
            container.innerHTML = '';
            planos.forEach(plano => {
                const card = document.createElement('div');
                card.className = 'plano-card';
                card.innerHTML = `
                    <h3>${plano.nomePlano || plano.nome || 'Plano'}</h3>
                    <p>Duração: <strong>${plano.duracao || '-'} dias</strong></p>
                    <p>Valor: <strong>R$ ${plano.valor ? plano.valor.toFixed(2) : '-'}</strong></p>
                    <p>Benefícios: ${plano.beneficios || '-'}</p>
                `;
                container.appendChild(card);
            });
        } catch (err) {
            console.error('Erro ao carregar planos:', err);
        }
    }
    carregarPlanos();
});
