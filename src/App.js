import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container } from '@mui/material';
import AddSearch from './components/AddSearch';
import ListArea from './components/List'
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@mui/system';
import './App.css';

function App() {
  const [Todos,setTodos] = useState([]);
  const [inputTerm, setInputTerm] = useState('');

  const LOCAL_STORAGE_KEY = 'recent_todos';

    useEffect(()=>{
        const recent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(recent){
            setTodos(recent);
        }
    },[])

    useEffect(()=>{
      if (Todos.length) { 
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Todos));
      }
    },[Todos])

  const filteredTodos = Todos.filter(todo => todo.task.toLowerCase().includes(inputTerm.toLowerCase()));

  const handleAdd = (newTask)=>{
      const newTodo = {
        'id':uuidv4(),
        'task':newTask,
        'completed':false
      }
      const newTodos = [...Todos,newTodo];
      setTodos(newTodos);
  }

  const handleDelete = (target)=>{
    const newTodos = Todos.filter(todo =>todo.id != target);
    setTodos(newTodos);
  }

  const handleEdit = (id, newtask)=>{

    const update = Todos.map(todo=>{
      if(todo.id === id){
        return{
          ...todo,
          task : newtask
        };
      }
      return todo;
  })
    setTodos(update);

  }

  const markCompleted = (id)=>{
    const update = Todos.map(todo=>{
      if(todo.id === id){
        return{
          ...todo,
          completed : !todo.completed
        };
      }
      return todo;
  })
    setTodos(update);
  }

  // useEffect(()=>{
      
  // },[])
  // useEffect(()=>{

  // },[Todos])
  const CenteredContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    marginTop:'2%',
    height: '80vh',
    width: '30vw',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  });

  return (
      <CenteredContainer>
        <AddSearch inputTerm={inputTerm} afterAdd={setInputTerm}  onSearch={setInputTerm} onAdd={handleAdd}/>
        <ListArea todos={filteredTodos} onDelete={handleDelete} onEdit={handleEdit} markCompleted={markCompleted}/>
      </CenteredContainer>
  );
}

export default App;
