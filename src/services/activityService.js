import { api } from './requester.js';

const BASE_URL = 'https://fakerestapi.azurewebsites.net/api/v1';

const endpoints = {
  activities: '/Activities',
  activityById: (id) => `/Activities/${id}`,
};

async function getAllActivities() {
  return api.get(BASE_URL + endpoints.activities);
}

async function getActivityById(id) {
  return api.get(BASE_URL + endpoints.activityById(id));
}

async function createActivity(data) {
  return api.post(BASE_URL + endpoints.activities, data);
}

async function updateActivity(id, data) {
  return api.update(BASE_URL + endpoints.activityById(id), data);
}

async function deleteActivity(id) {
  return api.del(BASE_URL + endpoints.activityById(id));
}

export const activityService = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
