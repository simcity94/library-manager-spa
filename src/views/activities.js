import {html} from 'https://unpkg.com/lit-html?module';
import {layout} from './layout.js';
import { activityService } from '../services/activityService.js';

const activitiesTemplate = (activities) => layout('Activities', html`
  <p>Track activities fetched from the API.</p>
  ${activities.length === 0 ? html`<p>No activities found.</p>` : html`
    <ul class="item-list">
      ${activities.map(activity => html`
        <li>
          <strong>${activity.name || activity.title || 'Unnamed activity'}</strong>
          ${activity.date ? html`<span>${activity.date}</span>` : ''}
          <p>${activity.description || 'No details available.'}</p>
        </li>`)}
    </ul>
  `}
`);

export async function activitiesView() {
  const activities = await activityService.getAllActivities();
  return activitiesTemplate(Array.isArray(activities) ? activities : []);
}
