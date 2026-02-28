const cursorGlow = document.querySelector('.cursor-glow');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');
const openCommandBtn = document.getElementById('open-command');
const commandPalette = document.getElementById('command-palette');

const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!motionReduced) {
  document.addEventListener('pointermove', (event) => {
    const x = `${event.clientX}px`;
    const y = `${event.clientY}px`;
    cursorGlow.style.setProperty('--mx', x);
    cursorGlow.style.setProperty('--my', y);
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateCounter = (element) => {
  const target = Number(element.dataset.counter || 0);
  const duration = 1200;
  const startTime = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(target * eased).toString();
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const togglePalette = (show) => {
  commandPalette.hidden = !show;
};

openCommandBtn.addEventListener('click', () => {
  togglePalette(commandPalette.hidden);
});

window.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    togglePalette(commandPalette.hidden);
  }

  if (event.key === 'Escape' && !commandPalette.hidden) {
    togglePalette(false);
  }
});

commandPalette.addEventListener('click', (event) => {
  if (event.target === commandPalette || event.target.tagName === 'A') {
    togglePalette(false);
  }
});
