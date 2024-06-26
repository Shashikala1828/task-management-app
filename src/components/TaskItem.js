import React from 'react';
import { FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import './TaskItem.css';


// const colors = ['#F19ED2', '#BFF6C3', '#C39898', '#9BB0C1', '#8ACDD7', '#F9B572'];

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
    // const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const handleToggleComplete = () => {
        onToggleComplete(task.id); 
    };

    return (
        <div className="task-item" style={{ backgroundColor: task.backgroundColor }}>
            <div className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-header">
                    <span className="task-title">{task.title}</span>
                </div> 
                <div className="task-description">{task.description}</div>
                <div className="task-due-date">
                    <FaClock className="clock-icon" /> {task.dueDate}
                </div>
                <div className="task-actions">
                    <button className="complete-button" onClick={handleToggleComplete}>
                        <IoCheckmarkDoneCircleSharp className={`action-icon ${task.completed ? 'completed' : ''}`} />
                    </button>
                    <button className="edit-button" onClick={() => onEdit(task)}>
                        <FaEdit className="action-icon" />
                    </button>
                    <button className="delete-button" onClick={() => onDelete(task.id)}>
                        <FaTrash className="action-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;
