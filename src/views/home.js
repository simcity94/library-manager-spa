import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';

export const homeView = () => layout('Welcome', html`
  <p>Welcome to LibraryManager - my FakeREST SPA starter app.</p>
  <p>Use the navigation to switch between demo pages and load data from the FakeREST API.</p>
  <ul>
    <li><strong>Users</strong> — list and edit user records.</li>
    <li><strong>Books</strong> — browse and manage books.</li>
    <li><strong>Activities</strong> — see tasks and update status.</li>
  </ul>
`);