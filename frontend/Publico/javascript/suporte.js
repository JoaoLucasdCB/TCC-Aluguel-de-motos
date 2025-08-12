document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showMsg('Mensagem enviada! Em breve nossa equipe entrará em contato.', 'success');
    this.reset();
});
