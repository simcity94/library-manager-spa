import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';

export const booksView = () => layout('Books', html`
  <p>Demo page for book management with FakeREST API.</p>
  <div class="loading">Loading content…</div>
`);