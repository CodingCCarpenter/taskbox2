import React from 'react'

// import the Task component just created
import Task from './Task'

export default {
    component: Task,
    title: 'Task',
}

const Template = args => <Task {...args} />

// create the Default story for the Task component
export const Default = Template.bind({})
Default.args = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX',
        updatedAt: new Date(2018, 0, 1, 9, 0),
    },
}

// create the Pinned story for the Task component
export const Pinned = Template.bind({})
Pinned.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_PINNED',
    },
}

// create the Archived story for the Task component
export const Archived = Template.bind({})
Archived.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED',
    },
}
