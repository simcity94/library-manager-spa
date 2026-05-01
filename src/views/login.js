import { html } from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';
import { layout } from './layout.js';
import { login } from '../services/dataService.js';
import { userHelper } from '../utility/userHelper.js';

export const loginView = () => layout('Login', html`
  <form @submit=${onSubmit} class="activity-form">
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <button class="button">Login</button>
  </form>
`);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email");
  const password = formData.get("password");

  if(!email || !password) {
    return alert("All fields required")
  }

  const userData = await login(email, password);

  userHelper.setUserData(userData);
  page.redirect('/');
}