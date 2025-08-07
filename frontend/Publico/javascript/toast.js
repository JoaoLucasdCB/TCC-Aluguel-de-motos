// toast.js - Mensagens toast reutilizáveis para avisos e erros em qualquer página

(function() {
    if (window.showMsg) return; // Evita sobrescrever
    function showMsg(msg, type = 'error') {
        let msgContainer = document.getElementById('msgContainer');
        if (!msgContainer) {
            msgContainer = document.createElement('div');
            msgContainer.id = 'msgContainer';
            document.body.appendChild(msgContainer);
        }
        const div = document.createElement('div');
        div.className = `msg-toast ${type}`;
        div.textContent = msg;
        msgContainer.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
    window.showMsg = showMsg;
})();
