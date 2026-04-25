import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';

export const loginView = () => layout('Login', html`
  <p>Sign in to the LibraryManager SPA demo.</p>
  <p>This page is a placeholder now. Next we can add a login form and local auth handling.</p>
`);
