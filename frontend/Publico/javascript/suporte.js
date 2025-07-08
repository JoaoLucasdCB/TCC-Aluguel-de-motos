document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada! Em breve nossa equipe entrará em contato.');
    this.reset();
});
