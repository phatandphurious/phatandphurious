/* ── Phat & Phurious FM — Navigation partagée ── */
(function () {
  'use strict';

  /* Navbar — effet au scroll */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle('scrolled', window.scrollY > 16);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Burger — menu mobile */
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener('click', function () {
      var open = burgerBtn.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      burgerBtn.setAttribute('aria-expanded', String(open));
      burgerBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burgerBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }
})();
