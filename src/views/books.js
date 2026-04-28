import { html } from 'https://unpkg.com/lit-html?module';
import { layout } from './layout.js';
import { bookService } from '../services/bookService.js';
import { buildPagination, getCurrentPage } from '../utility/pagination.js';

const PAGE_SIZE = 8;


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
      ${buildPagination(page, pageCount, '/books')}
    `}
  `);
}

export async function booksView(ctx) {
  const allBooks = await bookService.getAllBooks();
  const books = Array.isArray(allBooks) ? allBooks : [];
  const params = new URLSearchParams(ctx.querystring);
  const page = Number(params.get('page')) || 1;
  const pageCount = Math.max(1, Math.ceil(books.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pagedBooks = books.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return booksTemplate(pagedBooks, currentPage, pageCount);
}
