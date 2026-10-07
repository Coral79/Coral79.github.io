(function () {
  'use strict';
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var preference = null;
  try { preference = localStorage.getItem('coral-theme'); } catch (_) {}
  if (preference !== 'light' && preference !== 'dark') preference = null;

  function apply(theme) {
    root.dataset.theme = theme;
    var button = document.querySelector('.theme-toggle');
    if (button) {
      var label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#191b23' : '#f6f5f1');
  }

  apply(preference || (media.matches ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', function () {
    apply(root.dataset.theme);
    document.querySelector('.theme-toggle').addEventListener('click', function () {
      preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('coral-theme', preference); } catch (_) {}
      apply(preference);
    });
  });
  media.addEventListener('change', function (event) {
    if (!preference) apply(event.matches ? 'dark' : 'light');
  });
}());
