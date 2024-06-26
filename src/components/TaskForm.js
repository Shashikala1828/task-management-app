// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { FaSave, FaWindowClose } from "react-icons/fa";

function TaskForm({ onSave, currentTask, closeModal}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [backgroundColor, setbackgroundColor] = useState('');
    const colors = ['#F19ED2', '#BFF6C3', '#C39898', '#9BB0C1', '#8ACDD7', '#F9B572'];
   // const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setDueDate(currentTask.dueDate);
            setbackgroundColor(currentTask.backgroundColor);
        } else {
            setTitle('');
            setDescription('');
            setDueDate('');
            setbackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, dueDate, completed : false, backgroundColor });
    };
    
   

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <button className='save' type="submit"><FaSave/></button>
            <button  onClick={closeModal} className="close"><FaWindowClose/></button>
        </form>
    );
}

export default TaskForm;
