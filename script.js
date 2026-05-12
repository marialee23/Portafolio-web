document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.querySelector('.navbar-toggler');
  const menuNav = document.querySelector('#menuNav');
  const decisionButtons = document.querySelectorAll('[data-answer]');
  const feedback = document.getElementById('decision-feedback');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="#${id}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  function showFeedback(type) {
    if (!feedback) return;
    if (type === 'right') {
      feedback.textContent = '¡Correcto! Revisa el contenido generado, cita las fuentes y mantén tu aporte propio.';
      feedback.classList.remove('wrong');
      feedback.classList.add('correct');
    } else {
      feedback.textContent = 'Ten cuidado: usar texto sin citar o modificarlo sin referencia no es ético en el aula.';
      feedback.classList.remove('correct');
      feedback.classList.add('wrong');
    }
  }

  if (menuToggle && menuNav) {
    menuToggle.addEventListener('click', function () {
      menuNav.classList.toggle('show');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (menuNav) {
        menuNav.classList.remove('show');
      }
    });
  });

  decisionButtons.forEach(button => {
    button.addEventListener('click', function () {
      showFeedback(this.dataset.answer);
    });
  });

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);
});