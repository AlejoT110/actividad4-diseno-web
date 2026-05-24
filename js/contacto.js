/* ============================================================
   contacto.js – Validación del formulario de contacto
   ============================================================ */

(function initContactForm() {
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar con la API nativa de Bootstrap
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Simulación de envío exitoso
    form.classList.remove('was-validated');
    form.reset();

    successMsg.classList.remove('d-none');

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      successMsg.classList.add('d-none');
    }, 5000);
  });
})();
