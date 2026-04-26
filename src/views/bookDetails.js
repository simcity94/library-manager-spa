import { html } from 'https://unpkg.com/lit-html?module';
import { layout } from './layout.js';
import { bookService } from '../services/bookService.js';

function detailsTemplate(book) {
  return layout('Book Details', html`
    <div class="details-card">
      <div class="details-header">
        <span class="item-icon">📘</span>
        <div>
          <h2>${book.title || 'Untitled'}</h2>
          <p class="meta">ID: ${book.id || book.ID || 'N/A'}</p>
        </div>
      </div>

      <div class="details-body">
        <p><strong>Description:</strong></p>
        <p>${book.description || 'No description available.'}</p>

        <p><strong>Excerpt:</strong></p>
        <p>${book.excerpt || 'Not available.'}</p>

        <p><strong>Page count:</strong> ${book.pageCount || 'Unknown'}</p>
        <p><strong>Publish date:</strong> ${book.publishDate || 'Unknown'}</p>
      </div>

      <div class="details-actions">
        <a href="/books" data-link class="button secondary">Back to books</a>
      </div>
    </div>
  `);
}

export async function bookDetailsView(ctx) {
  const bookId = ctx.params.id;
  const book = await bookService.getBookById(bookId);
  return detailsTemplate(book || {});
}
