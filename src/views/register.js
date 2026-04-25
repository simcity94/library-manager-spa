import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';

export const registerView = () => layout('Register', html`
  <p>Create a new account for your LibraryManager SPA.</p>
  <p>This page is a placeholder now. Later we can wire it to a register form.</p>
`);
