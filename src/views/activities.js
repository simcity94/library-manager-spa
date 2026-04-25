import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';

export const activitiesView = () => layout('Activities', html`
  <p>Demo page for activity tracking and CRUD operations.</p>
  <div class="loading">Loading content…</div>
`);