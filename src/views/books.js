import { html } from 'https://unpkg.com/lit-html?module';
import { layout } from './layout.js';
import { bookService } from '../services/bookService.js';

const PAGE_SIZE = 12;

function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get('page')) || 1;
  return Math.max(page, 1);
}

function buildPagination(page, pageCount) {
  return html`
    <nav class="pagination">
      ${Array.from({ length: pageCount }, (_, index) => {
        const pageNumber = index + 1;
        return html`
          <a class="page-link ${pageNumber === page ? 'active' : ''}" href="/books?page=${pageNumber}" data-link>${pageNumber}</a>
        `;
      })}
    </nav>
  `;
}

function booksTemplate(books, page, pageCount) {
  return layout('Books', html`
    <p>Browse books fetched from the API. Each page shows 10 books.</p>
    ${books.length === 0 ? html`<p>No books found.</p>` : html`
      <ul class="book-list">
        ${books.map(book => html`
          <li class="book-card">
            <span class="item-icon">📚</span>
            <div class="book-info">
              <h2>${book.title || 'Untitled'}</h2>
              <p class="book-meta">${book.description || 'No summary available.'}</p>
            </div>
            <a href="/books/${book.id || book.ID}" data-link class="button">Details</a>
          </li>
        `)}
      </ul>
      ${buildPagination(page, pageCount)}
    `}
  `);
}

export async function booksView() {
  const allBooks = await bookService.getAllBooks();
  const books = Array.isArray(allBooks) ? allBooks : [];
  const page = getCurrentPage();
  const pageCount = Math.max(1, Math.ceil(books.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pagedBooks = books.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return booksTemplate(pagedBooks, currentPage, pageCount);
}
