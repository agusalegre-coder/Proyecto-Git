function smoothScrollTo(id, duration = 1200, triggerEl = null) {
    const target = document.getElementById(id);
    if (!target) return;

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    let startTime = null;

    if (triggerEl) triggerEl.classList.add('forzar-hover');

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function step(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutQuad(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (triggerEl) {

        triggerEl.classList.remove('forzar-hover');
      }
    }

    requestAnimationFrame(step);
  }

  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.titulo-hueco').forEach((el) => {
      el.addEventListener('animationend', (e) => {
        if (e.animationName === 'zoomIn') {
          el.style.animation = 'moverDegradado 7s linear infinite';
        }
      });
    });
  });