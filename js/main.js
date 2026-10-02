// Mobile navigation toggle
(function () {
  var nav = document.querySelector('nav');
  var toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('nav-open'));
  });

  // Close after choosing a link, on Escape, on outside click, or when resized to desktop
  nav.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setOpen(false);
  });
})();

// Footer year
document.querySelectorAll('.js-year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Contact form: no backend, so open the visitor's email app with the message pre-filled
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('cf-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var first = form.first.value.trim();
    var last = form.last.value.trim();
    var email = form.email.value.trim();
    var area = form.area.value;
    var message = form.message.value.trim();

    var invalid = [form.first, form.email, form.message].filter(function (f) {
      return !f.value.trim() || !f.checkValidity();
    });
    form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
    if (invalid.length) {
      invalid.forEach(function (f) { f.setAttribute('aria-invalid', 'true'); });
      status.textContent = 'Please fill in your first name, a valid email address and a message.';
      status.className = 'form-status form-status-error';
      invalid[0].focus();
      return;
    }

    var name = (first + ' ' + last).trim();
    var subject = 'Website inquiry' + (area ? ': ' + area : '') + ' (' + name + ')';
    var body = message + '\n\n---\nName: ' + name + '\nEmail: ' + email +
      (area ? '\nArea of interest: ' + area : '');
    window.location.href = 'mailto:' + form.getAttribute('data-email') +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    status.textContent = 'Your email app should open with your message ready to send. If it doesn’t, email us at ' +
      form.getAttribute('data-email') + '.';
    status.className = 'form-status form-status-ok';
  });
})();
