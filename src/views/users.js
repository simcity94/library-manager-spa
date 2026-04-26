import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';
import { userService } from '../services/userService.js';

const usersTemplate = (users) => layout('Users', html`
  <p>Manage users fetched from the API below.</p>
  ${users.length === 0 ? html`<p>No users found.</p>` : html`
    <ul class="item-list">
      ${users.map(user => html`<li><strong>${user.email || user.username || 'Unknown'}</strong> <span>ID: ${user._id || user.id}</span></li>`) }
    </ul>
  `}
`);

export async function usersView() {
  const users = await userService.getAllUsers();
  return usersTemplate(Array.isArray(users) ? users : []);
}
