// Debug temporário para mostrar o que está vindo do sessionStorage
// Remova este bloco após o teste

document.addEventListener('DOMContentLoaded', function() {
    const aluguelRaw = sessionStorage.getItem('aluguel');
    const resumoDados = document.getElementById('resumoDados');
    if (!aluguelRaw) {
        resumoDados.innerHTML = '<span style="color:#f357a8">Nenhum aluguel selecionado.</span>';
        document.getElementById('dadosExtrasForm').style.display = 'none';
        return;
    }
    resumoDados.innerHTML = `<pre style="color:#f357a8">${aluguelRaw}</pre>`;
});
