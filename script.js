const yearNode = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const countNodes = document.querySelectorAll('[data-count]');
const tiltCards = document.querySelectorAll('[data-tilt]');
const milestones = document.querySelectorAll('.milestone');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (yearNode) {
  yearNode.textContent = new Date().getFullYear().toString();
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

const animateCounter = (node) => {
  const target = Number(node.dataset.count || 0);
  const start = performance.now();
  const duration = 1200;

  const frame = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = String(Math.floor(target * eased));
    if (progress < 1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

countNodes.forEach((node) => counterObserver.observe(node));

if (!reducedMotion) {
  milestones.forEach((item) => {
    item.style.setProperty('--offset', '24px');
    item.style.setProperty('--opacity', '0.35');
    item.style.setProperty('--rot', '0deg');
  });

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--ry', `${x * 5}deg`);
      card.style.setProperty('--rx', `${-y * 5}deg`);
      card.style.setProperty('--ty', '-4px');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ty', '0px');
    });
  });

  const updateTimeline = () => {
    milestones.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const progress = Math.min(Math.max(1 - (rect.top - window.innerHeight * 0.75) / 180, 0), 1);
      item.style.setProperty('--offset', `${(1 - progress) * 28}px`);
      item.style.setProperty('--opacity', `${0.25 + progress * 0.75}`);
      item.style.borderColor = `rgba(25, 18, 15, ${0.2 + progress * 0.35})`;
      item.style.setProperty('--rot', `${(index - 1) * (1 - progress) * 0.6}deg`);
    });
  };

  updateTimeline();
  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline);
}
