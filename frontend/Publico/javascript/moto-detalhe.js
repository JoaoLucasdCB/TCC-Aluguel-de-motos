// Exemplo de preenchimento dinâmico (pode ser adaptado para integração real)
// Espera-se que a página seja chamada como: moto-detalhe.html?id=1
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
// Simulação de dados (substitua por fetch real se necessário)
const motos = [
    {
        id: '1',
        nome: 'Honda CB 500F',
        marca: 'Honda',
        modelo: 'CB 500F',
        ano: '2023',
        cilindrada: '500cc',
        cor: 'Vermelha',
        combustivel: 'Gasolina',
        preco: '180,00',
        img: '../img/cb500f.png',
        fotos: ['../img/cb500f.png', '../img/cb500f-2.png', '../img/cb500f-3.png'],
        peso: '178 kg',
        altura: '789 mm',
        tanque: '17,1 L'
    },
    {
        id: '2',
        nome: 'Yamaha MT-03',
        marca: 'Yamaha',
        modelo: 'MT-03',
        ano: '2022',
        cilindrada: '321cc',
        cor: 'Preta',
        combustivel: 'Gasolina',
        preco: '150,00',
        img: '../img/mt03.png',
        fotos: ['../img/mt03.png', '../img/mt03-2.png', '../img/mt03-3.png'],
        peso: '168 kg',
        altura: '780 mm',
        tanque: '14 L'
    }
    // ...adicione mais motos conforme necessário
];
const moto = motos.find(m => m.id === id) || motos[0];
document.getElementById('motoImg').src = moto.img;
document.getElementById('motoNome').textContent = moto.nome;
document.getElementById('motoMarca').textContent = moto.marca;
document.getElementById('motoModelo').textContent = moto.modelo;
document.getElementById('motoAno').textContent = moto.ano;
document.getElementById('motoCilindrada').textContent = moto.cilindrada;
document.getElementById('motoCor').textContent = moto.cor;
document.getElementById('motoCombustivel').textContent = moto.combustivel;
document.getElementById('motoPreco').textContent = moto.preco;
document.getElementById('motoPeso').textContent = moto.peso || '-';
document.getElementById('motoAltura').textContent = moto.altura || '-';
document.getElementById('motoTanque').textContent = moto.tanque || '-';
// Galeria de fotos
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('motoGallery');
    if (gallery && moto.fotos && moto.fotos.length > 0) {
        gallery.innerHTML = '';
        moto.fotos.forEach(foto => {
            const img = document.createElement('img');
            img.src = foto;
            img.alt = moto.nome;
            img.onclick = () => {
                document.getElementById('motoImg').src = foto;
            };
            gallery.appendChild(img);
        });
    }
});
