import axios from 'axios'

function ToDoListItem( {task, toggleCompleted, deleteList }) {
    return (
        <>
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
    </>
    )
}


export default ToDoListItem;