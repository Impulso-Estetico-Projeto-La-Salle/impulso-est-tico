// Sidebar compartilhada entre todas as páginas
// Uso: <div id="sidebar"></div> + Sidebar.render('dashboard')

const Sidebar = {
  render(paginaAtiva) {
    const links = [
      { href: 'dashboard.html',    icon: '📊', label: 'Dashboard' },
      { href: 'clientes.html',     icon: '👤', label: 'Clientes' },
      { href: 'agendamentos.html', icon: '📅', label: 'Agendamentos' },
    ];

    const nav = links.map(l => `
      <a href="${l.href}" class="${l.href.includes(paginaAtiva) ? 'active' : ''}">
        ${l.icon} ${l.label}
      </a>
    `).join('');

    document.getElementById('sidebar').innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-logo">
          Impulso Estético
          <span>Gestão da clínica</span>
        </div>
        <nav>${nav}</nav>
      </aside>
    `;
  }
};
