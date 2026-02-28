const yearNode = document.getElementById('year');
const panel = document.getElementById('nav-panel');
const panelButton = document.getElementById('open-panel');
const revealItems = document.querySelectorAll('.reveal');
const signalStage = document.querySelector('[data-stage]');
const signalNodes = document.querySelectorAll('[data-node]');
const timelineTrack = document.querySelector('[data-track]');
const milestones = document.querySelectorAll('.milestone');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (yearNode) {
  yearNode.textContent = new Date().getFullYear().toString();
}

const setPanelState = (open) => {
  panel.classList.toggle('open', open);
  panel.setAttribute('aria-hidden', String(!open));
  panelButton.setAttribute('aria-expanded', String(open));
};

panelButton.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = panel.classList.contains('open');
  setPanelState(!isOpen);
});

document.addEventListener('click', (event) => {
  if (!panel.contains(event.target) && event.target !== panelButton) {
    setPanelState(false);
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setPanelState(false);
  }
});

window.addEventListener('scroll', () => {
  if (panel.classList.contains('open')) {
    setPanelState(false);
  }
}, { passive: true });

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

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const animateAbstractScenes = () => {
  if (reducedMotion) {
    return;
  }

  if (signalStage) {
    const rect = signalStage.getBoundingClientRect();
    const progress = clamp(1 - rect.top / window.innerHeight, 0, 1.5);

    signalNodes.forEach((node, idx) => {
      const offset = idx - 1;
      const driftX = offset * 34 * (1 - progress * 0.35);
      const driftY = (1 - progress) * 26;
      const rotate = offset * 2.6 * (1 - progress * 0.2);
      const opacity = clamp(0.45 + progress * 0.5, 0, 1);

      node.style.setProperty('--x', `${driftX}px`);
      node.style.setProperty('--y', `${driftY}px`);
      node.style.setProperty('--r', `${rotate}deg`);
      node.style.setProperty('--o', String(opacity));
    });
  }

  if (timelineTrack) {
    const rect = timelineTrack.getBoundingClientRect();
    const progress = clamp(1 - rect.top / (window.innerHeight * 0.9), 0, 1.2);

    milestones.forEach((item, idx) => {
      const local = clamp(progress * 1.2 - idx * 0.25, 0, 1);
      const y = (1 - local) * 36;
      const o = clamp(0.3 + local * 0.8, 0, 1);
      item.style.setProperty('--my', `${y}px`);
      item.style.setProperty('--mo', String(o));
    });
  }
};

animateAbstractScenes();
window.addEventListener('scroll', animateAbstractScenes, { passive: true });
window.addEventListener('resize', animateAbstractScenes);
