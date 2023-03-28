import {useState, useEffect} from 'react';
import Header from '../Header/Header.jsx';
import ToDoList from '../ToDoList/ToDoList.jsx';
// import ToDoListForm from '../ToDoListForm/ToDoListForm.jsx';
import './App.css';




function App () {

  return (
    <div className="App">
      <Header />
      <ToDoList />
    </div>
  );

}

export default App;
