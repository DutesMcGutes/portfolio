// Select all navigation links
const navLinks = $$('nav a');

// Get the current page's link
const currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

// Add 'current' class to the current link
currentLink?.classList.add('current');

// Pages data array
const pages = [
  { url: '/portfolio/index.html', title: 'Home' },
  { url: '/portfolio/projects/index.html', title: 'Projects' },
  { url: '/portfolio/contact/index.html', title: 'Contact' },
  { url: '/portfolio/cv/index.html', title: 'CV' },
  { url: 'https://github.com/DutesMcGutes', title: 'GitHub Profile' }
];

// Create a new nav element
const nav = document.createElement('nav');
document.body.prepend(nav);

// Loop through the pages array to generate the links
for (let page of pages) {
  const a = document.createElement('a');
  a.href = page.url;
  a.textContent = page.title;

  // Add the current class if the link matches the current page
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

  // Open external links in a new tab
  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.appendChild(a);
}
// Add dark mode switcher
document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select id="theme-switcher">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="auto">Automatic</option>
    </select>
  </label>
  `
);

const select = document.querySelector('#theme-switcher');

// Load saved theme or use system preference
const savedTheme = localStorage.getItem('theme') || 'auto';
applyTheme(savedTheme);
select.value = savedTheme;

select.addEventListener('input', (event) => {
  const theme = event.target.value;
  applyTheme(theme);
  localStorage.setItem('theme', theme);  // Save user preference
});

function applyTheme(theme) {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const data = new FormData(form);
  const action = form.getAttribute('action');
  const queryString = new URLSearchParams(data).toString();

  const mailtoLink = `${action}?${queryString}`;
  location.href = mailtoLink; // Open email client with prefilled fields
});
