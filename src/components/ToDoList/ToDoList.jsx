import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ToDoList.css';
import ToDoListItem from './ToDoListItem.jsx';
import ToDoListForm from '../ToDoListForm/ToDoListForm.jsx';


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
                console.log('why am i not working ')
            })
            .catch((error) => {
                console.log(`Error in GET ${error}`);
                alert('Something went wrong!');
            })
    }

    useEffect(() => {
        tasksList();
    }, []);


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

    return (
        <>
            <ToDoListForm
                taskList={taskList}
                setTaskList={setTaskList}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                priority={priority}
                setPriority={setPriority}
                assigned={assigned}
                setAssigned={setAssigned}
                finishedDate={finishedDate}
                setFinishedDate={setFinishedDate}
                completed={completed}
                setCompleted={setCompleted}
                tasksList={tasksList}
            />
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
                        listOfTasks.map((task) => {
                            <ToDoListItem task={task} toggleCompleted={toggleCompleted} deleteList={deleteList} />
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ToDoList;

