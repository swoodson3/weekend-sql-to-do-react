import axios from 'axios';
import { useState, useEffect } from 'react';

function ToDoListForm({
    taskList,
    setTaskList,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    priority,
    setPriority,
    assigned,
    setAssigned,
    finishedDate,
    setFinishedDate,
    completed,
    setCompleted,
    // tasksList
    
     }) {
        
   

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
                // tasksList();
            })
            .catch((error) => {
                console.log(`Error in POST ${error}`);
                alert('Something went wrong!');
            })
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
            <form className="form-container" onSubmit={submitForm}>
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
            </form>
            <br />
            <br />
        </>
    );
};


export default ToDoListForm;
