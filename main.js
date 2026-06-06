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

  /* Hero video — parallax au scroll */
  var heroVideo = document.querySelector('.hero-video');
  if (heroVideo && window.innerWidth >= 961 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var heroSection = document.querySelector('.page-hero');
    window.addEventListener('scroll', function () {
      if (window.scrollY <= heroSection.offsetHeight) {
        heroVideo.style.transform = 'translateY(' + (window.scrollY * 0.35) + 'px)';
      }
    }, { passive: true });
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
  /* Events passés — archivage automatique dans le dépliant */
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var pastItems = [];
  document.querySelectorAll('[data-event-end]').forEach(function (el) {
    var end = new Date(el.getAttribute('data-event-end'));
    if (end < today) pastItems.push(el);
  });
  if (pastItems.length > 0) {
    var pastList = document.getElementById('past-events-list');
    var pastDetails = document.getElementById('past-events-details');
    var pastCount = document.getElementById('past-events-count');
    if (pastList && pastDetails) {
      pastItems.reverse().forEach(function (el) { pastList.appendChild(el); });
      if (pastCount) pastCount.textContent = pastItems.length;
      pastDetails.style.display = '';
    }
  }

  /* Ticker festivals — filtre les events passés et reconstruit les 2 sets */
  var tickerTrack = document.getElementById('ticker-track');
  if (tickerTrack) {
    var tickerNodes = Array.from(tickerTrack.children);
    var kept = [];
    for (var t = 0; t < tickerNodes.length; t++) {
      var tNode = tickerNodes[t];
      if (tNode.classList && tNode.classList.contains('ticker-item')) {
        var tEnd = tNode.getAttribute('data-end');
        var tDate = tEnd ? new Date(tEnd) : null;
        if (!tDate || tDate >= today) {
          kept.push({ item: tNode, sep: tickerNodes[t + 1] || null });
        }
      }
    }
    if (kept.length === 0) {
      var tickerEl = tickerTrack.closest('.festival-ticker');
      if (tickerEl) tickerEl.style.display = 'none';
    } else {
      tickerTrack.innerHTML = '';
      [kept, kept].forEach(function (set) {
        set.forEach(function (pair) {
          tickerTrack.appendChild(pair.item.cloneNode(true));
          if (pair.sep) tickerTrack.appendChild(pair.sep.cloneNode(true));
        });
      });
      tickerTrack.style.animationDuration = Math.max(12, kept.length * 4.5) + 's';
    }
  }
})();
