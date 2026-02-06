// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll reveal for tech stack
const reveals = document.querySelectorAll(".reveal");
const sectionReveals = document.querySelectorAll(".section-reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        entry.target.style.transitionDelay = "0ms";
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
);

// Section reveal - staggered feel
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
);

reveals.forEach(el => revealObserver.observe(el));
sectionReveals.forEach(el => sectionObserver.observe(el));

// Project card: View details = pop-out overlay, Back = return to grid
// Move expanded card to body so it escapes ancestor transforms (which break position:fixed scrolling)
document.querySelectorAll(".project-card").forEach((card) => {
  const openBtn = card.querySelector(".project-toggle");
  const backBtn = card.querySelector(".project-back-btn");
  let originalParent = null;
  let originalNextSibling = null;

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      originalParent = card.parentNode;
      originalNextSibling = card.nextSibling;
      document.body.appendChild(card);
      card.classList.add("expanded");
      document.body.classList.add("project-overlay-open");
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      card.classList.remove("expanded");
      document.body.classList.remove("project-overlay-open");
      if (originalParent) {
        originalParent.insertBefore(card, originalNextSibling);
      }
    });
  }
});

