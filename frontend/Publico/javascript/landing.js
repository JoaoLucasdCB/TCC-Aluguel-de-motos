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

    // Botão flutuante de suporte
    const fab = document.createElement('div');
    fab.className = 'support-fab';
    fab.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 1.85 0 3.55-.63 4.9-1.69l3.87 1.01a1 1 0 0 0 1.22-1.22l-1.01-3.87A7.963 7.963 0 0 0 22 12c0-5.52-4.48-10-10-10zm0 18c-1.85 0-3.55-.63-4.9-1.69l-.28-.21-2.13.56.56-2.13-.21-.28A7.963 7.963 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`;
    document.body.appendChild(fab);

    // Modal de suporte
    const modal = document.createElement('div');
    modal.id = 'support-modal';
    modal.innerHTML = `
      <div id="support-modal-header">
        Suporte Online
        <button id="support-modal-close">&times;</button>
      </div>
      <div id="support-modal-body">
        <div style="color:#888; text-align:center; margin-top:30px;">Olá! Como podemos ajudar?<br>Envie sua dúvida abaixo.</div>
      </div>
      <form id="support-modal-footer">
        <input type="text" id="support-user-msg" placeholder="Digite sua mensagem..." required autocomplete="off" />
        <button type="submit">Enviar</button>
      </form>
    `;
    document.body.appendChild(modal);

    fab.addEventListener('click', () => {
        modal.classList.add('active');
        setTimeout(() => {
            document.getElementById('support-user-msg').focus();
        }, 200);
    });
    document.getElementById('support-modal-close').onclick = () => {
        modal.classList.remove('active');
    };

    // Simulação simples de chat
    const chatBody = document.getElementById('support-modal-body');
    document.getElementById('support-modal-footer').onsubmit = function(e) {
        e.preventDefault();
        const input = document.getElementById('support-user-msg');
        const msg = input.value.trim();
        if (!msg) return;
        chatBody.innerHTML += `<div style='margin:10px 0;text-align:right;'><span style='background:#a12b8c;color:#fff;padding:8px 14px;border-radius:16px 16px 0 16px;display:inline-block;'>${msg}</span></div>`;
        input.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Envio para backend
        fetch('http://localhost:8080/api/support/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: msg })
        })
        .then(res => {
            if (res.ok) {
                setTimeout(() => {
                    chatBody.innerHTML += `<div style='margin:10px 0;text-align:left;'><span style='background:#00cfff;color:#fff;padding:8px 14px;border-radius:16px 16px 16px 0;display:inline-block;'>Mensagem enviada! Em breve um atendente irá te responder.</span></div>`;
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 800);
            } else {
                throw new Error('Erro ao enviar');
            }
        })
        .catch(() => {
            chatBody.innerHTML += `<div style='margin:10px 0;text-align:left;'><span style='background:#c00;color:#fff;padding:8px 14px;border-radius:16px;'>Erro ao enviar. Tente novamente.</span></div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        });
    };
});
