document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.contact-form');
  const select = document.querySelector('#theme-switcher');
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light theme

  // Apply the saved or default theme
  applyTheme(savedTheme);
  if (select) {
    select.value = savedTheme;
  }

  // Event listener for theme switcher
  select?.addEventListener('input', function (event) {
    const theme = event.target.value;
    applyTheme(theme);
    localStorage.setItem('theme', theme); // Save user preference
  });

  function applyTheme(theme) {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  // Intercept form submission to encode the data into a mailto URL
  form?.addEventListener('submit', function(event) {
    event.preventDefault();

    const data = new FormData(form);
    let mailtoLink = form.getAttribute('action') + '?';

    for (let [name, value] of data) {
      mailtoLink += `${encodeURIComponent(name)}=${encodeURIComponent(value)}&`;
    }

    // Remove the trailing "&" and open the mail client
    mailtoLink = mailtoLink.slice(0, -1);
    location.href = mailtoLink;
  });
});