import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
    return (
        <div className="task-list-container">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </div>
    );
}

export default TaskList;
