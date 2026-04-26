import { api } from "./requester.js"

const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1';

const endpoints = {
  users: '/Users',
  userById: (id) => `/Users/${id}`,
};

async function getAllUsers() {
  return api.get(BASE_URL + endpoints.users);
}

async function getUserById(id) {
  return api.get(BASE_URL + endpoints.userById(id));
}

async function createUser(data) {
  return api.post(BASE_URL + endpoints.users, data);
}

async function updateUser(id, data) {
  return api.update(BASE_URL + endpoints.userById(id), data);
}

async function deleteUser(id) {
  return api.del(BASE_URL + endpoints.userById(id));
}

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};