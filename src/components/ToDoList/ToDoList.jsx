import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ToDoList() {
    const [taskList, setTaskList ] = useState('');
    const [completedTask, setCompletedTask] = useState('');
    const [listOfTasks, setListOfTasks] = useState([]);

    const tasksList = () => {
        axios.get('/tasks')
        .then((response) => {
            setListOfTasks(response.data);
        })
        .catch((error) => {
            console.log(`Error in GET ${error}`);
            alert('Something went wrong!');
        })
    }
    const  deleteList = () => {
        console.log(`Clearing shopping list`);
        axios.delete(`/tasks/deleteList`)
        .then((response) => {
            console.log(response);
            taskList()
        }).catch((error) => {
                console.log(error)
            alert('Something went wrong')
        });
    }


   useEffect(() => {
    tasksList();
   }, []); 
    
   const submitForm = (e) => {
    e.preventDefault();
    axios.post('/tasks', {
        task: taskList,
        completed: completedTask
    })
    .then((response) => {
        setTaskList('');
        setCompletedTask('');
        tasksList();
    })
    .catch((error) => {
        console.log(`Error in POST ${error}`);
        alert('Something went wrong!');
    })
   }
   return (
   <>
        <form onSubmit={submitForm}>
                    Task:
                    <input type="text"
                        value={taskList}
                        onChange={(e) => setTaskList(e.target.value)} />
                    <br />
                    Completed:
                    <input type="text"
                        value={completedTask}
                        onChange={(e) => setCompletedTask(e.target.value)} />
                    <input type="submit" />
                </form>
                <button onClick ={deleteList}>Clear</button> 
            <ul> 
                {
                    listOfTasks.map((task) => (
                        <li key={task.id}>
                            {task.task} - {task.completed} 
                        </li>
                    ))
                }
            </ul>
        </>
   )
}

export default ToDoList;

