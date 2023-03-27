import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ToDoList.css'

function ToDoList() {
    const [taskList, setTaskList] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [priority, setPriority] = useState('');
    const [assigned, setAssigned] = useState('');
    const [finishedDate, setFinishedDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [listOfTasks, setListOfTasks] = useState([]);


    const tasksList = () => {
        axios.get('/tasks')
            .then((response) => {
                // Sort tasks by priority
                const sortedTasks = response.data.sort((a, b) => {
                    if (a.priority === 'high') return -1;
                    if (b.priority === 'high') return 1;
                    if (a.priority === 'medium') return -1;
                    if (b.priority === 'medium') return 1;
                    return 0;
                });
                setListOfTasks(sortedTasks);
            })
            .catch((error) => {
                console.log(`Error in GET ${error}`);
                alert('Something went wrong!');
            })
    }

    useEffect(() => {
        tasksList();
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        const isValidDate = validateDates(startDate, endDate, finishedDate);
        if (!isValidDate) {
            return;
        }
        axios.post('/tasks', {
            task_name: taskList,
            start_date: startDate,
            end_date: endDate,
            priority: priority,
            assigned_user: assigned,
            completed: completed,
            finished_date: finishedDate,

        })
            .then((response) => {
                setTaskList('');
                setStartDate('');
                setEndDate('');
                setPriority('');
                setAssigned('');
                setFinishedDate('');
                setCompleted(false);
                tasksList();
            })
            .catch((error) => {
                console.log(`Error in POST ${error}`);
                alert('Something went wrong!');
            })
    }

    const toggleCompleted = (task) => {
        const updatedTask = { completed: !task.completed };
        axios.put(`/tasks/${task.id}`, updatedTask)
            .then((response) => {
                console.log(response);
                tasksList();
            })
            .catch((error) => {
                console.log(`Error in PUT ${error}`);
                alert('Something went wrong');
            })
    }

    const deleteList = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            console.log(`Clearing shopping list`);
            axios.delete(`/tasks/${id}`)
                .then((response) => {
                    console.log(response);
                    tasksList();
                }).catch((error) => {
                    console.log(error)
                    alert('Something went wrong!')
                });
        }
    }

    function validateDates(startDate, endDate, finishedDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const finished = new Date(finishedDate);

        if (end < start) {
            alert('End date cannot be before start date');
            return false;
        }

        if (finished < start) {
            alert('Finished date cannot be before start date');
            return false;
        }

        return true;
    }


    
    return (
        <>
            <form onSubmit={submitForm}>
                <div className="form-container">
                    <label htmlFor="task-name">Task Name: </label>
                    <input type="text" placeholder="Task Name" id="task-name" value={taskList} onChange={(e) => setTaskList(e.target.value)} required />

                    <label htmlFor="start-date">Start Date:</label>
                    <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

                    <label htmlFor="end-date">End Date:</label>
                    <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                    <label htmlFor="priority">Priority:</label>
                    <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required >
                        <option value="">--Select--</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <label htmlFor="assigned">Assigned:</label>
                    <input type="text" placeholder="Assigned" id="assigned" value={assigned} onChange={(e) => setAssigned(e.target.value)} pattern="[A-Za-z ]+" required />

                    <label htmlFor="finished-date">Finished Date:</label>
                    <input type="date" id="finished-date" value={finishedDate} onChange={(e) => setFinishedDate(e.target.value)} required />
                    <input type="submit" />
                </div>
            </form>
            <br />
            <br />
            <table className="my-table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Priority</th>
                        <th>Assigned To</th>
                        <th>Finished Date</th>
                        <th>Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOfTasks.map((task) => (
                            <tr key={task.id} className={`task-row} ${task.completed ? 'completed' : ''}`}> 
                                <td>{task.task_name}</td>
                                <td>{task.start_date}</td>
                                <td>{task.end_date}</td>
                                <td style={{ backgroundColor: task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green' }}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </td>
                                <td>{task.assigned_user}</td>
                                <td>{task.finished_date}</td>
                                <td>
                                    <input type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleCompleted(task)}
                                        className="toggle-button"
                                    />
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteList(task.id)}> Delete </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default ToDoList;

