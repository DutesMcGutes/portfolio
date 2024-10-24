document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.contact-form');
  const themeSwitcher = document.querySelector('#theme-switcher');
  const savedTheme = localStorage.getItem('theme') || 'auto'; // Default to automatic

  // Apply the saved or default theme on page load
  applyTheme(savedTheme);
  if (themeSwitcher) {
    themeSwitcher.value = savedTheme;  // Set the dropdown to the saved theme
  }

  // Event listener for theme switcher dropdown
  themeSwitcher?.addEventListener('input', function(event) {
    const theme = event.target.value;
    applyTheme(theme);
    localStorage.setItem('theme', theme);  // Save the theme preference
  });

  // Function to apply the selected theme
  function applyTheme(theme) {
    console.log("Applying theme: ", theme);  // Debugging log
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
      console.log("Theme set to auto.");
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      console.log("Theme set to: ", theme);
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
