import { html } from 'https://unpkg.com/lit-html?module';
import page from 'https://unpkg.com/page/page.mjs';
import { layout } from './layout.js';
import { activityService } from '../services/activityService.js';

const formTemplate = (activity, onSubmit, mode) => layout(`${mode} Activity`, html`
  <p>${mode === 'Create' ? 'Add a new activity to the tracker.' : 'Update the activity details below.'}</p>
  <form class="activity-form" @submit=${onSubmit}>
    <div class="form-row">
      <label>
        Title
        <input type="text" name="title" .value=${activity.title || ''} required>
      </label>
    </div>

    <div class="form-row">
      <label>
        Due Date
        <input type="datetime-local" name="dueDate" .value=${activity.dueDate || ''}>
      </label>
    </div>

    <div class="form-row inline">
      <label>
        <input type="checkbox" name="completed" ?checked=${activity.completed}>
        Completed
      </label>
    </div>

    <div class="form-actions">
      <button type="submit" class="button">${mode}</button>
      <a href="/activities" data-link class="button secondary">Cancel</a>
    </div>
  </form>
`);

function normalizeDateValue(value) {
    return value ? new Date(value).toISOString().slice(0, 16) : '';
}

export async function activityFormView(ctx = { params: {} }) {
    const isEdit = Boolean(ctx.params.id);
    const mode = isEdit ? 'Edit' : 'Create';
    let activity;

    if (isEdit) {
        const localActivities = JSON.parse(localStorage.getItem('activities')) || [];
        activity = localActivities.find(a => String(a.id) === String(ctx.params.id));

        if (!activity) {
            activity = await activityService.getActivityById(ctx.params.id);
        }
    } else {
        activity = { title: '', dueDate: '', completed: false };
    }

    if (isEdit && (!activity || !activity.id)) {
        return layout('Activity Not Found', html`
      <p>Unable to load activity data.</p>
      <a href="/activities" data-link class="button secondary">Back to activities</a>
    `);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const dueDateValue = formData.get('dueDate');
        const completed = formData.get('completed') === 'on';

        const data = {
            title,
            dueDate: dueDateValue ? new Date(dueDateValue).toISOString() : '',
            completed,
        };

        if (isEdit) {
            data.id = activity.id;

            const localActivities = JSON.parse(localStorage.getItem('activities')) || [];
            const isLocal = localActivities.some(a => String(a.id) === String(activity.id));

            if (isLocal) {
                const updated = localActivities.map(a =>
                    String(a.id) === String(activity.id) ? { ...a, ...data } : a
                );

                localStorage.setItem('activities', JSON.stringify(updated));
            } else {
                await activityService.updateActivity(activity.id, data);
            }

            page.show(`/activities/${activity.id}`);
        } else {
        
            data.id = 'local-' + Date.now();;

            const localActivities = JSON.parse(localStorage.getItem('activities')) || [];

            localActivities.push(data);

            localStorage.setItem('activities', JSON.stringify(localActivities));

            page.show('/activities');

        }
    };
    
    const boundActivity = {
        ...activity,
        dueDate: normalizeDateValue(activity.dueDate),
    };

    return formTemplate(boundActivity, onSubmit, mode);
}
