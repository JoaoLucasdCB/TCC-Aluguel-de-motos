// Exemplo de preenchimento dinâmico (pode ser adaptado para integração real)
// Espera-se que a página seja chamada como: moto-detalhe.html?id=1

async function fetchMotoAPI(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/motos/${id}`);
        if (!response.ok) throw new Error('Moto não encontrada');
        const moto = await response.json();
        return moto;
    } catch (err) {
        alert('Erro ao buscar detalhes da moto: ' + err.message);
        return null;
    }
}

async function renderMotoDetalhe() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const moto = await fetchMotoAPI(id);
    if (!moto) return;
    document.getElementById('motoImg').src = moto.imagem || '../img/moto-default.png';
    document.getElementById('motoNome').textContent = moto.nome || moto.modelo || 'Moto';
    document.getElementById('motoMarca').textContent = moto.marca || '-';
    document.getElementById('motoModelo').textContent = moto.modelo || '-';
    document.getElementById('motoAno').textContent = moto.ano || '-';
    document.getElementById('motoCilindrada').textContent = moto.cilindrada ? moto.cilindrada + 'cc' : '-';
    document.getElementById('motoPlaca').textContent = moto.placa || '-';
    document.getElementById('motoStatus').textContent = moto.status || '-';
    document.getElementById('motoQuilometragem').textContent = moto.quilometragem ? moto.quilometragem + ' km' : '-';
    document.getElementById('motoPreco').textContent = moto.valorDiaria ? `R$ ${moto.valorDiaria}/dia` : '-';
    // Galeria de fotos (se quiser usar no futuro)
    const gallery = document.getElementById('motoGallery');
    if (gallery && moto.imagem) {
        gallery.innerHTML = '';
        const img = document.createElement('img');
        img.src = moto.imagem;
        img.alt = moto.nome || moto.modelo;
        img.onclick = () => {
            document.getElementById('motoImg').src = moto.imagem;
        };
        gallery.appendChild(img);
    }
}

renderMotoDetalhe();
