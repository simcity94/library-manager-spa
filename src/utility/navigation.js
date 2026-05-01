import { html, render } from 'https://unpkg.com/lit-html?module';
import { userHelper } from './userHelper.js';
import page from 'https://unpkg.com/page/page.mjs';

const navRoot =  document.querySelector('nav');

const allUserTemp = (hasUser) => html` 
        <div class="nav-main">
            <a href="/users" @click=${onNavigate} data-link>Users</a>
            <a href="/books" @click=${onNavigate} data-link>Books</a>
            <a href="/activities" @click=${onNavigate} data-link>Activities</a>
        </div>
        ${hasUser ?
        html`
        <div class="nav-actions">
            <a href="/logout" @click=${onNavigate} data-link>Logout</a>
        </div>
        `
        : html `
        <div class="nav-actions">
            <a href="/register" @click=${onNavigate} data-link>Register</a>
            <a href="/login" @click=${onNavigate} data-link>Login</a>
        </div>
        `}
`

export function updateNav() {
    render(allUserTemp(userHelper.hasUser()), navRoot);
}

function onNavigate(e) {
  e.preventDefault();
  page.show(e.currentTarget.getAttribute('href'));
}