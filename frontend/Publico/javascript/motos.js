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

async function fetchMotosAPI() {
    try {
        const response = await fetch('http://localhost:8080/api/motos');
        if (!response.ok) throw new Error('Erro ao buscar motos');
        const motosAPI = await response.json();
        // Adapta os dados do backend para o formato esperado pelo render
        return motosAPI.map(moto => ({
            id: moto.id,
            modelo: moto.modelo,
            descricao: `${moto.marca} | ${moto.cilindrada}cc | ${moto.ano}`,
            valor: moto.valorDiaria ? `R$ ${moto.valorDiaria}/dia` : '',
            imagem: moto.imagem || '',
        }));
    } catch (err) {
        alert('Erro ao carregar motos do sistema: ' + err.message);
        return [];
    }
}

async function renderMotos() {
    motoList.innerHTML = '';
    const motos = await fetchMotosAPI();
    motos.forEach((moto, idx) => {
        const card = document.createElement('div');
        card.className = 'moto-card';
        card.tabIndex = 0;
        card.onclick = () => {
            window.location.href = `moto-detalhe.html?id=${moto.id}`;
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
