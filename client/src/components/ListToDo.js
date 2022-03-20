import React, { useEffect, useState } from 'react'
import EditToDo from './EditToDo';

const ListToDo = () => {
  const [todos, setTodos] = useState([]);
  const getToDos = async() => {
      const res = await fetch('http://localhost:5000/api/todo');
      const todoArray = await res.json();
      setTodos(todoArray);
  }

  const deleteTodo = async(id) => {
    try {
        await fetch(`http://localhost:5000/api/todo/${id}`, { method: "DELETE" });  
        setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
        console.error(err.message);
    }
  }

  useEffect(() => {
    getToDos();
  }, []);
  return (
    <table className="table">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
          todos.map((todo, index) => (
              <tr key={index}>
                  <td>{todo.description}</td>
                  <td><EditToDo todo={todo}/></td>
                  <td><button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button></td>
              </tr>
          ))
      }
    </tbody>
  </table>
  )
}

export default ListToDo