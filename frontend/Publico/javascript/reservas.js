// reservas.js
// Exemplo: buscar reservas do usuário autenticado

document.addEventListener('DOMContentLoaded', async () => {
    const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Usuário';
    document.getElementById('perfilArea').innerHTML = `
        <button id="perfilMenuBtn" style="background:none;border:none;color:#444;font-weight:600;cursor:pointer;">${nomeUsuario} &#x25BC;</button>
        <ul id="perfilDropdown" style="display:none;position:absolute;right:10px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.12);border-radius:8px;min-width:140px;z-index:100;list-style:none;padding:8px 0;">
            <li><a href="reservas.html" style="display:block;padding:6px 12px;color:#444;text-decoration:none;">Minhas Reservas</a></li>
            <li><a href="planos.html" style="display:block;padding:6px 12px;color:#444;text-decoration:none;">Planos Assinados</a></li>
            <li><a href="login.html" style="display:block;padding:6px 12px;color:#c00;text-decoration:none;">Sair</a></li>
        </ul>
    `;
    const btn = document.getElementById('perfilMenuBtn');
    const dropdown = document.getElementById('perfilDropdown');
    let timeout;
    btn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    btn.addEventListener('blur', () => {
        timeout = setTimeout(() => dropdown.style.display = 'none', 200);
    });
    dropdown.addEventListener('mouseenter', () => clearTimeout(timeout));
    dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => dropdown.style.display = 'none', 200);
    });
    // Aqui você pode buscar as reservas do usuário autenticado
    document.getElementById('reservasList').innerHTML = '<p>Exemplo de reservas do usuário logado.</p>';
});
