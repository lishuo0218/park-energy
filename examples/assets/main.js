// assets/main.js — 页面交互：阅读进度条 / 目录 scrollspy / 滚动渐入
(function () {
  var doc = document.documentElement;

  // ---- 阅读进度条 ----
  var bar = document.getElementById('progressBar');
  function onProgress() {
    if (!bar) return;
    var max = doc.scrollHeight - doc.clientHeight;
    var cur = window.pageYOffset || doc.scrollTop || 0;
    bar.style.width = (max > 0 ? Math.min(cur / max * 100, 100) : 0) + '%';
  }

  // ---- 滚动渐入 ----
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealIO.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -36px 0px', threshold: 0.04 });
    reveals.forEach(function (el) { revealIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- 目录 scrollspy ----
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-toc]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id], footer[id]'));
  function spy() {
    var pos = (window.pageYOffset || doc.scrollTop || 0) + 140;
    var cur = null;
    sections.forEach(function (s) { if (s.offsetTop <= pos) cur = s.id; });
    var target = cur ? '#' + cur : null;
    links.forEach(function (a) {
      var on = a.getAttribute('href') === target;
      a.classList.toggle('active', on);
      // 移动端顶栏让活动项保持可见
      if (on && window.matchMedia('(max-width: 1180px)').matches &&
          a.parentElement === document.querySelector('.topnav')) {
        var nav = a.parentElement;
        nav.scrollLeft = Math.max(a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2, 0);
      }
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onProgress();
      spy();
      ticking = false;
    });
  }, { passive: true });
  window.addEventListener('resize', function () { onProgress(); spy(); });
  onProgress();
  spy();
})();
