/* ======================================================
   ATELIER HIRO — script.js
   ====================================================== */

/* ── LOADING SCREEN ─────────────────────────────── */
(function () {
    const screen = document.getElementById('loadingScreen');
    const fill = document.getElementById('loadingFill');
    let pct = 0;
    const timer = setInterval(() => {
        pct += Math.random() * 18 + 4;
        if (pct >= 100) {
            pct = 100;
            clearInterval(timer);
            setTimeout(() => { screen.classList.add('hidden'); }, 300);
        }
        fill.style.width = pct + '%';
    }, 60);
})();

/* ── HEADER SCROLL EFFECT ───────────────────────── */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── HAMBURGER / MOBILE MENU ─────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-order-btn').forEach(el => {
    el.addEventListener('click', closeMobileMenu);
});

/* ── SCROLL REVEAL ───────────────────────────────── */
const reveals = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            e.target.style.transitionDelay = (i * 0.06) + 's';
            e.target.classList.add('revealed');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => revealObs.observe(el));

/* ── FAQ ACCORDION ───────────────────────────────── */
function toggleFAQ(id) {
    const item = document.getElementById(id);
    const btn = item.querySelector('.faq-question');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }
}

/* ── BACK TO TOP ─────────────────────────────────── */
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── DELIVERY DATE ───────────────────────────────── */
if (typeof DELIVERY_DATE !== 'undefined') {
    document.getElementById('deliveryDate').textContent = DELIVERY_DATE;
}

/* ── GALLERY DRAG SCROLL ─────────────────────────── */
const gallery = document.getElementById('galleryScroll');
if (gallery) {
    const wrap = gallery.parentElement;
    let isDragging = false, startX = 0, scrollLeft = 0;
    wrap.addEventListener('mousedown', e => {
        isDragging = true; startX = e.pageX - wrap.offsetLeft;
        scrollLeft = wrap.scrollLeft; wrap.style.cursor = 'grabbing';
    });
    wrap.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const x = e.pageX - wrap.offsetLeft;
        wrap.scrollLeft = scrollLeft - (x - startX);
    });
    ['mouseup', 'mouseleave'].forEach(ev =>
        wrap.addEventListener(ev, () => { isDragging = false; wrap.style.cursor = ''; })
    );
}

/* ── SMOOTH NAV LINK ACTIVE STATE ────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const activeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => {
                a.style.background = '';
                a.style.color = '';
                if (a.getAttribute('href') === '#' + e.target.id) {
                    a.style.background = 'var(--soft-pink)';
                    a.style.color = 'var(--coral)';
                }
            });
        }
    });
}, { threshold: 0.4 });
sections.forEach(s => activeObs.observe(s));
