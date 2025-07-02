// Lista de motos de exemplo
const motos = [
    {
        modelo: 'Honda CB 500F',
        descricao: 'Moto naked, 500cc, ideal para cidade e estrada.',
        valor: 'R$ 120/dia',
        imagem: '', 
    },
    {
        modelo: 'Yamaha MT-03',
        descricao: 'Ágil, 321cc, perfeita para uso urbano.',
        valor: 'R$ 110/dia',
        imagem: '',
    },
    {
        modelo: 'BMW G 310 GS',
        descricao: 'Trail, 310cc, conforto e aventura.',
        valor: 'R$ 150/dia',
        imagem: '',
    },
    {
        modelo: 'Honda XRE 300',
        descricao: 'Versátil, 300cc, ótima para viagens.',
        valor: 'R$ 130/dia',
        imagem: '',
    },
];

const motoList = document.getElementById('motoList');

function renderMotos() {
    motoList.innerHTML = '';
    motos.forEach((moto, idx) => {
        const card = document.createElement('div');
        card.className = 'moto-card';
        card.tabIndex = 0;
        // Redireciona para a página de detalhes ao clicar
        card.onclick = () => {
            // Aqui você pode passar o id real da moto do banco, se disponível
            window.location.href = `moto-detalhe.html?id=${idx+1}`;
        };
        card.innerHTML = `
            <div class="moto-img">${moto.imagem ? `<img src="${moto.imagem}" alt="${moto.modelo}">` : 'Imagem'}</div>
            <div class="moto-info">
                <div class="modelo">${moto.modelo}</div>
                <div class="descricao">${moto.descricao}</div>
                <div class="valor">${moto.valor}</div>
            </div>
        `;
        motoList.appendChild(card);
    });
}

let selectedMoto = null;
function selectMoto(idx) {
    // Função não é mais usada para seleção visual, pois agora redireciona direto
    // Mantida para compatibilidade, mas pode ser removida se não for mais usada
    selectedMoto = idx;
}

document.getElementById('anterior').onclick = () => {
    motoList.scrollBy({ top: -420, behavior: 'smooth' });
};
document.getElementById('proximo').onclick = () => {
    motoList.scrollBy({ top: 420, behavior: 'smooth' });
};

renderMotos();
