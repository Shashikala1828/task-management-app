
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Modal from 'react-modal';
import './App.css';
import { RiStickyNoteAddFill } from "react-icons/ri";

//const backendHost = "http://localhost:8080/api/tasks";
const backendHost = '/api/tasks';

Modal.setAppElement('#root');

function App() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(backendHost);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createTask = async (task) => {
        try {
            await fetch(backendHost, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            await fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const updateTask = async (task) => {
        try {
            await fetch(`${backendHost}/${currentTask.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            await fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`${backendHost}/${id}`, { method: 'DELETE' });
            await fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleSaveTask = (task) => {
        if (currentTask) {
            updateTask(task);
        } else {
            createTask(task);
        }
        setCurrentTask(null);
        setModalIsOpen(false);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setModalIsOpen(true);
    };

    const handleToggleComplete = async (taskId) => {
        try {
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
            setTasks(updatedTasks);

            
            await fetch(`${backendHost}/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !tasks.find(task => task.id === taskId).completed })
            });
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };

    const openModal = () => {
        setCurrentTask(null);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    

    return (
        <div className="app">
            {/* <div className="sidebar">
                <ul className="task-filters">
                    <li>All tasks</li>
                   
                </ul>
                <button className="add-task-button" onClick={openModal}>Add Task</button>
            </div> */}
            <div className="main-content">
                <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={deleteTask} onToggleComplete={handleToggleComplete} />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Task Form"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <TaskForm onSave={handleSaveTask} currentTask={currentTask} closeModal={closeModal}/>
                    
                </Modal>
                <button className="add-task-button" onClick={openModal}><RiStickyNoteAddFill/></button>
            </div>
        </div>
    );
}

export default App;
