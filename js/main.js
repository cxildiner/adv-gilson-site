/* ============================================================
   Gilson Santos Advocacia Trabalhista
   Sem dependências. Sem framework.
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     1. Destino do CTA
     Um único lugar para trocar o link do formulário.
     Todo elemento com [data-cta] recebe esta URL.
     -------------------------------------------------------- */
  var FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSctGFj4ePfKqTHPi4UJaU5LEd_X2xmTLdi6V3ftskDKNDGhYA/viewform?usp=header';

  var ctas = document.querySelectorAll('[data-cta]');

  Array.prototype.forEach.call(ctas, function (el) {
    el.setAttribute('href', FORM_URL);

    /* Marca a origem do clique. Serve para leitura futura em
       Analytics/Tag Manager sem precisar mexer no HTML. */
    el.addEventListener('click', function () {
      var origem = el.getAttribute('data-cta');

      if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({ event: 'cta_formulario', origem: origem });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'cta_formulario', { origem: origem });
      }
    });
  });

  /* --------------------------------------------------------
     2. Menu mobile
     -------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var backdrop = document.getElementById('navBackdrop');

  function setMenu(open) {
    if (!nav || !toggle) return;

    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';

    if (backdrop) {
      backdrop.hidden = false;
      backdrop.classList.toggle('is-open', open);
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', function () { setMenu(false); });
  }

  /* Fecha ao navegar ou ao apertar Esc */
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) setMenu(false);
  });

  /* --------------------------------------------------------
     3. Sombra do header ao rolar + CTA fixo no celular
     O CTA fixo só aparece depois que o hero sai da tela, para
     não competir com o CTA principal.
     -------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var sticky = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');

  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset;

    if (header) header.classList.toggle('is-stuck', y > 8);

    if (sticky && hero) {
      var passouHero = y > hero.offsetTop + hero.offsetHeight - 120;
      var noRodape = (y + window.innerHeight) > (document.body.scrollHeight - 220);
      sticky.classList.toggle('is-visible', passouHero && !noRodape);
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();

  /* --------------------------------------------------------
     4. FAQ (acordeão acessível)
     -------------------------------------------------------- */
  var perguntas = document.querySelectorAll('.faq__q');

  Array.prototype.forEach.call(perguntas, function (botao) {
    botao.addEventListener('click', function () {
      var item = botao.closest('.faq__item');
      var aberto = botao.getAttribute('aria-expanded') === 'true';

      botao.setAttribute('aria-expanded', String(!aberto));
      item.classList.toggle('is-open', !aberto);
    });
  });

  /* --------------------------------------------------------
     5. Revelação ao rolar
     -------------------------------------------------------- */
  var alvos = document.querySelectorAll('.reveal');

  var prefereMenosMovimento =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || prefereMenosMovimento) {
    Array.prototype.forEach.call(alvos, function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-in');
          observer.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(alvos, function (el) { observer.observe(el); });
  }

  /* --------------------------------------------------------
     6. Ano do rodapé
     -------------------------------------------------------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

})();
