import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';

export const usersView = () => layout('Users', html`
  <p>In the next step, this page will fetch from <code>/api/v1/Users</code> and render a CRUD-friendly list.</p>
  <div class="loading">Loading content…</div>
`);