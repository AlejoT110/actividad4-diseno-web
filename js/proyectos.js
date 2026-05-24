/* ============================================================
   proyectos.js – Filtro de categorías en la página Proyectos
   ============================================================ */

(function initFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.project-card-wrap');

  if (!pills.length || !cards.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Actualizar estado activo del pill
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;

      // Mostrar/ocultar tarjetas
      // Usamos classList.toggle('hidden') en lugar de style.display
      // porque Bootstrap usa d-flex !important y ganaría al inline style.
      // La clase .hidden en CSS tiene mayor especificidad y usa !important.
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();
