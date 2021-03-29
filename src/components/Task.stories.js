import React from 'react';

//import the Task component we just created
import Task from './Task';

export default {
  component: Task,
  title: 'Task',
};

// Save Task as a template to use in each of our below stories
const Template = args => <Task {...args} />;

// the Default Story for our component
export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

// the Pinned Story for our component
export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

// the Pinned Story for our component
export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};