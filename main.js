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

  /* Ticker — construit dynamiquement depuis la liste des events à venir */
  var tickerTrack = document.getElementById('ticker-track');
  if (tickerTrack) {
    var lang = document.documentElement.lang || 'fr';
    var months = lang === 'en'
      ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      : ['Jan.','Fév.','Mar.','Avr.','Mai','Juin','Juil.','Août','Sep.','Oct.','Nov.','Déc.'];
    var tickerData = [];
    document.querySelectorAll('[data-event-end]').forEach(function (el) {
      var endDate = new Date(el.getAttribute('data-event-end'));
      if (endDate < today) return;
      var nameEl = el.querySelector('.event-name');
      var cityEl = el.querySelector('.event-city');
      if (!nameEl) return;
      var d = endDate;
      var dateStr = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
      var city = cityEl ? cityEl.textContent.trim() : '';
      tickerData.push({ name: nameEl.textContent.trim(), sub: (city ? city + ' · ' : '') + dateStr });
    });
    if (tickerData.length === 0) {
      var tickerEl = tickerTrack.closest('.festival-ticker');
      if (tickerEl) tickerEl.style.display = 'none';
    } else {
      function buildTickerSet(data) {
        data.forEach(function (d) {
          var item = document.createElement('div');
          item.className = 'ticker-item';
          var nameSpan = document.createElement('span');
          nameSpan.className = 'ticker-name';
          nameSpan.textContent = d.name;
          var subSpan = document.createElement('span');
          subSpan.className = 'ticker-sub';
          subSpan.textContent = d.sub;
          item.appendChild(nameSpan);
          item.appendChild(subSpan);
          tickerTrack.appendChild(item);
          var sep = document.createElement('span');
          sep.className = 'ticker-sep';
          sep.setAttribute('aria-hidden', 'true');
          sep.textContent = '◆';
          tickerTrack.appendChild(sep);
        });
      }
      tickerTrack.innerHTML = '';
      buildTickerSet(tickerData);
      buildTickerSet(tickerData);
      tickerTrack.style.animationDuration = Math.max(12, tickerData.length * 4.5) + 's';
    }
  }
})();
