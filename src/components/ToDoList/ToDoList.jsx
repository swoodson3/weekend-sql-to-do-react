import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ToDoList() {
    const [taskList, setTaskList ] = useState('');
    const [completedTask, setCompletedTask] = useState(false);
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

   const taskComplete = (id) => {
    axios.put(`tasks/${id}`,)
    .then((response) => {
        console.log(response);
        tasksList()
    })
    .catch((error) => {
        console.log(`Error in PUT ${error}`);
        alert('Something went wrong');
    })
   }


   const  deleteList = (id) => {
    console.log(`Clearing shopping list`);
    axios.delete(`tasks/${id}`)
    .then((response) => {
        console.log(response);
        tasksList()
    }).catch((error) => {
            console.log(error)
        alert('Something went wrong')
    });
}
   return (
   <>
        <form onSubmit={submitForm}>
                    Task Name:
                    <input type="text"
                        value={taskList}
                        onChange={(e) => setTaskList(e.target.value)} />
                        <input type="submit" /> 
                </form>
            <ul> 
                {
                    listOfTasks.map((task) => (
                        <li key={task.id}>
                            {task.task} - {task.completed} 
                            <button onClick={(e) => deleteList(task.id)}> Delete </button>
                        </li>
                    ))
                }
            </ul>
        </>
   )
}

export default ToDoList;

