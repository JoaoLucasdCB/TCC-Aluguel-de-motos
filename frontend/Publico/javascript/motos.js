// Garante que as motos são renderizadas ao carregar a página
document.addEventListener('DOMContentLoaded', renderMotos);


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
    showMsg('Erro ao carregar motos do sistema: ' + err.message, 'error');
        return [];
    }
}

async function renderMotos() {
    motoList.innerHTML = '';
    const motos = await fetchMotosAPI();
    motos.forEach((moto, idx) => {
        console.log('Moto:', moto.modelo, '| Imagem:', moto.imagem);
        const card = document.createElement('div');
        card.className = 'moto-card';

        // Imagem
        let imgDiv = document.createElement('div');
        imgDiv.className = 'moto-img';
        if (moto.imagemUrl || moto.imagem) {
            const img = document.createElement('img');
            img.src = moto.imagemUrl || moto.imagem;
            img.alt = moto.modelo;
            imgDiv.appendChild(img);
        } else {
            imgDiv.textContent = '🛵';
        }
        card.appendChild(imgDiv);

        // Informações
        let infoDiv = document.createElement('div');
        infoDiv.className = 'moto-info';

        // Selo "Mais alugada" (exemplo: só para a primeira moto ou conforme critério)
        if (idx === 0 || moto.maisAlugada) {
            const badge = document.createElement('div');
            badge.className = 'badge';
            badge.innerHTML = '★ Mais alugada';
            infoDiv.appendChild(badge);
        }

        const modelo = document.createElement('div');
        modelo.className = 'modelo';
        modelo.textContent = moto.modelo;
        infoDiv.appendChild(modelo);

        const descricao = document.createElement('div');
        descricao.className = 'descricao';
        descricao.textContent = moto.descricao;
        infoDiv.appendChild(descricao);

        const valor = document.createElement('div');
        valor.className = 'valor';
        valor.textContent = moto.valor || '';
        infoDiv.appendChild(valor);

        card.appendChild(infoDiv);

        // Botão Alugar Agora
        const btn = document.createElement('button');
        btn.className = 'alugar-btn';
        btn.textContent = 'Alugar Agora';
        btn.onclick = (e) => {
            e.stopPropagation();
            window.location.href = `aluguel.html?id=${moto.id}`;
        };
        card.appendChild(btn);

        // Redireciona ao clicar no card (exceto botão)
        card.onclick = (e) => {
            if (e.target !== btn) {
                window.location.href = `moto-detalhe.html?id=${moto.id}`;
            }
        };

        motoList.appendChild(card);
    });
}
