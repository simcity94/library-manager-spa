import {html} from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';
import {layout} from './layout.js';
import { activityService } from '../services/activityService.js';
import { buildPagination, getCurrentPage } from '../utility/pagination.js';
import { userHelper } from '../utility/userHelper.js';

const PAGE_SIZE = 8;

const activitiesTemplate = (activities, onDelete, currentPage, pageCount) => layout('Activities', html`
  <div class="activities-header">
    <p>Track activities fetched from the API below.</p>
    ${userHelper.hasUser() ? html`
      <a href="/activities/new" data-link class="button">Create activity</a>
    ` : ''}
  </div>

  ${activities.length === 0 ? html`<p>No activities found.</p>` : html`
    <ul class="book-list">
      ${activities.map(activity => html`
        <li class="book-card">
          <span class="item-icon">🏃</span>
          <div class="book-info">
            <h2>${activity.title || activity.name || 'Unnamed activity'}</h2>
            <p class="book-meta">${activity.dueDate ? new Date(activity.dueDate).toLocaleString() : 'No due date'}</p>
            <p class="book-description">${activity.completed ? 'Completed' : 'Pending'}</p>
          </div>

          <div class="card-actions">
            <a href="/activities/${activity.id}" data-link class="button">Details</a>

          ${(userHelper.getUserId() &&
            activity._ownerId &&
            userHelper.getUserId() === activity._ownerId) ?
             html`
              <a href="/activities/${activity.id}/edit" data-link class="button secondary">Edit</a>
              <button type="button" @click=${() => onDelete(activity.id)} class="button danger">Delete</button>
              ` : ''}
          </div>
      `)}
    </ul>
    ${buildPagination(currentPage, pageCount, '/activities')}
  `}
`);

export async function activitiesView(ctx) {
  const apiActivities = await activityService.getAllActivities();
  const localActivities = JSON.parse(localStorage.getItem('activities')) || [];

  const activities = [
    ...(Array.isArray(apiActivities) ? apiActivities : []),
    ...localActivities
  ];

  const params = new URLSearchParams(ctx.querystring);
  const currentPage = Number(params.get('page')) || 1;
  const pageCount = Math.max(1, Math.ceil(activities.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, pageCount);

  const pagedActivities = activities.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const onDelete = async (id) => {
    const confirmed = confirm('Delete this activity?');
    if (!confirmed) return;

    let localActivities = JSON.parse(localStorage.getItem('activities')) || [];

    const updated = localActivities.filter(a => {
      return String(a.id) !== String(id);
    });

    if (updated.length !== localActivities.length) {
      localStorage.setItem('activities', JSON.stringify(updated));
    } else {
      await activityService.deleteActivity(id);
    }

    page.redirect('/activities');
  };

  return activitiesTemplate(pagedActivities, onDelete, safePage, pageCount);
}
