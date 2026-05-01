import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';
import page from 'https://unpkg.com/page/page.mjs';
import { register } from '../services/dataService.js';
import { userHelper } from '../utility/userHelper.js';


export const registerView = () => layout('Register', html`
  <form @submit=${onSubmit} class="activity-form">
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <input type="password" name="rePassword" placeholder="Repeat Password" required />
    <button class="button">Register</button>
  </form>
`);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email");
  const password = formData.get("password");
  const rePass = formData.get("rePassword")

  if(!email || !password || !rePass) {
    return alert("All fiedls required");
  }

  if (password !== rePass) {
  return alert("Passwords do not match");
}

  const userData = await register(email, password);

  userHelper.setUserData(userData);
  page.redirect('/');
}