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
});
