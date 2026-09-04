// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileNav();
    }
  });
});

// Scroll reveal for tech stack
const reveals = document.querySelectorAll('.reveal');
const sectionReveals = document.querySelectorAll('.section-reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        entry.target.style.transitionDelay = '0ms';
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.08}s`;
        entry.target.classList.add('revealed');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
);

reveals.forEach(el => revealObserver.observe(el));
sectionReveals.forEach(el => sectionObserver.observe(el));

// Project card: View details = pop-out overlay, Back = return to grid
document.querySelectorAll('.project-card').forEach(card => {
  const openBtn = card.querySelector('.project-toggle');
  const backBtn = card.querySelector('.project-back-btn');
  let originalParent = null;
  let originalNextSibling = null;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      originalParent = card.parentNode;
      originalNextSibling = card.nextSibling;
      document.body.appendChild(card);
      card.classList.add('expanded');
      document.body.classList.add('project-overlay-open');
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      card.classList.remove('expanded');
      document.body.classList.remove('project-overlay-open');
      if (originalParent) {
        originalParent.insertBefore(card, originalNextSibling);
      }
    });
  }
});

// Navbar scroll state
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Active nav link on scroll
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sections = Array.from(navLinks).map(link =>
  document.getElementById(link.dataset.section)
).filter(Boolean);

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: `-${navbar.offsetHeight}px 0px -60% 0px` }
);

sections.forEach(section => navObserver.observe(section));

// Mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');

function closeMobileNav() {
  navToggle.setAttribute('aria-expanded', 'false');
  navLinksEl.classList.remove('open');
}

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinksEl.classList.toggle('open', !isOpen);
});

// Back to top
document.querySelector('.back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Close overlay on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const expanded = document.querySelector('.project-card.expanded');
    if (expanded) {
      expanded.querySelector('.project-back-btn')?.click();
    }
    closeMobileNav();
  }
});
