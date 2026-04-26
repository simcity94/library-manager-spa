import {html, render} from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';
import {layout} from './src/views/layout.js';
import {homeView} from './src/views/home.js';
import {usersView} from './src/views/users.js';
import {booksView} from './src/views/books.js';
import {bookDetailsView} from './src/views/bookDetails.js';
import {activitiesView} from './src/views/activities.js';
import {registerView} from './src/views/register.js';
import {loginView} from './src/views/login.js';

const ROOT = document.getElementById('page-root');

function renderPage(template) {
  render(template, ROOT);
}

function normalizePath(path) {
  const cleaned = String(path || '')
    .replace(/\/index\.html$/, '/')
    .replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

function setActiveLink(path) {
  const currentPath = normalizePath(path);
  const links = document.querySelectorAll('[data-link]');
  links.forEach((link) => {
    const hrefPath = normalizePath(link.getAttribute('href'));
    link.classList.toggle('active', hrefPath === currentPath);
  });
}

page('/', () => {
  renderPage(homeView());
  setActiveLink('/');
});
page('/index.html', () => page.redirect('/'));
page('/users', async () => {
  renderPage(await usersView());
  setActiveLink('/users');
});
page('/books', async () => {
  renderPage(await booksView());
  setActiveLink('/books');
});
page('/books/:id', async (ctx) => {
  renderPage(await bookDetailsView(ctx));
  setActiveLink('/books');
});
page('/activities', async () => {
  renderPage(await activitiesView());
  setActiveLink('/activities');
});
page('/register', () => {
  renderPage(registerView());
  setActiveLink('/register');
});
page('/login', () => {
  renderPage(loginView());
  setActiveLink('/login');
});
page('*', () => {
  renderPage(layout('Not Found', html`<p>Page not found.</p>`));
  setActiveLink(location.pathname);
});

page();

const navElements = document.querySelectorAll('[data-link]');
navElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    page.show(event.currentTarget.getAttribute('href'));
  });
});
