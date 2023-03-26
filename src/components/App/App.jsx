import {useState} from 'react';
import Header from '../Header/Header.jsx';
import ToDoList from '../ToDoList/ToDoList.jsx';
import './App.css';

function App () {
  return (
    <div>
      <Header />
      <ToDoList />
    </div>
  );

}

export default App
