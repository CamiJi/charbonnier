/** Barre de menus : horloge, section active, fermeture du menu Apple. */

const clock = document.querySelector<HTMLTimeElement>('#menu-clock');

function tick(): void {
  if (!clock) return;
  const now = new Date();
  const locale = document.documentElement.lang === 'fr' ? 'fr-FR' : 'en-GB';
  clock.textContent = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);
  const pad = (value: number): string => String(value).padStart(2, '0');
  clock.dateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

tick();
setInterval(tick, 15_000);

/** Surligne dans la barre de menus la section visible. */
const menuLinks = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>('.menu-link[data-section]').forEach((link) => {
  menuLinks.set(link.dataset.section ?? '', link);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      menuLinks.forEach((link) => link.classList.remove('is-active'));
      menuLinks.get(entry.target.id)?.classList.add('is-active');
    });
  },
  { rootMargin: '-25% 0px -65% 0px' },
);

menuLinks.forEach((_, id) => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});

/** Menu Apple : fermeture au clic extérieur, sur un lien, ou sur Échap. */
const appleMenu = document.querySelector<HTMLDetailsElement>('.apple-menu');

document.addEventListener('click', (event) => {
  if (appleMenu?.open && !appleMenu.contains(event.target as Node)) {
    appleMenu.open = false;
  }
});

appleMenu?.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) {
    appleMenu.open = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && appleMenu?.open) {
    appleMenu.open = false;
    appleMenu.querySelector<HTMLElement>('summary')?.focus();
  }
});
