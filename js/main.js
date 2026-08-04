/* ===================================================
   LIVE OAK SAFETY — Main JS
   =================================================== */

// ----- NAV: scroll shadow -----
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ----- NAV: mobile toggle -----
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.querySelectorAll('span')[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    toggle.querySelectorAll('span')[1].style.opacity  = open ? '0' : '';
    toggle.querySelectorAll('span')[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ----- SCROLL ANIMATIONS -----
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  // Stagger items in a group
  document.querySelectorAll('.fade-group').forEach(group => {
    group.querySelectorAll('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  fadeEls.forEach(el => io.observe(el));
}

// ----- CONTACT FORM: AJAX via Formspree -----
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const wrapper = form.closest('.form-wrapper');
    const success = wrapper ? wrapper.querySelector('.form-success') : null;

    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        if (success) success.classList.add('visible');
      } else {
        const data = await res.json().catch(() => ({}));
        btn.textContent = data.error || 'Something went wrong — please try again.';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Connection error — please try again.';
      btn.disabled = false;
    }
  });
});

// ----- SMOOTH ANCHOR SCROLL (for in-page #links) -----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 76; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
