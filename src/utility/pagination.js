import { html } from 'https://unpkg.com/lit-html?module';
import { repeat } from 'https://unpkg.com/lit-html/directives/repeat.js?module';

export function buildPagination(page, pageCount, baseUrl) {
    const maxVisible = 5; 

    const start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(pageCount, start + maxVisible - 1);

    const pages = [];

    if (page > 1) {
        pages.push(html`
      <a class="page-link" href="${baseUrl}?page=${page - 1}" data-link>Prev</a>
    `);
    }

    if (start > 1) {
        pages.push(html`
      <a class="page-link" href="${baseUrl}?page=1" data-link>1</a>
    `);

        if (start > 2) {
            pages.push(html`<span class="page-dots">...</span>`);
        }
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
    }

    pages.push(repeat(
        pageNumbers,
        (i) => i,
        (i) => html`
    <a 
      class="page-link ${Number(i) === Number(page) ? 'active' : ''}"   
      href="${baseUrl}?page=${i}" 
      data-link
    >
      ${i}
    </a>
  `
    ));

    if (end < pageCount) {
        if (end < pageCount - 1) {
            pages.push(html`<span class="page-dots">...</span>`);
        }

        pages.push(html`
      <a class="page-link" href="${baseUrl}?page=${pageCount}" data-link>
        ${pageCount}
      </a>
    `);
    }

    if (page < pageCount) {
        pages.push(html`
      <a class="page-link" href="${baseUrl}?page=${page + 1}" data-link>Next</a>
    `);
    }
    return html`<nav class="pagination">${pages}</nav>`;
}

export function getCurrentPage() {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page')) || 1;
    return Math.max(page, 1);
}
