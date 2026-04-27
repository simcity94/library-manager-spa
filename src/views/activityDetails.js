import {html} from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';
import {layout} from './layout.js';
import { activityService } from '../services/activityService.js';

const detailsTemplate = (activity, onDelete) => layout('Activity Details', html`
  <div class="details-card">
    <div class="details-header">
      <span class="item-icon">🏃</span>
      <div>
        <h2>${activity.title || 'Untitled activity'}</h2>
        <p class="meta">ID: ${activity.id || 'N/A'}</p>
      </div>
    </div>

    <div class="details-body">
      <p><strong>Due date:</strong> ${activity.dueDate ? new Date(activity.dueDate).toLocaleString() : 'Not set'}</p>
      <p><strong>Status:</strong> ${activity.completed ? 'Completed' : 'Pending'}</p>
    </div>

    <div class="details-actions">
      <a href="/activities" data-link class="button secondary">Back to activities</a>
      <a href="/activities/${activity.id}/edit" data-link class="button">Edit</a>
      <button type="button" @click=${() => onDelete(activity.id)} class="button danger">Delete</button>
    </div>
  </div>
`);

export async function activityDetailsView(ctx) {
  const activityId = ctx.params.id;
    let activity = null;

    const localActivities = JSON.parse(localStorage.getItem('activities')) || [];
    activity = localActivities.find(a => String(a.id) === String(activityId));

    if (!activity) {
        activity = await activityService.getActivityById(activityId);
    }

  if (!activity || !activity.id) {
    return layout('Activity Not Found', html`
      <p>Unable to load activity details.</p>
      <a href="/activities" data-link class="button secondary">Back to activities</a>
    `);
  }

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

    page.show('/activities');
  };

  return detailsTemplate(activity, onDelete);
}
