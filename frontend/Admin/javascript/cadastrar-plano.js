// cadastrar-plano.js - Lógica da tela de cadastro de plano do admin

document.getElementById('formCadastroPlano').addEventListener('submit', async function(e) {
    e.preventDefault();
    const plano = {
        nomePlano: document.getElementById('nomePlano').value,
        duracao: parseInt(document.getElementById('duracao').value),
        beneficios: document.getElementById('beneficios').value
    };
    if (!plano.nomePlano || !plano.duracao || !plano.beneficios) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/planos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(plano)
        });
        if (!response.ok) throw new Error('Erro ao cadastrar plano');
        alert('Plano cadastrado com sucesso!');
        this.reset();
    } catch (err) {
        alert('Erro ao cadastrar plano: ' + err.message);
    }
});
