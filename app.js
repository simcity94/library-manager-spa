import {html, render} from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';
import {layout} from './src/views/layout.js';
import {homeView} from './src/views/home.js';
import {usersView} from './src/views/users.js';
import {booksView} from './src/views/books.js';
import {bookDetailsView} from './src/views/bookDetails.js';
import {activitiesView} from './src/views/activities.js';
import {activityDetailsView} from './src/views/activityDetails.js';
import {activityFormView} from './src/views/activityForm.js';
import {registerView} from './src/views/register.js';
import {loginView} from './src/views/login.js';
import { userHelper } from './src/utility/userHelper.js';
import { updateNav } from './src/utility/navigation.js';

const ROOT = document.getElementById('page-root');

updateNav();

function renderPage(template, path) {
  render(template, ROOT);
  updateNav();           
  setActiveLink(path);   
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

function requireAuth(ctx, next) {
  if (!userHelper.hasUser()) {
    return page.redirect('/login');
  }
  next();
}

page('/', () => {
  renderPage(homeView(), '/');
});

page('/users', async () => {
  renderPage(await usersView(), '/users');
});

page('/books', async (ctx) => {
  renderPage(await booksView(ctx), '/books');
});

page('/books/:id', async (ctx) => {
  renderPage(await bookDetailsView(ctx));
  setActiveLink('/books');
});

page('/activities', async (ctx) => {
  renderPage(await activitiesView(ctx), '/activities');
});

page('/activities?page=:page', async (ctx) => {
  renderPage(await activitiesView(ctx), '/activities');
});

page('/activities/new', requireAuth, async () => {
  renderPage(await activityFormView({ params: {} }));
});

page('/activities/:id', async (ctx) => {
  renderPage(await activityDetailsView(ctx));
  setActiveLink('/activities');
});

page('/activities/:id/edit', requireAuth, async (ctx) => {
  renderPage(await activityFormView(ctx));
});

page('/login', () => {
  renderPage(loginView(), '/login');
});

page('/register', () => {
  renderPage(registerView(), '/register');
});

page('/logout', () => {
userHelper.clear();
updateNav();
page.redirect('/')
});

page('/index.html', () => page.redirect('/'));

page('*', () => {
  renderPage(layout('Not Found', html`<p>Page not found.</p>`));
  setActiveLink(location.pathname);
});

page();
