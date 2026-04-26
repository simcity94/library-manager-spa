import { api } from './requester.js';

const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1';

const endpoints = {
  books: '/Books',
  bookById: (id) => `/Books/${id}`,
};

async function getAllBooks() {
  return api.get(BASE_URL + endpoints.books);
}

async function getBookById(id) {
  return api.get(BASE_URL + endpoints.bookById(id));
}

async function createBook(data) {
  return api.post(BASE_URL + endpoints.books, data);
}

async function updateBook(id, data) {
  return api.update(BASE_URL + endpoints.bookById(id), data);
}

async function deleteBook(id) {
  return api.del(BASE_URL + endpoints.bookById(id));
}

export const bookService = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
