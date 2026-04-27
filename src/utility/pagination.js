import { html } from 'https://unpkg.com/lit-html?module';

export function buildPagination(page, pageCount, baseUrl) {
  return html`
    <nav class="pagination">
      ${Array.from({ length: pageCount }, (_, index) => {
        const pageNumber = index + 1;
        return html`
          <a class="page-link ${pageNumber === page ? 'active' : ''}" href="${baseUrl}?page=${pageNumber}" data-link>${pageNumber}</a>
        `;
      })}
    </nav>
  `;
}

export function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get('page')) || 1;
  return Math.max(page, 1);
}
