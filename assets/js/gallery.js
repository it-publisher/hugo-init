// Несколько <img> в одном <figure> — лента с прокруткой, стрелками и счётчиком.
// Без JS картинки остаются одна под другой.
(function () {
  'use strict';

  function buildGallery(figure, images) {
    var strip = document.createElement('div');
    strip.className = 'gallery-strip';
    images.forEach(function (img) { strip.appendChild(img); });
    figure.insertBefore(strip, figure.firstChild);

    var controls = document.createElement('div');
    controls.className = 'gallery-controls';
    controls.innerHTML =
      '<button type="button" aria-label="Предыдущая картинка">←</button>' +
      '<span aria-live="polite"></span>' +
      '<button type="button" aria-label="Следующая картинка">→</button>';
    strip.after(controls);

    var prev = controls.querySelector('button:first-child');
    var next = controls.querySelector('button:last-child');
    var counter = controls.querySelector('span');

    function currentIndex() {
      return Math.round(strip.scrollLeft / strip.clientWidth);
    }

    function update() {
      var index = currentIndex();
      counter.textContent = (index + 1) + ' / ' + images.length;
      prev.disabled = index === 0;
      next.disabled = index === images.length - 1;
    }

    function scrollByImages(step) {
      strip.scrollBy({ left: step * strip.clientWidth, behavior: 'smooth' });
    }

    prev.addEventListener('click', function () { scrollByImages(-1); });
    next.addEventListener('click', function () { scrollByImages(1); });
    strip.addEventListener('scroll', update, { passive: true });
    update();
  }

  document.querySelectorAll('.prose figure').forEach(function (figure) {
    var images = Array.from(figure.querySelectorAll(':scope > img'));
    if (images.length > 1) buildGallery(figure, images);
  });
})();
