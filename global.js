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

  // Dynamic Navigation Creation
  const pages = [
    { url: '/portfolio/index.html', title: 'Home' },
    { url: '/portfolio/projects/index.html', title: 'Projects' },
    { url: '/portfolio/contact/index.html', title: 'Contact' },
    { url: '/portfolio/cv/index.html', title: 'CV' },
    { url: 'https://github.com/DutesMcGutes', title: 'GitHub Profile' }
  ];

  const nav = document.createElement('nav');
  document.body.prepend(nav);

  for (let page of pages) {
    const a = document.createElement('a');
    a.href = page.url;
    a.textContent = page.title;

    if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add('current');
    }

    if (a.host !== location.host) {
      a.target = "_blank";
    }

    nav.appendChild(a);
  }
});
