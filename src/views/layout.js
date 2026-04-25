import {html} from 'https://unpkg.com/lit-html?module';

export const layout = (title, content) => html`
  <section class="section-card">
    <h1>${title}</h1>
    ${content}
  </section>
`;