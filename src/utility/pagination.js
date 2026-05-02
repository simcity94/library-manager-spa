import { html } from 'https://unpkg.com/lit-html?module';
import { repeat } from 'https://unpkg.com/lit-html/directives/repeat.js?module';
import page from 'https://unpkg.com/page/page.mjs';

export function buildPagination(currentPage, pageCount, baseUrl) {
    const maxVisible = 5; 

    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(pageCount, start + maxVisible - 1);

    const pages = [];

    if (currentPage > 1) {
        pages.push(html`
        <a 
          class="page-link" 
          href="${baseUrl}?page=${currentPage - 1}"
          @click=${onNavigate}
        >
          Prev
        </a>
      `);
    }

    if (start > 1) {
        pages.push(html`
      <a class="page-link" href="${baseUrl}?page=1" @click=${onNavigate}>1</a>
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
      class="page-link ${Number(i) === Number(currentPage) ? 'active' : ''}"   
      href="${baseUrl}?page=${i}" 
      @click=${onNavigate}
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
      <a class="page-link" href="${baseUrl}?page=${pageCount}" @click=${onNavigate}>
        ${pageCount}
      </a>
    `);
    }

    if (currentPage < pageCount) {
        pages.push(html`
      <a class="page-link" href="${baseUrl}?page=${currentPage + 1}" @click=${onNavigate}>Next</a>
    `);
    }
    return html`<nav class="pagination">${pages}</nav>`;
}

export function getCurrentPage() {
    const params = new URLSearchParams(window.location.search);
    const currentPage = Number(params.get('page')) || 1;
    return Math.max(currentPage, 1);
}

function onNavigate(e) {
  e.preventDefault();
  page.show(e.currentTarget.getAttribute('href'));
}